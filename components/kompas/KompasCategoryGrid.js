import Link from "next/link"
import { getImageUrl } from "@/lib/imageUtils"

export default function KompasCategoryGrid({ title = "TEKNO", slug = "tekno", color = "#0077d7", posts = [] }) {
  if (!posts || posts.length === 0) return null

  const lead = posts[0]
  const sidePosts = posts.slice(1, 4)

  const formatRelativeTime = (dateStr) => {
    if (!dateStr) return "Baru saja"
    try {
      const diffMs = Date.now() - new Date(dateStr).getTime()
      const diffMins = Math.floor(diffMs / 60000)
      if (diffMins < 60) return `${Math.max(1, diffMins)} menit lalu`
      const diffHours = Math.floor(diffMins / 60)
      if (diffHours < 24) return `${diffHours} jam lalu`
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays} hari lalu`
    } catch {
      return "Baru saja"
    }
  }

  return (
    <div className="kompas-channel-block">
      {/* Channel Header */}
      <div className="channel-header">
        <div className="channel-title-box">
          <span className="channel-bar" style={{ backgroundColor: color }}></span>
          <h3 className="channel-name" style={{ color: color }}>
            {title}
          </h3>
        </div>
        <Link href={`/blog-filter-category?category=${slug}`} className="channel-more-link">
          Lihat Semua <i className="fas fa-chevron-right ms-1"></i>
        </Link>
      </div>

      <div className="row g-3">
        {/* 1 Lead Card */}
        {lead && (
          <div className="col-lg-6">
            <div className="channel-lead-card">
              <Link href={`/blog/${lead.slug || lead.id}`} className="lead-img-box">
                <img
                  src={getImageUrl(lead.img)}
                  alt={lead.title}
                  className="lead-img"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/img/blog/blog-2-4.webp"
                  }}
                />
              </Link>
              <div className="lead-body">
                <h4 className="lead-title">
                  <Link href={`/blog/${lead.slug || lead.id}`}>
                    {lead.title}
                  </Link>
                </h4>
                {lead.excerpt && (
                  <p className="lead-excerpt">
                    {lead.excerpt}
                  </p>
                )}
                <span className="lead-time" suppressHydrationWarning>
                  {formatRelativeTime(lead.createdAt)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3 Stacked Horizontal Cards */}
        <div className="col-lg-6">
          <div className="channel-side-list">
            {sidePosts.map((post) => (
              <div key={post.id} className="channel-mini-item">
                <Link href={`/blog/${post.slug || post.id}`} className="mini-img-box">
                  <img
                    src={getImageUrl(post.img)}
                    alt={post.title}
                    className="mini-img"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/img/blog/blog-2-5.webp"
                    }}
                  />
                </Link>
                <div className="mini-body">
                  <h5 className="mini-title">
                    <Link href={`/blog/${post.slug || post.id}`}>
                      {post.title}
                    </Link>
                  </h5>
                  <span className="mini-time" suppressHydrationWarning>
                    {formatRelativeTime(post.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .kompas-channel-block {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 18px;
          margin-bottom: 24px;
        }
        .channel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 10px;
          margin-bottom: 16px;
        }
        .channel-title-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .channel-bar {
          display: inline-block;
          width: 5px;
          height: 18px;
          border-radius: 3px;
        }
        .channel-name {
          font-size: 17px;
          font-weight: 800;
          margin: 0;
          letter-spacing: 0.5px;
        }
        .channel-more-link {
          font-size: 12.5px;
          font-weight: 600;
          color: #64748b;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .channel-more-link:hover {
          color: #0077d7;
        }

        /* Lead Card */
        .channel-lead-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .lead-img-box {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-radius: 6px;
          background: #f1f5f9;
          margin-bottom: 10px;
        }
        .lead-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .lead-img-box:hover .lead-img {
          transform: scale(1.04);
        }
        .lead-title {
          font-size: 16px;
          font-weight: 700;
          line-height: 1.35;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .lead-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .lead-title a:hover {
          color: #0077d7;
        }
        .lead-excerpt {
          font-size: 13px;
          color: #475569;
          line-height: 1.55;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .lead-time {
          font-size: 11.5px;
          color: #94a3b8;
        }

        /* Side List */
        .channel-side-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .channel-mini-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }
        .channel-mini-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .mini-img-box {
          display: block;
          width: 110px;
          min-width: 110px;
          aspect-ratio: 16 / 11;
          overflow: hidden;
          border-radius: 6px;
          background: #f1f5f9;
        }
        .mini-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .mini-img-box:hover .mini-img {
          transform: scale(1.05);
        }
        .mini-body {
          flex: 1;
        }
        .mini-title {
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.35;
          color: #1e293b;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .mini-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .mini-title a:hover {
          color: #0077d7;
        }
        .mini-time {
          font-size: 11px;
          color: #94a3b8;
        }
      `}</style>
    </div>
  )
}

