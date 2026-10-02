import { useEffect } from 'react';

/** Sets the document title + meta description per page (client-side SEO for route changes). */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const set = (selector: string, attr: string, value: string) => {
      document.querySelector(selector)?.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
  }, [title, description]);
}
