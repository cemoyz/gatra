import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { getImageUrl } from "@/lib/imageUtils"

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
            spaceBetween: 20,
        },
        575: {
            slidesPerView: 2,
            spaceBetween: 20,
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

const defaultBrandLogos = [
    { name: 'Mitra 1', img: '/assets/img/brand/brand-1.webp', url: '' },
    { name: 'Mitra 2', img: '/assets/img/brand/brand-2.webp', url: '' },
    { name: 'Mitra 3', img: '/assets/img/brand/brand-3.webp', url: '' },
    { name: 'Mitra 4', img: '/assets/img/brand/brand-4.webp', url: '' },
    { name: 'Mitra 5', img: '/assets/img/brand/brand-5.webp', url: '' },
]

export default function BrandSlider1({ brands }) {
    const list = brands && brands.length > 0 ? brands : defaultBrandLogos
    // Ensure sufficient slides for smooth Swiper infinite loop
    let slides = list
    if (list.length > 0 && list.length < 6) {
        slides = [...list, ...list, ...list]
    }

    return (
        <Swiper {...swiperOptions} className="ta-brand-slider-wrapper" data-ta-brand-slider>
            {slides.map((brand, idx) => (
                <SwiperSlide
                    key={idx}
                    className="item ta-stroke"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '85px',
                        padding: '10px 15px'
                    }}
                >
                    {brand.url ? (
                        <a href={brand.url} target="_blank" rel="noopener noreferrer" title={brand.name || 'Media Partner'}>
                            <img
                                src={getImageUrl(brand.img, '/assets/img/brand/brand-1.webp')}
                                alt={brand.name || `Brand ${idx + 1}`}
                                onError={(e) => { e.currentTarget.src = '/assets/img/brand/brand-1.webp' }}
                                style={{ maxHeight: '55px', maxWidth: '140px', objectFit: 'contain' }}
                            />
                        </a>
                    ) : (
                        <img
                            src={getImageUrl(brand.img, '/assets/img/brand/brand-1.webp')}
                            alt={brand.name || `Brand ${idx + 1}`}
                            onError={(e) => { e.currentTarget.src = '/assets/img/brand/brand-1.webp' }}
                            style={{ maxHeight: '55px', maxWidth: '140px', objectFit: 'contain' }}
                        />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

