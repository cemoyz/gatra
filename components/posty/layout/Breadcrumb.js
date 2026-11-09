import Link from "next/link"

export default function Breadcrumb({ breadcrumbTitle }) {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <div className="page-header-content">
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="#">Pages</Link></li>
                            <li className="active"><Link href="/">About Us</Link></li>
                        </ul>
                    </div>
                </div>
            </section>


        </>
    )
}
