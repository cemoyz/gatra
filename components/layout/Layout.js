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

                {!headerStyle && <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} />}
                {headerStyle == 1 ? <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} /> : null}
                {headerStyle == 2 ? <Header2 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} /> : null}
                {headerStyle == 3 ? <Header3 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} /> : null}
                {headerStyle == 4 ? <Header4 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} /> : null}
                {headerStyle == 5 ? <Header5 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} /> : null}
                {headerStyle == 6 ? <Header6 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} /> : null}
                {headerStyle == 7 ? <Header7 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} /> : null}
                {headerStyle == 8 ? <Header8 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} /> : null}
                {headerStyle == 9 ? <Header9 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings} /> : null}

                <div className={`ta-overlay ${isMobileMenu? "is-open":""}`} onClick={handleMobileMenu}/>

                <Sidebar isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} settings={settings}/>

                <main>
                    {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

                    {children}
                </main>

                {!footerStyle && < Footer1 settings={settings} />}
                {footerStyle == 1 ? < Footer1 settings={settings} /> : null}
                {footerStyle == 2 ? < Footer2 settings={settings} /> : null}
                {footerStyle == 3 ? < Footer3 settings={settings} /> : null}
                {footerStyle == 4 ? < Footer4 settings={settings} /> : null}
                {footerStyle == 5 ? < Footer5 settings={settings} /> : null}
                {footerStyle == 6 ? < Footer6 settings={settings} /> : null}
                {footerStyle == 7 ? < Footer7 settings={settings} /> : null}
                {footerStyle == 8 ? < Footer8 settings={settings} /> : null}
                {footerStyle == 9 ? < Footer9 settings={settings} /> : null}
                {footerStyle == 10 ? < Footer10 settings={settings} /> : null}
                {footerStyle == 11 ? < Footer11 settings={settings} /> : null}
                {footerStyle == 12 ? < Footer12 settings={settings} /> : null}
            </div>

        </>
    )
}
