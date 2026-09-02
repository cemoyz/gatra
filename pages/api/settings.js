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
  site_title: 'Hoom Magazine',
  site_tagline: 'Modern Blog & News Publishing Platform',
  show_author_bio: 'true',
  show_related_posts: 'true',
  show_newsletter: 'true',
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
  social_telegram: 'https://t.me/'
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const records = await prisma.setting.findMany()
      const settingsObj = { ...defaultSettings }

      records.forEach(item => {
        settingsObj[item.key] = item.value
      })

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

      // Fetch updated
      const records = await prisma.setting.findMany()
      const settingsObj = { ...defaultSettings }
      records.forEach(item => {
        settingsObj[item.key] = item.value
      })

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
