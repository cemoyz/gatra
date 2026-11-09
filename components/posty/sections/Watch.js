
'use client'
import ModalVideo from 'react-modal-video'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import VideoPopup from '../elements/VideoPopup'

export default function Watch() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [isOpen, setOpen] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])
	return (
		<>
			<section className="watch-section">
				<div className="swiper mySwiper2">
					<Swiper
						spaceBetween={10}
						navigation={false}
						thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
						modules={[FreeMode, Navigation, Thumbs]}
						className="swiper-wrapper">
						<SwiperSlide>
							<div className="carousel-post">
								<div className="post-img">
									<img src="/assets/img/images/post-carousel-img-1.jpg" />
								</div>
								<div className="post-text">
									<h3 className="header"><span /><span>What to Watch</span><span /></h3>
								</div>
								<div className="video-btn">
								<a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
								</div>
								<div className="post-card">
									<div className="post-content">
										<Link href="/single-post-1" className="card-btn bg-green">Travel</Link>
										<h3 className="title">
											<Link href="/single-post-1">Winners of the 2022 the Nature Conservancy any Photo
												Contest</Link>
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
						</SwiperSlide>
						<SwiperSlide>
							<div className="carousel-post">
								<div className="post-img">
									<img src="/assets/img/images/post-carousel-img-1.jpg" />
								</div>
								<div className="post-text">
									<h3 className="header"><span /><span>What to Watch</span><span /></h3>
								</div>
								<div className="video-btn">
									<a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
								</div>
								<div className="post-card">
									<div className="post-content">
										<Link href="/single-post-1" className="card-btn bg-green">Travel</Link>
										<h3 className="title">
											<Link href="/single-post-1">Winners of the 2022 the Nature Conservancy any Photo
												Contest</Link>
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
						</SwiperSlide>
						<SwiperSlide>
							<div className="carousel-post">
								<div className="post-img">
									<img src="/assets/img/images/post-carousel-img-1.jpg" />
								</div>
								<div className="post-text">
									<h3 className="header"><span /><span>What to Watch</span><span /></h3>
								</div>
								<div className="video-btn">
									<a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
								</div>
								<div className="post-card">
									<div className="post-content">
										<Link href="/single-post-1" className="card-btn bg-green">Travel</Link>
										<h3 className="title">
											<Link href="/single-post-1">Winners of the 2022 the Nature Conservancy any Photo
												Contest</Link>
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
						</SwiperSlide>
						<SwiperSlide>
							<div className="carousel-post">
								<div className="post-img">
									<img src="/assets/img/images/post-carousel-img-1.jpg" />
								</div>
								<div className="post-text">
									<h3 className="header"><span /><span>What to Watch</span><span /></h3>
								</div>
								<div className="video-btn">
									<a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
								</div>
								<div className="post-card">
									<div className="post-content">
										<Link href="/single-post-1" className="card-btn bg-green">Travel</Link>
										<h3 className="title">
											<Link href="/single-post-1">Winners of the 2022 the Nature Conservancy any Photo
												Contest</Link>
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
						</SwiperSlide>
					</Swiper>
					<div className="swiper-arrow">
						<div className="swiper-nav swiper-next"><i className="las la-angle-left" /></div>
						<div className="swiper-nav swiper-prev"><i className="las la-angle-right" /></div>
					</div>
				</div>
				<div className="thumb-carousel-wrap">
					<div className="swiper mySwiper">
						<Swiper
							onSwiper={setThumbsSwiper}
							spaceBetween={10}
							slidesPerView={4}
							freeMode={true}
							watchSlidesProgress={true}
							modules={[FreeMode, Navigation, Thumbs]} className="swiper-wrapper">
							<SwiperSlide>
								<div className="carousel-thumb-post">
									<div className="carousel-thumb">
										<img src="/assets/img/images/post-carousel-thumb-1.jpg" />
									</div>
									<div className="thumb-content">
									<a className="video-popup  thumb-video" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
										<h4 className="thumb-title"><Link href="/#">The Season Courses and Salads wow!</Link></h4>
									</div>
									<div className="thumb-time">
										<span>9.37</span>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="carousel-thumb-post">
									<div className="carousel-thumb">
										<img src="/assets/img/images/post-carousel-thumb-2.jpg" />
									</div>
									<div className="thumb-content">
										<a className="video-popup  thumb-video" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
										<h4 className="thumb-title"><Link href="/#">The Season Courses and Salads wow!</Link></h4>
									</div>
									<div className="thumb-time">
										<span>9.37</span>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="carousel-thumb-post">
									<div className="carousel-thumb">
										<img src="/assets/img/images/post-carousel-thumb-3.jpg" />
									</div>
									<div className="thumb-content">
										<a className="video-popup  thumb-video" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
										<h4 className="thumb-title"><Link href="/#">The Season Courses and Salads wow!</Link></h4>
									</div>
									<div className="thumb-time">
										<span>9.37</span>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="carousel-thumb-post">
									<div className="carousel-thumb">
										<img src="/assets/img/images/post-carousel-thumb-4.jpg" />
									</div>
									<div className="thumb-content">
										<a className="video-popup  thumb-video" onClick={() => setOpen(true)}><i className="las la-play" />
											</a>
										<h4 className="thumb-title"><Link href="/#">The Season Courses and Salads wow!</Link></h4>
									</div>
									<div className="thumb-time">
										<span>9.37</span>
									</div>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
			</section>
			{mounted && (
				<ModalVideo
					channel='youtube'
					autoplay
					isOpen={isOpen}
					videoId={"QiqQoqtnHrk"}
					onClose={() => setOpen(false)}
					allowFullScreen={true}
				/>
			)}
		</>
	)
}
