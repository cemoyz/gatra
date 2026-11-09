import Link from "next/link"

export default function Breadcrumb({ breadcrumbTitle }) {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <div className="page-header-content">
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/blog">Berita</Link></li>
                            <li className="active"><span>{breadcrumbTitle || "Arsip"}</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
