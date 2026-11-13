'use client'
import ModalVideo from 'react-modal-video'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getImageUrl } from '@/lib/imageUtils'

export default function Watch({ posts = [], settings = {} }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [isOpen, setOpen] = useState(false)
	const [videoKey, setVideoKey] = useState("QiqQoqtnHrk")
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (settings.show_video_section === 'false') {
		return null
	}

	const displayPosts = posts && posts.length > 0 ? posts.slice(0, 4) : [
		{ id: 1, title: "Winners of the Nature Conservancy any Photo Contest", img: "/assets/img/images/post-carousel-img-1.jpg", category: { name: "Travel" }, author: { name: "David Bin" }, createdAt: "2026-11-09", videoUrl: "https://www.youtube.com/watch?v=QiqQoqtnHrk" },
		{ id: 2, title: "Top 10 Hidden Island Destinations to Visit This Season", img: "/assets/img/images/post-carousel-img-1.jpg", category: { name: "Nature" }, author: { name: "Sarah Connor" }, createdAt: "2026-11-08", videoUrl: "https://www.youtube.com/watch?v=4xe72U7mXNg" },
		{ id: 3, title: "How Technology is Reshaping Modern Urban Architecture", img: "/assets/img/images/post-carousel-img-1.jpg", category: { name: "Tekno" }, author: { name: "Alexis Dowson" }, createdAt: "2026-11-07", videoUrl: "https://www.youtube.com/watch?v=QiqQoqtnHrk" },
		{ id: 4, title: "Special Investigative Report: Inside Renewable Energy Trends", img: "/assets/img/images/post-carousel-img-1.jpg", category: { name: "Edukasi" }, author: { name: "Redaksi" }, createdAt: "2026-11-06", videoUrl: "https://www.youtube.com/watch?v=4xe72U7mXNg" }
	]

	const sectionTitle = settings.title_video_section || "What to Watch"

	const extractVideoId = (url) => {
		if (!url) return "QiqQoqtnHrk"
		try {
			if (url.includes('youtu.be/')) {
				return url.split('youtu.be/')[1]?.split('?')[0] || "QiqQoqtnHrk"
			}
			if (url.includes('watch?v=' || url.includes('&v='))) {
				const params = new URL(url).searchParams
				return params.get('v') || "QiqQoqtnHrk"
			}
		} catch {
			return "QiqQoqtnHrk"
		}
		return "QiqQoqtnHrk"
	}

	const handlePlayVideo = (post) => {
		const vid = extractVideoId(post.videoUrl || settings.about_video_url)
		setVideoKey(vid)
		setOpen(true)
	}

	const formatDate = (dateStr) => {
		if (!dateStr) return "Recently"
		try {
			return new Date(dateStr).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })
		} catch {
			return "Recently"
		}
	}

	return (
		<>
			<section className="watch-section">
				<div className="swiper mySwiper2">
					<Swiper
						spaceBetween={10}
						navigation={false}
						thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
						modules={[FreeMode, Navigation, Thumbs]}
						className="swiper-wrapper"
					>
						{displayPosts.map((post, idx) => {
							const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'Video')
							const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'Redaksi')
							return (
								<SwiperSlide key={post.id || idx}>
									<div className="carousel-post">
										<div className="post-img">
											<img
												src={getImageUrl(post.img, '/assets/img/images/post-carousel-img-1.jpg')}
												alt={post.title}
												onError={(e) => { e.currentTarget.src = '/assets/img/images/post-carousel-img-1.jpg' }}
											/>
										</div>
										<div className="post-text">
											<h3 className="header"><span /><span>{sectionTitle}</span><span /></h3>
										</div>
										<div className="video-btn">
											<a className="video-popup" onClick={() => handlePlayVideo(post)} role="button" aria-label="Putar Video">
												<i className="las la-play" />
											</a>
										</div>
										<div className="post-card">
											<div className="post-content">
												<Link href={`/blog/${post.slug || post.id}`} className="card-btn bg-green">
													{catName}
												</Link>
												<h3 className="title">
													<Link href={`/blog/${post.slug || post.id}`}>
														{post.title}
													</Link>
												</h3>
												<ul className="post-list">
													<li className="author">
														by <span><Link href={`/blog/${post.slug || post.id}`}>{authorName}</Link></span>
													</li>
													<li className="date" suppressHydrationWarning>{formatDate(post.createdAt)}</li>
													{post.views > 0 && <li><i className="las la-eye" />{post.views}</li>}
												</ul>
											</div>
										</div>
									</div>
								</SwiperSlide>
							)
						})}
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
							modules={[FreeMode, Navigation, Thumbs]}
							className="swiper-wrapper"
						>
							{displayPosts.map((post, idx) => (
								<SwiperSlide key={post.id || (idx + 10)}>
									<div className="carousel-thumb-post">
										<div className="carousel-thumb">
											<img
												src={getImageUrl(post.img, `/assets/img/images/post-carousel-thumb-${(idx % 4) + 1}.jpg`)}
												alt={post.title}
												onError={(e) => { e.currentTarget.src = `/assets/img/images/post-carousel-thumb-${(idx % 4) + 1}.jpg` }}
											/>
										</div>
										<div className="thumb-content">
											<a className="video-popup thumb-video" onClick={() => handlePlayVideo(post)} role="button">
												<i className="las la-play" />
											</a>
											<h4 className="thumb-title">
												<Link href={`/blog/${post.slug || post.id}`}>
													{post.title}
												</Link>
											</h4>
										</div>
										<div className="thumb-time">
											<span>HD</span>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</section>
			{mounted && (
				<ModalVideo
					channel='youtube'
					autoplay
					isOpen={isOpen}
					videoId={videoKey}
					onClose={() => setOpen(false)}
					allowFullScreen={true}
				/>
			)}
		</>
	)
}
