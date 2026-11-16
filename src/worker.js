export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // First try fetching the exact asset
    let response = await env.ASSETS.fetch(request);
    
    // If 404 and clean URL (e.g. /products), try loading /products.html
    if (response.status === 404 && !url.pathname.includes('.')) {
      const cleanPath = url.pathname.replace(/\/$/, '');
      const htmlUrl = new URL(`${cleanPath}.html`, request.url);
      const htmlResponse = await env.ASSETS.fetch(new Request(htmlUrl, request));
      if (htmlResponse.status !== 404) {
        return htmlResponse;
      }
    }
    
    return response;
  },
};
