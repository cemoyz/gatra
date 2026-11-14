import Link from 'next/link'
import { getImageUrl } from '@/lib/imageUtils'

export default function Cta2({ settings = {} }) {
    if (settings.show_cta_banner_2 === 'false') {
        return null
    }

    const mode = settings.cta_2_mode || 'custom_text'
    const title = settings.cta_2_title || 'Dua Narasi - Portal Berita & Informasi Terpercaya'
    const btnText = settings.cta_2_btn_text || 'Hubungi Kami'
    const btnUrl = settings.cta_2_btn_url || '/contact'
    const openNewTab = settings.cta_2_open_new_tab === 'true'
    
    // Background Banner Image
    const bgImage = getImageUrl(settings.cta_2_bg, '/assets/img/bg-img/cta-bg-2.jpg')
    // Left Brand Logo / Image
    const logoImg = getImageUrl(settings.cta_2_logo || settings.logo_light, '/assets/img/logo/logo-light-2.png')

    // Mode: Banner Gambar Penuh (Full Image Banner)
    if (mode === 'image_only') {
        return (
            <section className="cta-section cta-2">
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

    // Mode: Custom Text, Logo, and Button
    return (
        <>
            <section className="cta-section cta-2">
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
                            <Link href="/">
                                <img 
                                    src={logoImg} 
                                    alt={settings.site_name || 'Logo'} 
                                    style={{ maxHeight: '42px', width: 'auto', objectFit: 'contain' }} 
                                    onError={(e) => { e.currentTarget.src = '/assets/img/logo/logo-light-2.png' }}
                                />
                            </Link>
                            <h3 className="title">{title}</h3>
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
