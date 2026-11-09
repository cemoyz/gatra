import Link from "next/link"
import { getImageUrl } from "@/lib/imageUtils"

export default function KompasVideoSection({ posts = [] }) {
  const explicitVideos = posts.filter(p => p.postType === 'video' || p.videoUrl)
  const videoPosts = explicitVideos.length >= 4 
    ? explicitVideos.slice(0, 4) 
    : (posts.length > 16 ? posts.slice(12, 16) : posts.slice(4, 8))

  if (videoPosts.length === 0) return null

  const mainVideo = videoPosts[0]
  const otherVideos = videoPosts.slice(1, 4)

  return (
    <section className="kompas-video-section">
      <div className="container">
        {/* Header */}
        <div className="video-section-header">
          <div className="video-title-wrap">
            <span className="video-icon-badge">
              <i className="fas fa-play"></i>
            </span>
            <h3 className="video-section-title">KOMPAS VIDEO</h3>
          </div>
          <Link href="/blog?postType=video" className="video-more-link">
            Lihat Video Lainnya <i className="fas fa-chevron-right ms-1"></i>
          </Link>
        </div>

        {/* Video Grid */}
        <div className="row g-4 align-items-stretch">
          {/* Main Video */}
          {mainVideo && (
            <div className="col-lg-7">
              <div className="main-video-card">
                <Link href={`/blog/${mainVideo.slug || mainVideo.id}`} className="main-video-thumbnail">
                  <img
                    src={getImageUrl(mainVideo.img)}
                    alt={mainVideo.title}
                    className="video-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/img/blog/blog-2-6.webp"
                    }}
                  />
                  <div className="video-play-overlay">
                    <span className="play-button-big">
                      <i className="fas fa-play"></i>
                    </span>
                  </div>
                  <span className="video-duration-badge">
                    <i className="far fa-clock me-1"></i> 03:45
                  </span>
                </Link>
                <div className="main-video-info">
                  <span className="video-cat-badge">{mainVideo.category?.name || (typeof mainVideo.category === 'string' ? mainVideo.category : "Video")}</span>
                  <h4 className="main-video-title">
                    <Link href={`/blog/${mainVideo.slug || mainVideo.id}`}>
                      {mainVideo.title}
                    </Link>
                  </h4>
                  {mainVideo.excerpt && (
                    <p className="main-video-excerpt">{mainVideo.excerpt}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 3 Secondary Videos */}
          <div className="col-lg-5">
            <div className="side-video-list">
              {otherVideos.map((video) => (
                <div key={video.id} className="side-video-item">
                  <Link href={`/blog/${video.slug || video.id}`} className="side-video-thumb">
                    <img
                      src={getImageUrl(video.img)}
                      alt={video.title}
                      className="side-video-img"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/img/blog/blog-2-7.webp"
                      }}
                    />
                    <span className="side-play-btn">
                      <i className="fas fa-play"></i>
                    </span>
                    <span className="side-duration">02:15</span>
                  </Link>
                  <div className="side-video-text">
                    <span className="side-video-cat">{video.category?.name || (typeof video.category === 'string' ? video.category : "Video")}</span>
                    <h5 className="side-video-title">
                      <Link href={`/blog/${video.slug || video.id}`}>
                        {video.title}
                      </Link>
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .kompas-video-section {
          background: #0a1c3d;
          color: #ffffff;
          padding: 32px 0;
          margin: 30px 0;
        }
        .video-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding-bottom: 12px;
          margin-bottom: 22px;
        }
        .video-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .video-icon-badge {
          width: 28px;
          height: 28px;
          background: #dc2626;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #ffffff;
        }
        .video-section-title {
          font-size: 19px;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin: 0;
          color: #ffffff;
        }
        .video-more-link {
          font-size: 13px;
          font-weight: 600;
          color: #93c5fd;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .video-more-link:hover {
          color: #ffffff;
        }

        /* Main Video Card */
        .main-video-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .main-video-thumbnail {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 8px;
          background: #000000;
        }
        .video-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.88;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .main-video-thumbnail:hover .video-cover {
          transform: scale(1.03);
          opacity: 1;
        }
        .video-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .play-button-big {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: rgba(220, 38, 38, 0.92);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          padding-left: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          transition: transform 0.2s ease;
        }
        .main-video-thumbnail:hover .play-button-big {
          transform: scale(1.1);
          background: #ef4444;
        }
        .video-duration-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.75);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .main-video-info {
          padding-top: 14px;
        }
        .video-cat-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: #38bdf8;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .main-video-title {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.35;
          margin-bottom: 8px;
        }
        .main-video-title a {
          color: #ffffff;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .main-video-title a:hover {
          color: #60a5fa;
        }
        .main-video-excerpt {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Side Video List */
        .side-video-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
          justify-content: space-between;
        }
        .side-video-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .side-video-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .side-video-thumb {
          position: relative;
          display: block;
          width: 140px;
          min-width: 140px;
          aspect-ratio: 16 / 10;
          border-radius: 6px;
          overflow: hidden;
          background: #000;
        }
        .side-video-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .side-video-thumb:hover .side-video-img {
          transform: scale(1.05);
          opacity: 1;
        }
        .side-play-btn {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 16px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
        }
        .side-duration {
          position: absolute;
          bottom: 6px;
          right: 6px;
          background: rgba(0, 0, 0, 0.8);
          color: #ffffff;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 5px;
          border-radius: 3px;
        }
        .side-video-text {
          flex: 1;
        }
        .side-video-cat {
          font-size: 10.5px;
          font-weight: 700;
          color: #38bdf8;
          text-transform: uppercase;
          display: block;
          margin-bottom: 2px;
        }
        .side-video-title {
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.35;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .side-video-title a {
          color: #f1f5f9;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .side-video-title a:hover {
          color: #60a5fa;
        }
      `}</style>
    </section>
  )
}

