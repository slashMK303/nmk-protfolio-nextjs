// Shared image preloader with promise cache to avoid duplicate loads
const cache = new Map();

export function preloadImage(url) {
    if (!url) return Promise.resolve();
    if (cache.has(url)) return cache.get(url);

    const p = new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => resolve();
        img.src = url;
    });

    cache.set(url, p);
    return p;
}

export function preloadImages(urls = []) {
    return Promise.all(urls.map(preloadImage));
}
