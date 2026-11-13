
import Link from 'next/link'
import { getImageUrl } from '@/lib/imageUtils'

export default function Cta1({ settings = {} }) {
    if (settings.show_cta_banner === 'false') {
        return null
    }

    const mode = settings.cta_banner_mode || 'custom_text'
    const badge = settings.cta_banner_badge !== undefined && settings.cta_banner_badge !== null 
        ? settings.cta_banner_badge 
        : '72% Off'
    const title = settings.cta_banner_title || 'Home Appliances'
    const subtitle = settings.cta_banner_subtitle || 'FOR PERFECT HOME.'
    const btnText = settings.cta_banner_btn_text || 'Shop Now'
    const btnUrl = settings.cta_banner_btn_url || '/contact'
    const openNewTab = settings.cta_banner_open_new_tab === 'true'
    const bgImage = getImageUrl(settings.cta_banner_bg, '/assets/img/bg-img/cta-bg.jpg')

    // Mode: Gambar Banner Penuh (Direct Image Link)
    if (mode === 'image_only') {
        return (
            <section className="cta-section">
                <div className="container">
                    <div className="cta-wrap" style={{ borderRadius: '13px', overflow: 'hidden' }}>
                        {btnUrl ? (
                            <Link href={btnUrl} target={openNewTab ? '_blank' : '_self'} rel={openNewTab ? 'noopener noreferrer' : undefined}>
                                <img
                                    src={bgImage}
                                    alt={title || "Banner Iklan"}
                                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '13px' }}
                                />
                            </Link>
                        ) : (
                            <img
                                src={bgImage}
                                alt={title || "Banner Iklan"}
                                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '13px' }}
                            />
                        )}
                    </div>
                </div>
            </section>
        )
    }

    // Mode: Custom Text Overlay (Default Posty Style)
    return (
        <>
            <section className="cta-section">
                <div className="container">
                    <div className="cta-wrap">
                        <div
                            className="cta-bg"
                            style={{
                                backgroundImage: `url(${bgImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center'
                            }}
                        />
                        <div className="cta-content-wrap">
                            <div className="cta-content">
                                {badge && <h4 className="discount">{badge}</h4>}
                                {title && <h2 className="cta-title">{title}</h2>}
                                {subtitle && <span>{subtitle}</span>}
                            </div>
                            {btnText && (
                                <Link
                                    href={btnUrl}
                                    className="default-btn"
                                    target={openNewTab ? '_blank' : '_self'}
                                    rel={openNewTab ? 'noopener noreferrer' : undefined}
                                >
                                    {btnText}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
