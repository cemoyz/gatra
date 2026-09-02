import Link from "next/link"

export default function InstagramFeed() {
    return (
        <>
            <div className="ta-instafeed-section pt-90">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="ta-section-heading ta-section-heading__with-border text-center mb-45">
                                <h2 className="ta-title mb-0">@Hoom.Design
                                    <span className="border-shape" />
                                    <span className="border-shape" />
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row ta-column-gap-20 ta-column-5 mt-none-20">
                        <div className="col-xl-2 mt-20">
                            <div className="single-insta-feed ta-stroke">
                                <Link href="assets/img/insta/insta-big-1.webp" data-rel="lightcase">
                                    <img src="/assets/img/insta/insta-big-1.webp" alt="img" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-2 mt-20">
                            <div className="single-insta-feed ta-stroke">
                                <Link href="assets/img/insta/insta-big-2.webp" data-rel="lightcase">
                                    <img src="/assets/img/insta/insta-big-2.webp" alt="img" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-2 mt-20">
                            <div className="single-insta-feed ta-stroke">
                                <Link href="assets/img/insta/insta-big-3.webp" data-rel="lightcase">
                                    <img src="/assets/img/insta/insta-big-3.webp" alt="img" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-2 mt-20">
                            <div className="single-insta-feed ta-stroke">
                                <Link href="assets/img/insta/insta-big-4.webp" data-rel="lightcase">
                                    <img src="/assets/img/insta/insta-big-4.webp" alt="img" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-2 mt-20">
                            <div className="single-insta-feed ta-stroke">
                                <Link href="assets/img/insta/insta-big-5.webp" data-rel="lightcase">
                                    <img src="/assets/img/insta/insta-big-5.webp" alt="img" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
