'use client'
import Link from 'next/link'
import { useState } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { getImageUrl } from "@/lib/imageUtils"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
	spaceBetween: 10,
	slidesPerGroup: 1,
	loop: true,
	autoplay: false,
	speed: 700,
	navigation: {
		nextEl: ".post-carousel .swiper-prev",
		prevEl: ".post-carousel .swiper-next",
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		767: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		1024: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
	},
}

export default function HeroPost1({ posts = [], popularPosts = [], settings = {} }) {
	const [isTab, setIsTab] = useState(1)
	const handleTab = (i) => {
		setIsTab(i)
	}

	// Slot mapping from settings if in manual mode
	const isManual = settings.featured_posts_mode === 'manual'
	const slot1 = isManual && settings.featured_post_slot_1 ? posts.find(p => String(p.id) === String(settings.featured_post_slot_1)) : null
	const slot2 = isManual && settings.featured_post_slot_2 ? posts.find(p => String(p.id) === String(settings.featured_post_slot_2)) : null
	const slot3 = isManual && settings.featured_post_slot_3 ? posts.find(p => String(p.id) === String(settings.featured_post_slot_3)) : null

	const post1 = slot1 || posts[0] || null
	const post2 = slot2 || posts[1] || null
	
	let sliderPosts = posts.length > 2 ? posts.slice(2, 6) : null
	if (slot3) {
		const filtered = (sliderPosts || []).filter(p => p.id !== slot3.id)
		sliderPosts = [slot3, ...filtered].slice(0, 4)
	}

	const trendingList = popularPosts.length > 0 ? popularPosts.slice(0, 5) : posts.slice(0, 5)
	const latestList = posts.length > 6 ? posts.slice(6, 11) : posts.slice(0, 5)

	const titleTrending = settings.title_trending_posts || "Trending News"

	const formatDate = (dateStr) => {
		if (!dateStr) return "Recently"
		try {
			return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
		} catch {
			return "Recently"
		}
	}

	return (
		<>
			<section className="hero-post-area">
				<div className="container">
					<div className="post-area-wrap">
						<div className="post-area-right-2">
							<div className="post-card-wrap">
								{post1 ? (
									<div className="post-card">
										<div className="post-thumb">
											<Link href={`/blog/${post1.slug || post1.id}`}>
												<img
													src={getImageUrl(post1.img, '/assets/img/post/post-img-1.jpg')}
													alt={post1.title}
													onError={(e) => { e.currentTarget.src = '/assets/img/post/post-img-1.jpg' }}
												/>
											</Link>
										</div>
										<div className="post-content">
											<Link href={`/blog/${post1.slug || post1.id}`} className="card-btn bg-blue">
												{post1.category?.name || (typeof post1.category === 'string' ? post1.category : 'News')}
											</Link>
											<h3 className="title">
												<Link href={`/blog/${post1.slug || post1.id}`}>{post1.title}</Link>
											</h3>
										</div>
									</div>
								) : (
									<div className="post-card">
										<div className="post-thumb">
											<Link href="/blog"><img src="/assets/img/post/post-img-1.jpg" alt="post" /></Link>
										</div>
										<div className="post-content">
											<Link href="/blog" className="card-btn bg-blue">Health</Link>
											<h3 className="title">
												<Link href="/blog">Who Owns Your Body: 10 Steps to the Best Shape</Link>
											</h3>
										</div>
									</div>
								)}

								{post2 ? (
									<div className="post-card">
										<div className="post-thumb">
											<Link href={`/blog/${post2.slug || post2.id}`}>
												<img
													src={getImageUrl(post2.img, '/assets/img/post/post-img-2.jpg')}
													alt={post2.title}
													onError={(e) => { e.currentTarget.src = '/assets/img/post/post-img-2.jpg' }}
												/>
											</Link>
										</div>
										<div className="post-content">
											<Link href={`/blog/${post2.slug || post2.id}`} className="card-btn bg-green">
												{post2.category?.name || (typeof post2.category === 'string' ? post2.category : 'Feature')}
											</Link>
											<h3 className="title">
												<Link href={`/blog/${post2.slug || post2.id}`}>{post2.title}</Link>
											</h3>
										</div>
									</div>
								) : (
									<div className="post-card">
										<div className="post-thumb">
											<Link href="/blog"><img src="/assets/img/post/post-img-2.jpg" alt="post" /></Link>
										</div>
										<div className="post-content">
											<Link href="/blog" className="card-btn bg-green">Travel</Link>
											<h3 className="title">
												<Link href="/blog">The Best Therapy for Your Mind and Soul done.</Link>
											</h3>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Center Swiper Slider */}
						<div className="post-carousel-wrap">
							<div className="post-carousel">
								<Swiper {...swiperOptions} className="hero-post-swiper">
									{sliderPosts && sliderPosts.length > 0 ? (
										sliderPosts.map((post) => {
											const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'Highlights')
											const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'Redaksi')
											return (
												<SwiperSlide key={post.id}>
													<div className="post-carousel-card card-2 text-center">
														<div className="post-carousel-thumb">
															<Link href={`/blog/${post.slug || post.id}`}>
																<img
																	src={getImageUrl(post.img, '/assets/img/slider/post-slider-img-1.jpg')}
																	alt={post.title}
																	onError={(e) => { e.currentTarget.src = '/assets/img/slider/post-slider-img-1.jpg' }}
																/>
															</Link>
														</div>
														<div className="post-carousel-content">
															<Link href={`/blog/${post.slug || post.id}`} className="card-btn bg-pink">
																{catName}
															</Link>
															<h3 className="title">
																<Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
															</h3>
															<ul className="post-list">
																<li className="author">
																	by <span><Link href={`/blog/${post.slug || post.id}`}>{authorName}</Link></span>
																</li>
																<li className="date" suppressHydrationWarning>{formatDate(post.createdAt)}</li>
																{post.views > 0 && (
																	<li><i className="las la-eye" />{post.views}</li>
																)}
															</ul>
														</div>
													</div>
												</SwiperSlide>
											)
										})
									) : (
										<>
											<SwiperSlide>
												<div className="post-carousel-card card-2 text-center">
													<div className="post-carousel-thumb">
														<Link href="/blog"><img src="/assets/img/slider/post-slider-img-1.jpg" alt="img" /></Link>
													</div>
													<div className="post-carousel-content">
														<Link href="/blog" className="card-btn bg-pink">Lifestyle</Link>
														<h3 className="title">
															<Link href="/blog">Fashion, Tips, Trends and Celebrity Style</Link>
														</h3>
														<ul className="post-list">
															<li className="author">by <span><Link href="/blog">David Bin</Link></span></li>
															<li className="date">July 29, 2024</li>
															<li><i className="las la-comments" />5</li>
														</ul>
													</div>
												</div>
											</SwiperSlide>
										</>
									)}
								</Swiper>
								<div className="swiper-arrow">
									<div className="swiper-nav swiper-next"><i className="las la-angle-left" /></div>
									<div className="swiper-nav swiper-prev"><i className="las la-angle-right" /></div>
								</div>
							</div>
						</div>

						{/* Right Tabs */}
						<div className="post-area-right-2 tab-wrap">
							<ul className="nav nav-tabs" id="myTab" role="tablist">
								<li className="nav-item" onClick={() => handleTab(1)}>
									<button className={isTab == 1 ? "nav-link active" : "nav-link"}>{titleTrending}</button>
								</li>
								<li className="nav-item" onClick={() => handleTab(2)}>
									<button className={isTab == 2 ? "nav-link active" : "nav-link"}>Berita Terbaru</button>
								</li>
							</ul>
							<div className="tab-content" id="myTabContent">
								{/* Tab 1: Trending News */}
								<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"}>
									<div className="list-post-area">
										{trendingList && trendingList.length > 0 ? (
											trendingList.map((post, idx) => {
												const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'Trending')
												return (
													<div key={post.id || idx} className="list-post-card">
														<div className="post-img">
															<Link href={`/blog/${post.slug || post.id}`}>
																<img
																	src={getImageUrl(post.img, `/assets/img/post/list-post-img-${(idx % 5) + 1}.png`)}
																	alt={post.title}
																	onError={(e) => { e.currentTarget.src = `/assets/img/post/list-post-img-${(idx % 5) + 1}.png` }}
																/>
															</Link>
														</div>
														<div className="post-content">
															<Link href={`/blog/${post.slug || post.id}`} className="category">
																{catName}
															</Link>
															<h3 className="title">
																<Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
															</h3>
														</div>
													</div>
												)
											})
										) : null}
									</div>
								</div>

								{/* Tab 2: Latest News */}
								<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
									<div className="list-post-area">
										{latestList && latestList.length > 0 ? (
											latestList.map((post, idx) => {
												const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'Latest')
												return (
													<div key={post.id || idx} className="list-post-card">
														<div className="post-img">
															<Link href={`/blog/${post.slug || post.id}`}>
																<img
																	src={getImageUrl(post.img, `/assets/img/post/list-post-img-${(idx % 5) + 1}.png`)}
																	alt={post.title}
																	onError={(e) => { e.currentTarget.src = `/assets/img/post/list-post-img-${(idx % 5) + 1}.png` }}
																/>
															</Link>
														</div>
														<div className="post-content">
															<Link href={`/blog/${post.slug || post.id}`} className="category">
																{catName}
															</Link>
															<h3 className="title">
																<Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
															</h3>
														</div>
													</div>
												)
											})
										) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
