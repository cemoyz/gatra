import Link from "next/link"
import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"

export default function BreakingNewsTicker({ settings = {}, container = false, className = "" }) {
    const [posts, setPosts] = useState([])
    const [tickerConfig, setTickerConfig] = useState({
        enabled: settings.breaking_ticker_enabled !== 'false',
        title: settings.breaking_ticker_title || 'BREAKING NEWS',
        customText: settings.breaking_ticker_custom_text || ''
    })
    const [dismissed, setDismissed] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (settings.breaking_ticker_enabled === 'false') {
            return
        }

        fetch('/api/breaking-news?limit=8')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    if (Array.isArray(data.posts)) setPosts(data.posts)
                    if (data.tickerSettings) {
                        setTickerConfig(prev => ({
                            ...prev,
                            ...data.tickerSettings,
                            // Override with passed prop if present
                            enabled: settings.breaking_ticker_enabled !== undefined 
                                ? settings.breaking_ticker_enabled !== 'false' 
                                : data.tickerSettings.enabled
                        }))
                    }
                }
            })
            .catch(console.error)
    }, [settings])

    if (!mounted || dismissed || !tickerConfig.enabled) {
        return null
    }

    if (posts.length === 0 && !tickerConfig.customText) {
        return null
    }

    const tickerMarkup = (
        <div className="ta-breaking-ticker-wrapper">
            <style jsx>{`
                .ta-breaking-ticker-wrapper {
                    background: linear-gradient(135deg, #b90003 0%, #da0105 45%, #ef1c1c 80%, #c10004 100%);
                    color: #ffffff !important;
                    border: 1px solid rgba(255, 255, 255, 0.28);
                    border-radius: 12px;
                    box-shadow: 0 10px 25px -4px rgba(218, 1, 5, 0.42), 0 4px 12px -2px rgba(218, 1, 5, 0.25);
                    position: relative;
                    z-index: 20;
                    font-size: 15px;
                    overflow: hidden;
                }
                .ta-breaking-ticker-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
                    pointer-events: none;
                }
                .ticker-inner {
                    display: flex;
                    align-items: center;
                    min-height: 54px;
                    padding: 6px 18px;
                    position: relative;
                    gap: 14px;
                }
                .ticker-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #ffffff !important;
                    color: #da0105 !important;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-weight: 900;
                    font-size: 13px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    flex-shrink: 0;
                    text-decoration: none !important;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
                    transition: all 0.2s ease;
                    z-index: 2;
                }
                .ticker-badge:hover {
                    background: #f8fafc !important;
                    color: #b90003 !important;
                    transform: scale(1.03);
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
                }
                .pulse-icon {
                    width: 10px;
                    height: 10px;
                    background: #da0105 !important;
                    border-radius: 50%;
                    display: inline-block;
                    box-shadow: 0 0 0 0 rgba(218, 1, 5, 0.7);
                    animation: redTickerPulse 1.5s infinite;
                }
                @keyframes redTickerPulse {
                    0% {
                        transform: scale(0.9);
                        box-shadow: 0 0 0 0 rgba(218, 1, 5, 0.7);
                    }
                    70% {
                        transform: scale(1.2);
                        box-shadow: 0 0 0 8px rgba(218, 1, 5, 0);
                    }
                    100% {
                        transform: scale(0.9);
                        box-shadow: 0 0 0 0 rgba(218, 1, 5, 0);
                    }
                }
                .ticker-content {
                    flex: 1;
                    overflow: hidden;
                    margin: 0 8px;
                    display: flex;
                    align-items: center;
                    min-height: 40px;
                }
                :global(.ta-breaking-ticker-wrapper .rfm-marquee-container) {
                    display: flex !important;
                    align-items: center !important;
                }
                :global(.ta-breaking-ticker-wrapper .rfm-marquee) {
                    display: flex !important;
                    align-items: center !important;
                }
                :global(.ta-breaking-ticker-wrapper a.ticker-item),
                :global(.ta-breaking-ticker-wrapper .ticker-item) {
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 12px !important;
                    margin-right: 38px !important;
                    color: #ffffff !important;
                    text-decoration: none !important;
                    white-space: nowrap !important;
                }
                :global(.ta-breaking-ticker-wrapper .ticker-title) {
                    color: #ffffff !important;
                    font-size: 15.5px !important;
                    font-weight: 700 !important;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) !important;
                    transition: color 0.2s ease !important;
                }
                :global(.ta-breaking-ticker-wrapper a.ticker-item:hover .ticker-title) {
                    color: #fef08a !important;
                    text-decoration: underline !important;
                    text-underline-offset: 3px !important;
                }
                :global(.ta-breaking-ticker-wrapper .cat-pill) {
                    font-size: 11px !important;
                    font-weight: 800 !important;
                    background: rgba(0, 0, 0, 0.35) !important;
                    border: 1px solid rgba(255, 255, 255, 0.4) !important;
                    padding: 3px 8px !important;
                    border-radius: 5px !important;
                    color: #ffffff !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.5px !important;
                }
                :global(.ta-breaking-ticker-wrapper .separator) {
                    color: #fef08a !important;
                    margin-left: 18px !important;
                    font-size: 15px !important;
                    display: inline-block !important;
                }
                .ticker-actions {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    flex-shrink: 0;
                    z-index: 2;
                }
                .ticker-all-link {
                    background: rgba(255, 255, 255, 0.2) !important;
                    border: 1px solid rgba(255, 255, 255, 0.45) !important;
                    color: #ffffff !important;
                    font-size: 13px !important;
                    font-weight: 800 !important;
                    padding: 7px 16px !important;
                    border-radius: 8px !important;
                    text-decoration: none !important;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                    backdrop-filter: blur(4px);
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
                }
                .ticker-all-link:hover {
                    background: #ffffff !important;
                    color: #da0105 !important;
                    border-color: #ffffff !important;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                }
                .ticker-close-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.25) !important;
                    border: 1px solid rgba(255, 255, 255, 0.35) !important;
                    color: #ffffff !important;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    font-size: 14px;
                    transition: all 0.2s ease;
                }
                .ticker-close-btn:hover {
                    background: rgba(0, 0, 0, 0.55) !important;
                    color: #ffffff !important;
                    transform: rotate(90deg);
                }
                @media (max-width: 991px) {
                    .ticker-inner {
                        min-height: 50px;
                        padding: 6px 14px;
                    }
                    :global(.ta-breaking-ticker-wrapper .ticker-title) {
                        font-size: 14px !important;
                    }
                }
                @media (max-width: 768px) {
                    .ticker-inner {
                        padding: 6px 10px;
                        min-height: 46px;
                        gap: 8px;
                    }
                    .ticker-badge {
                        padding: 6px 12px;
                        font-size: 11px;
                        border-radius: 6px;
                    }
                    .ticker-content {
                        margin: 0 4px;
                    }
                    :global(.ta-breaking-ticker-wrapper .ticker-title) {
                        font-size: 13.5px !important;
                    }
                    .ticker-all-link {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="ticker-inner">
                <Link 
                    href="/breaking-news" 
                    className="ticker-badge" 
                    title="Buka Halaman Breaking News"
                    style={{
                        backgroundColor: '#ffffff',
                        color: '#da0105',
                        textDecoration: 'none'
                    }}
                >
                    <span 
                        className="pulse-icon" 
                        style={{ backgroundColor: '#da0105' }}
                    />
                    <span style={{ color: '#da0105', fontWeight: 900 }}>
                        {tickerConfig.title || 'BREAKING NEWS'}
                    </span>
                </Link>

                <div className="ticker-content">
                    {tickerConfig.customText ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 'bold' }}>
                            <i className="fa fa-bullhorn" style={{ color: '#fef08a', fontSize: '16px' }} />
                            <span style={{ color: '#ffffff', fontSize: '15.5px', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                                {tickerConfig.customText}
                            </span>
                        </div>
                    ) : (
                        <Marquee speed={50} pauseOnHover={true} gradient={false} autoFill={true}>
                            {posts.map((post) => (
                                <Link 
                                    key={post.id} 
                                    href={`/blog/${post.id || post.slug}`}
                                    className="ticker-item"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginRight: '38px',
                                        color: '#ffffff',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <span 
                                        className="cat-pill"
                                        style={{
                                            fontSize: '11px',
                                            fontWeight: 800,
                                            backgroundColor: 'rgba(0, 0, 0, 0.35)',
                                            border: '1px solid rgba(255, 255, 255, 0.4)',
                                            padding: '3px 8px',
                                            borderRadius: '5px',
                                            color: '#ffffff',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        {post.category}
                                    </span>
                                    <span 
                                        className="ticker-title"
                                        style={{
                                            color: '#ffffff',
                                            fontSize: '15.5px',
                                            fontWeight: 700,
                                            textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
                                        }}
                                    >
                                        {post.title}
                                    </span>
                                    <span 
                                        className="separator"
                                        style={{
                                            color: '#fef08a',
                                            marginLeft: '18px',
                                            fontSize: '15px'
                                        }}
                                    >
                                        ⚡
                                    </span>
                                </Link>
                            ))}
                        </Marquee>
                    )}
                </div>

                <div className="ticker-actions">
                    <Link 
                        href="/breaking-news" 
                        className="ticker-all-link"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.45)',
                            color: '#ffffff',
                            textDecoration: 'none'
                        }}
                    >
                        Lihat Semua <i className="fa fa-angle-right" />
                    </Link>
                    <button 
                        className="ticker-close-btn" 
                        onClick={() => setDismissed(true)} 
                        title="Tutup Ticker Sementara"
                        aria-label="Tutup Ticker"
                        style={{
                            color: '#ffffff',
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            border: '1px solid rgba(255, 255, 255, 0.35)'
                        }}
                    >
                        <i className="fa fa-times" />
                    </button>
                </div>
            </div>
        </div>
    )

    if (container) {
        return (
            <div className={`ta-breaking-ticker-outer pt-35 pb-0 ${className}`}>
                <div className="container">
                    {tickerMarkup}
                </div>
            </div>
        )
    }

    return tickerMarkup
}

