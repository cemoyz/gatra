import Link from "next/link"
import SocialLinks from "@/components/elements/SocialLinks"

export default function Header9({ scroll,handleMobileMenu }) {
    return (
        <>
            <header className="ta-header">
                <div className="ta-header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 align-self-center d-none d-md-block">
                                <SocialLinks className="d-flex align-items-center" />
                            </div>
                            <div className="col-md-6 align-self-center">
                                <div className="ta-header__top__center">
                                    <div className="ta-logo">
                                        <Link href="/">
                                            <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="logo" />
                                            <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="logo" />
                                        </Link>
                                        <span>موضوع المدونة الشخصية من الجيل التالي</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 align-self-center d-none d-md-block">
                                <div className="ta-header__top__right">
                                    <Link href="/contact" className="ta-button">الإشتراك <i className="fa fa-paper-plane" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`ta-header__menuarea ${scroll ? "ta-sticky-header" : ""}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="menu-area-wrapper ta-stroke">
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-1 col-md-6 col-4 align-self-center">
                                            <button className="side-info-trigger" onClick={handleMobileMenu}>
                                                <img src="/assets/img/icons/side-info-icon.webp" alt="" />
                                            </button>
                                        </div>
                                        <div className="col-xl-6 col-lg-9 d-none d-lg-block align-self-center">
                                            <div className="ta-main-menu text-center">
                                                <nav id="ta-navbar">
                                                    <ul className="justify-content-center">
                                                        <li className="menu-item-has-children"><Link href="/">مسكن</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link href="/">مسكن 01</Link></li>
                                                                <li><Link href="/index-2">مسكن 02</Link></li>
                                                                <li><Link href="/index-3">مسكن 03</Link></li>
                                                                <li><Link href="/index-4">مسكن 04</Link></li>
                                                                <li><Link href="/index-5">مسكن 05</Link></li>
                                                                <li><Link href="/index-6">مسكن 06</Link></li>
                                                                <li><Link href="/index-7">مسكن 07</Link></li>
                                                                <li><Link href="/index-8">مسكن 08</Link></li>
                                                                <li><Link href="/index-9">مسكن 09</Link></li>
                                                                <li><Link href="/index-10">مسكن 10</Link></li>
                                                                <li><Link href="/index-11">مسكن 11</Link></li>
                                                                <li><Link href="/index-11">مسكن RTL</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li className="menu-item-has-children ta-megamenu"><Link href="#0">ميزات المشاركة</Link>
                                                            <ul className="sub-menu">
                                                                <li>
                                                                    <div className="container-fluid p-0">
                                                                        <div className="row mt-none-20">
                                                                            <div className="col-lg-3 mt-20">
                                                                                <div className="menu-box">
                                                                                    <h4 className="menu-title">أنواع القوائم</h4>
                                                                                    <ul>
                                                                                        <li><Link href="/blog">الشريط الجانبي الأيمن</Link></li>
                                                                                        <li><Link href="/blog-left-sidebar">الشريط الجانبي الأيسر</Link></li>
                                                                                        <li><Link href="/blog-no-sidebar">لا يوجد شريط جانبي</Link></li>
                                                                                        <li><Link href="/blog-info-right">معلومات صحيحة</Link></li>
                                                                                        <li><Link href="/blog-compact">المدمج</Link></li>
                                                                                        <li><Link href="/blog-category-list">قائمة الفئات</Link></li>
                                                                                        <li><Link href="/blog-slider">المنزلق</Link></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-3 mt-20">
                                                                                <div className="menu-box">
                                                                                    <h4 className="menu-title">أنواع التخطيط</h4>
                                                                                    <ul>
                                                                                        <li><Link href="/blog-two-column">عمودين</Link></li>
                                                                                        <li><Link href="/blog-three-column">ثلاثة أعمدة</Link></li>
                                                                                        <li><Link href="/blog-three-column-wide">عرض ثلاثة أعمدة</Link></li>
                                                                                        <li><Link href="/blog-four-column">أربعة أعمدة</Link></li>
                                                                                        <li><Link href="/blog-four-column-wide">عرض أربعة أعمدة</Link></li>
                                                                                        <li><Link href="/blog-five-column">عرض خمسة أعمدة</Link></li>
                                                                                        <li><Link href="/blog-six-column">عرض ستة أعمدة</Link></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-3 mt-20">
                                                                                <div className="menu-box">
                                                                                    <h4 className="menu-title">أنواع المنشورات</h4>
                                                                                    <ul>
                                                                                        <li><Link href="/blog-details-quote">اقتباس آخر</Link></li>
                                                                                        <li><Link href="/blog-details-link">رابط آخر</Link></li>
                                                                                        <li><Link href="/blog-details-audio">مشاركة الصوت</Link></li>
                                                                                        <li><Link href="/blog-details-gallery">معرض بوست</Link></li>
                                                                                        <li><Link href="/blog-details-video">مشاركة الفيديو</Link></li>
                                                                                        <li><Link href="/blog-details-status">نشر الحالة</Link></li>
                                                                                        <li><Link href="/blog-details">ستاندرد بوست</Link></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-3 mt-20">
                                                                                <div className="menu-box">
                                                                                    <h4 className="menu-title">أرشفة الصفحات</h4>
                                                                                    <ul>
                                                                                        <li><Link href="/blog-filter-category">تصفية حسب الفئة</Link></li>
                                                                                        <li><Link href="/blog-filter-tag">تصفية حسب العلامة</Link></li>
                                                                                        <li><Link href="/blog-filter-date">تصفية حسب التاريخ</Link></li>
                                                                                        <li><Link href="/blog">مشاهدة جميع المشاركات</Link></li>
                                                                                        <li><Link href="/blog-filter-search">نتائج البحث</Link></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="menu-item-has-children"><Link href="/blog">الصفحات</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link href="/about-us">معلومات عنا</Link></li>
                                                                <li><Link href="/blog">مدونة او مذكرة</Link></li>
                                                                <li><Link href="/blog-details">تفاصيل المدونة</Link></li>
                                                                <li><Link href="/blog-details-left-sidebar">تفاصيل المدونة الشريط الجانبي الأيسر</Link></li>
                                                                <li><Link href="/blog-details-no-sidebar">تفاصيل المدونة لا يوجد شريط جانبي</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li><Link href="/contact">اتصال</Link></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-2 col-md-6 col-8 align-self-center">
                                            <div className="ta-header__menuarea__right">
                                                <div className="ta-search">
                                                    <form action="#">
                                                        <div>
                                                            <button type="submit"><i className="fa fa-search" /></button>
                                                            <input type="text" placeholder="يبحث" />
                                                            <span className="ta-underline" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shape"><img src="/assets/img/shape/menu-shape-1.webp" alt="" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
