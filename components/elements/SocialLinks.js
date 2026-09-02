import { useEffect, useState } from 'react'
import TikTokIcon from './TikTokIcon'

function WhatsAppIcon({ width = '15px', height = '15px', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      width={width}
      height={height}
      style={{ display: 'block', fill: 'currentColor', ...style }}
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  )
}

function TelegramIcon({ width = '15px', height = '15px', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      fill="currentColor"
      width={width}
      height={height}
      style={{ display: 'block', fill: 'currentColor', ...style }}
    >
      <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.4z" />
    </svg>
  )
}

function FacebookIcon({ width = '15px', height = '15px', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      fill="currentColor"
      width={width}
      height={height}
      style={{ display: 'block', fill: 'currentColor', ...style }}
    >
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  )
}

function TwitterIcon({ width = '15px', height = '15px', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      width={width}
      height={height}
      style={{ display: 'block', fill: 'currentColor', ...style }}
    >
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  )
}

function InstagramIcon({ width = '15px', height = '15px', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      width={width}
      height={height}
      style={{ display: 'block', fill: 'currentColor', ...style }}
    >
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  )
}

function YouTubeIcon({ width = '15px', height = '15px', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      fill="currentColor"
      width={width}
      height={height}
      style={{ display: 'block', fill: 'currentColor', ...style }}
    >
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.583V175.185l142.739 81.205-142.739 81.276z" />
    </svg>
  )
}

function LinkedInIcon({ width = '15px', height = '15px', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      width={width}
      height={height}
      style={{ display: 'block', fill: 'currentColor', ...style }}
    >
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  )
}

function PinterestIcon({ width = '15px', height = '15px', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      fill="currentColor"
      width={width}
      height={height}
      style={{ display: 'block', fill: 'currentColor', ...style }}
    >
      <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-66.9-56.7-124.3-138.8-124.3-104 0-158.4 74.9-158.4 148.8 0 35.8 19.3 80.3 50.1 94.4 4.7 2.2 7.2 1.2 8.3-3.2 0.8-3.1 5.3-21.7 6.9-28.4 1-4.2-0.2-5.7-3.4-9.6-9.9-12-16.3-27.7-16.3-49.8 0-64.2 48-121.7 125.2-121.7 68.3 0 105.8 41.7 105.8 97.5 0 73.3-37.4 124.4-86.4 124.4-27 0-47.2-22.3-40.7-49.7 7.7-32.8 22.8-68.1 22.8-91.8 0-21.2-11.4-38.8-34.9-38.8-27.6 0-49.8 28.5-49.8 66.8 0 24.3 8.2 40.7 8.2 40.7s-28.2 119.5-33.1 140.2c-5.8 24.4-0.9 61.9-0.2 65.4C59.9 443.4 0 356.7 0 256 0 114.6 114.6 0 256 0s256 114.6 256 256z" />
    </svg>
  )
}

export default function SocialLinks({ className = '', showLabels = false, style = {} }) {
  const [settings, setSettings] = useState({
    show_social_links: 'true',
    enable_whatsapp: 'true',
    enable_telegram: 'true',
    enable_facebook: 'true',
    enable_twitter: 'true',
    enable_instagram: 'true',
    enable_youtube: 'true',
    enable_linkedin: 'true',
    enable_pinterest: 'true',
    enable_tiktok: 'true',
    social_whatsapp: 'https://wa.me/',
    social_telegram: 'https://t.me/',
    social_facebook: 'https://facebook.com',
    social_twitter: 'https://twitter.com',
    social_instagram: 'https://instagram.com',
    social_youtube: 'https://youtube.com',
    social_linkedin: 'https://linkedin.com',
    social_pinterest: 'https://pinterest.com',
    social_tiktok: 'https://tiktok.com'
  })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(prev => ({
            ...prev,
            ...data.settings
          }))
        }
      })
      .catch(console.error)
  }, [])

  // Master ON/OFF Switch
  if (settings.show_social_links === 'false') {
    return null
  }

  const socialItems = [
    { key: 'whatsapp', enabled: settings.enable_whatsapp !== 'false', label: 'WhatsApp', customIcon: <WhatsAppIcon width="15px" height="15px" />, url: settings.social_whatsapp },
    { key: 'telegram', enabled: settings.enable_telegram !== 'false', label: 'Telegram', customIcon: <TelegramIcon width="15px" height="15px" />, url: settings.social_telegram },
    { key: 'facebook', enabled: settings.enable_facebook !== 'false', label: 'Facebook', customIcon: <FacebookIcon width="14px" height="14px" />, url: settings.social_facebook },
    { key: 'twitter', enabled: settings.enable_twitter !== 'false', label: 'Twitter', customIcon: <TwitterIcon width="14px" height="14px" />, url: settings.social_twitter },
    { key: 'instagram', enabled: settings.enable_instagram !== 'false', label: 'Instagram', customIcon: <InstagramIcon width="14px" height="14px" />, url: settings.social_instagram },
    { key: 'youtube', enabled: settings.enable_youtube !== 'false', label: 'YouTube', customIcon: <YouTubeIcon width="15px" height="15px" />, url: settings.social_youtube },
    { key: 'linkedin', enabled: settings.enable_linkedin !== 'false', label: 'LinkedIn', customIcon: <LinkedInIcon width="14px" height="14px" />, url: settings.social_linkedin },
    { key: 'pinterest', enabled: settings.enable_pinterest !== 'false', label: 'Pinterest', customIcon: <PinterestIcon width="14px" height="14px" />, url: settings.social_pinterest },
    { key: 'tiktok', enabled: settings.enable_tiktok !== 'false', label: 'TikTok', customIcon: <TikTokIcon width="14px" height="14px" />, url: settings.social_tiktok },
  ].filter(item => item.enabled && item.url && item.url.trim() !== '' && item.url !== '#')

  if (socialItems.length === 0) {
    return null
  }

  return (
    <div className={`ta-social-links ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', ...style }}>
      {socialItems.map((item) => (
        <a
          key={item.key}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title={item.label}
          className={`social-circle-btn ${item.key}`}
        >
          {item.customIcon ? (
            item.customIcon
          ) : (
            <i className={item.icon} />
          )}
          {showLabels && <span style={{ marginLeft: '6px' }}>{item.label}</span>}
        </a>
      ))}

      <style jsx>{`
        .social-circle-btn {
          width: 36px !important;
          height: 36px !important;
          min-width: 36px !important;
          max-width: 36px !important;
          min-height: 36px !important;
          max-height: 36px !important;
          border-radius: 50% !important;
          aspect-ratio: 1 / 1 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
          background: transparent;
          border: 1.5px solid currentColor;
          color: inherit;
          padding: 0 !important;
          margin: 0 !important;
          text-decoration: none !important;
          cursor: pointer !important;
          position: relative !important;
          z-index: 10 !important;
          pointer-events: auto !important;
          transition: all 0.2s ease-in-out !important;
        }

        .social-circle-btn:hover {
          background: #da0105 !important;
          color: #ffffff !important;
          border-color: #da0105 !important;
          transform: translateY(-2px);
        }

        .social-circle-btn svg {
          fill: currentColor !important;
          color: currentColor !important;
          display: block !important;
          margin: auto !important;
          pointer-events: none !important;
        }

        .social-circle-btn svg path {
          pointer-events: none !important;
        }

        .social-circle-btn i {
          color: currentColor !important;
          font-size: 14px !important;
          line-height: 1 !important;
          margin: auto !important;
          pointer-events: none !important;
        }
      `}</style>
    </div>
  )
}
