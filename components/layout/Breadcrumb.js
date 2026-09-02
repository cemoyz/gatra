import Link from "next/link"

export default function Breadcrumb({ breadcrumbTitle }) {
    return (
        <>
            <div className="ta-breadcrumb-section pt-35">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="ta-breadcrumb breadcrumbs">
                                <ul className="list-unstyled d-flex align-items-center">
                                    <li className="ta-item duxinbcrumb-begin">
                                        <Link href="/"><span>Home</span></Link>
                                    </li>
                                    <li className="ta-item">
                                        <span>Pages </span>
                                    </li>
                                    <li className="ta-item duxinbcrumb-end">
                                        <span>{breadcrumbTitle} </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
