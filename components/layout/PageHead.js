import Head from 'next/head';
import { useState, useEffect } from 'react';

const PageHead = ({ headTitle, settings: propSettings }) => {
  const [settings, setSettings] = useState(propSettings || {});

  useEffect(() => {
    if (!propSettings || Object.keys(propSettings).length === 0) {
      fetch('/api/settings')
        .then((res) => res.json())
        .then((data) => {
          if (data?.settings) {
            setSettings(data.settings);
          }
        })
        .catch(() => {});
    } else {
      setSettings(propSettings);
    }
  }, [propSettings]);

  const siteTitle = settings.site_title || "Dua Narasi - Portal Berita Terkini";
  const title = headTitle ? (headTitle.includes(siteTitle) ? headTitle : `${headTitle} | ${siteTitle}`) : siteTitle;
  const description = settings.site_description || "Portal berita independen terkini, tajam, faktual, dan terpercaya menyajikan informasi politik, ekonomi, hukum, dan peristiwa terhangat.";
  const keywords = settings.site_keywords || "berita terkini, berita hari ini, berita indonesia, portal berita, kilas peristiwa, dua narasi";
  const verification = settings.google_site_verification || "";
  const gaId = settings.google_analytics_id || "";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Favicon for Google Indexing & Browsers */}
      <link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png" />
      <link rel="icon" href="/favicon-512.png" sizes="512x512" type="image/png" />
      <link rel="apple-touch-icon" href="/favicon-192.png" sizes="192x192" />
      <link rel="shortcut icon" href="/favicon-192.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Google Search Console Verification */}
      {verification && (
        <meta 
          name="google-site-verification" 
          content={verification.replace(/^google-site-verification=/, '')} 
        />
      )}

      {/* Google Analytics 4 (GA4) / GTM */}
      {gaId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `
            }}
          />
        </>
      )}
    </Head>
  );
};

export default PageHead;
