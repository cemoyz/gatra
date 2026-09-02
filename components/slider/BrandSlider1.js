import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 5,
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
            slidesPerView: 3,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
    }
}

export default function BrandSlider1() {
    return (
        <>

            <Swiper {...swiperOptions} className="ta-brand-slider-wrapper " data-ta-brand-slider>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-1.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-2.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-3.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-4.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-5.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-1.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-2.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-3.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-4.webp" alt="" />
                </SwiperSlide>
                <SwiperSlide className="item ta-stroke">
                    <img src="/assets/img/brand/brand-5.webp" alt="" />
                </SwiperSlide>
            </Swiper>

        </>
    )
}
