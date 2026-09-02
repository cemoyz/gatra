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
    loop: true
}


export default function PostGallerySlider1() {
    return (
        <>
            <Swiper {...swiperOptions} className="ta-post-gallery ">
                <SwiperSlide className="item">
                    <img src="/assets/img/blog/blog-gallery-1.webp" alt="blog" />
                </SwiperSlide>
                <SwiperSlide className="item">
                    <img src="/assets/img/blog/blog-gallery-2.webp" alt="blog" />
                </SwiperSlide>
                <SwiperSlide className="item">
                    <img src="/assets/img/blog/blog-gallery-3.webp" alt="blog" />
                </SwiperSlide>
                <SwiperSlide className="item">
                    <img src="/assets/img/blog/blog-gallery-4.webp" alt="blog" />
                </SwiperSlide>
            </Swiper>
        </>
    )
}
