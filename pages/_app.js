import Preloader from "@/components/elements/Preloader"
import GoogleAnalytics from "@/components/elements/GoogleAnalytics"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { SettingsProvider } from "@/context/SettingsContext"
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-modal-video/css/modal-video.css";

import "@/public/assets/css/bootstrap.min.css"
import "@/public/assets/css/font-awesome.min.css"
import "@/public/assets/css/line-awesome.min.css"
import "@/public/assets/css/lightcase.css"
import "@/public/assets/css/meanmenu.min.css"
import "@/public/assets/css/nice-select.min.css"
import "@/public/assets/css/owl.carousel.min.css"
import "@/public/assets/css/animate.min.css"
import "@/public/assets/css/main.css"
import "@/public/assets/css/common-style.css"
import "@/public/assets/css/posty-color.css"
import "@/public/assets/css/posty.css"
import "@/public/assets/css/dashboard.css"

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)

        let timer
        const handleStart = (url) => {
            if (url !== router.asPath) {
                const bar = document.getElementById('global-route-bar')
                if (bar) {
                    bar.style.transition = 'transform 0.4s ease, opacity 0.15s ease'
                    bar.style.opacity = '1'
                    bar.style.transform = 'scaleX(0.7)'
                }
            }
        }
        const handleComplete = () => {
            const bar = document.getElementById('global-route-bar')
            if (bar) {
                bar.style.transition = 'transform 0.15s ease, opacity 0.2s ease'
                bar.style.transform = 'scaleX(1)'
                clearTimeout(timer)
                timer = setTimeout(() => {
                    if (bar) {
                        bar.style.opacity = '0'
                        setTimeout(() => {
                            if (bar) {
                                bar.style.transition = 'none'
                                bar.style.transform = 'scaleX(0)'
                            }
                        }, 200)
                    }
                }, 150)
            }
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            clearTimeout(timer)
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router])

    return (
        <SettingsProvider>
            <GoogleAnalytics />
            {/* Top Smooth Route Loading Progress Bar */}
            <div
                id="global-route-bar"
                className="global-route-progressbar"
                aria-hidden="true"
            />

            <Component {...pageProps} />
            {loading && <Preloader />}

            <style jsx global>{`
                /* Smooth Global Route Loading Bar */
                .global-route-progressbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2.5px;
                    background: linear-gradient(90deg, #da0105, #f97316, #da0105);
                    background-size: 200% 100%;
                    z-index: 999999;
                    opacity: 0;
                    transform: scaleX(0);
                    transform-origin: left center;
                    pointer-events: none;
                }
            `}</style>
        </SettingsProvider>
    )
}

export default MyApp
