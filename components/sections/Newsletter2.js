
export default function Newsletter2() {
    return (
        <>
            <div className="ta-newsletter-area pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="ta-newsletter-wrapper ta-stroke">
                                <div className="ta-inner-wrapper fix pt-100 pb-100 position-relative">
                                    <div className="row">
                                        <div className="col-xl-5 offset-xl-1">
                                            <div className="ta-section-heading">
                                                <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="logo" />
                                                <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="logo" />
                                                <h2 className="ta-title mt-50">Get every weekly updates</h2>
                                                <p>Start your perfect  light-weight news or magazine with Hoom, the
                                                    premium Bootstrap theme you’ve been looking for.</p>
                                            </div>
                                            <div className="ta-newsletter-form ta-input-field mt-40">
                                                <form>
                                                    <div>
                                                        <input type="email" name="email" id="email" placeholder="Business email" />
                                                        <i className="fa fa-envelope-open" />
                                                        <button className="ta-button" type="submit">Subscribe <i className="fa fa-paper-plane" /></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="thumb-bg position-absloute">
                                        <img src="/assets/img/bg/newsletter-bg-1.webp" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
