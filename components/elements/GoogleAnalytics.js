import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSettings } from '@/context/SettingsContext'

export default function GoogleAnalytics() {
  const router = useRouter()
  const { settings } = useSettings()
  const measurementId = String(settings.google_analytics_id || '').trim()
  const tagManagerId = String(settings.google_tag_manager_id || '').trim()
  const isGa4Id = /^G-[A-Z0-9]+$/i.test(measurementId)
  const isGtmId = /^GTM-[A-Z0-9]+$/i.test(tagManagerId)

  useEffect(() => {
    if (!isGa4Id && !isGtmId) return

    const handleRouteChange = (url) => {
      const pageLocation = new URL(url, window.location.origin).href

      if (isGtmId) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'next_route_change',
          page_path: url,
          page_title: document.title,
          page_location: pageLocation
        })
        return
      }

      if (typeof window.gtag !== 'function') return

      window.gtag('event', 'page_view', {
        page_path: url,
        page_title: document.title,
        page_location: pageLocation
      })
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [isGa4Id, isGtmId, router.events])

  if (isGtmId) {
    return (
      <>
        <Script
          id={`google-tag-manager-${tagManagerId}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(tagManagerId)});`
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(tagManagerId)}`}
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </>
    )
  }

  if (!isGa4Id) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script
        id={`google-analytics-${measurementId}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(measurementId)}, { send_page_view: false });
            gtag('event', 'page_view', {
              page_path: window.location.pathname + window.location.search,
              page_title: document.title,
              page_location: window.location.href
            });
          `
        }}
      />
    </>
  )
}