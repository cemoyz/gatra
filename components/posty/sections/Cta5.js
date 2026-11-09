
import Link from 'next/link'

export default function Cta5() {
    return (
        <>
            <section className="cta-section cta-3 padding pb-0">
                <div className="container">
                    <div className="cta-wrap">
                        <Link href="/#"><img src="/assets/img/bg-img/cta-bg-3.jpg" alt="cta" /></Link>
                        <div className="cta-content-wrap">
                            <div className="cta-content">
                                <h4 className="discount">72% Off</h4>
                                <h2 className="cta-title">Home Appliances</h2>
                                <span>FOR PERFECT HOME.</span>
                            </div>
                            <Link href="/#" className="default-btn">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
