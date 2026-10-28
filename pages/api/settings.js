import prisma from '@/lib/prisma'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'

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
  contact_form_subtitle: 'Isi formulir di bawah ini untuk mengirimkan pertanyaan atau kerja sama langsung ke kotak masuk tim kami.'
}

let memoryCache = null
let lastCacheTime = 0
const CACHE_TTL_MS = 30000 // 30 seconds

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const now = Date.now()
    if (memoryCache && (now - lastCacheTime < CACHE_TTL_MS)) {
      return res.status(200).json({ success: true, settings: memoryCache })
    }

    try {
      const records = await prisma.setting.findMany()
      const settingsObj = { ...defaultSettings }

      records.forEach(item => {
        settingsObj[item.key] = item.value
      })

      memoryCache = settingsObj
      lastCacheTime = now

      return res.status(200).json({ success: true, settings: settingsObj })
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
