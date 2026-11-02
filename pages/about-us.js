import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import Newsletter2 from "@/components/sections/Newsletter2"
import BrandSlider1 from "@/components/slider/BrandSlider1"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getImageUrl } from "@/lib/imageUtils"
import prisma from "@/lib/prisma"

const defaultAboutTabs = [
    {
        title: 'Visi Kami',
        content: 'Menjadi media digital rujukan utama dalam menghadirkan informasi yang akurat, berimbang, dan mencerdaskan kehidupan masyarakat tanpa tendensi polarisasi.'
    },
    {
        title: 'Misi Kami',
        content: 'Menyajikan liputan jurnalistik berkualitas dengan etika ketat, memfasilitasi dialog publik yang konstruktif, serta memberikan ruang setara bagi beragam fakta dan gagasan berharga.'
    },
    {
        title: 'Independensi & Nilai',
        content: 'Kami memegang teguh prinsip independensi ruang redaksi, verifikasi ketat terhadap setiap sumber informasi, keterbukaan koreksi, dan kepatuhan mutlak terhadap Kode Etik Jurnalistik.'
    }
]

const defaultAboutCards = [
    {
        icon: 'fa-balance-scale',
        title: 'Dua Sudut Pandang',
        description: 'Menyajikan fakta dari dua sudut pandang objektif untuk memberikan pemahaman utuh tanpa menggiring opini.'
    },
    {
        icon: 'fa-check-circle',
        title: 'Verifikasi Berlapis',
        description: 'Setiap informasi dan laporan melalui proses fact-checking ketat oleh dewan editor sebelum dipublikasikan.'
    },
    {
        icon: 'fa-shield',
        title: 'Independen & Kredibel',
        description: 'Bebas dari intervensi kelompok kepentingan, partisan politik, maupun tekanan komersial yang merusak objektivitas.'
    },
    {
        icon: 'fa-users',
        title: 'Berpihak pada Publik',
        description: 'Berkomitmen menyuarakan aspirasi masyarakat, transparansi kebijakan publik, dan nilai-nilai demokrasi.'
    }
]

const defaultBrandLogos = [
    { name: 'Mitra 1', img: '/assets/img/brand/brand-1.webp', url: '' },
    { name: 'Mitra 2', img: '/assets/img/brand/brand-2.webp', url: '' },
    { name: 'Mitra 3', img: '/assets/img/brand/brand-3.webp', url: '' },
    { name: 'Mitra 4', img: '/assets/img/brand/brand-4.webp', url: '' },
    { name: 'Mitra 5', img: '/assets/img/brand/brand-5.webp', url: '' },
]

const defaultAboutSettings = {
    about_breadcrumb: 'Tentang Kami',
    about_badge: 'Tentang Dua Narasi',
    about_title: 'Membangun Jurnalisme Berimbang dan Kritis',
    about_description: 'Dua Narasi hadir sebagai platform media digital independen yang berkomitmen menyajikan fakta dari berbagai sudut pandang secara berimbang, mendalam, dan bertanggung jawab bagi masyarakat luas.',
    about_image: '/assets/img/bg/about-1.webp',
    about_video_url: 'https://www.youtube.com/watch?v=4xe72U7mXNg',
    about_show_video: 'true',
    about_tabs: JSON.stringify(defaultAboutTabs),
    about_show_cards: 'true',
    about_cards_badge: 'Pilar & Nilai Kami',
    about_cards_title: 'Pilar Jurnalisme & Nilai Utama',
    about_cards_subtitle: 'Prinsip independensi, integritas fakta, dan keberimbangan yang menjadi komitmen teguh Dua Narasi.',
    about_cards: JSON.stringify(defaultAboutCards),
    about_show_team: 'true',
    about_team_title: 'Dewan Redaksi & Tim Penulis',
    about_team_subtitle: 'Mengenal sosok-sosok profesional berintegritas di balik investigasi dan kurasi informasi Dua Narasi.',
    about_show_brands: 'true',
    about_brands_title: 'Mitra & Media Partner',
    about_brands_subtitle: 'Telah dipercaya dan berkolaborasi bersama beragam institusi dan media terkemuka.',
    about_brands: JSON.stringify(defaultBrandLogos),
    about_show_newsletter: 'true',
    about_newsletter_title: 'Dapatkan Pembaruan Berita Setiap Minggu',
    about_newsletter_subtitle: 'Berlangganan buletin kabar terbaru dan analisis eksklusif Dua Narasi langsung di email Anda.'
}

const fallbackTeam = [
    {
        id: 1,
        name: 'Alexis D. Dowson',
        role: 'Pemimpin Redaksi',
        designation: 'Editor in Chief',
        avatar: '/assets/img/team/team-1.webp'
    },
    {
        id: 2,
        name: 'Sarah Connor',
        role: 'Redaktur Pelaksana',
        designation: 'Managing Editor',
        avatar: '/assets/img/team/team-2.webp'
    },
    {
        id: 3,
        name: 'Helix Williamson',
        role: 'Jurnalis Senior',
        designation: 'Senior Journalist',
        avatar: '/assets/img/team/team-3.webp'
    },
    {
        id: 4,
        name: 'Mirandoni Nelson',
        role: 'Editor Multimedia',
        designation: 'Multimedia Producer',
        avatar: '/assets/img/team/team-4.webp'
    }
]

export default function AboutUS({ initialSettings, initialTeam }) {
    const [settings, setSettings] = useState(initialSettings || defaultAboutSettings)
    const [team, setTeam] = useState(initialTeam && initialTeam.length > 0 ? initialTeam : fallbackTeam)
    const [loadingTeam, setLoadingTeam] = useState(!initialTeam)
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    useEffect(() => {
        // Fetch fresh Settings
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.settings) {
                    setSettings(prev => ({
                        ...prev,
                        ...data.settings
                    }))
                }
            })
            .catch(console.error)

        // Fetch fresh Editorial Team (Authors)
        fetch('/api/authors')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.authors) && data.authors.length > 0) {
                    setTeam(data.authors)
                } else if (!initialTeam || initialTeam.length === 0) {
                    setTeam(fallbackTeam)
                }
            })
            .catch(() => {
                if (!initialTeam || initialTeam.length === 0) {
                    setTeam(fallbackTeam)
                }
            })
            .finally(() => {
                setLoadingTeam(false)
            })
    }, [initialTeam])

    // Parse dynamic tabs
    const getTabs = () => {
        if (!settings.about_tabs) {
            if (settings.about_tab1_title) {
                const list = [{ title: settings.about_tab1_title, content: settings.about_tab1_content || '' }]
                if (settings.about_tab2_title) list.push({ title: settings.about_tab2_title, content: settings.about_tab2_content || '' })
                if (settings.about_tab3_title) list.push({ title: settings.about_tab3_title, content: settings.about_tab3_content || '' })
                return list
            }
            return defaultAboutTabs
        }
        try {
            const parsed = typeof settings.about_tabs === 'string' ? JSON.parse(settings.about_tabs) : settings.about_tabs
            if (Array.isArray(parsed) && parsed.length > 0) return parsed
        } catch (e) {}
        return defaultAboutTabs
    }

    // Parse dynamic cards
    const getCards = () => {
        if (!settings.about_cards) return defaultAboutCards
        try {
            const parsed = typeof settings.about_cards === 'string' ? JSON.parse(settings.about_cards) : settings.about_cards
            if (Array.isArray(parsed) && parsed.length > 0) return parsed
        } catch (e) {}
        return defaultAboutCards
    }

    // Parse dynamic brand logos
    const getBrands = () => {
        if (!settings.about_brands) return defaultBrandLogos
        try {
            const parsed = typeof settings.about_brands === 'string' ? JSON.parse(settings.about_brands) : settings.about_brands
            if (Array.isArray(parsed) && parsed.length > 0) return parsed
        } catch (e) {}
        return defaultBrandLogos
    }

    const tabs = getTabs()
    const cards = getCards()

    const showVideo = settings.about_show_video !== 'false'
    const showCards = settings.about_show_cards !== 'false'
    const showTeam = settings.about_show_team !== 'false'
    const showBrands = settings.about_show_brands !== 'false'
    const showNewsletter = settings.about_show_newsletter !== 'false'
    const displayTeam = team.length > 0 ? team : fallbackTeam

    return (
        <Layout
            headerStyle={1}
            footerStyle={1}
            breadcrumbTitle={settings.about_breadcrumb || "Tentang Kami"}
            settings={settings}
        >
            <div>
                {/* About Profile Hero Area Start */}
                <div className="ta-about-section pt-100 pb-100">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* Left Column: Image & Video Popup */}
                            <div className="col-xl-6 col-lg-6 mb-4 mb-lg-0">
                                <div className="thumb position-relative ta-stroke" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                                    <img
                                        src={getImageUrl(settings.about_image, "/assets/img/bg/about-1.webp")}
                                        alt={settings.about_title || "Tentang Dua Narasi"}
                                        onError={(e) => { e.currentTarget.src = "/assets/img/bg/about-1.webp" }}
                                        style={{ width: '100%', height: 'auto', minHeight: '380px', maxHeight: '520px', objectFit: 'cover' }}
                                    />
                                    {showVideo && (
                                        <VideoPopup style={1} videoId={settings.about_video_url} />
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Titles, Descriptions, and Interactive Tabs */}
                            <div className="col-xl-6 col-lg-6">
                                <div className="right-wrapper pl-50 pr-20">
                                    <div className="ta-section-heading mb-35">
                                        {settings.about_badge && (
                                            <span style={{
                                                fontSize: '13px',
                                                color: '#da0105',
                                                fontWeight: 800,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1.5px',
                                                display: 'inline-block',
                                                marginBottom: '10px'
                                            }}>
                                                # {settings.about_badge}
                                            </span>
                                        )}
                                        <h2 className="ta-title ta-title--mid mb-20" style={{ lineHeight: '1.3' }}>
                                            {settings.about_title || "Membangun Jurnalisme Berimbang dan Kritis"}
                                        </h2>
                                        <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--ta-body-color, #475569)' }}>
                                            {settings.about_description}
                                        </p>
                                    </div>

                                    {/* Dynamic Tabs (Bisa Ditambah & Dikurang) */}
                                    {tabs.length > 0 && (
                                        <div className="ta-about-tab wow fadeIn">
                                            <div className="nav tagcloud d-flex align-items-center flex-wrap" id="pinfo-tab" role="tablist" style={{ gap: '8px' }}>
                                                {tabs.map((tab, idx) => (
                                                    <a
                                                        key={idx}
                                                        className={activeTabIndex === idx ? "nav-link active" : "nav-link"}
                                                        onClick={() => setActiveTabIndex(idx)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <span>#</span>
                                                        {tab.title}
                                                    </a>
                                                ))}
                                            </div>

                                            <div className="tab-content pinfo-content mt-30" id="pinfoContent">
                                                {tabs.map((tab, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={activeTabIndex === idx ? "tab-pane fade show active" : "tab-pane fade"}
                                                    >
                                                        <p style={{ lineHeight: '1.7', fontSize: '15px', whiteSpace: 'pre-line' }}>
                                                            {tab.content}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About Profile Hero Area End */}

                {/* Dynamic Cards Section: Pilar & Nilai Utama Start */}
                {showCards && cards.length > 0 && (
                    <div className="ta-pillar-cards-section pt-80 pb-90" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading mb-50 text-center">
                                        {settings.about_cards_badge && (
                                            <span style={{ fontSize: '13px', color: '#da0105', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'inline-block', marginBottom: '8px' }}>
                                                # {settings.about_cards_badge.replace(/^#\s*/, '')}
                                            </span>
                                        )}
                                        <h2 className="ta-title ta-title--mid">
                                            {settings.about_cards_title || "Pilar Jurnalisme & Nilai Utama"}
                                        </h2>
                                        <p style={{ maxWidth: '640px', margin: '0 auto', color: '#64748b', fontSize: '15px' }}>
                                            {settings.about_cards_subtitle || "Prinsip independensi, integritas fakta, dan keberimbangan yang menjadi komitmen teguh Dua Narasi."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="row ta-column-gap-30 mt-none-30 justify-content-center">
                                {cards.map((card, idx) => (
                                    <div
                                        key={idx}
                                        className={`${cards.length === 3 ? 'col-xl-4 col-lg-4 col-md-6' : cards.length === 2 ? 'col-xl-6 col-lg-6 col-md-6' : 'col-xl-3 col-lg-6 col-md-6 col-sm-6'} mt-30`}
                                    >
                                        <div
                                            className="ta-card-pillar h-100"
                                            style={{
                                                background: '#ffffff',
                                                borderRadius: '16px',
                                                padding: '32px 26px',
                                                border: '1px solid #e2e8f0',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '56px',
                                                    height: '56px',
                                                    borderRadius: '14px',
                                                    background: 'rgba(218, 1, 5, 0.08)',
                                                    color: '#da0105',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '22px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                <i className={`fa ${card.icon || 'fa-star'}`} />
                                            </div>
                                            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#0f172a' }}>
                                                {card.title}
                                            </h4>
                                            <p style={{ fontSize: '14.5px', lineHeight: '1.65', color: '#64748b', margin: 0, flexGrow: 1 }}>
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* Dynamic Cards Section End */}

                {/* Team Section Start */}
                {showTeam && (
                    <div className="ta-team-section pt-70 pb-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading mb-60 text-center">
                                        <h2 className="ta-title ta-title--mid">
                                            {settings.about_team_title || "Dewan Redaksi & Tim Penulis"}
                                        </h2>
                                        <p style={{ maxWidth: '640px', margin: '0 auto', color: '#64748b' }}>
                                            {settings.about_team_subtitle || "Mengenal sosok-sosok profesional berintegritas di balik investigasi dan kurasi informasi Dua Narasi."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="row ta-column-gap-30 mt-none-30 justify-content-center">
                                {displayTeam.map((member) => (
                                    <div key={member.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-30">
                                        <div className="ta-team-box" style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <div className="thumb ta-stroke" style={{ position: 'relative', overflow: 'hidden', height: '260px' }}>
                                                <Link href={`/author?id=${member.id}`}>
                                                    <img
                                                        src={getImageUrl(member.avatar, "/assets/img/author/author-1.webp")}
                                                        alt={member.name}
                                                        onError={(e) => { e.currentTarget.src = "/assets/img/author/author-1.webp" }}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="content text-center" style={{ padding: '22px 18px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>
                                                    <span className="designation d-block" style={{ fontSize: '13px', color: '#da0105', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
                                                        {member.designation || member.role || "Redaksi"}
                                                    </span>
                                                    <h4 className="name" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>
                                                        <Link href={`/author?id=${member.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                            {member.name}
                                                        </Link>
                                                    </h4>
                                                </div>

                                                <div className="ta-social-links d-flex justify-content-center align-items-center" style={{ gap: '10px' }}>
                                                    <Link
                                                        href={`/author?id=${member.id}`}
                                                        title="Lihat Profil Redaksi"
                                                        style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: '#334155', transition: 'all 0.2s' }}
                                                    >
                                                        <i className="fa fa-user" style={{ fontSize: '13px' }} />
                                                    </Link>
                                                    <Link
                                                        href={`/blog-filter-search?search=${encodeURIComponent(member.name)}`}
                                                        title="Lihat Artikel Penulis"
                                                        style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: '#334155', transition: 'all 0.2s' }}
                                                    >
                                                        <i className="fa fa-newspaper" style={{ fontSize: '13px' }} />
                                                    </Link>
                                                    {member.email && (
                                                        <a
                                                            href={`mailto:${member.email}`}
                                                            title={`Hubungi ${member.name}`}
                                                            style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: '#334155', transition: 'all 0.2s' }}
                                                        >
                                                            <i className="fa fa-envelope" style={{ fontSize: '13px' }} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* Team Section End */}

                {/* Brands / Featured On Area Start */}
                {showBrands && (
                    <div className="ta-brand-section pt-90 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading mb-60 text-center">
                                        <h2 className="ta-title ta-title--mid">
                                            {settings.about_brands_title || "Mitra & Media Partner"}
                                        </h2>
                                        <p style={{ maxWidth: '640px', margin: '0 auto', color: '#64748b' }}>
                                            {settings.about_brands_subtitle || "Telah dipercaya dan berkolaborasi bersama beragam institusi dan media terkemuka."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <BrandSlider1 brands={getBrands()} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Brands Area End */}

                {/* Newsletter Area Start */}
                {showNewsletter && (
                    <Newsletter2 settings={settings} />
                )}
                {/* Newsletter Area End */}
            </div>

            <style jsx>{`
                .ta-card-pillar:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08) !important;
                    border-color: #cbd5e1 !important;
                }
            `}</style>
        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        const records = await prisma.setting.findMany()
        const settingsObj = { ...defaultAboutSettings }
        records.forEach(item => {
            settingsObj[item.key] = item.value
        })

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { role: { in: ['ADMIN', 'EDITOR', 'AUTHOR'] } },
                    { posts: { some: {} } }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                designation: true,
                avatar: true,
                bio: true
            },
            orderBy: { id: 'asc' }
        })

        const formattedTeam = users.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.designation || (u.role === 'ADMIN' ? 'Editor in Chief' : u.role === 'EDITOR' ? 'Senior Editor' : 'Penulis'),
            designation: u.designation || 'Penulis',
            avatar: u.avatar || '/assets/img/author/author-1.webp',
            bio: u.bio || ''
        }))

        return {
            props: {
                initialSettings: JSON.parse(JSON.stringify(settingsObj)),
                initialTeam: JSON.parse(JSON.stringify(formattedTeam.length > 0 ? formattedTeam : fallbackTeam))
            }
        }
    } catch (err) {
        console.error('Error in about-us getServerSideProps:', err)
        return {
            props: {
                initialSettings: defaultAboutSettings,
                initialTeam: fallbackTeam
            }
        }
    }
}

