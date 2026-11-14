'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { getImageUrl } from '@/lib/imageUtils'

export default function Watch({ posts = [], settings = {} }) {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const playerContainerRef = useRef(null)

	useEffect(() => {
		const handleFsChange = () => {
			setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement))
		}
		document.addEventListener('fullscreenchange', handleFsChange)
		document.addEventListener('webkitfullscreenchange', handleFsChange)
		document.addEventListener('mozfullscreenchange', handleFsChange)
		document.addEventListener('MSFullscreenChange', handleFsChange)
		return () => {
			document.removeEventListener('fullscreenchange', handleFsChange)
			document.removeEventListener('webkitfullscreenchange', handleFsChange)
			document.removeEventListener('mozfullscreenchange', handleFsChange)
			document.removeEventListener('MSFullscreenChange', handleFsChange)
		}
	}, [])

	if (settings.show_video_section === 'false') {
		return null
	}

	const displayPosts = posts && posts.length > 0 ? posts.slice(0, 4) : [
		{ id: 1, title: "Liputan Khusus: Perkembangan Teknologi Digital Terkini", img: "/assets/img/post/post-img-1.jpg", category: { name: "Teknologi" }, author: { name: "Redaksi" }, createdAt: "2026-11-14", videoUrl: "https://www.youtube.com/watch?v=QiqQoqtnHrk" },
		{ id: 2, title: "Eksplorasi Destinasi Wisata Tersembunyi dan Keindahan Alam", img: "/assets/img/post/post-img-2.jpg", category: { name: "Wisata" }, author: { name: "Redaksi" }, createdAt: "2026-11-13", videoUrl: "https://www.youtube.com/watch?v=4xe72U7mXNg" },
		{ id: 3, title: "Wawancara Eksklusif Bersama Tokoh Inspiratif Nasional", img: "/assets/img/post/post-img-3.jpg", category: { name: "Wawancara" }, author: { name: "Redaksi" }, createdAt: "2026-11-12", videoUrl: "https://www.youtube.com/watch?v=QiqQoqtnHrk" },
		{ id: 4, title: "Analisis Mendalam Dampak Kebijakan Ekonomi Terhadap Publik", img: "/assets/img/post/post-img-4.jpg", category: { name: "Ekonomi" }, author: { name: "Redaksi" }, createdAt: "2026-11-11", videoUrl: "https://www.youtube.com/watch?v=4xe72U7mXNg" }
	]

	if (!displayPosts || displayPosts.length === 0) {
		return null
	}

	const sectionTitle = settings.title_video_section || "What to Watch"
	const activePost = displayPosts[activeIndex] || displayPosts[0]

	const extractVideoId = (url) => {
		if (!url) return "QiqQoqtnHrk"
		try {
			if (url.includes('youtu.be/')) {
				return url.split('youtu.be/')[1]?.split('?')[0] || "QiqQoqtnHrk"
			}
			if (url.includes('watch?v=') || url.includes('&v=')) {
				const params = new URL(url).searchParams
				return params.get('v') || "QiqQoqtnHrk"
			}
			if (url.includes('embed/')) {
				return url.split('embed/')[1]?.split('?')[0] || "QiqQoqtnHrk"
			}
			if (url.length === 11 && !url.includes('/')) {
				return url
			}
		} catch {
			return "QiqQoqtnHrk"
		}
		return "QiqQoqtnHrk"
	}

	const handlePlayInline = (postIndex = null) => {
		if (typeof postIndex === 'number' && postIndex !== activeIndex) {
			setActiveIndex(postIndex)
		}
		setIsPlaying(true)
	}

	const toggleFullscreen = (e) => {
		if (e) {
			e.stopPropagation()
			e.preventDefault()
		}
		const el = playerContainerRef.current
		if (!el) return

		if (!document.fullscreenElement && !document.webkitFullscreenElement) {
			if (el.requestFullscreen) {
				el.requestFullscreen().catch(() => {})
			} else if (el.webkitRequestFullscreen) {
				el.webkitRequestFullscreen()
			} else if (el.msRequestFullscreen) {
				el.msRequestFullscreen()
			}
			// Pastikan video mulai diputar jika belum
			setIsPlaying(true)
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen().catch(() => {})
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen()
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen()
			}
		}
	}

	const formatDate = (dateStr) => {
		if (!dateStr) return "Terbaru"
		try {
			return new Date(dateStr).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })
		} catch {
			return "Terbaru"
		}
	}

	const activeCatName = activePost.category?.name || (typeof activePost.category === 'string' ? activePost.category : 'Video')
	const activeAuthor = activePost.author?.name || (typeof activePost.author === 'string' ? activePost.author : 'Redaksi')
	const currentVideoId = extractVideoId(activePost.videoUrl || settings.about_video_url)

	return (
		<>
			<section className="cinema-watch-section">
				<div className="container">
					<div className="cinema-watch-card">
						{/* Header */}
						<div className="cinema-watch-header">
							<div className="header-left">
								<span className="live-indicator">
									<span className="pulse-dot"></span>
									VIDEO EKSKLUSIF
								</span>
								<h2 className="section-main-title">{sectionTitle}</h2>
								<p className="section-subtitle">
									Sajian liputan video, investigasi mendalam, dan tayangan peristiwa pilihan redaksi.
								</p>
							</div>
							<div className="header-right">
								<Link href="/blog?postType=video" className="view-all-video-btn">
									<span>Semua Video</span>
									<i className="las la-angle-right"></i>
								</Link>
							</div>
						</div>

						{/* Main Grid: Cinema Player Left (7fr) & Playlist Right (5fr) */}
						<div className="cinema-watch-grid">
							{/* Left: Main Stage Video Card */}
							<div className="cinema-player-col">
								<div 
									ref={playerContainerRef}
									className={`cinema-player-card ${isPlaying ? 'is-playing' : ''}`}
									onClick={() => !isPlaying && handlePlayInline()}
									role="region"
									aria-label="Pemutar Video Berita"
								>
									{isPlaying ? (
										<div className="inline-video-frame-wrap">
											<iframe
												src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
												title={activePost.title}
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
												allowFullScreen
												className="cinema-inline-iframe"
											/>
											{/* Controls Overlay: Fullscreen & Close Video */}
											<div className="inline-floating-controls">
												<button
													type="button"
													className="ctrl-action-btn fs-btn"
													onClick={toggleFullscreen}
													title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh (Fullscreen)"}
													aria-label="Toggle Fullscreen"
												>
													<i className={isFullscreen ? "las la-compress" : "las la-expand"}></i>
													<span>{isFullscreen ? "Kecilkan" : "Fullscreen"}</span>
												</button>
												<button
													type="button"
													className="ctrl-action-btn close-btn"
													onClick={(e) => {
														e.stopPropagation()
														setIsPlaying(false)
													}}
													title="Tutup Video & Kembali ke Sampul"
													aria-label="Tutup Video"
												>
													<i className="las la-times"></i>
												</button>
											</div>
										</div>
									) : (
										<>
											<img
												src={getImageUrl(activePost.img, '/assets/img/images/post-carousel-img-1.jpg')}
												alt={activePost.title}
												className="cinema-player-img"
												onError={(e) => { e.currentTarget.src = '/assets/img/images/post-carousel-img-1.jpg' }}
											/>
											<div className="cinema-player-overlay"></div>

											{/* Top Badges & Quick Fullscreen Button */}
											<div className="cinema-top-badges">
												<span className="cat-badge">{activeCatName}</span>
												<div className="cinema-top-right-actions">
													<span className="hd-badge"><i className="las la-video"></i> HD VIDEO</span>
													<button
														type="button"
														className="fs-quick-btn"
														onClick={toggleFullscreen}
														title="Putar Layar Penuh (Fullscreen)"
														aria-label="Putar Layar Penuh"
													>
														<i className="las la-expand"></i>
														<span>Fullscreen</span>
													</button>
												</div>
											</div>

											{/* Glowing Pulse Center Play Button */}
											<div className="cinema-play-btn-wrap">
												<div className="cinema-play-btn">
													<i className="las la-play"></i>
												</div>
												<span className="cinema-play-label">Putar Langsung</span>
											</div>

											{/* Bottom Details */}
											<div className="cinema-player-details">
												<h3 className="player-title">{activePost.title}</h3>
												<div className="player-meta">
													<span className="meta-item"><i className="las la-user"></i> {activeAuthor}</span>
													<span className="meta-item"><i className="las la-calendar"></i> {formatDate(activePost.createdAt)}</span>
													{activePost.views > 0 && (
														<span className="meta-item"><i className="las la-eye"></i> {activePost.views} tayangan</span>
													)}
												</div>
											</div>
										</>
									)}
								</div>

								{/* When playing inline, show details below the player card so user still gets full info */}
								{isPlaying && (
									<div className="playing-info-bar">
										<div className="playing-cat-badge">{activeCatName}</div>
										<h3 className="playing-title">{activePost.title}</h3>
										<div className="playing-meta">
											<span><i className="las la-user"></i> {activeAuthor}</span>
											<span>&bull;</span>
											<span><i className="las la-calendar"></i> {formatDate(activePost.createdAt)}</span>
											<button 
												type="button" 
												className="btn-replay-fs" 
												onClick={toggleFullscreen}
											>
												<i className="las la-expand"></i> Layar Penuh
											</button>
										</div>
									</div>
								)}
							</div>

							{/* Right: Interactive Playlist Column */}
							<div className="cinema-playlist-col">
								<div className="playlist-header">
									<span className="playlist-title"><i className="las la-list"></i> DAFTAR PUTAR</span>
									<span className="playlist-count">{displayPosts.length} Video</span>
								</div>

								<div className="playlist-items-wrap">
									{displayPosts.map((post, idx) => {
										const isSelected = idx === activeIndex
										const cat = post.category?.name || (typeof post.category === 'string' ? post.category : 'Video')
										return (
											<div
												key={post.id || idx}
												className={`playlist-item ${isSelected ? 'active' : ''}`}
												onClick={() => handlePlayInline(idx)}
												role="button"
												tabIndex={0}
												title={`Klik untuk langsung memutar: ${post.title}`}
											>
												<div className="playlist-thumb-wrap">
													<img
														src={getImageUrl(post.img, '/assets/img/images/post-carousel-img-1.jpg')}
														alt={post.title}
														className="playlist-thumb"
														onError={(e) => { e.currentTarget.src = '/assets/img/images/post-carousel-img-1.jpg' }}
													/>
													<div className="mini-play-icon">
														<i className={isSelected && isPlaying ? "las la-volume-up" : "las la-play"}></i>
													</div>
												</div>

												<div className="playlist-info">
													<div className="playlist-info-top">
														<span className="playlist-cat">{cat}</span>
														{isSelected && (
															<span className="now-playing-badge">
																{isPlaying ? '● SEDANG DIPUTAR' : 'DIPILIH'}
															</span>
														)}
													</div>
													<h4 className="playlist-item-title">{post.title}</h4>
													<span className="playlist-date">{formatDate(post.createdAt)}</span>
												</div>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<style jsx>{`
				.cinema-watch-section {
					padding: 30px 0 60px 0;
					width: 100%;
					position: relative;
				}

				.cinema-watch-card {
					background: #090d16;
					background: linear-gradient(145deg, #0b0f19 0%, #0f172a 100%);
					border: 1px solid rgba(255, 255, 255, 0.08);
					border-radius: 20px;
					padding: 36px 32px;
					box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
					position: relative;
					overflow: hidden;
				}

				.cinema-watch-card::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					height: 2px;
					background: linear-gradient(90deg, #da0105 0%, #f59e0b 50%, #3b82f6 100%);
					opacity: 0.8;
				}

				.cinema-watch-header {
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					margin-bottom: 26px;
					padding-bottom: 18px;
					border-bottom: 1px solid rgba(255, 255, 255, 0.08);
					gap: 16px;
					flex-wrap: wrap;
				}

				.live-indicator {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					background: rgba(218, 1, 5, 0.15);
					border: 1px solid rgba(218, 1, 5, 0.35);
					color: #ff4d4f;
					padding: 4px 12px;
					border-radius: 30px;
					font-size: 11px;
					font-weight: 800;
					letter-spacing: 0.8px;
					margin-bottom: 10px;
				}

				.pulse-dot {
					width: 8px;
					height: 8px;
					background-color: #da0105;
					border-radius: 50%;
					box-shadow: 0 0 10px #da0105;
					animation: pulse 1.8s infinite;
				}

				@keyframes pulse {
					0% { transform: scale(0.95); opacity: 0.9; }
					50% { transform: scale(1.3); opacity: 0.4; }
					100% { transform: scale(0.95); opacity: 0.9; }
				}

				.section-main-title {
					color: #ffffff;
					font-size: 28px;
					font-weight: 800;
					margin: 0 0 6px 0;
					line-height: 1.25;
					letter-spacing: -0.3px;
				}

				.section-subtitle {
					color: #94a3b8;
					font-size: 13.5px;
					margin: 0;
					line-height: 1.5;
					max-width: 580px;
				}

				.view-all-video-btn {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					padding: 9px 18px;
					background: rgba(255, 255, 255, 0.06);
					border: 1px solid rgba(255, 255, 255, 0.12);
					border-radius: 8px;
					color: #ffffff;
					font-size: 13px;
					font-weight: 600;
					transition: all 0.25s ease;
					text-decoration: none;
					white-space: nowrap;
				}

				.view-all-video-btn:hover {
					background: #da0105;
					border-color: #da0105;
					color: #ffffff;
					transform: translateY(-2px);
				}

				.cinema-watch-grid {
					display: grid;
					grid-template-columns: 1.35fr 1fr;
					gap: 24px;
					align-items: stretch;
				}

				/* Left Main Stage Player */
				.cinema-player-col {
					position: relative;
					display: flex;
					flex-direction: column;
				}

				.cinema-player-card {
					position: relative;
					width: 100%;
					aspect-ratio: 16 / 9.5;
					min-height: 380px;
					border-radius: 14px;
					overflow: hidden;
					background: #000000;
					box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
					cursor: pointer;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					border: 1px solid rgba(255, 255, 255, 0.1);
				}

				.cinema-player-card.is-playing {
					cursor: default;
					border-color: rgba(218, 1, 5, 0.5);
					box-shadow: 0 14px 40px rgba(218, 1, 5, 0.2);
				}

				/* Fullscreen Container Mode */
				.cinema-player-card:fullscreen,
				.cinema-player-card:-webkit-full-screen {
					width: 100vw !important;
					height: 100vh !important;
					aspect-ratio: unset !important;
					border-radius: 0 !important;
					border: none !important;
				}

				.inline-video-frame-wrap {
					position: absolute;
					inset: 0;
					width: 100%;
					height: 100%;
					background: #000000;
				}

				.cinema-inline-iframe {
					width: 100%;
					height: 100%;
					border: 0;
					display: block;
				}

				.inline-floating-controls {
					position: absolute;
					top: 14px;
					right: 14px;
					z-index: 10;
					display: flex;
					align-items: center;
					gap: 8px;
					background: rgba(15, 23, 42, 0.85);
					backdrop-filter: blur(6px);
					padding: 6px 10px;
					border-radius: 8px;
					border: 1px solid rgba(255, 255, 255, 0.15);
					box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
				}

				.ctrl-action-btn {
					background: rgba(255, 255, 255, 0.1);
					border: 1px solid rgba(255, 255, 255, 0.2);
					color: #ffffff;
					font-size: 13px;
					font-weight: 700;
					padding: 5px 12px;
					border-radius: 6px;
					display: inline-flex;
					align-items: center;
					gap: 6px;
					cursor: pointer;
					transition: all 0.2s ease;
				}

				.ctrl-action-btn:hover {
					background: #da0105;
					border-color: #da0105;
					color: #ffffff;
				}

				.ctrl-action-btn.close-btn {
					padding: 5px 8px;
					font-size: 15px;
				}

				.ctrl-action-btn.close-btn:hover {
					background: #dc2626;
				}

				.cinema-player-img {
					position: absolute;
					inset: 0;
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.cinema-player-card:hover .cinema-player-img {
					transform: scale(1.04);
				}

				.cinema-player-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.35) 40%, rgba(11, 15, 25, 0.95) 100%);
					transition: background 0.3s ease;
				}

				.cinema-player-card:hover .cinema-player-overlay {
					background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.25) 40%, rgba(11, 15, 25, 0.98) 100%);
				}

				.cinema-top-badges {
					position: relative;
					z-index: 2;
					padding: 18px 20px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
				}

				.cinema-top-right-actions {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.cat-badge {
					background: #da0105;
					color: #ffffff;
					font-size: 11px;
					font-weight: 800;
					letter-spacing: 0.6px;
					padding: 4px 12px;
					border-radius: 4px;
					text-transform: uppercase;
					box-shadow: 0 4px 10px rgba(218, 1, 5, 0.4);
				}

				.hd-badge {
					background: rgba(15, 23, 42, 0.7);
					backdrop-filter: blur(4px);
					border: 1px solid rgba(255, 255, 255, 0.2);
					color: #e2e8f0;
					font-size: 11px;
					font-weight: 700;
					padding: 4px 10px;
					border-radius: 4px;
					display: inline-flex;
					align-items: center;
					gap: 5px;
				}

				.fs-quick-btn {
					background: rgba(15, 23, 42, 0.7);
					backdrop-filter: blur(4px);
					border: 1px solid rgba(255, 255, 255, 0.2);
					color: #ffffff;
					font-size: 11px;
					font-weight: 700;
					padding: 4px 10px;
					border-radius: 4px;
					display: inline-flex;
					align-items: center;
					gap: 5px;
					cursor: pointer;
					transition: all 0.2s ease;
				}

				.fs-quick-btn:hover {
					background: #da0105;
					border-color: #da0105;
				}

				.cinema-play-btn-wrap {
					position: absolute;
					top: 45%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 3;
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 8px;
					pointer-events: none;
				}

				.cinema-play-btn {
					width: 70px;
					height: 70px;
					border-radius: 50%;
					background: #da0105;
					color: #ffffff;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32px;
					box-shadow: 0 0 0 8px rgba(218, 1, 5, 0.25), 0 8px 24px rgba(218, 1, 5, 0.5);
					transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
					padding-left: 4px;
				}

				.cinema-player-card:hover .cinema-play-btn {
					transform: scale(1.12);
					box-shadow: 0 0 0 14px rgba(218, 1, 5, 0.35), 0 12px 30px rgba(218, 1, 5, 0.65);
				}

				.cinema-play-label {
					color: #ffffff;
					font-size: 12px;
					font-weight: 700;
					letter-spacing: 0.5px;
					text-transform: uppercase;
					text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
					opacity: 0.9;
				}

				.cinema-player-details {
					position: relative;
					z-index: 2;
					padding: 20px 24px;
				}

				.player-title {
					color: #ffffff;
					font-size: 21px;
					font-weight: 700;
					line-height: 1.35;
					margin: 0 0 10px 0;
					text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.player-meta {
					display: flex;
					align-items: center;
					gap: 16px;
					color: #cbd5e1;
					font-size: 12.5px;
					flex-wrap: wrap;
				}

				.meta-item {
					display: inline-flex;
					align-items: center;
					gap: 5px;
				}

				/* Details under player when inline playing */
				.playing-info-bar {
					margin-top: 14px;
					padding: 14px 18px;
					background: rgba(255, 255, 255, 0.04);
					border: 1px solid rgba(255, 255, 255, 0.08);
					border-radius: 10px;
				}

				.playing-cat-badge {
					display: inline-block;
					color: #ff4d4f;
					font-size: 11px;
					font-weight: 800;
					letter-spacing: 0.5px;
					text-transform: uppercase;
					margin-bottom: 4px;
				}

				.playing-title {
					color: #ffffff;
					font-size: 18px;
					font-weight: 700;
					margin: 0 0 8px 0;
					line-height: 1.35;
				}

				.playing-meta {
					display: flex;
					align-items: center;
					gap: 12px;
					color: #94a3b8;
					font-size: 12.5px;
					flex-wrap: wrap;
				}

				.btn-replay-fs {
					margin-left: auto;
					background: rgba(255, 255, 255, 0.08);
					border: 1px solid rgba(255, 255, 255, 0.15);
					color: #ffffff;
					padding: 4px 10px;
					border-radius: 6px;
					font-size: 12px;
					font-weight: 600;
					cursor: pointer;
					display: inline-flex;
					align-items: center;
					gap: 5px;
					transition: all 0.2s ease;
				}

				.btn-replay-fs:hover {
					background: #da0105;
					border-color: #da0105;
				}

				/* Right Playlist Column */
				.cinema-playlist-col {
					display: flex;
					flex-direction: column;
					background: rgba(255, 255, 255, 0.03);
					border: 1px solid rgba(255, 255, 255, 0.06);
					border-radius: 14px;
					padding: 16px;
					box-sizing: border-box;
				}

				.playlist-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 12px;
					margin-bottom: 12px;
					border-bottom: 1px solid rgba(255, 255, 255, 0.08);
				}

				.playlist-title {
					color: #94a3b8;
					font-size: 11px;
					font-weight: 800;
					letter-spacing: 0.8px;
					display: inline-flex;
					align-items: center;
					gap: 6px;
				}

				.playlist-count {
					background: rgba(255, 255, 255, 0.08);
					color: #cbd5e1;
					font-size: 11px;
					font-weight: 700;
					padding: 2px 8px;
					border-radius: 12px;
				}

				.playlist-items-wrap {
					display: flex;
					flex-direction: column;
					gap: 10px;
					overflow-y: auto;
				}

				.playlist-item {
					display: flex;
					align-items: center;
					gap: 14px;
					padding: 10px;
					border-radius: 10px;
					background: transparent;
					border: 1px solid transparent;
					cursor: pointer;
					transition: all 0.25s ease;
					text-align: left;
				}

				.playlist-item:hover {
					background: rgba(255, 255, 255, 0.05);
					border-color: rgba(255, 255, 255, 0.1);
				}

				.playlist-item.active {
					background: rgba(218, 1, 5, 0.12);
					border-color: rgba(218, 1, 5, 0.4);
				}

				.playlist-thumb-wrap {
					position: relative;
					width: 105px;
					height: 68px;
					border-radius: 8px;
					overflow: hidden;
					flex-shrink: 0;
					background: #020617;
				}

				.playlist-thumb {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.mini-play-icon {
					position: absolute;
					inset: 0;
					background: rgba(0, 0, 0, 0.35);
					display: flex;
					align-items: center;
					justify-content: center;
					color: #ffffff;
					font-size: 18px;
					transition: background 0.2s ease, transform 0.2s ease;
				}

				.playlist-item:hover .mini-play-icon {
					background: rgba(218, 1, 5, 0.7);
					transform: scale(1.05);
				}

				.playlist-item.active .mini-play-icon {
					background: rgba(218, 1, 5, 0.85);
					color: #ffffff;
				}

				.playlist-info {
					flex: 1;
					min-width: 0;
				}

				.playlist-info-top {
					display: flex;
					align-items: center;
					gap: 8px;
					margin-bottom: 4px;
				}

				.playlist-cat {
					font-size: 10.5px;
					font-weight: 700;
					color: #94a3b8;
					text-transform: uppercase;
				}

				.now-playing-badge {
					font-size: 9.5px;
					font-weight: 800;
					color: #ff4d4f;
					letter-spacing: 0.4px;
				}

				.playlist-item-title {
					color: #e2e8f0;
					font-size: 13px;
					font-weight: 600;
					line-height: 1.35;
					margin: 0 0 4px 0;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					transition: color 0.2s ease;
				}

				.playlist-item:hover .playlist-item-title,
				.playlist-item.active .playlist-item-title {
					color: #ffffff;
				}

				.playlist-date {
					font-size: 11px;
					color: #64748b;
					display: block;
				}

				/* Mobile Responsive Adjustments */
				@media (max-width: 991px) {
					.cinema-watch-section {
						padding: 24px 0 40px 0;
					}

					.cinema-watch-grid {
						grid-template-columns: 1fr;
						gap: 18px;
					}

					.cinema-player-card {
						aspect-ratio: 16 / 9;
						min-height: unset;
						height: auto;
					}
				}

				@media (max-width: 767px) {
					.cinema-watch-section {
						padding: 20px 0 36px 0;
					}

					.cinema-watch-card {
						padding: 18px 12px;
						border-radius: 14px;
					}

					.cinema-watch-header {
						flex-direction: column;
						align-items: flex-start;
						gap: 12px;
						margin-bottom: 16px;
						padding-bottom: 14px;
					}

					.header-left {
						width: 100%;
					}

					.live-indicator {
						font-size: 10px;
						padding: 3px 10px;
						margin-bottom: 8px;
					}

					.section-main-title {
						font-size: 20px;
						margin-bottom: 4px;
					}

					.section-subtitle {
						font-size: 12px;
						line-height: 1.45;
					}

					.header-right {
						width: 100%;
					}

					.view-all-video-btn {
						width: 100%;
						justify-content: center;
						padding: 8px 14px;
						font-size: 12px;
					}

					.cinema-player-card {
						aspect-ratio: 16 / 9;
						min-height: unset;
						height: auto;
						border-radius: 10px;
					}

					.cinema-top-badges {
						padding: 10px 12px;
					}

					.cat-badge {
						font-size: 9.5px;
						padding: 3px 8px;
					}

					.hd-badge {
						display: none;
					}

					.fs-quick-btn {
						font-size: 10px;
						padding: 3px 8px;
					}

					.cinema-play-btn-wrap {
						top: 42%;
					}

					.cinema-play-btn {
						width: 48px;
						height: 48px;
						font-size: 22px;
						padding-left: 3px;
						box-shadow: 0 0 0 6px rgba(218, 1, 5, 0.3), 0 6px 18px rgba(218, 1, 5, 0.5);
					}

					.cinema-play-label {
						font-size: 10px;
					}

					.cinema-player-details {
						padding: 12px 14px;
					}

					.player-title {
						font-size: 14.5px;
						line-height: 1.35;
						margin-bottom: 6px;
					}

					.player-meta {
						font-size: 10.5px;
						gap: 10px;
					}

					.inline-floating-controls {
						top: 8px;
						right: 8px;
						padding: 4px 6px;
						gap: 6px;
					}

					.ctrl-action-btn {
						font-size: 11px;
						padding: 3px 8px;
					}

					.ctrl-action-btn.close-btn {
						padding: 3px 6px;
						font-size: 13px;
					}

					.playing-info-bar {
						margin-top: 10px;
						padding: 10px 12px;
						border-radius: 8px;
					}

					.playing-title {
						font-size: 14.5px;
						line-height: 1.35;
						margin-bottom: 6px;
					}

					.playing-meta {
						font-size: 11px;
						gap: 8px;
					}

					.btn-replay-fs {
						padding: 3px 8px;
						font-size: 10.5px;
					}

					.cinema-playlist-col {
						padding: 12px;
						border-radius: 10px;
					}

					.playlist-header {
						padding-bottom: 8px;
						margin-bottom: 8px;
					}

					.playlist-item {
						padding: 8px;
						gap: 10px;
						border-radius: 8px;
					}

					.playlist-thumb-wrap {
						width: 80px;
						height: 52px;
						border-radius: 6px;
					}

					.mini-play-icon {
						font-size: 14px;
					}

					.playlist-item-title {
						font-size: 12px;
						line-height: 1.3;
						margin-bottom: 3px;
					}

					.playlist-date {
						font-size: 10px;
					}
				}
			`}</style>
		</>
	)
}
