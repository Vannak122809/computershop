import { Product, CustomPCSelection } from './types';

const TELEGRAM_HANDLE = 'shinggg168'; // NV Technology direct telegram contact

export function createProductTelegramLink(product: Product, lang: 'kh' | 'en' = 'kh'): string {
  const khr = (product.price_usd || 0) * 4100;
  let message = '';
  if (lang === 'kh') {
    message = `សួស្តី NV Technology! 🇰🇭\n` +
      `ខ្ញុំចាប់អារម្មណ៍លើផលិតផលនេះ សូមជួយផ្តល់ព័ត៌មានតម្លៃ និងស្តុក៖\n\n` +
      `📦 ផលិតផល៖ ${product.name_kh}\n` +
      `🔖 SKU / Model៖ ${product.sku}\n` +
      `🏷️ ម៉ាក៖ ${product.brand}\n` +
      (product.price_usd ? `💰 តម្លៃ៖ $${product.sale_price_usd ?? product.price_usd} (≈ ៛${khr.toLocaleString()})\n` : `📞 តម្លៃ៖ សូមទាក់ទង\n`) +
      (product.warranty_months ? `🛡️ ការធានា៖ ${product.warranty_months} ខែផ្លូវការ\n` : '') +
      `\nសូមអរគុណ!`;
  } else {
    message = `Hello NV Technology! 🇰🇭\n` +
      `I'm interested in this product and would like to confirm price & availability:\n\n` +
      `📦 Product: ${product.name_en}\n` +
      `🔖 SKU: ${product.sku}\n` +
      `🏷️ Brand: ${product.brand}\n` +
      (product.price_usd ? `💰 Price: $${product.sale_price_usd ?? product.price_usd} (≈ ៛${khr.toLocaleString()})\n` : `📞 Price: Contact for Quote\n`) +
      (product.warranty_months ? `🛡️ Warranty: ${product.warranty_months} Months Official\n` : '') +
      `\nThank you!`;
  }

  return `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(message)}`;
}

export function createProductPreorderTelegramLink(product: Product, lang: 'kh' | 'en' = 'kh'): string {
  const khr = (product.price_usd || 0) * 4100;
  let message = '';
  if (lang === 'kh') {
    message = `សួស្តី NV Technology! 🇰🇭\n` +
      `ខ្ញុំចង់កម្ម៉ង់ទុកមុន (Pre-Order) លើទំនិញដែលអស់ពីស្តុក៖\n\n` +
      `📦 ផលិតផល៖ ${product.name_kh}\n` +
      `🔖 SKU / Model៖ ${product.sku}\n` +
      `🏷️ ម៉ាក៖ ${product.brand}\n` +
      (product.price_usd ? `💰 តម្លៃប៉ាន់ស្មាន៖ $${product.sale_price_usd ?? product.price_usd} (≈ ៛${khr.toLocaleString()})\n` : '') +
      (product.warranty_months ? `🛡️ ការធានា៖ ${product.warranty_months} ខែ\n` : '') +
      `\nតើទំនិញនេះអាចមកដល់វិញនៅពេលណាដែរ? សូមជួយពិនិត្យ និងបញ្ជាក់ឱ្យខ្ញុំផង។ អរគុណ!`;
  } else {
    message = `Hello NV Technology! 🇰🇭\n` +
      `I would like to place a Pre-Order for this out-of-stock item:\n\n` +
      `📦 Product: ${product.name_en}\n` +
      `🔖 SKU / Model: ${product.sku}\n` +
      `🏷️ Brand: ${product.brand}\n` +
      (product.price_usd ? `💰 Estimated Price: $${product.sale_price_usd ?? product.price_usd} (≈ ៛${khr.toLocaleString()})\n` : '') +
      (product.warranty_months ? `🛡️ Warranty: ${product.warranty_months} Months\n` : '') +
      `\nWhen will this item be restocked? Please let me know. Thank you!`;
  }

  return `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(message)}`;
}

export function createCustomPCTelegramLink(
  selection: CustomPCSelection, 
  totalUsd: number, 
  estimatedWatts: number,
  lang: 'kh' | 'en' = 'kh'
): string {
  const partsList: string[] = [];

  if (selection.cpu) partsList.push(`• CPU: ${selection.cpu.name_en} ($${selection.cpu.sale_price_usd ?? selection.cpu.price_usd})`);
  if (selection.motherboard) partsList.push(`• Motherboard: ${selection.motherboard.name_en} ($${selection.motherboard.sale_price_usd ?? selection.motherboard.price_usd})`);
  if (selection.ram) partsList.push(`• RAM: ${selection.ram.name_en} ($${selection.ram.sale_price_usd ?? selection.ram.price_usd})`);
  if (selection.storage_ssd) partsList.push(`• SSD: ${selection.storage_ssd.name_en} ($${selection.storage_ssd.sale_price_usd ?? selection.storage_ssd.price_usd})`);
  if (selection.gpu) partsList.push(`• GPU: ${selection.gpu.name_en} ($${selection.gpu.sale_price_usd ?? selection.gpu.price_usd})`);
  if (selection.case) partsList.push(`• Case: ${selection.case.name_en} ($${selection.case.sale_price_usd ?? selection.case.price_usd})`);
  if (selection.cooler) partsList.push(`• Cooler: ${selection.cooler.name_en} ($${selection.cooler.sale_price_usd ?? selection.cooler.price_usd})`);
  if (selection.psu) partsList.push(`• PSU: ${selection.psu.name_en} ($${selection.psu.sale_price_usd ?? selection.psu.price_usd})`);

  let text = '';
  if (lang === 'kh') {
    text = `🖥️ សំណើ Custom PC Build — NV Technology 🇰🇭\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      partsList.join('\n') + `\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💵 តម្លៃសរុបប្រហែល៖ $${totalUsd.toLocaleString()}\n` +
      `⚡ ថាមពលប៉ាន់ស្មាន៖ ${estimatedWatts}W\n\n` +
      `សួស្តីក្រុមការងារ! ខ្ញុំបានរៀបចំ Custom PC នេះនៅលើគេហទំព័រ NV Technology។ សូមជួយពិនិត្យស្តុកគ្រឿង និងបញ្ជាក់តម្លៃឱ្យខ្ញុំផង។ អរគុណ!`;
  } else {
    text = `🖥️ Custom PC Build Request — NV Technology 🇰🇭\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      partsList.join('\n') + `\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💵 Estimated Total: $${totalUsd.toLocaleString()}\n` +
      `⚡ Power Draw: ${estimatedWatts}W\n\n` +
      `Hello NV Technology! I configured this PC build on your website. Please confirm part availability and quotation. Thank you!`;
  }

  return `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(text)}`;
}

export function createServiceTelegramLink(serviceTitle: string, lang: 'kh' | 'en' = 'kh'): string {
  const text = lang === 'kh'
    ? `សួស្តី NV Technology! 🏢\nខ្ញុំត្រូវការពិគ្រោះយោបល់ និងស្នើសុំសេវាកម្ម៖ *${serviceTitle}*\nសូមជួយទាក់ទងមកខ្ញុំដើម្បីរៀបចំការចុះពិនិត្យទីតាំង (Site Survey) និងផ្តល់តម្លៃ។`
    : `Hello NV Technology! 🏢\nI would like to inquire about your IT Solution service: *${serviceTitle}*\nPlease contact me to discuss a site survey and technical proposal.`;

  return `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(text)}`;
}
