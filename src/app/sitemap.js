export default function sitemap() {
    return [
        {
            url: 'https://nanangmarvin.my.id',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://nanangmarvin.my.id/works',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];
}
