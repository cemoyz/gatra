import Preloader from "@/components/elements/Preloader"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

import "@/public/assets/css/bootstrap.min.css"
import "@/public/assets/css/font-awesome.min.css"
import "@/public/assets/css/lightcase.css"
import "@/public/assets/css/meanmenu.min.css"
import "@/public/assets/css/nice-select.min.css"
import "@/public/assets/css/owl.carousel.min.css"
import "@/public/assets/css/animate.min.css"
import "@/public/assets/css/main.css"
import "@/public/assets/css/dashboard.css"

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [pageTransitioning, setPageTransitioning] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)

        const handleStart = (url) => {
            if (url !== router.asPath) {
                setPageTransitioning(true)
            }
        }
        const handleComplete = () => {
            setPageTransitioning(false)
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router])

    return (
        <>
            {/* Top Smooth Route Loading Progress Bar */}
            <div
                className={`global-route-progressbar ${pageTransitioning ? 'active' : ''}`}
                aria-hidden="true"
            />

            {!loading ? (
                <div key={router.asPath} className="page-transition-wrapper">
                    <Component {...pageProps} />
                </div>
            ) : (
                <Preloader />
            )}

            <style jsx global>{`
                /* Smooth Global Route Loading Bar */
                .global-route-progressbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #da0105, #f97316, #da0105);
                    background-size: 200% 100%;
                    z-index: 999999;
                    opacity: 0;
                    transform: scaleX(0);
                    transform-origin: left center;
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
                    pointer-events: none;
                }

                .global-route-progressbar.active {
                    opacity: 1;
                    transform: scaleX(0.85);
                    animation: progressBarPulse 1.2s ease infinite;
                }

                @keyframes progressBarPulse {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }

                /* Seamless Smooth Page Fade & Slide Up Transition */
                @keyframes pageFadeSlideIn {
                    0% {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .page-transition-wrapper {
                    animation: pageFadeSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    will-change: opacity, transform;
                    width: 100%;
                }
            `}</style>
        </>
    )
}

export default MyApp
