

export default function Subscribe4() {
    return (
        <>
            <section className="subscribe-section bg-grey-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="subscribe-content">
                                <h3 className="title">Get the best blog stories into your inbox!</h3>
                                <div className="subscribe-form">
                                    <input type="email" id="email" name="email" className="form-control" placeholder="Enter Your Email" />
                                    <button id="submit" className="default-btn" type="submit">
                                        <i className="lab la-telegram-plane" />Subscribe
                                    </button>
                                    <div className="form-icon">
                                        <i className="las la-envelope" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="subscribe-thumb">
                                <div className="line" />
                                <img src="/assets/img/images/subscribe-img.png" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
