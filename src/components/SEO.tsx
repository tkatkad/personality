import React, { useEffect } from 'react';
import { useTestStore } from '../stores/testStore';

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogType?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_DOMAIN = 'https://personality-test.job.web.id';
const DEFAULT_IMAGE = `${DEFAULT_DOMAIN}/og-image.png`;

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path = '',
  ogType = 'website',
  image = DEFAULT_IMAGE,
  jsonLd,
}) => {
  const { language } = useTestStore();
  const currentUrl = `${DEFAULT_DOMAIN}${path}`;

  useEffect(() => {
    // 1. Update Document Title & Html Lang
    document.title = title;
    document.documentElement.setAttribute('lang', language);

    // 2. Helper to set/update meta tags
    const setMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set/update link canonical
    const setCanonicalLink = (url: string) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', url);
    };

    // Helper to set Googlebot hreflang alternate links
    const setHreflangLinks = (basePath: string) => {
      const languages: Array<{ code: string; hreflang: string }> = [
        { code: 'id', hreflang: 'id-ID' },
        { code: 'en', hreflang: 'en-US' },
        { code: 'es', hreflang: 'es-ES' },
      ];

      // Clean existing alternate hreflang elements
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

      languages.forEach(({ code, hreflang }) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        link.setAttribute('href', `${DEFAULT_DOMAIN}${basePath}?lang=${code}`);
        document.head.appendChild(link);

        // Also add short ISO code hreflang
        const shortLink = document.createElement('link');
        shortLink.setAttribute('rel', 'alternate');
        shortLink.setAttribute('hreflang', code);
        shortLink.setAttribute('href', `${DEFAULT_DOMAIN}${basePath}?lang=${code}`);
        document.head.appendChild(shortLink);
      });

      // x-default hreflang for international fallback
      const defaultLink = document.createElement('link');
      defaultLink.setAttribute('rel', 'alternate');
      defaultLink.setAttribute('hreflang', 'x-default');
      defaultLink.setAttribute('href', `${DEFAULT_DOMAIN}${basePath}`);
      document.head.appendChild(defaultLink);
    };

    // Basic Meta Tags & Hreflang
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setCanonicalLink(currentUrl);
    setHreflangLinks(path);

    // OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', image);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'IPIP-NEO-120 Personality Test');

    // Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', image);

    // 3. Inject / Update JSON-LD Script Tag
    let jsonLdScript = document.getElementById('json-ld-structured-data') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'json-ld-structured-data';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }

    if (jsonLd) {
      jsonLdScript.textContent = JSON.stringify(jsonLd, null, 2);
    } else {
      jsonLdScript.textContent = '';
    }
  }, [title, description, path, ogType, image, jsonLd, currentUrl, language]);

  return null;
};
