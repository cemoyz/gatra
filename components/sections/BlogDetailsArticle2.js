import Link from "next/link"
import { useState, useEffect } from "react"
import Audio from "./PostAudio"
import PostGallery from "./PostGallery"
import PostLink from "./PostLink"
import Quotes from "./PostQuotes"
import PostStandard from "./PostStandard"
import PostStatus from "./PostStatus"
import PostVideo from "./PostVideo"
import PostStandard2 from "./PostStandard2"
import ShareModal from "@/components/elements/ShareModal"

export default function BlogDetailsArticle2({ type }) {
    const [isShareOpen, setIsShareOpen] = useState(false)
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

    const siteTitle = settings.site_title || 'Dua Narasi'
    return (
        <>
            <article className="ta-blog-box ta-stroke">
                {type === "video" && <PostVideo />}
                {type === "photo" && <PostStandard2 />}
                {type === "gallery" && <PostGallery />}
                <div className="content details-content">
                    {type === "quote" && <Quotes />}
                    {type === "audio" && <Audio />}
                    {type === "link" && <PostLink />}
                    {type === "status" && <PostStatus />}
                    <ul className="ta-blog-box__meta-info meta-infos d-flex align-items-center list-unstyled">
                        <li>
                            <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                <span className="author-thumb">
                                    <img src="/assets/img/author/author-1.webp" alt="" />
                                </span>
                                <span className="author-name">Alexis Dowson</span>
                            </Link>
                        </li>
                        <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                        <li><Link href="#0"><i className="fa fa-clock" /> 20 Min Read</Link></li>
                    </ul>
                    <h2 className="ta-blog-box__title ta-border-effect mt-10">Own handsome delicate its property mistress...</h2>
                    <div className="post-details-content mt-20">
                        <p>In partnership with Sydney startup Trace, Envato is delivering on its sustainability promise as a B-Corp
                            meeting part of its recent commitment to the To Whom It Should Concern campaign. Envato is now
                            officially carbon neutral, as part of a comprehensive new sustainability.</p>
                        <p>When we signed on to the To Whom It May Concern campaign we made a pledge to be 100% renew
                            by 2030  carbon zero by 2040,” said Envato CEO Hichame Assi. “It’s a commitment made on the back
                            of our B Corp certification, and one we believe reflects not just our values but a broader sense of how
                            businesses can contribute to fighting climate change.</p>
                        <p>We are proud that our people can make a positive impact on the world around us through their work at
                            Envato. And while there is still lots of work to do to realise carbon, we’re nonetheless pleased we’ve
                            reached this sustainability milestone and thrilled to partner with Trace to further track and refine the
                            management of our carbon footprint. An through Trace, Envato is now able to more comprehensively
                            measure the amount of carbon emissions the business generates. This includes not just its physical
                            offices in Melbourne, Guadalajara and Los Angeles, but also includes an estimate of the footprint of its
                            600 plus staff who work flexibly around the world, as well as the usage tied to its tech infrastructure
                            including our cloud computing services.</p>
                        <h4 className="ta-title ta-border-bottom mb-25 pb-15">Building the Future of Artificial Intelligence</h4>
                        <p>When we signed on to the To Whom It May Concern campaign we made a pledge to be 0% renewable
                            by 2030 and carbon zero by 2040,” said Envato CEO Hichame Assi. “It’s a commitment made on the
                            back of our B Corp certification, and one we believe reflects not just our values but a broader sense of
                            how businesses can contribute to fighting climate change.</p>
                        <div className="row mb-40">
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-20">
                                <img src="/assets/img/blog/blog-details-1.webp" alt="" />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-20">
                                <img src="/assets/img/blog/blog-details-2.webp" alt="" />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-20">
                                <img src="/assets/img/blog/blog-details-3.webp" alt="" />
                            </div>
                        </div>
                        <p>The Mount Sandy project in South Australiaan is one of those supported by Envato through Trace. Its
                            permanent protection of the regionally and culturally important pocket. Trace CEO and Co Founder of a
                            Catherine Long said Envato was a perfect example of a fast-moving tech business that already has a
                            demonstrable commitment to sustain. “But they needed a solution for measuring and managing their
                            carbon footprint that matched the speed  efficiency of the way they work.</p>
                        <div className="content d-flex flex-column ta-format-quote align-items-center text-center mb-45 ta-stroke">
                            <div className="qa-icon mx-auto mb-25">
                                <img src="/assets/img/icons/quote-icon.webp" alt="" />
                            </div>
                            <div className="excerpt">
                                <blockquote>
                                    <p>“ 20 years ago today, Steve introduced the world to
                                        Mac. It set Apple on a new course  forever changed the
                                        way people look at computers. ”</p>
                                </blockquote>
                            </div>
                            <div className="qupte-author d-flex align-items-center mx-auto mt-20">
                                <div className="qa-thumb mr-15">
                                    <img src="/assets/img/author/qa-author.webp" alt="" />
                                </div>
                                <div className="qa-content">
                                    <h6 className="name">Marlie H. Evens</h6>
                                    <span className="designation">Head Of Idea</span>
                                </div>
                            </div>
                        </div>
                        <p>We are proud that our people can make a positive impact on the world around us through their work at
                            Envato  while there is still lots of work to do to realise carbon, we’re nonetheless pleased we’ve reach
                            this sustainability milestone and thrilled to partner with Trace to further track  refine the management
                            of our carbon footprint. An through Trace, Envato is now able to more comprehensively measure the
                            amount of carbon emissions the business generates. This includes not just its physical offices in NYC,
                            Guadalajara and Los Angeles, but also includes an estimate of the footprint of its 600 plus staff who
                            work flexibly around the world, as well as the usage tied to its tech infrastructure including our cloud
                            computing services only done.</p>
                        <h4 className="ta-title ta-border-bottom mb-25 pb-15 pt-15">Creative Game In Mind</h4>
                        <p>When we signed on to the To Whom It May Concern campaign we made a pledge to be 100% renew
                            by 2030 and carbon zero by 2040,” said Envato CEO Hichame Assi.</p>
                        <ul className="blog-list-item list-unstyled pt-15">
                            <li><i className="fa fa-check-circle" /> <p><strong>The games generate:</strong> Revenue through sales of digital items, such as special costumes, which appear in a rotating storefront that is updated daily.</p></li>
                            <li><i className="fa fa-check-circle" /> <p><strong>Players use in-game: </strong> Currency to customize their appearance, and the daily refresh of the store incentivises players to buy fresh gear or risk missing out on it entirely.</p></li>
                            <li><i className="fa fa-check-circle" /> <p><strong>Players have: </strong> Already spent more than $1 billion on Fortnite’s in-game purchases, according to IGN report.</p></li>
                        </ul>
                        <div className="ta-single-share-wrapper mt-40 pt-25 pb-15 ta-border-top">
                            <div className="d-flex align-items-center justify-content-between flex-wrap" style={{ gap: '16px' }}>
                                <div className="share-prompt-text">
                                    <h5 className="mb-1" style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Bagikan Artikel Ini</h5>
                                    <p className="mb-0" style={{ fontSize: '13px', color: '#64748b' }}>Bagikan informasi ini melalui WhatsApp, Telegram, media sosial, atau salin link.</p>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setIsShareOpen(true)}
                                        className="ta-button ta-share-action-btn"
                                        style={{
                                            padding: '11px 26px',
                                            fontSize: '14px',
                                            borderRadius: '10px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '9px',
                                            backgroundColor: '#da0105',
                                            color: '#ffffff',
                                            border: 'none',
                                            boxShadow: '0 4px 14px rgba(218, 1, 5, 0.25)',
                                            cursor: 'pointer',
                                            fontWeight: '700',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                            <polyline points="16 6 12 2 8 6" />
                                            <line x1="12" y1="2" x2="12" y2="15" />
                                        </svg>
                                        Share Artikel
                                    </button>
                                </div>
                            </div>

                            <ShareModal
                                isOpen={isShareOpen}
                                onClose={() => setIsShareOpen(false)}
                                title={`Artikel ${siteTitle}`}
                            />
                        </div>
                    </div>
                </div>
            </article>
            <div className="ta-dn-wrapper pt-50 pb-50">
                <div className="row mt-none-20">
                    <div className="col-xl-5 col-lg-6 col-md-6 mt-20">
                        <div className="ta-details-navigation text-start d-flex">
                            <div className="rp-thumb mr-25 ta-stroke">
                                <img src="/assets/img/blog/rp-thumb-1.webp" alt="" />
                            </div>
                            <div className="rp-content">
                                <Link className="rp-nav" href="/blog-details"><span>Previous Post</span></Link>
                                <h4 className="rp-title ta-border-effect ta-line-2">
                                    <Link href="/blog-details">3 Stocks to Buy and Hold Through the Panic...</Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 d-xl-block d-none" />
                    <div className="col-xl-5 col-lg-6 col-md-6 mt-20">
                        <div className="ta-details-navigation text-end d-flex flex-row-reverse">
                            <div className="rp-thumb ml-25 ta-stroke">
                                <img src="/assets/img/blog/rp-thumb-2.webp" alt="" />
                            </div>
                            <div className="rp-content">
                                <Link className="rp-nav" href="/blog-details"><span>Next Post</span></Link>
                                <h4 className="rp-title ta-border-effect ta-line-2">
                                    <Link href="/blog-details">Mood Boards for Product Designers dome...</Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
