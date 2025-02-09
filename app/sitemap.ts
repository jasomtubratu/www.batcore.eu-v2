import { MetadataRoute } from 'next';

const appStartTime = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    const staticPages = [
        { url: `${baseUrl}/`, lastModified: appStartTime, changefreq: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/minecraft`, lastModified: appStartTime, changefreq: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/vps`, lastModified: appStartTime, changefreq: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/credits`, lastModified: appStartTime, changefreq: 'weekly', priority: 0.5 },
    ];

    return [...staticPages];
}