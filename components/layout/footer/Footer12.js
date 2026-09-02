import Newsletter1 from "@/components/sections/Newsletter1"
import Link from "next/link"

export default function Footer12() {
    return (
        <div>
            <footer className="ta-footer">
                <Newsletter1 />
                <div className="container pt-100">
                    <div className="row mt-none-30">
                        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title">شركة</h4>
                                <ul>
                                    <li><Link href="/about-us">معلومات عنا</Link></li>
                                    <li><Link href="/contact">يضعط</Link></li>
                                    <li><Link href="/contact">الدعم</Link></li>
                                    <li><Link href="/contact">ابقى على تواصل</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title">موارد</h4>
                                <ul>
                                    <li><Link href="/contact">الترقيات</Link></li>
                                    <li><Link href="/about-us">البنود و الظروف</Link></li>
                                    <li><Link href="/about-us">صفحة التعليمات</Link></li>
                                    <li><Link href="/blog-details-video">فيديو</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title">طقم الصحافة</h4>
                                <ul>
                                    <li><Link href="/about-us">شعار</Link></li>
                                    <li><Link href="/about-us">لافتة الإعلانات</Link></li>
                                    <li><Link href="/about-us">لوحة الألوان</Link></li>
                                    <li><Link href="/about-us">مجموعات واجهة المستخدم</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title">الكلمات الشعبية</h4>
                                <div className="menu-list-wrapper">
                                    <ul>
                                        <li><Link href="/blog-filter-category">اعمال</Link></li>
                                        <li><Link href="/blog-filter-category">تقنية</Link></li>
                                        <li><Link href="/blog-filter-category">واجهة المستخدم</Link></li>
                                        <li><Link href="/blog-filter-category">رياضات</Link></li>
                                    </ul>
                                    <ul>
                                        <li><Link href="/blog-filter-category">واجهة المستخدم</Link></li>
                                        <li><Link href="/blog-filter-category">متحف</Link></li>
                                        <li><Link href="/blog-filter-category">فيلم</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-8 col-sm-10 col-md-8 mt-30">
                            <div className="ta-footer-widget widget">
                                <div className="insta-gallery">
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-1.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-2.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-3.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-4.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-5.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-6.webp" alt="img" /></div>
                                </div>
                                <h6 className="title">@Hoom.Design</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ta-footer__bottom pt-100 pb-6">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="ta-bottom-wrapper ta-stroke">
                                    <div className="ta-bottom-left">
                                        <p>حقوق النشر والتصميم
                                            <Link href="https://themeforest.net/user/AliThemes.com"> AliThemes.com</Link>
                                        </p>
                                    </div>
                                    <div className="ta-bottom-right">
                                        <p>نشرت مع <Link href="/#0">Bootstrap</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </div>
    )
}
