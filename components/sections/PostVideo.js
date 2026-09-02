import VideoPopup from "../elements/VideoPopup"

export default function PostVideo() {
    return (
        <>
            <div className="thumb ta-brd-b-none">
                <img src="/assets/img/blog/blog-details--big-1.webp" alt="blog" />
                <div className="ta-blog-box__cats ta-blog-box__cats--right">
                    <a href="#0">video</a>
                </div>
                <span className="post-format-icon"><i className="fas fa-video" /></span>
                <VideoPopup style={1} />
            </div>

        </>
    )
}
