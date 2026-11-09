
import Link from 'next/link'

export default function Cta1() {
    return (
        <>
            <section className="cta-section">
                <div className="container">
                    <div className="cta-wrap">
                        <div className="cta-bg" />
                        <div className="cta-content-wrap">
                            <div className="cta-content">
                                <h4 className="discount">72% Off</h4>
                                <h2 className="cta-title">Home Appliances</h2>
                                <span>FOR PERFECT HOME.</span>
                            </div>
                            <Link href="/blog-layout-1" className="default-btn">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
