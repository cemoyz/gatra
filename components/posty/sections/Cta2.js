import Link from 'next/link'
import { getImageUrl } from '@/lib/imageUtils'

export default function Cta2({ settings = {} }) {
    if (settings.show_cta_banner_2 === 'false') {
        return null
    }

    const title = settings.cta_2_title || 'Dua Narasi - Portal Berita & Informasi Terpercaya'
    const btnText = settings.cta_2_btn_text || 'Hubungi Kami'
    const btnUrl = settings.cta_2_btn_url || '/contact'
    const logoImg = getImageUrl(settings.logo_light, '/assets/img/logo/logo-light-2.png')

    return (
        <>
            <section className="cta-section cta-2">
                <div className="container">
                    <div className="cta-wrap">
                        <div className="cta-bg" />
                        <div className="cta-content-wrap">
                            <Link href="/">
                                <img src={logoImg} alt={settings.site_name || 'Dua Narasi'} style={{ maxHeight: '42px', width: 'auto' }} />
                            </Link>
                            <h3 className="title">{title}</h3>
                            <Link href={btnUrl} className="default-btn">{btnText}</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
