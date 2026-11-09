'use client'
import { useState } from 'react'
import ModalVideo from 'react-modal-video'
import Link from 'next/link'

export default function Video() {
	const [isOpen, setOpen] = useState(false)
    return (
        <>
            <section className="video-section padding">
                <div className="container">
                    <div className="section-heading mb-40">
                        <h3 className="section-title title-border"><span>What to Watch</span></h3>
                    </div>
                </div>
                <div className="video-container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="post-card video-post">
                                <div className="post-thumb">
                                    <img src="/assets/img/post/video-post-1.jpg" alt="video" />
                                    <div className="video-btn">
                                        <a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <h3 className="title">
                                        <Link href="/single-post-1">The Season Courses Salads at dummy text wow!</Link>
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
                        <div className="col-lg-3 col-md-6">
                            <div className="post-card video-post">
                                <div className="post-thumb">
                                    <img src="/assets/img/post/video-post-2.jpg" alt="video" />
                                    <div className="video-btn">
                                        <a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <h3 className="title">
                                        <Link href="/single-post-1">The Season Courses Salads at dummy text wow!</Link>
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
                        <div className="col-lg-3 col-md-6">
                            <div className="post-card video-post">
                                <div className="post-thumb">
                                    <img src="/assets/img/post/video-post-3.jpg" alt="video" />
                                    <div className="video-btn">
                                        <a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <h3 className="title">
                                        <Link href="/single-post-1">The Season Courses Salads at dummy text wow!</Link>
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
                        <div className="col-lg-3 col-md-6">
                            <div className="post-card video-post">
                                <div className="post-thumb">
                                    <img src="/assets/img/post/video-post-4.jpg" alt="video" />
                                    <div className="video-btn">
                                        <a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <h3 className="title">
                                        <Link href="/single-post-1">The Season Courses Salads at dummy text wow!</Link>
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
