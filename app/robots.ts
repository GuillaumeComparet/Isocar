import { MetadataRoute } from "next";

export default function robots (): MetadataRoute.Robots {
  return {
    rules: 
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/account', '/account/*', '/send-reset-password'],
      },
      sitemap: `${process.env.BASE_URL}/sitemap.xml`
  };
}