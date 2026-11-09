
import Link from 'next/link'

export default function Cta2() {
    return (
        <>
            <section className="cta-section cta-2">
                <div className="container">
                    <div className="cta-wrap">
                        <div className="cta-bg" />
                        <div className="cta-content-wrap">
                            <Link href="/#"><img src="/assets/img/logo/logo-light-2.png" alt="logo" /></Link>
                            <h3 className="title">News &amp; Magazine Blog WordPress Theme</h3>
                            <Link href="/contact" className="default-btn">Buy Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
