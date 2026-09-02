import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import PostGallery from "@/components/sections/PostGallery"
import Link from "next/link"
export default function HomeRtl() {

    return (
        <>
            <Layout headerStyle={9} footerStyle={12} rtl>
                <div className="ta-blog-area pt-70 pb-70">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className="ta-blog-wrapper mt-none-60">
                                    <article className="ta-blog-box mt-60 ta-sticky-post">
                                        <div className="thumb ta-stroke ">
                                            <img src="/assets/img/blog/blog-1.webp" alt="blog" />
                                            <div className="ta-blog-box__cats">
                                                <Link href="#0">تكنولوجيا</Link>
                                            </div>
                                        </div>
                                        <div className="content mt-35 text-center pl-100 pr-100">
                                            <ul className="ta-blog-box__meta-info d-flex justify-content-center align-items-center list-unstyled">
                                                <li>
                                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                                        <span className="author-thumb">
                                                            <img src="/assets/img/author/author-1.webp" alt="author" />
                                                        </span>
                                                        <span className="author-name">براتيك جوجلكار</span>
                                                    </Link>
                                                </li>
                                                <li><Link href="#0">19 يناير {new Date().getFullYear()}</Link></li>
                                                <li><Link href="#0"><i className="fa fa-clock" /> 18 دقيقة للقراءة</Link></li>
                                            </ul>
                                            <h2 className="ta-blog-box__title ta-border-effect mt-10"><Link href="/blog-details">التساهل غير المحجوز هو التغيير ...</Link></h2>
                                            <div className="excerpt mt-15">
                                                <p>لنتحدث عن Next.js ، أحد أكثر أطر عمل React شهرة والمستخدمة للإنتاج.
                                                    من المكونات الجديدة إلى تحسين الخط</p>
                                            </div>
                                            <div className="ta-blog-box__share-info d-flex justify-content-center align-items-center mt-35">
                                                <ul className="d-flex justify-content-center align-items-center list-unstyled ta-stroke">
                                                    <li><i className="fa fa-comment" /> 82</li>
                                                    <li><i className="fa fa-eye" /> 12000</li>
                                                    <li><i className="fa fa-heart" /> 258</li>
                                                    <li className="like-btn"><Link href="#0"><i className="fa fa-heart" /></Link></li>
                                                </ul>
                                                <Link href="#0" className="ta-share-btn ta-stroke"><i className="fa fa-share" />  شارك</Link>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="ta-blog-box mt-60">
                                        <PostGallery />
                                        <div className="content mt-35 text-center pl-100 pr-100">
                                            <ul className="ta-blog-box__meta-info d-flex justify-content-center align-items-center list-unstyled">
                                                <li>
                                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                                        <span className="author-thumb">
                                                            <img src="/assets/img/author/author-1-2.webp" alt="author" />
                                                        </span>
                                                        <span className="author-name">الكسيس داوسون</span>
                                                    </Link>
                                                </li>
                                                <li><Link href="#0">18 مارس {new Date().getFullYear()}</Link></li>
                                                <li><Link href="#0"><i className="fa fa-clock" /> 10 دقيقة للقراءة</Link></li>
                                            </ul>
                                            <h2 className="ta-blog-box__title ta-border-effect mt-10"><Link href="/blog-details">سوف أشارك بعض التكتيكات لتحسين ...</Link></h2>
                                            <div className="excerpt mt-15">
                                                <p>لنتحدث عن Next.js ، أحد أكثر أطر عمل React شهرة والمستخدمة للإنتاج.
                                                    من المكونات الجديدة إلى تحسين الخط</p>
                                            </div>
                                            <div className="ta-blog-box__share-info d-flex justify-content-center align-items-center mt-35">
                                                <ul className="d-flex justify-content-center align-items-center list-unstyled ta-stroke">
                                                    <li><i className="fa fa-comment" /> 82</li>
                                                    <li><i className="fa fa-eye" /> 12000</li>
                                                    <li><i className="fa fa-heart" /> 258</li>
                                                    <li className="like-btn"><Link href="#0"><i className="fa fa-heart" /></Link></li>
                                                </ul>
                                                <Link href="#0" className="ta-share-btn ta-stroke"><i className="fa fa-share" />  شارك</Link>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="ta-blog-box mt-60">
                                        <div className="thumb ta-brd-b-none ta-stroke">
                                            <img src="/assets/img/blog/blog-4.webp" alt="blog" />
                                            <div className="ta-blog-box__cats">
                                                <Link href="#0">فيديو</Link>
                                            </div>
                                            <VideoPopup style={1} />
                                        </div>
                                        <div className="content mt-35 text-center pl-100 pr-100">
                                            <ul className="ta-blog-box__meta-info d-flex justify-content-center align-items-center list-unstyled">
                                                <li>
                                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                                        <span className="author-thumb">
                                                            <img src="/assets/img/author/author-1-2.webp" alt="author" />
                                                        </span>
                                                        <span className="author-name">الكسيس داوسون</span>
                                                    </Link>
                                                </li>
                                                <li><Link href="#0">18 مارس {new Date().getFullYear()}</Link></li>
                                                <li><Link href="#0"><i className="fa fa-clock" /> 10 دقيقة للقراءة</Link></li>
                                            </ul>
                                            <h2 className="ta-blog-box__title ta-border-effect mt-10"><Link href="/blog-details">سوف أشارك بعض التكتيكات لتحسين ...</Link></h2>
                                            <div className="excerpt mt-15">
                                                <p>لنتحدث عن Next.js ، أحد أكثر أطر عمل React شهرة والمستخدمة للإنتاج.
                                                    من المكونات الجديدة إلى تحسين الخط</p>
                                            </div>
                                            <div className="ta-blog-box__share-info d-flex justify-content-center align-items-center mt-35">
                                                <ul className="d-flex justify-content-center align-items-center list-unstyled ta-stroke">
                                                    <li><i className="fa fa-comment" /> 82</li>
                                                    <li><i className="fa fa-eye" /> 12000</li>
                                                    <li><i className="fa fa-heart" /> 258</li>
                                                    <li className="like-btn"><Link href="#0"><i className="fa fa-heart" /></Link></li>
                                                </ul>
                                                <Link href="#0" className="ta-share-btn ta-stroke"><i className="fa fa-share" />  شارك</Link>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="ta-blog-box mt-60">
                                        <div className="ta-audio embed-responsive">
                                            <iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/469608615&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                                        </div>
                                        <div className="content mt-35 text-center pl-100 pr-100">
                                            <ul className="ta-blog-box__meta-info d-flex justify-content-center align-items-center list-unstyled">
                                                <li>
                                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                                        <span className="author-thumb">
                                                            <img src="/assets/img/author/author-1.webp" alt="author" />
                                                        </span>
                                                        <span className="author-name">
                                                            الكسيس داوسون</span>
                                                    </Link>
                                                </li>
                                                <li><Link href="#0">
                                                    مارس {new Date().getFullYear()}</Link></li>
                                                <li><Link href="#0"><i className="fa fa-clock" /> 20 دقيقة للقراءة</Link></li>
                                            </ul>
                                            <h2 className="ta-blog-box__title ta-border-effect mt-10"><Link href="/blog-details">سوف أشارك بعض التكتيكات لتحسين ...</Link></h2>
                                            <div className="excerpt mt-15">
                                                <p>لنتحدث عن Next.js ، أحد أكثر أطر عمل React شهرة والمستخدمة للإنتاج.
                                                    من المكونات الجديدة إلى تحسين الخط</p>
                                            </div>
                                            <div className="ta-blog-box__share-info d-flex justify-content-center align-items-center mt-35">
                                                <ul className="d-flex justify-content-center align-items-center list-unstyled ta-stroke">
                                                    <li><i className="fa fa-comment" /> 82</li>
                                                    <li><i className="fa fa-eye" /> 12000</li>
                                                    <li><i className="fa fa-heart" /> 258</li>
                                                    <li className="like-btn"><Link href="#0"><i className="fa fa-heart" /></Link></li>
                                                </ul>
                                                <Link href="#0" className="ta-share-btn ta-stroke"><i className="fa fa-share" />  شارك</Link>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="ta-blog-box ta-blog-box__format-quote mt-60 text-center">
                                        <div className="content ta-format-quote d-flex flex-column align-items-center text-center ta-stroke">
                                            <div className="qa-icon mx-auto mb-25">
                                                <img src="/assets/img/icons/quote-icon.webp" alt="" />
                                            </div>
                                            <div className="excerpt">
                                                <blockquote>
                                                    <p>"منذ 20 عامًا اليوم ، قدم ستيف للعالم
                                                        ماك. لقد وضع Apple على مسار جديد وغيّر إلى الأبد
                                                        الطريقة التي ينظر بها الناس إلى أجهزة الكمبيوتر. "</p>
                                                </blockquote>
                                            </div>
                                            <div className="qupte-author d-flex align-items-center mx-auto mt-20">
                                                <div className="qa-thumb mr-15">
                                                    <img src="/assets/img/author/qa-author.webp" alt="" />
                                                </div>
                                                <div className="qa-content">
                                                    <h6 className="name">مارلي هـ. إيفينز</h6>
                                                    <span className="designation">رئيس الفكرة</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="ta-blog-box ta-blog-box__format-quote ta-thumb-zoom mt-60 text-center">
                                        <div className="content ta-format-quote ta-format-link d-flex flex-column align-items-center text-center ta-stroke">
                                            <div className="qa-icon mx-auto mb-25">
                                                <i className="fal fa-link" />
                                            </div>
                                            <div className="excerpt">
                                                <p><Link href="/blog-details-link">https://themealpha.dev/html/hoom/blog-details-link.html</Link></p>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="ta-blog-box ta-blog-box__format-quote ta-thumb-zoom mt-60 text-center">
                                        <div className="content ta-format-quote ta-format-status d-flex flex-column align-items-center text-center ta-stroke">
                                            <div className="qa-icon mx-auto mb-25">
                                                <img src="/assets/img/icons/comment.webp" alt="" />
                                            </div>
                                            <div className="excerpt">
                                                <p>لنتحدث عن Next.js ، أحد أكثر أطر عمل React شهرة والمستخدمة للإنتاج. من المكونات الجديدة إلى تحسين الخط.</p>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="ta-blog-box ta-blog-box__format-quote ta-thumb-zoom mt-60">
                                        <div className="content ta-format-quote ta-format-trending d-flex flex-column align-items-center ta-stroke">
                                            <div className="qa-icon mx-auto mb-25">
                                                <img src="/assets/img/icons/trending.webp" alt="" />
                                            </div>
                                            <div className="excerpt">
                                                <p>
                                                    <Link href="/blog-details"><span className="ta-count">01</span> خاص وسيم حساسة ممتلكاتها ...</Link>
                                                    <Link href="/blog-details"><span className="ta-count">02</span> كيفية تحديد أولويات أمان المستخدم</Link>
                                                    <Link href="/blog-details"><span className="ta-count">03</span> دليل لجذب العملاء إلى وكالتك</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="ta-blog-box mt-60">
                                        <div className="thumb ta-stroke ">
                                            <img src="/assets/img/blog/blog-details--big-1.webp" alt="blog" />
                                            <div className="ta-blog-box__cats">
                                                <Link href="#0">تكنولوجيا</Link>
                                            </div>
                                        </div>
                                        <div className="content mt-35 text-center pl-100 pr-100">
                                            <ul className="ta-blog-box__meta-info d-flex justify-content-center align-items-center list-unstyled">
                                                <li>
                                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                                        <span className="author-thumb">
                                                            <img src="/assets/img/author/author-1.webp" alt="author" />
                                                        </span>
                                                        <span className="author-name">
                                                            الكسيس داوسون</span>
                                                    </Link>
                                                </li>
                                                <li><Link href="#0">
                                                    مارس {new Date().getFullYear()}</Link></li>
                                                <li><Link href="#0"><i className="fa fa-clock" /> 20 دقيقة للقراءة</Link></li>
                                            </ul>
                                            <h2 className="ta-blog-box__title ta-border-effect mt-10"><Link href="/blog-details">التساهل غير المحجوز هو التغيير ...</Link></h2>
                                            <div className="excerpt mt-15">
                                                <p>لنتحدث عن Next.js ، أحد أكثر أطر عمل React شهرة والمستخدمة للإنتاج.
                                                    من المكونات الجديدة إلى تحسين الخط</p>
                                            </div>
                                            <div className="ta-blog-box__share-info d-flex justify-content-center align-items-center mt-35">
                                                <ul className="d-flex justify-content-center align-items-center list-unstyled ta-stroke">
                                                    <li><i className="fa fa-comment" /> 82</li>
                                                    <li><i className="fa fa-eye" /> 12000</li>
                                                    <li><i className="fa fa-heart" /> 258</li>
                                                    <li className="like-btn"><Link href="#0"><i className="fa fa-heart" /></Link></li>
                                                </ul>
                                                <Link href="#0" className="ta-share-btn ta-stroke"><i className="fa fa-share" />  شارك</Link>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="ta-pagination mt-70">
                                    <ul className="list-unstyled d-flex align-items-center justify-content-center">
                                        <li><Link href="#0" className="current">واحد</Link></li>
                                        <li><Link href="#0">إثنان</Link></li>
                                        <li><Link href="#0">...</Link></li>
                                        <li><Link href="#0">ثمانية</Link></li>
                                        <li><Link href="#0" className="ta-loadmore-btn" data-blog-loadmore>تحميل المزيد <i className="fal fa-plus" /></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}