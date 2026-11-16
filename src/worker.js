const ADMIN_USERS = [
  {
    id: 'usr-admin-01',
    username: 'admin',
    password: 'admin123',
    name: 'ចាន់ សុវណ្ណារិទ្ធ (Sovannarith Chan)',
    email: 'admin@nvtechnology.com.kh',
    role: 'super_admin',
    avatar: 'SC',
    status: 'active',
  },
  {
    id: 'usr-inv-02',
    username: 'inventory',
    password: 'manager123',
    name: 'ហេង សុខា (Sokha Heng - Stock)',
    email: 'stock@nvtechnology.com.kh',
    role: 'inventory_manager',
    avatar: 'SH',
    status: 'active',
  },
  {
    id: 'usr-sales-03',
    username: 'sales',
    password: 'sales123',
    name: 'វង្ស ដារ៉ា (Dara Vong - B2B Sales)',
    email: 'sales@nvtechnology.com.kh',
    role: 'sales_staff',
    avatar: 'DV',
    status: 'active',
  },
  {
    id: 'usr-audit-04',
    username: 'auditor',
    password: 'audit123',
    name: 'មាស បុប្ផា (Bopha Meas - Auditor)',
    email: 'audit@nvtechnology.com.kh',
    role: 'viewer',
    avatar: 'BM',
    status: 'active',
  },
];

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle OPTIONS CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: JSON_HEADERS });
    }

    // 1. API: Admin Auth
    if (url.pathname === '/api/admin/auth') {
      if (request.method === 'POST') {
        try {
          const body = await request.json();
          const { action, username, password } = body;

          if (action === 'logout') {
            return new Response(
              JSON.stringify({ success: true, message: 'Logged out successfully' }),
              { headers: JSON_HEADERS }
            );
          }

          const cleanUser = (username || '').trim().toLowerCase();
          const found = ADMIN_USERS.find(
            (u) => u.username.toLowerCase() === cleanUser && u.password === password
          );

          if (!found) {
            return new Response(
              JSON.stringify({ success: false, error: 'Invalid username or password' }),
              { status: 401, headers: JSON_HEADERS }
            );
          }

          const { password: _, ...safeUser } = found;
          return new Response(
            JSON.stringify({ success: true, user: safeUser }),
            { headers: JSON_HEADERS }
          );
        } catch (err) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid request body' }),
            { status: 400, headers: JSON_HEADERS }
          );
        }
      }
    }

    // 2. API: Products placeholder
    if (url.pathname === '/api/products') {
      return new Response(
        JSON.stringify({ status: 'success', data: [] }),
        { headers: JSON_HEADERS }
      );
    }

    // 3. API: Upload fallback
    if (url.pathname === '/api/upload') {
      return new Response(
        JSON.stringify({ success: false, error: 'Use client FileReader' }),
        { status: 200, headers: JSON_HEADERS }
      );
    }

    // 4. Static Assets via env.ASSETS
    let response = await env.ASSETS.fetch(request);

    // If 404 and clean URL (e.g. /admin, /products, /custom-pc), try loading .html
    if (response.status === 404 && !url.pathname.includes('.')) {
      const cleanPath = url.pathname.replace(/\/$/, '');
      const htmlUrl = new URL(`${cleanPath}.html`, request.url);
      const htmlResponse = await env.ASSETS.fetch(new Request(htmlUrl, request));
      if (htmlResponse.status !== 404) {
        return htmlResponse;
      }

      // Try index.html inside subfolder
      const subIndexUrl = new URL(`${cleanPath}/index.html`, request.url);
      const subIndexResponse = await env.ASSETS.fetch(new Request(subIndexUrl, request));
      if (subIndexResponse.status !== 404) {
        return subIndexResponse;
      }
    }

    return response;
  },
};
