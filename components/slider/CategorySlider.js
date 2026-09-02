import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 6,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 6,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 6,
            spaceBetween: 30,
        },
    }
}

export default function CategorySlider() {
    return (
        <>
            <Swiper {...swiperOptions} className="ta-blog-cat-slider">
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-1.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Technology</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-2.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Development</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-3.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Photo</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-4.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Video</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-5.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Discover</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-6.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Weather</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-1.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Technology</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-2.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Development</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-3.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Photo</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-4.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Video</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-5.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Discover</Link>
                </SwiperSlide>
                <SwiperSlide className="ta-cat-box position-relative">
                    <div className="thumb ta-stroke ">
                        <img src="/assets/img/blog-cat/blog-cat-6.webp" alt="img" />
                    </div>
                    <Link className="cat-link" href="#0">Weather</Link>
                </SwiperSlide>
            </Swiper>

        </>
    )
}
