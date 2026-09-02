
export default function PostQuotes() {
    return (
        <>
            <div className="content d-flex flex-column ta-format-quote align-items-center text-center mb-45 ta-stroke">
                <div className="qa-icon mx-auto mb-25">
                    <img src="/assets/img/icons/quote-icon.webp" alt="" />
                </div>
                <div className="excerpt">
                    <blockquote>
                        <p>“ 20 years ago today, Steve introduced the world to
                            Mac. It set Apple on a new course  forever changed the
                            way people look at computers. ”</p>
                    </blockquote>
                </div>
                <div className="qupte-author d-flex align-items-center mx-auto mt-20">
                    <div className="qa-thumb mr-15">
                        <img src="/assets/img/author/qa-author.webp" alt="" />
                    </div>
                    <div className="qa-content">
                        <h6 className="name">Marlie H. Evens</h6>
                        <span className="designation">Head Of Idea</span>
                    </div>
                </div>
            </div>

        </>
    )
}
