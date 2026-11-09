import Link from "next/link"

export default function Breadcrumb({ breadcrumbTitle }) {
    if (!breadcrumbTitle) return null

    return (
        <div className="kompas-breadcrumb-bar">
            <div className="kompas-container">
                <nav className="kompas-bc-nav" aria-label="Breadcrumb">
                    <Link href="/" className="bc-link">KOMPAS.com</Link>
                    <span className="bc-sep">&gt;</span>
                    <span className="bc-current">{breadcrumbTitle}</span>
                </nav>
            </div>
            <style jsx>{`
                .kompas-breadcrumb-bar {
                    background: #ffffff;
                    border-bottom: 1px solid #f1f5f9;
                    padding: 10px 0;
                    font-family: 'Roboto', -apple-system, sans-serif;
                }
                .kompas-container {
                    max-width: 1180px;
                    margin: 0 auto;
                    padding: 0 16px;
                }
                .kompas-bc-nav {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                }
                .bc-link {
                    color: #64748b;
                    text-decoration: none;
                }
                .bc-link:hover {
                    color: #0077d7;
                }
                .bc-sep {
                    color: #94a3b8;
                }
                .bc-current {
                    color: #0f172a;
                    font-weight: 600;
                }
            `}</style>
        </div>
    )
}
