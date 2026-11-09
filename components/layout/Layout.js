import { useEffect, useState } from "react"
import BackToTop from '../elements/BackToTop'
import Breadcrumb from './Breadcrumb'
import PageHead from './PageHead'
import Sidebar from './Sidebar'
import Footer1 from './footer/Footer1'
import Footer2 from "./footer/Footer2"
import Footer3 from "./footer/Footer3"
import Footer4 from "./footer/Footer4"
import Footer5 from "./footer/Footer5"
import Footer6 from "./footer/Footer6"
import Header1 from './header/Header1'
import Header2 from "./header/Header2"
import Header3 from "./header/Header3"
import Header4 from "./header/Header4"
import Header5 from "./header/Header5"
import Header6 from "./header/Header6"
import Header7 from "./header/Header7"
import Header8 from "./header/Header8"
import Header9 from "./header/Header9"
import Footer12 from "./footer/Footer12"
import Footer11 from "./footer/Footer11"
import Footer10 from "./footer/Footer10"
import Footer9 from "./footer/Footer9"
import Footer8 from "./footer/Footer8"
import Footer7 from "./footer/Footer7"

export default function Layout({ headerStyle, footerStyle, headTitle, breadcrumbTitle, children, rtl, settings: propSettings }) {
    const [scroll, setScroll] = useState(0)
    const [settings, setSettings] = useState(propSettings || {})
    // Moblile Menu
    const [isMobileMenu, setMobileMenu] = useState(false)
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu)

    useEffect(() => {
        if (!propSettings) {
            fetch('/api/settings')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.settings) {
                        setSettings(data.settings)
                    }
                })
                .catch(console.error)
        } else {
            setSettings(propSettings)
        }
    }, [propSettings])

    useEffect(() => {
        const WOW = require('wowjs')
        window.wow = new WOW.WOW({
            live: false
        })
        window.wow.init()

        const handleScroll = () => {
            const scrollCheck = window.scrollY > 100
            setScroll(scrollCheck)
        }

        document.addEventListener("scroll", handleScroll)

        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return (
        <>
            <PageHead headTitle={headTitle} settings={settings} />
            <div className="ta-main-wrapper" dir={rtl?"rtl":""}>

                <BackToTop />

                <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} />

                <div className={`ta-overlay ${isMobileMenu? "is-open":""}`} onClick={handleMobileMenu}/>

                <Sidebar isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings}/>

                <main>
                    {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

                    {children}
                </main>

                <Footer1 settings={settings} />
            </div>

        </>
    )
}
