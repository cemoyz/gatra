import prisma from '@/lib/prisma'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'
import { getUserFromRequest } from '@/lib/auth'

const defaultSettings = {
  layout_grid: 'three-column',
  list_type: 'right-sidebar',
  archive_layout: 'three-column',
  category_layout: 'three-column',
  tag_layout: 'three-column',
  author_layout: 'two-column',
  search_layout: 'right-sidebar',
  home_style: 'index-1',
  posts_per_page: '12',
  header_style: '1',
  footer_style: '1',
  site_title: 'Dua Narasi',
  site_tagline: 'Portal Berita & Opini Terpercaya',
  google_analytics_id: 'G-QTZJ9S6JP7',
  google_tag_manager_id: 'GTM-NL94HN56',
  google_search_console_property: '',
  google_site_verification: 'google-site-verification=jb6CVX7m65ir5XZstdFUQNsvXI3dcHOa7UFcYPMNeF8',
  site_logo: '/assets/img/logo/logo.webp', // uploaded logo/icon image URL
  logo_header: '/assets/img/logo/logo.webp',
  logo_header_dark: '/assets/img/logo/logo-white.webp',
  logo_footer: '/assets/img/logo/logoredwhite.webp',
  logo_dashboard: '/assets/img/logo/favicon.webp',
  site_favicon: '/assets/img/logo/favicon.webp',
  show_author_bio: 'true',
  show_related_posts: 'true',
  show_newsletter: 'true',
  show_post_views: 'true',
  show_post_comments: 'true',
  show_post_editor: 'true',
  post_preset_images: JSON.stringify([
    'blog-2-1.webp', 'blog-2-2.webp', 'blog-2-3.webp', 'blog-2-4.webp',
    'blog-2-5.webp', 'blog-2-6.webp', 'blog-2-7.webp', 'blog-2-8.webp'
  ]),
  // Breaking News Settings
  breaking_ticker_enabled: 'true',
  breaking_ticker_title: 'BREAKING NEWS',
  breaking_ticker_custom_text: '',
  // Homepage Sections Management & Article Filtering
  show_featured_posts: 'true',
  title_featured_posts: 'Featured Post',
  featured_posts_mode: 'manual', // 'manual' or 'auto'
  featured_post_slot_1: '', // Kiri Atas
  featured_post_slot_2: '', // Kiri Bawah
  featured_post_slot_3: '', // Tengah Utama (Hero Besar)
  featured_post_slot_4: '', // Kanan Atas
  featured_post_slot_5: '', // Kanan Bawah
  featured_posts_category: 'all',
  featured_posts_sort: 'latest',
  show_trending_posts: 'true',
  title_trending_posts: 'Trending Post',
  trending_posts_category: 'all',
  trending_posts_sort: 'trending',
  show_popular_posts: 'true',
  title_popular_posts: 'Popular Post',
  popular_posts_category: 'all',
  popular_posts_sort: 'popular',
  show_handpick_posts: 'true',
  title_handpick_posts: 'Hand-Picked News',
  handpick_posts_mode: 'manual', // 'manual' or 'auto'
  handpick_posts_manual_ids: '', // Comma-separated list of selected post IDs
  handpick_posts_category: 'all',
  handpick_posts_sort: 'latest',
  handpick_posts_limit: '8',
  show_marquee_cats: 'true',
  // Sidebar Ad Banner Settings
  show_sidebar_ad: 'true',
  sidebar_ad_title: 'Dua Narasi',
  sidebar_ad_subtitle: 'Portal Berita & Opini Terpercaya',
  sidebar_ad_image: '/assets/img/bg/sidebar-ad.webp',
  sidebar_ad_url: '',
  sidebar_ad_open_new_tab: 'true',
  // Horizontal CTA Banner Settings (Home Appliances Banner)
  show_cta_banner: 'true',
  cta_banner_mode: 'custom_text',
  cta_banner_badge: '72% Off',
  cta_banner_title: 'Home Appliances',
  cta_banner_subtitle: 'FOR PERFECT HOME.',
  cta_banner_btn_text: 'Shop Now',
  cta_banner_btn_url: '/contact',
  cta_banner_open_new_tab: 'false',
  cta_banner_bg: '/assets/img/bg-img/cta-bg.jpg',
  // Additional Homepage Sections Management
  show_categories_section: 'true',
  show_latest_posts: 'true',
  title_latest_posts: 'Latest Posts',
  show_video_section: 'true',
  title_video_section: 'What to Watch',
  video_posts_mode: 'manual',
  video_post_slot_1: '',
  video_post_slot_2: '',
  video_post_slot_3: '',
  video_post_slot_4: '',
  show_lifestyle_section: 'true',
  title_lifestyle_posts: 'Lifestyle & Fashion',
  show_cta_banner_2: 'true',
  cta_2_mode: 'custom_text',
  cta_2_bg: '/assets/img/bg-img/cta-bg-2.jpg',
  cta_2_logo: '/assets/img/logo/logo-light-2.png',
  cta_2_title: 'Dua Narasi - Portal Berita & Opini Terpercaya',
  cta_2_btn_text: 'Hubungi Kami',
  cta_2_btn_url: '/contact',
  cta_2_open_new_tab: 'false',
  show_travel_section: 'true',
  title_travel_posts: 'Travel & Adventure',
  show_recent_posts: 'true',
  title_recent_posts: 'Recent Posts',
  recent_posts_limit: '12',
  recent_posts_offset: '0',
  newsletter_title: 'Dapatkan berita dan analisis terhangat langsung di email Anda!',
  newsletter_subtitle: 'Berlangganan buletin harian gratis dari redaksi kami.',
  // Master ON/OFF Toggle for Social Media
  show_social_links: 'true',
  // Individual Platform ON/OFF Toggles
  enable_facebook: 'true',
  enable_twitter: 'true',
  enable_instagram: 'true',
  enable_youtube: 'true',
  enable_linkedin: 'true',
  enable_pinterest: 'true',
  enable_tiktok: 'true',
  enable_whatsapp: 'true',
  enable_telegram: 'true',
  // Dynamic Social Media URLs
  social_facebook: 'https://facebook.com',
  social_twitter: 'https://twitter.com',
  social_instagram: 'https://instagram.com',
  social_youtube: 'https://youtube.com',
  social_linkedin: 'https://linkedin.com',
  social_pinterest: 'https://pinterest.com',
  social_tiktok: 'https://tiktok.com',
  social_whatsapp: 'https://wa.me/',
  social_telegram: 'https://t.me/',
  // Dynamic Contact Page Settings
  contact_title: 'Hubungi Redaksi Dua Narasi',
  contact_subtitle: 'Punya aspirasi, koreksi berita, penawaran liputan khusus, atau pertanyaan kerja sama? Tim redaksi kami siap terhubung dengan Anda.',
  contact_branch_1: 'Kantor Redaksi Utama',
  contact_email_1: 'redaksi@duanarasi.com',
  contact_phone_1: '+62 21 555 7890',
  contact_address_1: 'Gedung Pers Graha Dua Narasi, Jl. Merdeka No. 10, Jakarta Pusat',
  contact_branch_2: 'Biro Redaksi Daerah',
  contact_email_2: 'biro@duanarasi.com',
  contact_phone_2: '+62 22 765 4321',
  contact_address_2: 'Jl. R.E. Martadinata No. 45, Bandung, Jawa Barat',
  contact_map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28298717812!2d106.759478!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e49fe3e071%3A0x2a597a7a58e235e1!2sJakarta!5e0!3m2!1sid!2sid!4v1656749326947!5m2!1sid!2sid',
  contact_form_title: 'Kirim Pesan Langsung',
  contact_form_subtitle: 'Isi formulir di bawah ini untuk mengirimkan pertanyaan atau kerja sama langsung ke kotak masuk tim kami.',
  // Dynamic About Us Page Settings
  about_breadcrumb: 'Tentang Kami',
  about_badge: 'Tentang Dua Narasi',
  about_title: 'Membangun Jurnalisme Berimbang dan Kritis',
  about_description: 'Dua Narasi hadir sebagai platform media digital independen yang berkomitmen menyajikan fakta dari berbagai sudut pandang secara berimbang, mendalam, dan bertanggung jawab bagi masyarakat luas.',
  about_image: '/assets/img/bg/about-1.webp',
  about_video_url: 'https://www.youtube.com/watch?v=4xe72U7mXNg',
  about_show_video: 'true',
  about_tabs: JSON.stringify([
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
  ]),
  about_tab1_title: 'Visi Kami',
  about_tab1_content: 'Menjadi media digital rujukan utama dalam menghadirkan informasi yang akurat, berimbang, dan mencerdaskan kehidupan masyarakat tanpa tendensi polarisasi.',
  about_tab2_title: 'Misi Kami',
  about_tab2_content: 'Menyajikan liputan jurnalistik berkualitas dengan etika ketat, memfasilitasi dialog publik yang konstruktif, serta memberikan ruang setara bagi beragam fakta dan gagasan berharga.',
  about_tab3_title: 'Independensi & Nilai',
  about_tab3_content: 'Kami memegang teguh prinsip independensi ruang redaksi, verifikasi ketat terhadap setiap sumber informasi, keterbukaan koreksi, dan kepatuhan mutlak terhadap Kode Etik Jurnalistik.',
  // Dynamic Cards / Feature Pillars Section
  about_show_cards: 'true',
  about_cards_badge: 'Pilar & Nilai Kami',
  about_cards_title: 'Pilar Jurnalisme & Nilai Utama',
  about_cards_subtitle: 'Prinsip independensi, integritas fakta, dan keberimbangan yang menjadi komitmen teguh Dua Narasi.',
  about_cards: JSON.stringify([
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
  ]),
  about_show_team: 'true',
  about_team_title: 'Dewan Redaksi & Tim Penulis',
  about_team_subtitle: 'Mengenal sosok-sosok profesional berintegritas di balik investigasi dan kurasi informasi Dua Narasi.',
  about_show_brands: 'true',
  about_brands_title: 'Mitra & Media Partner',
  about_brands_subtitle: 'Telah dipercaya dan berkolaborasi bersama beragam institusi dan media terkemuka.',
  about_brands: JSON.stringify([
    { name: 'Mitra 1', img: '/assets/img/brand/brand-1.webp', url: '' },
    { name: 'Mitra 2', img: '/assets/img/brand/brand-2.webp', url: '' },
    { name: 'Mitra 3', img: '/assets/img/brand/brand-3.webp', url: '' },
    { name: 'Mitra 4', img: '/assets/img/brand/brand-4.webp', url: '' },
    { name: 'Mitra 5', img: '/assets/img/brand/brand-5.webp', url: '' }
  ]),
  about_show_newsletter: 'true',
  about_newsletter_title: 'Dapatkan Pembaruan Berita Setiap Minggu',
  about_newsletter_subtitle: 'Berlangganan buletin kabar terbaru dan analisis eksklusif Dua Narasi langsung di email Anda.'
}

let memoryCache = null
let lastCacheTime = 0
const CACHE_TTL_MS = 30000 // 30 seconds

function settingsForRequest(settings, includeGoogleCredentials) {
  const visibleSettings = { ...settings }
  if (!includeGoogleCredentials) delete visibleSettings.google_service_account_json
  return visibleSettings
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const user = await getUserFromRequest(req)
    const includeGoogleCredentials = user?.role === ROLES.ADMIN
    const now = Date.now()
    if (memoryCache && (now - lastCacheTime < CACHE_TTL_MS)) {
      return res.status(200).json({
        success: true,
        settings: settingsForRequest(memoryCache, includeGoogleCredentials)
      })
    }

    try {
      const records = await prisma.setting.findMany()
      const settingsObj = { ...defaultSettings }

      records.forEach(item => {
        if (item.key === 'google_site_verification' && !item.value.trim()) return
        settingsObj[item.key] = item.value
      })

      memoryCache = settingsObj
      lastCacheTime = now

      return res.status(200).json({
        success: true,
        settings: settingsForRequest(settingsObj, includeGoogleCredentials)
      })
    } catch (error) {
      console.error('Error fetching settings:', error)
      return res.status(200).json({
        success: true,
        settings: defaultSettings,
        warning: 'Using default settings (DB offline or unseeded)'
      })
    }
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const authUser = await requireApiAuth(req, res, [ROLES.ADMIN])
    if (!authUser) return

    try {
      const payload = req.body

      const updatePromises = Object.keys(payload).map(async (key) => {
        const val = String(payload[key])
        return prisma.setting.upsert({
          where: { key },
          update: { value: val },
          create: { key, value: val }
        })
      })

      await Promise.all(updatePromises)

      // Invalidate memory cache
      memoryCache = null
      lastCacheTime = 0

      // Fetch updated
      const records = await prisma.setting.findMany()
      const settingsObj = { ...defaultSettings }
      records.forEach(item => {
        if (item.key === 'google_site_verification' && !item.value.trim()) return
        settingsObj[item.key] = item.value
      })

      memoryCache = settingsObj
      lastCacheTime = Date.now()

      return res.status(200).json({
        success: true,
        message: 'Pengaturan berhasil disimpan ke database!',
        settings: settingsObj
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      return res.status(500).json({ success: false, message: error.message || 'Gagal menyimpan pengaturan' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
