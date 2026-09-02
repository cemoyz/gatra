import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.owl-next',
        prevEl: '.owl-prev',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
}
export default function PostGallery() {
    return (
        <>
            <Swiper {...swiperOptions} className="ta-owl-nav ta-owl-nav__middle position-relative">
                <SwiperSlide className="thumb ta-brd-b-none">
                    <img src="/assets/img/blog/blog-details--big-1.webp" alt="blog" />
                    <div className="ta-blog-box__cats ta-blog-box__cats--right">
                        <a href="#0">gallery</a>
                    </div>
                    <span className="post-format-icon"><i className="fas fa-images" /></span>
                </SwiperSlide>
                <SwiperSlide className="thumb ta-brd-b-none">
                    <img src="/assets/img/blog/blog-details--big-1.webp" alt="blog" />
                    <div className="ta-blog-box__cats ta-blog-box__cats--right">
                        <a href="#0">gallery</a>
                    </div>
                    <span className="post-format-icon"><i className="fas fa-images" /></span>
                </SwiperSlide>
                <div className="owl-nav">
                    <div className="owl-prev" style={{ zIndex: "999" }}>
                        <i className="far fa-long-arrow-left" />
                    </div>
                    <div className="owl-next" style={{ zIndex: "999" }}>
                        <i className="far fa-long-arrow-right" />
                    </div>
                </div>

            </Swiper>

        </>
    )
}
