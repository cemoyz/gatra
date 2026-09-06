import Head from 'next/head';
import { useState, useEffect } from 'react';

const PageHead = ({ headTitle }) => {
  const [siteTitle, setSiteTitle] = useState('');

  useEffect(() => {
    // Fetch site title from settings API
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings?.site_title) {
          setSiteTitle(data.settings.site_title);
        }
      })
      .catch(() => {});
  }, []);

  const title = headTitle || siteTitle || "Hoom - News & Magazine Nextjs Template";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
};

export default PageHead;