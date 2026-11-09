'use client'
import { useState } from 'react'
import ModalVideo from 'react-modal-video'
import Link from 'next/link'

export default function VideoPost2() {
	const [isOpen, setOpen] = useState(false)
    return (
        <>
            <section className="video-post-area padding">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">Latest Post</span></h3>
                        </div>
                        <div className="right-btn">
                            <Link href="/blog-default" className="default-btn">See More</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="video-post-wrap">
                                <div className="video-btn">
								<a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
                                </div>
                                <div className="video-thumb">
                                    <img src="/assets/img/post/video-post-5.jpg" alt="video" />
                                </div>
                                <div className="post-card">
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-blue-light">3D Art</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">Who Owns Your Body: 10 Steps to the Best Shape</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                            <li><i className="las la-comments" />5</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="list-post-area video-post-list">
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-1.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Season Courses and Salads wow!</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-2.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">Catch the Best iPhone 13 Deals Favorite gadgets</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-4.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">Which Game to Choose for Your Kids Middle School</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-5.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Widening Impact of the Motion Design Industry</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-3.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">If You Ever Decide to Travel to a Volcano…</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
				<ModalVideo
				channel='youtube'
				autoplay
				isOpen={isOpen}
				videoId={"QiqQoqtnHrk"}
				onClose={() => setOpen(false)}
				allowFullScreen={true}
			/>
        </>
    )
}
