import { useEffect, useState } from "react"
import BackToTop from '../elements/BackToTop'
import ThemeSwitch from "../elements/ThemeSwitch"
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

export default function Layout({ headerStyle, footerStyle, headTitle, breadcrumbTitle, children, rtl }) {
    const [scroll, setScroll] = useState(0)
    // Moblile Menu
    const [isMobileMenu, setMobileMenu] = useState(false)
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu)

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
            <PageHead headTitle={headTitle}/>
            <div className="ta-main-wrapper" dir={rtl?"rtl":""}>

                <ThemeSwitch />
                <BackToTop />

                {!headerStyle && <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />}
                {headerStyle == 1 ? <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
                {headerStyle == 2 ? <Header2 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
                {headerStyle == 3 ? <Header3 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
                {headerStyle == 4 ? <Header4 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
                {headerStyle == 5 ? <Header5 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
                {headerStyle == 6 ? <Header6 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
                {headerStyle == 7 ? <Header7 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
                {headerStyle == 8 ? <Header8 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
                {headerStyle == 9 ? <Header9 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}

                <div className={`ta-overlay ${isMobileMenu? "is-open":""}`} onClick={handleMobileMenu}/>

                <Sidebar isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}/>

                <main>
                    {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

                    {children}
                </main>

                {!footerStyle && < Footer1 />}
                {footerStyle == 1 ? < Footer1 /> : null}
                {footerStyle == 2 ? < Footer2 /> : null}
                {footerStyle == 3 ? < Footer3 /> : null}
                {footerStyle == 4 ? < Footer4 /> : null}
                {footerStyle == 5 ? < Footer5 /> : null}
                {footerStyle == 6 ? < Footer6 /> : null}
                {footerStyle == 7 ? < Footer7 /> : null}
                {footerStyle == 8 ? < Footer8 /> : null}
                {footerStyle == 9 ? < Footer9 /> : null}
                {footerStyle == 10 ? < Footer10 /> : null}
                {footerStyle == 11 ? < Footer11 /> : null}
                {footerStyle == 12 ? < Footer12 /> : null}
            </div>

        </>
    )
}
