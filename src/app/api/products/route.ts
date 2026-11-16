import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { products as initialProducts } from '@/lib/data';
import { Product } from '@/lib/types';

const DATA_FILE_PATH = path.join(process.cwd(), 'src/data/products.json');

// In-memory cache for speed, backed by file on disk
let liveProducts: Product[] | null = null;

async function getStoredProducts(): Promise<Product[]> {
  if (liveProducts) {
    return liveProducts;
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = await fs.promises.readFile(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        liveProducts = parsed;
        return liveProducts;
      }
    }
  } catch (err) {
    console.error('Failed to read src/data/products.json:', err);
  }

  // Fallback to initial seed data and initialize disk file
  liveProducts = [...initialProducts];
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(liveProducts, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to initialize src/data/products.json:', err);
  }

  return liveProducts;
}

async function saveStoredProducts(products: Product[]): Promise<void> {
  liveProducts = products;
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write src/data/products.json:', err);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const partType = searchParams.get('part_type');
  const stockStatus = searchParams.get('stock'); // 'in_stock' | 'low' | 'out'
  const query = searchParams.get('q');
  const slug = searchParams.get('slug');
  const id = searchParams.get('id');

  const allProducts = await getStoredProducts();
  let results = [...allProducts];

  if (id) {
    const single = results.find((p) => p.id === id);
    if (!single) {
      return NextResponse.json({ status: 'error', message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', data: single });
  }

  if (slug) {
    const single = results.find((p) => p.slug === slug);
    if (!single) {
      return NextResponse.json({ status: 'error', message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', data: single });
  }

  if (category) {
    results = results.filter((p) => p.category_slug === category);
  }
  if (brand) {
    results = results.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }
  if (partType) {
    results = results.filter((p) => p.part_type === partType);
  }
  if (stockStatus) {
    if (stockStatus === 'in_stock') {
      results = results.filter((p) => p.stock_count > 5);
    } else if (stockStatus === 'low') {
      results = results.filter((p) => p.stock_count > 0 && p.stock_count <= 5);
    } else if (stockStatus === 'out') {
      results = results.filter((p) => p.stock_count === 0);
    }
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name_en.toLowerCase().includes(q) ||
        p.name_kh.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    status: 'success',
    count: results.length,
    data: results,
  });
}

export async function POST(request: NextRequest) {
  try {
    const newProduct: Product = await request.json();

    if (!newProduct.name_en || !newProduct.name_kh || !newProduct.sku) {
      return NextResponse.json(
        { status: 'error', message: 'Name (EN/KH) and SKU are required' },
        { status: 400 }
      );
    }

    // Generate unique ID and slug if not provided
    if (!newProduct.id) {
      newProduct.id = `prod-${Date.now()}`;
    }
    if (!newProduct.slug) {
      newProduct.slug = newProduct.name_en
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const currentProducts = await getStoredProducts();
    const updatedProducts = [newProduct, ...currentProducts.filter((p) => p.id !== newProduct.id)];
    await saveStoredProducts(updatedProducts);

    return NextResponse.json({
      status: 'success',
      message: 'Product created successfully',
      data: newProduct,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, stock_count, delta, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'Product ID is required' },
        { status: 400 }
      );
    }

    const currentProducts = await getStoredProducts();
    const index = currentProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { status: 'error', message: 'Product not found' },
        { status: 404 }
      );
    }

    // Handle stock delta adjustment
    let updatedStock = currentProducts[index].stock_count;
    if (typeof stock_count === 'number') {
      updatedStock = Math.max(0, stock_count);
    } else if (typeof delta === 'number') {
      updatedStock = Math.max(0, updatedStock + delta);
    }

    const updatedProduct: Product = {
      ...currentProducts[index],
      ...updates,
      stock_count: updatedStock,
      in_stock: updatedStock > 0,
    };

    const updatedList = [...currentProducts];
    updatedList[index] = updatedProduct;
    await saveStoredProducts(updatedList);

    return NextResponse.json({
      status: 'success',
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'Product ID is required' },
        { status: 400 }
      );
    }

    const currentProducts = await getStoredProducts();
    const initialLength = currentProducts.length;
    const filtered = currentProducts.filter((p) => p.id !== id);

    if (filtered.length === initialLength) {
      return NextResponse.json(
        { status: 'error', message: 'Product not found' },
        { status: 404 }
      );
    }

    await saveStoredProducts(filtered);

    return NextResponse.json({
      status: 'success',
      message: 'Product deleted successfully',
      deleted_id: id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}
