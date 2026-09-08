import { useState, useEffect } from "react"

export default function ShareModal({ isOpen, onClose, title = "", url = "", excerpt = "" }) {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(url)
  const [settings, setSettings] = useState({ site_title: 'Dua Narasi' })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(data.settings)
        }
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(url || window.location.href)
    }
  }, [url, isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const siteName = settings.site_title || 'Dua Narasi'
  let displayTitle = title
  if (!displayTitle || displayTitle.includes('Hoom')) {
    displayTitle = `Artikel ${siteName}`
  }

  const displayExcerpt = excerpt || "Baca artikel liputan berita selengkapnya di portal berita kami."
  const encodedUrl = encodeURIComponent(currentUrl || "")
  const encodedTitle = encodeURIComponent(displayTitle)
  const encodedFullMessage = encodeURIComponent(`*${displayTitle}*\n\n${displayExcerpt}\n\n${currentUrl}`)

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = currentUrl
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: displayTitle,
          text: displayExcerpt,
          url: currentUrl
        })
        onClose()
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Native share error:", err)
        }
      }
    } else {
      handleCopy()
    }
  }

  const shareOptions = [
    {
      name: "WhatsApp",
      color: "#25D366",
      bg: "#E8F8EE",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodedFullMessage}`
    },
    {
      name: "Telegram",
      color: "#24A1DE",
      bg: "#E8F5FD",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#24A1DE">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
    },
    {
      name: "Twitter / X",
      color: "#000000",
      bg: "#F1F5F9",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#000000">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
    },
    {
      name: "Facebook",
      color: "#1877F2",
      bg: "#E8F2FE",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: "LinkedIn",
      color: "#0A66C2",
      bg: "#E6F0FA",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    {
      name: "Gmail",
      color: "#EA4335",
      bg: "#FDF0EE",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#EA4335">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
        </svg>
      ),
      url: `mailto:?subject=${encodedTitle}&body=${encodedFullMessage}`
    }
  ]

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="share-modal-header">
          <div className="d-flex align-items-center" style={{ gap: '10px' }}>
            <div className="share-header-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </div>
            <h5 className="share-modal-title mb-0">Bagikan Artikel</h5>
          </div>
          <button className="share-close-btn" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Article Link & Preview Card */}
        <div className="p-3 border rounded-3 bg-light mb-3">
          <div className="d-flex align-items-start gap-3">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: '#da0105',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              flexShrink: 0
            }}>
              <i className="fa fa-newspaper-o" />
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <div className="fw-bold mb-1 text-dark text-truncate" style={{ fontSize: '14px' }} title={displayTitle}>
                {displayTitle}
              </div>
              <div className="text-muted small mb-2" style={{ fontSize: '12px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {displayExcerpt}
              </div>
              <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                <span className="font-monospace text-muted text-truncate me-2" style={{ fontSize: '11px' }} title={currentUrl}>
                  {currentUrl}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`btn btn-sm ${copied ? "btn-success" : "btn-outline-dark"}`}
                  style={{ fontSize: '12px', padding: '3px 10px', whiteSpace: 'nowrap' }}
                >
                  <i className={`fa ${copied ? 'fa-check' : 'fa-copy'} me-1`} />
                  {copied ? 'Tersalin' : 'Salin Link'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Native Sharing Button if supported */}
        {typeof navigator !== "undefined" && navigator.share && (
          <button className="share-nearby-btn" onClick={handleNativeShare}>
            <div className="share-nearby-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <span>Share with other apps / Nearby devices</span>
          </button>
        )}

        {/* Social Share Grid Header */}
        <div className="share-section-label">
          Share using
        </div>

        {/* Social Share Channels Grid */}
        <div className="share-channels-grid">
          {shareOptions.map((opt) => (
            <a
              key={opt.name}
              href={opt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="share-channel-item"
            >
              <div
                className="share-channel-icon-box"
                style={{ backgroundColor: opt.bg }}
              >
                {opt.icon}
              </div>
              <span className="share-channel-name">{opt.name}</span>
            </a>
          ))}

          {/* Quick Copy Action in Grid */}
          <button
            onClick={handleCopy}
            className="share-channel-item btn-reset"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div
              className="share-channel-icon-box"
              style={{ backgroundColor: copied ? '#DCFCE7' : '#F1F5F9' }}
            >
              {copied ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </div>
            <span className="share-channel-name" style={{ color: copied ? '#16a34a' : 'inherit' }}>
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .share-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 16px;
          animation: modalFadeIn 0.2s ease-out;
        }

        .share-modal-dialog {
          background: #ffffff;
          width: 100%;
          max-width: 480px;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(226, 232, 240, 0.8);
          padding: 24px;
          position: relative;
          animation: modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          color: #1e293b;
        }

        .share-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .share-header-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
        }

        .share-modal-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .share-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s ease;
        }

        .share-close-btn:hover {
          background: #fee2e2;
          color: #dc2626;
          border-color: #fecaca;
        }

        .share-link-preview-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .share-link-icon-wrapper {
          width: 40px;
          height: 40px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .share-link-text-content {
          flex: 1;
          min-width: 0;
        }

        .share-article-title {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
          margin-bottom: 3px;
        }

        .share-article-url {
          font-size: 12px;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .share-actions-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .share-action-btn {
          width: 36px;
          height: 36px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .share-action-btn:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          color: #0f172a;
        }

        .share-action-btn.copied {
          background: #f0fdf4;
          border-color: #86efac;
        }

        .share-nearby-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          margin-bottom: 20px;
          transition: all 0.2s ease;
        }

        .share-nearby-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .share-nearby-icon {
          width: 28px;
          height: 28px;
          background: #ffffff;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
        }

        .share-section-label {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 14px;
          text-transform: none;
        }

        .share-channels-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px 12px;
        }

        @media (max-width: 420px) {
          .share-channels-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px 8px;
          }
        }

        .share-channel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          gap: 8px;
          padding: 8px 4px;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .share-channel-item:hover {
          background: #f8fafc;
          transform: translateY(-2px);
        }

        .share-channel-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .share-channel-item:hover .share-channel-icon-box {
          transform: scale(1.06);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .share-channel-name {
          font-size: 12px;
          font-weight: 500;
          color: #334155;
          text-align: center;
          line-height: 1.2;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
