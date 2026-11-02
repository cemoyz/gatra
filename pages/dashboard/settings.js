import DashboardLayout from '@/components/dashboard/DashboardLayout'
import ImageUploader from '@/components/elements/ImageUploader'
import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Label,
  Input,
  Select,
  Switch,
  Button,
  Badge,
  Toast
} from '@/components/dashboard/ui'
import { useEffect, useState, useRef } from 'react'
import { getImageUrl } from '@/lib/imageUtils'

const defaultThemePresets = [
  'blog-2-1.webp', 'blog-2-2.webp', 'blog-2-3.webp', 'blog-2-4.webp',
  'blog-2-5.webp', 'blog-2-6.webp', 'blog-2-7.webp', 'blog-2-8.webp'
]

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
  { name: 'Mitra 5', img: '/assets/img/brand/brand-5.webp', url: '' }
]

export default function DashboardSettings() {
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [categories, setCategories] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [newPresetUrl, setNewPresetUrl] = useState('')
  const presetFileInputRef = useRef(null)

  const [settings, setSettings] = useState({
    site_title: 'Dua Narasi',
    site_tagline: 'Portal Berita & Opini Terpercaya',
    site_logo: '/assets/img/logo/logo.webp',
    logo_header: '/assets/img/logo/logo.webp',
    logo_header_dark: '/assets/img/logo/logo-white.webp',
    logo_footer: '/assets/img/logo/logoredwhite.webp',
    logo_dashboard: '/assets/img/logo/favicon.webp',
    post_preset_images: JSON.stringify(defaultThemePresets),
    show_post_views: 'true',
    show_post_comments: 'true',
    show_post_editor: 'true',
    show_featured_posts: 'true',
    title_featured_posts: 'Featured Post',
    featured_posts_mode: 'manual',
    featured_post_slot_1: '',
    featured_post_slot_2: '',
    featured_post_slot_3: '',
    featured_post_slot_4: '',
    featured_post_slot_5: '',
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
    handpick_posts_mode: 'manual',
    handpick_posts_manual_ids: '',
    handpick_posts_category: 'all',
    handpick_posts_sort: 'latest',
    handpick_posts_limit: '8',
    show_marquee_cats: 'true',
    // Sidebar Ad Settings
    show_sidebar_ad: 'true',
    sidebar_ad_title: 'Dua Narasi',
    sidebar_ad_subtitle: 'Portal Berita & Opini Terpercaya',
    sidebar_ad_image: '/assets/img/bg/sidebar-ad.webp',
    sidebar_ad_url: '',
    sidebar_ad_open_new_tab: 'true',
    social_whatsapp: '',
    social_telegram: '',
    site_url: 'http://localhost:3000',
    google_site_verification: '',
    google_analytics_id: '',
    google_news_name: 'Hoom Magazine',
    // Contact Page Settings
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
    // About Us Page Settings
    about_breadcrumb: 'Tentang Kami',
    about_badge: 'Tentang Dua Narasi',
    about_title: 'Membangun Jurnalisme Berimbang dan Kritis',
    about_description: 'Dua Narasi hadir sebagai platform media digital independen yang berkomitmen menyajikan fakta dari berbagai sudut pandang secara berimbang, mendalam, dan bertanggung jawab bagi masyarakat luas.',
    about_image: '/assets/img/bg/about-1.webp',
    about_video_url: 'https://www.youtube.com/watch?v=4xe72U7mXNg',
    about_show_video: 'true',
    about_tabs: JSON.stringify(defaultAboutTabs),
    about_tab1_title: 'Visi Kami',
    about_tab1_content: 'Menjadi media digital rujukan utama dalam menghadirkan informasi yang akurat, berimbang, dan mencerdaskan kehidupan masyarakat tanpa tendensi polarisasi.',
    about_tab2_title: 'Misi Kami',
    about_tab2_content: 'Menyajikan liputan jurnalistik berkualitas dengan etika ketat, memfasilitasi dialog publik yang konstruktif, serta memberikan ruang setara bagi beragam fakta dan gagasan berharga.',
    about_tab3_title: 'Independensi & Nilai',
    about_tab3_content: 'Kami memegang teguh prinsip independensi ruang redaksi, verifikasi ketat terhadap setiap sumber informasi, keterbukaan koreksi, dan kepatuhan mutlak terhadap Kode Etik Jurnalistik.',
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
  })
  const [pinging, setPinging] = useState(false)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handlePingGoogle = async () => {
    setPinging(true)
    try {
      const res = await fetch('/api/seo/ping', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        showToast(data.message || 'Sinyal indexing berhasil dikirim ke Google & Search Engine!')
        fetchSettings()
      } else {
        showToast(data.message || 'Gagal mengirim sinyal indexing', 'error')
      }
    } catch (err) {
      showToast('Error koneksi saat mengirim ping', 'error')
    } finally {
      setPinging(false)
    }
  }

  const handleGenerateIndexNowKey = () => {
    const chars = '0123456789abcdef'
    let key = ''
    for (let i = 0; i < 32; i++) {
      key += chars[Math.floor(Math.random() * chars.length)]
    }
    setSettings(prev => ({ ...prev, indexnow_key: key }))
    showToast('Kunci IndexNow baru berhasil dibuat. Klik Simpan Pengaturan di kanan atas.')
  }

  const getAboutTabs = () => {
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

  const handleUpdateTab = (index, field, value) => {
    const list = [...getAboutTabs()]
    list[index] = { ...list[index], [field]: value }
    setSettings({ ...settings, about_tabs: JSON.stringify(list) })
  }

  const handleAddTab = () => {
    const list = [...getAboutTabs()]
    list.push({ title: `Tab Baru #${list.length + 1}`, content: '' })
    setSettings({ ...settings, about_tabs: JSON.stringify(list) })
  }

  const handleRemoveTab = (index) => {
    const list = [...getAboutTabs()]
    if (list.length <= 1) {
      showToast('Minimal harus ada 1 tab', 'error')
      return
    }
    list.splice(index, 1)
    setSettings({ ...settings, about_tabs: JSON.stringify(list) })
  }

  const getAboutCards = () => {
    if (!settings.about_cards) return defaultAboutCards
    try {
      const parsed = typeof settings.about_cards === 'string' ? JSON.parse(settings.about_cards) : settings.about_cards
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch (e) {}
    return defaultAboutCards
  }

  const handleUpdateCard = (index, field, value) => {
    const list = [...getAboutCards()]
    list[index] = { ...list[index], [field]: value }
    setSettings({ ...settings, about_cards: JSON.stringify(list) })
  }

  const handleAddCard = () => {
    const list = [...getAboutCards()]
    list.push({
      icon: 'fa-star',
      title: `Pilar Baru #${list.length + 1}`,
      description: 'Penjelasan pilar keunggulan atau komitmen jurnalisme Dua Narasi...'
    })
    setSettings({ ...settings, about_cards: JSON.stringify(list) })
  }

  const handleRemoveCard = (index) => {
    const list = [...getAboutCards()]
    if (list.length <= 1) {
      showToast('Minimal harus ada 1 card', 'error')
      return
    }
    list.splice(index, 1)
    setSettings({ ...settings, about_cards: JSON.stringify(list) })
  }

  const getAboutBrands = () => {
    if (!settings.about_brands) return defaultBrandLogos
    try {
      const parsed = typeof settings.about_brands === 'string' ? JSON.parse(settings.about_brands) : settings.about_brands
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch (e) {}
    return defaultBrandLogos
  }

  const handleUpdateBrand = (index, field, value) => {
    const list = [...getAboutBrands()]
    list[index] = { ...list[index], [field]: value }
    setSettings({ ...settings, about_brands: JSON.stringify(list) })
  }

  const handleAddBrand = () => {
    const list = [...getAboutBrands()]
    list.push({
      name: `Mitra ${list.length + 1}`,
      img: '',
      url: ''
    })
    setSettings({ ...settings, about_brands: JSON.stringify(list) })
  }

  const handleRemoveBrand = (index) => {
    const list = [...getAboutBrands()]
    if (list.length <= 1) {
      showToast('Minimal harus ada 1 logo media partner', 'error')
      return
    }
    list.splice(index, 1)
    setSettings({ ...settings, about_brands: JSON.stringify(list) })
  }

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data.success && data.settings) {
        setSettings(prev => ({
          ...prev,
          ...data.settings
        }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      if (data.success && data.categories) {
        setCategories(data.categories)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts?limit=100&status=PUBLISHED')
      const data = await res.json()
      if (data.success && data.posts) {
        setAllPosts(data.posts)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSettings()
    fetchCategories()
    fetchPosts()
  }, [])

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      const data = await res.json()
      if (data.success) {
        showToast('Pengaturan website berhasil disimpan!')
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('settingsUpdated'))
        }
      } else {
        showToast(data.message || 'Gagal menyimpan pengaturan', 'error')
      }
    } catch (err) {
      showToast('Error koneksi saat menyimpan pengaturan', 'error')
    } finally {
      setSaving(false)
    }
  }

  const getCurrentPresets = () => {
    if (!settings.post_preset_images) return defaultThemePresets
    try {
      const parsed = typeof settings.post_preset_images === 'string'
        ? JSON.parse(settings.post_preset_images)
        : settings.post_preset_images
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch (e) {
      const list = String(settings.post_preset_images).split(',').map(s => s.trim()).filter(Boolean)
      if (list.length > 0) return list
    }
    return defaultThemePresets
  }

  const handleAddPreset = () => {
    const val = newPresetUrl.trim()
    if (!val) return
    const current = getCurrentPresets()
    if (current.includes(val)) {
      showToast('Gambar ini sudah ada di dalam daftar preset', 'error')
      return
    }
    const updated = [...current, val]
    setSettings({ ...settings, post_preset_images: JSON.stringify(updated) })
    setNewPresetUrl('')
    showToast('Preset baru ditambahkan! Jangan lupa klik Simpan Pengaturan.')
  }

  const handleRemovePreset = (indexToRemove) => {
    const current = getCurrentPresets()
    const updated = current.filter((_, idx) => idx !== indexToRemove)
    setSettings({ ...settings, post_preset_images: JSON.stringify(updated) })
    showToast('Preset dihapus! Jangan lupa klik Simpan Pengaturan.')
  }

  const handleResetPresets = () => {
    setSettings({ ...settings, post_preset_images: JSON.stringify(defaultThemePresets) })
    showToast('Preset berhasil dikembalikan ke default tema!')
  }

  const handleUploadPreset = async (file) => {
    if (!file) return
    try {
      showToast('Mengunggah gambar ke ImgBB...')
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
      })
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data, name: file.name.replace(/\.[^/.]+$/, '') })
      })
      const data = await res.json()
      if (data.success && data.url) {
        const current = getCurrentPresets()
        const updated = [...current, data.url]
        setSettings(prev => ({ ...prev, post_preset_images: JSON.stringify(updated) }))
        showToast('Gambar berhasil diupload ke ImgBB & ditambahkan ke preset!')
      } else {
        showToast(data.message || 'Gagal upload preset', 'error')
      }
    } catch (err) {
      showToast('Error saat upload preset', 'error')
    }
  }

  const socialPlatforms = [
    { key: 'facebook', label: 'Facebook', icon: 'fa-facebook', placeholder: 'https://facebook.com/username' },
    { key: 'twitter', label: 'Twitter / X', icon: 'fa-twitter', placeholder: 'https://x.com/username' },
    { key: 'instagram', label: 'Instagram', icon: 'fa-instagram', placeholder: 'https://instagram.com/username' },
    { key: 'youtube', label: 'YouTube', icon: 'fa-youtube-play', placeholder: 'https://youtube.com/@channel' },
    { key: 'linkedin', label: 'LinkedIn', icon: 'fa-linkedin', placeholder: 'https://linkedin.com/in/username' },
    { key: 'pinterest', label: 'Pinterest', icon: 'fa-pinterest', placeholder: 'https://pinterest.com/username' },
    { key: 'tiktok', label: 'TikTok', icon: 'fa-music', placeholder: 'https://tiktok.com/@username' },
    { key: 'whatsapp', label: 'WhatsApp Channel', icon: 'fa-whatsapp', placeholder: 'https://wa.me/628123456789' },
    { key: 'telegram', label: 'Telegram Channel', icon: 'fa-paper-plane', placeholder: 'https://t.me/channel' },
  ]

  return (
    <DashboardLayout title="Pengaturan Website & Redaksi">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Page Header */}
      <PageHeader
        title="Pengaturan Website"
        description="Kelola informasi situs, tata letak seksi beranda, dan tautan media sosial portal berita Anda."
        icon="fa-sliders"
        actions={
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="dash-btn dash-btn-primary dash-pageheader-btn"
          >
            <i className={`fa ${saving ? 'fa-spinner fa-spin' : 'fa-check'}`}></i>
            <span>{saving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
          </button>
        }
      />

      <form onSubmit={handleSave}>
        <Tabs defaultValue="general">
          {/* Tabs Header List matching main-files */}
          <TabsList>
            <TabsTrigger value="general" icon="fa-globe">
              Identitas Situs
            </TabsTrigger>
            <TabsTrigger value="homepage" icon="fa-th-large">
              Seksi Beranda (Homepage)
            </TabsTrigger>
            <TabsTrigger value="social" icon="fa-share-alt">
              Media Sosial & Footer
            </TabsTrigger>
            <TabsTrigger value="contact" icon="fa-envelope">
              Halaman Kontak
            </TabsTrigger>
            <TabsTrigger value="about" icon="fa-info-circle">
              Halaman Tentang Kami
            </TabsTrigger>
            <TabsTrigger value="breaking" icon="fa-bolt">
              Breaking News
            </TabsTrigger>
            <TabsTrigger value="seo" icon="fa-search">
              Google Indexing & SEO
            </TabsTrigger>
          </TabsList>

          {/* ================= TAB 1: IDENTITAS SITUS ================= */}
          <TabsContent value="general">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* 1. INFORMASI UMUM */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-info-circle">Identitas & Informasi Umum</CardTitle>
                  <CardDescription>Nama portal berita, deskripsi tagline, dan informasi branding utama.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Judul Portal / Site Title *</Label>
                      <Input
                        placeholder="Contoh: Dua Narasi"
                        value={settings.site_title || ''}
                        onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Tagline Situs</Label>
                      <Input
                        placeholder="Contoh: Portal Berita & Opini Terpercaya"
                        value={settings.site_tagline || ''}
                        onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2. PENGATURAN LOGO DINAMIS (HEADER, FOOTER, DASHBOARD) */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-picture-o">Pengaturan Logo Dinamis Portal</CardTitle>
                  <CardDescription>Kelola logo untuk bilah header laman depan (terang & gelap), footer laman depan, serta sidebar panel dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {/* Logo Header Terang */}
                    <div style={{ background: 'var(--dash-muted-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--dash-border)' }}>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', marginBottom: '4px', color: 'var(--dash-text-main)' }}>
                        <i className="fa fa-sun-o" style={{ color: '#f59e0b', marginRight: '6px' }}></i> Logo Header (Mode Terang)
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', marginBottom: '12px' }}>
                        Tampil di header utama laman depan saat tema terang/putih.
                      </div>
                      <ImageUploader
                        label="Upload Logo Header Terang"
                        value={settings.logo_header || settings.site_logo || ''}
                        onChange={(val) => setSettings({ ...settings, logo_header: val, site_logo: val })}
                        presetFolder="logo"
                        presetImages={['logo.webp', 'logoredwhite.webp', 'favicon.webp']}
                        maxPreviewHeight={60}
                      />
                    </div>

                    {/* Logo Header Gelap */}
                    <div style={{ background: 'var(--dash-muted-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--dash-border)' }}>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', marginBottom: '4px', color: 'var(--dash-text-main)' }}>
                        <i className="fa fa-moon-o" style={{ color: '#818cf8', marginRight: '6px' }}></i> Logo Header (Mode Gelap)
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', marginBottom: '12px' }}>
                        Tampil saat mode gelap (dark mode) aktif di website.
                      </div>
                      <ImageUploader
                        label="Upload Logo Header Gelap"
                        value={settings.logo_header_dark || ''}
                        onChange={(val) => setSettings({ ...settings, logo_header_dark: val })}
                        presetFolder="logo"
                        presetImages={['logo-white.webp', 'logoredwhite.webp']}
                        maxPreviewHeight={60}
                      />
                    </div>

                    {/* Logo Footer */}
                    <div style={{ background: 'var(--dash-muted-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--dash-border)' }}>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', marginBottom: '4px', color: 'var(--dash-text-main)' }}>
                        <i className="fa fa-arrow-down" style={{ color: '#da0105', marginRight: '6px' }}></i> Logo Footer Laman Depan
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', marginBottom: '12px' }}>
                        Tampil pada seksi footer bagian bawah laman depan.
                      </div>
                      <ImageUploader
                        label="Upload Logo Footer"
                        value={settings.logo_footer || ''}
                        onChange={(val) => setSettings({ ...settings, logo_footer: val })}
                        presetFolder="logo"
                        presetImages={['logoredwhite.webp', 'logo-white.webp', 'logo.webp']}
                        maxPreviewHeight={60}
                      />
                    </div>

                    {/* Logo Dashboard Sidebar */}
                    <div style={{ background: 'var(--dash-muted-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--dash-border)' }}>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', marginBottom: '4px', color: 'var(--dash-text-main)' }}>
                        <i className="fa fa-tachometer" style={{ color: '#10b981', marginRight: '6px' }}></i> Logo Dashboard Sidebar (Persegi Panjang)
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', marginBottom: '12px' }}>
                        Tampil di pojok kiri atas bilah navigasi admin dashboard sebagai logo utama.
                      </div>
                      <ImageUploader
                        label="Upload Logo Dashboard"
                        value={settings.logo_dashboard || ''}
                        onChange={(val) => setSettings({ ...settings, logo_dashboard: val })}
                        presetFolder="logo"
                        presetImages={['logo.webp', 'logo-white.webp', 'logoredwhite.webp']}
                        maxPreviewHeight={60}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card Preset Gambar Sampul Artikel */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-picture-o">Preset Gambar Sampul Artikel (Theme Presets)</CardTitle>
                  <CardDescription>
                    Kelola pilihan gambar cepat yang tampil di form pembuatan & pengeditan artikel. Anda bisa mengunggah gambar ke ImgBB, mengetik URL, menghapus preset, atau mereset ke preset bawaan tema.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Grid of current presets */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)' }}>
                        Daftar Preset Aktif ({getCurrentPresets().length} Gambar):
                      </span>
                      <button
                        type="button"
                        onClick={handleResetPresets}
                        className="dash-btn dash-btn-outline"
                        style={{ padding: '4px 10px', fontSize: '11.5px', height: 'auto' }}
                        title="Kembalikan ke 8 preset bawaan tema"
                      >
                        <i className="fa fa-refresh" style={{ marginRight: '5px' }}></i> Reset Default
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px' }}>
                      {getCurrentPresets().map((img, idx) => {
                        const fullSrc = (img.startsWith('/') || img.startsWith('http://') || img.startsWith('https://'))
                          ? img
                          : `/assets/img/blog/${img}`
                        const displaySrc = getImageUrl(fullSrc)
                        return (
                          <div
                            key={`${img}-${idx}`}
                            style={{
                              position: 'relative',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              border: '1px solid var(--dash-border)',
                              background: 'var(--dash-muted-bg)',
                              height: '70px',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                            }}
                          >
                            <img
                              src={displaySrc}
                              alt={`Preset ${idx + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleRemovePreset(idx)}
                              title="Hapus preset ini"
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: 'rgba(239, 68, 68, 0.9)',
                                color: '#fff',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                zIndex: 3
                              }}
                            >
                              <i className="fa fa-times"></i>
                            </button>
                            <div style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background: 'rgba(15, 23, 42, 0.75)',
                              color: '#fff',
                              fontSize: '9.5px',
                              padding: '2px 4px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              textAlign: 'center'
                            }}>
                              #{idx + 1}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Add New Preset Controls */}
                  <div style={{
                    background: 'var(--dash-muted-bg)',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid var(--dash-border)',
                    marginTop: '16px'
                  }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '8px' }}>
                      <i className="fa fa-plus-circle" style={{ color: '#3b82f6', marginRight: '6px' }}></i> Tambah Gambar Preset Baru
                    </div>
                    
                    {/* Hidden file input for uploading directly to ImgBB */}
                    <input
                      type="file"
                      ref={presetFileInputRef}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleUploadPreset(e.target.files[0])
                          e.target.value = ''
                        }
                      }}
                    />

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        className="dash-input"
                        placeholder="Ketik/Paste URL ImgBB (https://i.ibb.co/...) atau nama file lokal (blog-2-9.webp)"
                        value={newPresetUrl}
                        onChange={(e) => setNewPresetUrl(e.target.value)}
                        style={{ flex: '1', minWidth: '240px', fontSize: '13px' }}
                      />
                      <button
                        type="button"
                        onClick={handleAddPreset}
                        className="dash-btn dash-btn-primary"
                        style={{ padding: '0 16px', fontSize: '13px' }}
                      >
                        <i className="fa fa-plus" style={{ marginRight: '6px' }}></i> Tambah
                      </button>
                      <button
                        type="button"
                        onClick={() => presetFileInputRef.current?.click()}
                        className="dash-btn dash-btn-outline"
                        style={{ padding: '0 14px', fontSize: '12px' }}
                        title="Upload file gambar langsung ke ImgBB & otomatis tambahkan ke preset"
                      >
                        <i className="fa fa-cloud-upload" style={{ marginRight: '6px' }}></i> Upload ke ImgBB
                      </button>
                    </div>
                    <small style={{ color: 'var(--dash-text-muted)', fontSize: '11.5px', marginTop: '8px', display: 'block' }}>
                      💡 Preset ini akan langsung muncul sebagai pilihan cepat di halaman <strong>Tambah Artikel</strong> dan <strong>Edit Artikel</strong>.
                    </small>
                  </div>
                </CardContent>
              </Card>

              {/* Ticker & Marquee Card */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-rss">Teks Berjalan & Navigasi Kategori (Marquee)</CardTitle>
                  <CardDescription>Atur tampilan pita kategori berita pada header beranda.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    style={{
                      background: 'var(--dash-muted-bg)',
                      padding: '16px 20px',
                      borderRadius: '10px',
                      border: '1px solid var(--dash-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px'
                    }}
                  >
                    <div>
                      <div style={{ color: 'var(--dash-text-main)', fontWeight: 600, fontSize: '13.5px', marginBottom: '2px' }}>
                        Tampilkan Pita Kategori Berjalan (Marquee Ticker)
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                        Menampilkan pita animasi kategori artikel tepat di bawah header laman depan.
                      </div>
                    </div>
                    <Switch
                      checked={settings.show_marquee_cats !== 'false'}
                      onChange={(e) => setSettings({ ...settings, show_marquee_cats: String(e.target.checked) })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Card Tampilan Tayangan & Komentar Artikel */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-eye">Pengaturan Tampilan Tayangan (Views) & Komentar Artikel</CardTitle>
                  <CardDescription>Kontrol visibilitas jumlah pembaca (views) dan kolom komentar di seluruh artikel website.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Toggle Views Count */}
                    <div
                      style={{
                        background: 'var(--dash-muted-bg)',
                        padding: '16px 20px',
                        borderRadius: '10px',
                        border: '1px solid var(--dash-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px'
                      }}
                    >
                      <div>
                        <div style={{ color: 'var(--dash-text-main)', fontWeight: 600, fontSize: '13.5px', marginBottom: '2px' }}>
                          <i className="fa fa-eye" style={{ color: '#3b82f6', marginRight: '6px' }}></i>
                          Tampilkan Jumlah Pembaca / Tayangan (Views Count)
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                          Menampilkan atau menyembunyikan ikon & jumlah pembaca (views) artikel di halaman detail berita, sidebar, dan kartu berita.
                        </div>
                      </div>
                      <Switch
                        checked={settings.show_post_views !== 'false'}
                        onChange={(e) => setSettings({ ...settings, show_post_views: String(e.target.checked) })}
                      />
                    </div>

                    {/* Toggle Comments Section & Count */}
                    <div
                      style={{
                        background: 'var(--dash-muted-bg)',
                        padding: '16px 20px',
                        borderRadius: '10px',
                        border: '1px solid var(--dash-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px'
                      }}
                    >
                      <div>
                        <div style={{ color: 'var(--dash-text-main)', fontWeight: 600, fontSize: '13.5px', marginBottom: '2px' }}>
                          <i className="fa fa-comments" style={{ color: '#10b981', marginRight: '6px' }}></i>
                          Tampilkan Kolom & Jumlah Komentar Pembaca (Comments Section)
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                          Menampilkan atau menyembunyikan kolom diskusi komentar, formulir kirim komentar, dan jumlah komentar di artikel.
                        </div>
                      </div>
                      <Switch
                        checked={settings.show_post_comments !== 'false'}
                        onChange={(e) => setSettings({ ...settings, show_post_comments: String(e.target.checked) })}
                      />
                    </div>

                    {/* Toggle Editor Info */}
                    <div
                      style={{
                        background: 'var(--dash-muted-bg)',
                        padding: '16px 20px',
                        borderRadius: '10px',
                        border: '1px solid var(--dash-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px'
                      }}
                    >
                      <div>
                        <div style={{ color: 'var(--dash-text-main)', fontWeight: 600, fontSize: '13.5px', marginBottom: '2px' }}>
                          <i className="fa fa-pencil-square-o" style={{ color: '#da0105', marginRight: '6px' }}></i>
                          Tampilkan Nama & Info Editor (Penyunting Berita)
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                          Menampilkan atau menyembunyikan identitas Editor / Penyunting di bawah Penulis pada header dan box profil artikel.
                        </div>
                      </div>
                      <Switch
                        checked={settings.show_post_editor !== 'false'}
                        onChange={(e) => setSettings({ ...settings, show_post_editor: String(e.target.checked) })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ================= TAB 2: SEKSI BERANDA ================= */}
          <TabsContent value="homepage">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* 1. HERO FEATURED POST (5 SLOTS) */}
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <CardTitle icon="fa-star">1. Featured Hero Post (Grid 5 Slot Utama)</CardTitle>
                      <CardDescription>Seksi hero 5 artikel besar di bagian teratas halaman beranda.</CardDescription>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: settings.show_featured_posts !== 'false' ? '#10b981' : 'var(--dash-text-muted)' }}>
                        {settings.show_featured_posts !== 'false' ? 'Aktif' : 'Nonaktif'}
                      </span>
                      <Switch
                        checked={settings.show_featured_posts !== 'false'}
                        onChange={(e) => setSettings({ ...settings, show_featured_posts: String(e.target.checked) })}
                      />
                    </div>
                  </div>
                </CardHeader>
                {settings.show_featured_posts !== 'false' && (
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Judul Bagian Seksi</Label>
                        <Input
                          placeholder="Featured Post"
                          value={settings.title_featured_posts || ''}
                          onChange={(e) => setSettings({ ...settings, title_featured_posts: e.target.value })}
                        />
                      </div>

                      {/* Mode Switcher Buttons */}
                      <div>
                        <Label>Metode Pemilihan Konten Hero</Label>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                          <Button
                            type="button"
                            variant={settings.featured_posts_mode !== 'auto' ? 'default' : 'secondary'}
                            onClick={() => setSettings({ ...settings, featured_posts_mode: 'manual' })}
                            icon="fa-hand-pointer-o"
                            style={{ flex: 1 }}
                          >
                            Pilih Manual (5 Slot Spesifik)
                          </Button>
                          <Button
                            type="button"
                            variant={settings.featured_posts_mode === 'auto' ? 'default' : 'secondary'}
                            onClick={() => setSettings({ ...settings, featured_posts_mode: 'auto' })}
                            icon="fa-magic"
                            style={{ flex: 1 }}
                          >
                            Otomatis (Berdasarkan Kategori & Urutan)
                          </Button>
                        </div>
                      </div>

                      {/* Manual Slots Configuration */}
                      {settings.featured_posts_mode !== 'auto' ? (
                        <div
                          style={{
                            background: 'var(--dash-muted-bg)',
                            padding: '18px',
                            borderRadius: '12px',
                            border: '1px solid var(--dash-border)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px'
                          }}
                        >
                          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--dash-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Penetapan 5 Slot Hero:
                          </div>

                          {/* Center Big Hero Slot */}
                          <div className="dash-form-group" style={{ margin: 0 }}>
                            <Label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b' }}>
                              <i className="fa fa-star"></i> Slot 3 (Tengah Utama - Hero Besar):
                            </Label>
                            <Select
                              value={settings.featured_post_slot_3 || ''}
                              onChange={(e) => setSettings({ ...settings, featured_post_slot_3: e.target.value })}
                            >
                              <option value="">-- Pilih Artikel Utama Tengah --</option>
                              {allPosts.map(p => (
                                <option key={p.id} value={p.id}>#{p.id} - {p.title} ({p.category})</option>
                              ))}
                            </Select>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                            <div className="dash-form-group" style={{ margin: 0 }}>
                              <Label>Slot 1 (Kiri Atas):</Label>
                              <Select
                                value={settings.featured_post_slot_1 || ''}
                                onChange={(e) => setSettings({ ...settings, featured_post_slot_1: e.target.value })}
                              >
                                <option value="">-- Pilih Artikel --</option>
                                {allPosts.map(p => (
                                  <option key={p.id} value={p.id}>#{p.id} - {p.title}</option>
                                ))}
                              </Select>
                            </div>

                            <div className="dash-form-group" style={{ margin: 0 }}>
                              <Label>Slot 2 (Kiri Bawah):</Label>
                              <Select
                                value={settings.featured_post_slot_2 || ''}
                                onChange={(e) => setSettings({ ...settings, featured_post_slot_2: e.target.value })}
                              >
                                <option value="">-- Pilih Artikel --</option>
                                {allPosts.map(p => (
                                  <option key={p.id} value={p.id}>#{p.id} - {p.title}</option>
                                ))}
                              </Select>
                            </div>

                            <div className="dash-form-group" style={{ margin: 0 }}>
                              <Label>Slot 4 (Kanan Atas):</Label>
                              <Select
                                value={settings.featured_post_slot_4 || ''}
                                onChange={(e) => setSettings({ ...settings, featured_post_slot_4: e.target.value })}
                              >
                                <option value="">-- Pilih Artikel --</option>
                                {allPosts.map(p => (
                                  <option key={p.id} value={p.id}>#{p.id} - {p.title}</option>
                                ))}
                              </Select>
                            </div>

                            <div className="dash-form-group" style={{ margin: 0 }}>
                              <Label>Slot 5 (Kanan Bawah):</Label>
                              <Select
                                value={settings.featured_post_slot_5 || ''}
                                onChange={(e) => setSettings({ ...settings, featured_post_slot_5: e.target.value })}
                              >
                                <option value="">-- Pilih Artikel --</option>
                                {allPosts.map(p => (
                                  <option key={p.id} value={p.id}>#{p.id} - {p.title}</option>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                          <div className="dash-form-group" style={{ margin: 0 }}>
                            <Label>Kategori Sumber</Label>
                            <Select
                              value={settings.featured_posts_category || 'all'}
                              onChange={(e) => setSettings({ ...settings, featured_posts_category: e.target.value })}
                            >
                              <option value="all">Semua Kategori</option>
                              {categories.map(c => (
                                <option key={c.id} value={c.slug}>{c.name}</option>
                              ))}
                            </Select>
                          </div>

                          <div className="dash-form-group" style={{ margin: 0 }}>
                            <Label>Metode Urutan</Label>
                            <Select
                              value={settings.featured_posts_sort || 'latest'}
                              onChange={(e) => setSettings({ ...settings, featured_posts_sort: e.target.value })}
                            >
                              <option value="latest">Terbaru (Latest)</option>
                              <option value="views">Pembaca Terbanyak (Most Views)</option>
                              <option value="featured">Hanya Berita Utama (Featured Only)</option>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* 2. TRENDING POSTS */}
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <CardTitle icon="fa-bolt">2. Trending Posts</CardTitle>
                      <CardDescription>Seksi artikel yang sedang hangat diperbincangkan.</CardDescription>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: settings.show_trending_posts !== 'false' ? '#10b981' : 'var(--dash-text-muted)' }}>
                        {settings.show_trending_posts !== 'false' ? 'Aktif' : 'Nonaktif'}
                      </span>
                      <Switch
                        checked={settings.show_trending_posts !== 'false'}
                        onChange={(e) => setSettings({ ...settings, show_trending_posts: String(e.target.checked) })}
                      />
                    </div>
                  </div>
                </CardHeader>
                {settings.show_trending_posts !== 'false' && (
                  <CardContent>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Judul Seksi</Label>
                        <Input
                          placeholder="Trending Post"
                          value={settings.title_trending_posts || ''}
                          onChange={(e) => setSettings({ ...settings, title_trending_posts: e.target.value })}
                        />
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Filter Kategori</Label>
                        <Select
                          value={settings.trending_posts_category || 'all'}
                          onChange={(e) => setSettings({ ...settings, trending_posts_category: e.target.value })}
                        >
                          <option value="all">Semua Kategori</option>
                          {categories.map(c => (
                            <option key={c.id} value={c.slug}>{c.name}</option>
                          ))}
                        </Select>
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Urutan Konten</Label>
                        <Select
                          value={settings.trending_posts_sort || 'trending'}
                          onChange={(e) => setSettings({ ...settings, trending_posts_sort: e.target.value })}
                        >
                          <option value="trending">Interaksi / Trending</option>
                          <option value="latest">Terbaru</option>
                          <option value="views">Terpopuler</option>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* 3. POPULAR POSTS */}
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <CardTitle icon="fa-fire">3. Popular Posts</CardTitle>
                      <CardDescription>Seksi artikel terpopuler berdasarkan jumlah pembaca.</CardDescription>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: settings.show_popular_posts !== 'false' ? '#10b981' : 'var(--dash-text-muted)' }}>
                        {settings.show_popular_posts !== 'false' ? 'Aktif' : 'Nonaktif'}
                      </span>
                      <Switch
                        checked={settings.show_popular_posts !== 'false'}
                        onChange={(e) => setSettings({ ...settings, show_popular_posts: String(e.target.checked) })}
                      />
                    </div>
                  </div>
                </CardHeader>
                {settings.show_popular_posts !== 'false' && (
                  <CardContent>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Judul Seksi</Label>
                        <Input
                          placeholder="Popular Post"
                          value={settings.title_popular_posts || ''}
                          onChange={(e) => setSettings({ ...settings, title_popular_posts: e.target.value })}
                        />
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Filter Kategori</Label>
                        <Select
                          value={settings.popular_posts_category || 'all'}
                          onChange={(e) => setSettings({ ...settings, popular_posts_category: e.target.value })}
                        >
                          <option value="all">Semua Kategori</option>
                          {categories.map(c => (
                            <option key={c.id} value={c.slug}>{c.name}</option>
                          ))}
                        </Select>
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Urutan Konten</Label>
                        <Select
                          value={settings.popular_posts_sort || 'popular'}
                          onChange={(e) => setSettings({ ...settings, popular_posts_sort: e.target.value })}
                        >
                          <option value="popular">Jumlah Views Terbanyak</option>
                          <option value="latest">Terbaru</option>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* 4. HAND-PICKED NEWS */}
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <CardTitle icon="fa-bookmark">4. Hand-Picked News (Pilihan Redaksi)</CardTitle>
                      <CardDescription>Seksi artikel kurasi khusus dari tim redaksi majalah.</CardDescription>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: settings.show_handpick_posts !== 'false' ? '#10b981' : 'var(--dash-text-muted)' }}>
                        {settings.show_handpick_posts !== 'false' ? 'Aktif' : 'Nonaktif'}
                      </span>
                      <Switch
                        checked={settings.show_handpick_posts !== 'false'}
                        onChange={(e) => setSettings({ ...settings, show_handpick_posts: String(e.target.checked) })}
                      />
                    </div>
                  </div>
                </CardHeader>
                {settings.show_handpick_posts !== 'false' && (
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Judul Seksi</Label>
                          <Input
                            placeholder="Hand-Picked News"
                            value={settings.title_handpick_posts || ''}
                            onChange={(e) => setSettings({ ...settings, title_handpick_posts: e.target.value })}
                          />
                        </div>

                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Jumlah Artikel Ditampilkan</Label>
                          <Select
                            value={settings.handpick_posts_limit || '8'}
                            onChange={(e) => setSettings({ ...settings, handpick_posts_limit: e.target.value })}
                          >
                            <option value="4">4 Artikel</option>
                            <option value="6">6 Artikel</option>
                            <option value="8">8 Artikel</option>
                            <option value="12">12 Artikel</option>
                          </Select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Filter Kategori</Label>
                          <Select
                            value={settings.handpick_posts_category || 'all'}
                            onChange={(e) => setSettings({ ...settings, handpick_posts_category: e.target.value })}
                          >
                            <option value="all">Semua Kategori</option>
                            {categories.map(c => (
                              <option key={c.id} value={c.slug}>{c.name}</option>
                            ))}
                          </Select>
                        </div>

                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Urutan Konten</Label>
                          <Select
                            value={settings.handpick_posts_sort || 'latest'}
                            onChange={(e) => setSettings({ ...settings, handpick_posts_sort: e.target.value })}
                          >
                            <option value="latest">Terbaru</option>
                            <option value="views">Paling Banyak Dibaca</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* 5. SIDEBAR AD BANNER */}
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <CardTitle icon="fa-picture-o">5. Banner Iklan Sidebar (Sidebar Ad)</CardTitle>
                      <CardDescription>Kelola gambar poster, judul, deskripsi, dan tautan iklan banner pada sidebar website.</CardDescription>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: settings.show_sidebar_ad !== 'false' ? '#10b981' : 'var(--dash-text-muted)' }}>
                        {settings.show_sidebar_ad !== 'false' ? 'Aktif' : 'Nonaktif'}
                      </span>
                      <Switch
                        checked={settings.show_sidebar_ad !== 'false'}
                        onChange={(e) => setSettings({ ...settings, show_sidebar_ad: String(e.target.checked) })}
                      />
                    </div>
                  </div>
                </CardHeader>
                {settings.show_sidebar_ad !== 'false' && (
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Image Uploader for Sidebar Ad */}
                      <div>
                        <Label style={{ marginBottom: '8px', display: 'block' }}>Gambar Poster / Banner Iklan</Label>
                        <ImageUploader
                          value={settings.sidebar_ad_image || ''}
                          onChange={(url) => setSettings({ ...settings, sidebar_ad_image: url })}
                          label="Upload Banner Iklan (Rekomendasi 360x420 atau rasio vertikal)"
                          presetFolder="bg"
                          presetImages={['sidebar-ad.webp']}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Judul Iklan / Brand Title</Label>
                          <Input
                            placeholder="Contoh: Dua Narasi"
                            value={settings.sidebar_ad_title || ''}
                            onChange={(e) => setSettings({ ...settings, sidebar_ad_title: e.target.value })}
                          />
                        </div>

                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Deskripsi / Subtitle Iklan</Label>
                          <Input
                            placeholder="Contoh: Portal Berita & Opini Terpercaya"
                            value={settings.sidebar_ad_subtitle || ''}
                            onChange={(e) => setSettings({ ...settings, sidebar_ad_subtitle: e.target.value })}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Tautan / Target URL (Opsional)</Label>
                          <Input
                            placeholder="https://sponsor.com atau /subscribe"
                            value={settings.sidebar_ad_url || ''}
                            onChange={(e) => setSettings({ ...settings, sidebar_ad_url: e.target.value })}
                          />
                          <span style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '4px', display: 'block' }}>
                            Biarkan kosong jika banner tidak dapat diklik.
                          </span>
                        </div>

                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Target Pembukaan Tautan</Label>
                          <Select
                            value={settings.sidebar_ad_open_new_tab || 'true'}
                            onChange={(e) => setSettings({ ...settings, sidebar_ad_open_new_tab: e.target.value })}
                          >
                            <option value="true">Buka di Tab Baru (_blank)</option>
                            <option value="false">Buka di Tab yang Sama (_self)</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

            </div>
          </TabsContent>

          {/* ================= TAB 3: MEDIA SOSIAL ================= */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <CardTitle icon="fa-share-alt">Tautan Akun Media Sosial</CardTitle>
                    <CardDescription>Kelola tautan profil jejaring sosial yang muncul di bilah header dan footer portal.</CardDescription>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: settings.show_social_links !== 'false' ? '#10b981' : 'var(--dash-text-muted)' }}>
                      {settings.show_social_links !== 'false' ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <Switch
                      checked={settings.show_social_links !== 'false'}
                      onChange={(e) => setSettings({ ...settings, show_social_links: String(e.target.checked) })}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {socialPlatforms.map((platform) => {
                    const isEnabled = settings[`enable_${platform.key}`] !== 'false'
                    return (
                      <div
                        key={platform.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          background: 'var(--dash-muted-bg)',
                          border: '1px solid var(--dash-border)',
                          flexWrap: 'wrap'
                        }}
                      >
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--dash-card-bg)', border: '1px solid var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: 'var(--dash-text-main)' }}>
                          <i className={`fa ${platform.icon}`}></i>
                        </div>

                        <div style={{ width: '140px', fontWeight: 600, fontSize: '13px', color: 'var(--dash-text-main)' }}>
                          {platform.label}
                        </div>

                        <div style={{ flex: 1, minWidth: '220px' }}>
                          <Input
                            placeholder={platform.placeholder}
                            value={settings[`social_${platform.key}`] || ''}
                            onChange={(e) => setSettings({ ...settings, [`social_${platform.key}`]: e.target.value })}
                            disabled={!isEnabled}
                            style={{ height: '36px' }}
                          />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: isEnabled ? '#10b981' : 'var(--dash-text-muted)' }}>
                            {isEnabled ? 'ON' : 'OFF'}
                          </span>
                          <Switch
                            checked={isEnabled}
                            onChange={(e) => setSettings({ ...settings, [`enable_${platform.key}`]: String(e.target.checked) })}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= TAB 4: GOOGLE INDEXING & SEO ================= */}
          <TabsContent value="seo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Card 1: Google Search Console & Domain */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-google">Google Search Console & Domain Portal</CardTitle>
                  <CardDescription>Atur domain dasar situs untuk sitemap XML dan kode verifikasi kepemilikan Google Search Console.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Domain / URL Situs (Base URL) *</Label>
                        <Input
                          placeholder="https://duanarasi.com atau http://localhost:3000"
                          value={settings.site_url || ''}
                          onChange={(e) => setSettings({ ...settings, site_url: e.target.value })}
                        />
                        <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '2px' }}>
                          Digunakan untuk tautan absolut pada <code>sitemap.xml</code>, <code>news-sitemap.xml</code>, dan meta tags artikel.
                        </div>
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Google Search Console Verification Tag</Label>
                        <Input
                          placeholder="google-site-verification=XXXXXXXXXXXX atau kode acak"
                          value={settings.google_site_verification || ''}
                          onChange={(e) => setSettings({ ...settings, google_site_verification: e.target.value })}
                        />
                        <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '2px' }}>
                          Kode meta tag verifikasi HTML kepemilikan dari Google Search Console. Otomatis disisipkan ke <code>&lt;head&gt;</code> portal.
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Google Analytics 4 ID / GTM ID</Label>
                        <Input
                          placeholder="Contoh: G-XXXXXXXXXX"
                          value={settings.google_analytics_id || ''}
                          onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                        />
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Nama Publikasi Google News</Label>
                        <Input
                          placeholder="Dua Narasi"
                          value={settings.google_news_name || ''}
                          onChange={(e) => setSettings({ ...settings, google_news_name: e.target.value })}
                        />
                        <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '2px' }}>
                          Nama media pers Anda di Google News sitemap (Default: Dua Narasi).
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Otomatisasi Google Indexing & IndexNow API */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-bolt">Otomatisasi Indexing Artikel (Auto-Index on Publish)</CardTitle>
                  <CardDescription>Kirimkan notifikasi indeks secara otomatis dan instan ke Google & Search Engine setiap kali artikel baru dipublikasikan atau diperbarui.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Auto Indexing Switch */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--dash-muted-bg)', borderRadius: '10px', border: '1px solid var(--dash-border)' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--dash-text-main)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="fa fa-magic" style={{ color: '#da0105' }} />
                          Aktifkan Auto-Indexing Dinamis Saat Publikasi
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', maxWidth: '640px' }}>
                          Ketika aktif, setiap kali penulis/editor menerbitkan artikel baru (atau memperbarui berita), sistem secara otomatis mengirimkan sinyal crawl ke Googlebot dan jaringan IndexNow di latar belakang tanpa menghambat performa dashboard.
                        </div>
                      </div>
                      <Switch
                        checked={settings.auto_index_on_publish !== 'false'}
                        onChange={(e) => setSettings({ ...settings, auto_index_on_publish: String(e.target ? e.target.checked : e) })}
                      />
                    </div>

                    {/* Google Indexing API Service Account JSON */}
                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa fa-key" style={{ color: '#ea4335' }} />
                        Google Indexing API (Service Account JSON Key) - Opsional
                      </Label>
                      <textarea
                        className="dash-input"
                        rows={4}
                        placeholder='Paste isi file JSON Service Account dari Google Cloud di sini (berisi "client_email" dan "private_key")...'
                        value={settings.google_service_account_json || ''}
                        onChange={(e) => setSettings({ ...settings, google_service_account_json: e.target.value })}
                        style={{ width: '100%', fontFamily: 'monospace', fontSize: '12px', resize: 'vertical' }}
                      />
                      <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                        <strong>Cara Mendapatkan Kunci Resmi Google Indexing API:</strong>
                        <br />1. Buat Service Account di Google Cloud Console & aktifkan <em>Web Search Indexing API</em>.
                        <br />2. Tambahkan email Service Account sebagai <strong>Owner</strong> di Google Search Console properti domain Anda.
                        <br />3. Unduh file kunci JSON dan paste seluruh isinya ke kotak di atas. Artikel baru Anda akan langsung dilaporkan ke Googlebot dalam hitungan detik!
                      </div>
                    </div>

                    {/* IndexNow API Key (Bing, Yandex, Seznam, Naver) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="fa fa-windows" style={{ color: '#00a4ef' }} />
                          Kunci API IndexNow (Bing & Search Engine Network)
                        </Label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Input
                            placeholder="Kunci unik IndexNow (32 hex characters)"
                            value={settings.indexnow_key || 'duanarasi-indexnow-key-2026'}
                            onChange={(e) => setSettings({ ...settings, indexnow_key: e.target.value })}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleGenerateIndexNowKey}
                            style={{ whiteSpace: 'nowrap', height: '40px', padding: '0 14px' }}
                            title="Generate Kunci IndexNow Acak"
                          >
                            <i className="fa fa-refresh" /> Acak Kunci
                          </Button>
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '4px' }}>
                          Kunci verifikasi protokol IndexNow untuk mesin pencari selain Google (Bing, Yahoo, Yandex, Naver).
                        </div>
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>File Verifikasi Kunci IndexNow</Label>
                        <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                          <a
                            href="/indexnow-key.txt"
                            target="_blank"
                            rel="noreferrer"
                            className="dash-btn dash-btn-secondary"
                            style={{ height: '40px', width: '100%', justifyContent: 'space-between', padding: '0 14px', borderRadius: '8px' }}
                          >
                            <span><i className="fa fa-file-text-o" style={{ marginRight: '6px' }} /> Buka <strong>indexnow-key.txt</strong></span>
                            <i className="fa fa-external-link" style={{ opacity: 0.6 }} />
                          </a>
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '4px' }}>
                          File statis verifikasi kunci yang dibaca oleh bot crawler IndexNow.
                        </div>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>

              {/* Card 3: Instant Sitemap Ping & Bot Crawl Engine */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-paper-plane">Kirim Sinyal Indexing Manual & Tautan Sitemap</CardTitle>
                  <CardDescription>Picukan pengindeksan massal ke Googlebot dan Bing crawler untuk seluruh artikel aktif.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div
                      style={{
                        background: 'var(--dash-muted-bg)',
                        padding: '16px 20px',
                        borderRadius: '10px',
                        border: '1px solid var(--dash-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '14px'
                      }}
                    >
                      <div>
                        <div style={{ color: 'var(--dash-text-main)', fontWeight: 700, fontSize: '14px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fa fa-refresh text-success"></i> Kirim Sinyal Indexing ke Semua Mesin Pencari
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                          Memanggil API pengindeksan instan untuk mendaftarkan 20 artikel terbaru ke Googlebot & IndexNow network.
                        </div>
                      </div>

                      <Button
                        type="button"
                        onClick={handlePingGoogle}
                        loading={pinging}
                        icon={!pinging ? 'fa-paper-plane' : undefined}
                        variant="default"
                        style={{ height: '38px', padding: '0 20px', fontWeight: 700 }}
                      >
                        <span>{pinging ? 'Mengirim Sinyal...' : 'Kirim Indexing Sekarang'}</span>
                      </Button>
                    </div>

                    {/* Quick SEO Links */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                      <a
                        href="/sitemap.xml"
                        target="_blank"
                        rel="noreferrer"
                        className="dash-btn dash-btn-secondary"
                        style={{ height: '42px', justifyContent: 'flex-start', padding: '0 16px', borderRadius: '10px' }}
                      >
                        <i className="fa fa-sitemap" style={{ marginRight: '6px', color: 'var(--dash-primary)' }}></i>
                        <span>Dynamic <strong>sitemap.xml</strong></span>
                        <i className="fa fa-external-link" style={{ marginLeft: 'auto', opacity: 0.6, fontSize: '11px' }}></i>
                      </a>

                      <a
                        href="/news-sitemap.xml"
                        target="_blank"
                        rel="noreferrer"
                        className="dash-btn dash-btn-secondary"
                        style={{ height: '42px', justifyContent: 'flex-start', padding: '0 16px', borderRadius: '10px' }}
                      >
                        <i className="fa fa-newspaper-o" style={{ marginRight: '6px', color: '#da0105' }}></i>
                        <span>Google <strong>news-sitemap.xml</strong></span>
                        <i className="fa fa-external-link" style={{ marginLeft: 'auto', opacity: 0.6, fontSize: '11px' }}></i>
                      </a>

                      <a
                        href="/robots.txt"
                        target="_blank"
                        rel="noreferrer"
                        className="dash-btn dash-btn-secondary"
                        style={{ height: '42px', justifyContent: 'flex-start', padding: '0 16px', borderRadius: '10px' }}
                      >
                        <i className="fa fa-android" style={{ marginRight: '6px', color: '#10b981' }}></i>
                        <span>Dynamic <strong>robots.txt</strong></span>
                        <i className="fa fa-external-link" style={{ marginLeft: 'auto', opacity: 0.6, fontSize: '11px' }}></i>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 4: Log Aktivitas Indexing Terakhir */}
              {settings.last_indexing_log && (
                <Card>
                  <CardHeader>
                    <CardTitle icon="fa-history">Riwayat Aktivitas Pengindeksan Terakhir</CardTitle>
                    <CardDescription>Catatan otomatis pengiriman sinyal indeks ke bot crawler mesin pencari.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      try {
                        const log = typeof settings.last_indexing_log === 'string'
                          ? JSON.parse(settings.last_indexing_log)
                          : settings.last_indexing_log
                        return (
                          <div style={{ fontSize: '13px', background: 'var(--dash-muted-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--dash-border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                              <div>
                                <strong>Target: </strong>
                                <span style={{ color: 'var(--dash-primary)' }}>{log.title || log.url || 'Manual Batch Ping'}</span>
                              </div>
                              <span style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                                <i className="fa fa-clock-o" /> {new Date(log.timestamp).toLocaleString('id-ID')}
                              </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {Array.isArray(log.services) && log.services.map((svc, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px' }}>
                                  <span style={{
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10px',
                                    background: svc.ok === true ? '#dcfce7' : svc.ok === false ? '#fee2e2' : '#f1f5f9',
                                    color: svc.ok === true ? '#16a34a' : svc.ok === false ? '#dc2626' : '#64748b'
                                  }}>
                                    <i className={`fa ${svc.ok === true ? 'fa-check' : svc.ok === false ? 'fa-times' : 'fa-info'}`} />
                                  </span>
                                  <strong>{svc.name || svc.service}:</strong>
                                  <span style={{ color: 'var(--dash-text-muted)' }}>{svc.msg || svc.message || (svc.ok ? 'Sukses' : svc.error || 'Pending')}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      } catch (_) {
                        return <div style={{ color: 'var(--dash-text-muted)', fontSize: '12px' }}>{String(settings.last_indexing_log)}</div>
                      }
                    })()}
                  </CardContent>
                </Card>
              )}

            </div>
          </TabsContent>

          {/* ================= TAB: HALAMAN KONTAK ================= */}
          <TabsContent value="contact">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Card 1: Judul & Informasi Header */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-header">Judul & Pengantar Halaman Kontak</CardTitle>
                  <CardDescription>Teks judul, deskripsi, dan formulir kirim pesan pada laman <strong>/contact</strong>.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Judul Utama Halaman Kontak</Label>
                      <Input
                        placeholder="Contoh: Hubungi Redaksi Dua Narasi"
                        value={settings.contact_title || ''}
                        onChange={(e) => setSettings({ ...settings, contact_title: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Judul Formulir Pesan</Label>
                      <Input
                        placeholder="Contoh: Kirim Pesan Langsung"
                        value={settings.contact_form_title || ''}
                        onChange={(e) => setSettings({ ...settings, contact_form_title: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                      <Label>Subjudul / Pengantar Kontak</Label>
                      <textarea
                        className="dash-input"
                        rows={2}
                        placeholder="Deskripsi singkat pengantar di bawah judul..."
                        value={settings.contact_subtitle || ''}
                        onChange={(e) => setSettings({ ...settings, contact_subtitle: e.target.value })}
                        style={{ width: '100%', resize: 'vertical' }}
                      />
                    </div>

                    <div className="dash-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                      <Label>Deskripsi Petunjuk Formulir</Label>
                      <textarea
                        className="dash-input"
                        rows={2}
                        placeholder="Petunjuk untuk pembaca sebelum mengirimkan pesan..."
                        value={settings.contact_form_subtitle || ''}
                        onChange={(e) => setSettings({ ...settings, contact_form_subtitle: e.target.value })}
                        style={{ width: '100%', resize: 'vertical' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Kantor Redaksi Utama (Branch 1) */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-building">Kantor Redaksi Utama (Branch 1)</CardTitle>
                  <CardDescription>Informasi kontak kantor utama untuk surat menyurat dan kerja sama.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Nama Kantor / Lokasi</Label>
                      <Input
                        placeholder="Contoh: Kantor Redaksi Utama - Jakarta"
                        value={settings.contact_branch_1 || ''}
                        onChange={(e) => setSettings({ ...settings, contact_branch_1: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Alamat Email Redaksi</Label>
                      <Input
                        type="email"
                        placeholder="redaksi@duanarasi.com"
                        value={settings.contact_email_1 || ''}
                        onChange={(e) => setSettings({ ...settings, contact_email_1: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Nomor Telepon / Hotline</Label>
                      <Input
                        placeholder="+62 21 555 7890"
                        value={settings.contact_phone_1 || ''}
                        onChange={(e) => setSettings({ ...settings, contact_phone_1: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                      <Label>Alamat Fisik Lengkap</Label>
                      <textarea
                        className="dash-input"
                        rows={2}
                        placeholder="Alamat gedung, jalan, kota, dan kode pos..."
                        value={settings.contact_address_1 || ''}
                        onChange={(e) => setSettings({ ...settings, contact_address_1: e.target.value })}
                        style={{ width: '100%', resize: 'vertical' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3: Biro Redaksi Daerah / Cabang 2 */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-map-pin">Biro Redaksi Daerah / Kantor Cabang (Branch 2 - Opsional)</CardTitle>
                  <CardDescription>Kosongkan nama kantor jika hanya memiliki satu kantor tunggal.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Nama Biro / Cabang</Label>
                      <Input
                        placeholder="Contoh: Biro Redaksi - Bandung"
                        value={settings.contact_branch_2 || ''}
                        onChange={(e) => setSettings({ ...settings, contact_branch_2: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Email Biro</Label>
                      <Input
                        type="email"
                        placeholder="biro@duanarasi.com"
                        value={settings.contact_email_2 || ''}
                        onChange={(e) => setSettings({ ...settings, contact_email_2: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Nomor Telepon Biro</Label>
                      <Input
                        placeholder="+62 22 765 4321"
                        value={settings.contact_phone_2 || ''}
                        onChange={(e) => setSettings({ ...settings, contact_phone_2: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                      <Label>Alamat Lengkap Biro</Label>
                      <textarea
                        className="dash-input"
                        rows={2}
                        placeholder="Alamat biro cabang..."
                        value={settings.contact_address_2 || ''}
                        onChange={(e) => setSettings({ ...settings, contact_address_2: e.target.value })}
                        style={{ width: '100%', resize: 'vertical' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 4: Google Maps Embed */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-map">Peta Lokasi Interaktif (Google Maps)</CardTitle>
                  <CardDescription>Masukkan URL embed dari Google Maps untuk menampilkan peta lokasi kantor Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>URL Google Maps Embed (src pada iframe)</Label>
                      <Input
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        value={settings.contact_map_url || ''}
                        onChange={(e) => setSettings({ ...settings, contact_map_url: e.target.value })}
                      />
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', marginTop: '6px' }}>
                        <i className="fa fa-info-circle"></i> Cara mengambil URL: Buka Google Maps &rarr; Cari lokasi kantor &rarr; Klik <strong>Share / Bagikan</strong> &rarr; Pilih <strong>Embed a map / Sematkan peta</strong> &rarr; Salin URL di dalam atribut <code>src="..."</code>.
                      </div>
                    </div>

                    {settings.contact_map_url && (
                      <div style={{ marginTop: '10px' }}>
                        <Label style={{ marginBottom: '8px', display: 'block' }}>Pratinjau Peta:</Label>
                        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--dash-border)', height: '260px' }}>
                          <iframe
                            src={settings.contact_map_url}
                            style={{ width: '100%', height: '100%', border: 0 }}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* ================= TAB: HALAMAN TENTANG KAMI ================= */}
          <TabsContent value="about">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Card 1: Bagian Utama (Hero Profil) */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-info-circle">Hero & Profil Utama Halaman Tentang Kami</CardTitle>
                  <CardDescription>Pengaturan teks judul, label, pengantar, dan media pada halaman <strong>/about-us</strong>.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Judul Breadcrumb</Label>
                      <Input
                        placeholder="Contoh: Tentang Kami"
                        value={settings.about_breadcrumb || ''}
                        onChange={(e) => setSettings({ ...settings, about_breadcrumb: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Label / Badge Seksi</Label>
                      <Input
                        placeholder="Contoh: Tentang Dua Narasi"
                        value={settings.about_badge || ''}
                        onChange={(e) => setSettings({ ...settings, about_badge: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                      <Label>Judul Utama Halaman</Label>
                      <Input
                        placeholder="Contoh: Membangun Jurnalisme Berimbang dan Kritis"
                        value={settings.about_title || ''}
                        onChange={(e) => setSettings({ ...settings, about_title: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                      <Label>Deskripsi Paragraf Pengantar</Label>
                      <textarea
                        className="dash-input"
                        rows={3}
                        placeholder="Deskripsi singkat mengenai portal Dua Narasi..."
                        value={settings.about_description || ''}
                        onChange={(e) => setSettings({ ...settings, about_description: e.target.value })}
                        style={{ width: '100%', resize: 'vertical' }}
                      />
                    </div>

                    {/* Image Uploader */}
                    <div style={{ gridColumn: '1 / -1' }}>
                      <ImageUploader
                        label="Upload / Pilih Foto Utama (About Profile Cover)"
                        value={settings.about_image || ''}
                        onChange={(url) => setSettings({ ...settings, about_image: url })}
                        presetFolder="bg"
                        presetImages={['about-1.webp', 'about-2.webp']}
                      />
                    </div>

                    {/* Video Settings */}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--dash-border)', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <Label style={{ margin: 0 }}>Tampilkan Tombol Putar Video Profile</Label>
                          <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                            Menampilkan ikon tombol putar video YouTube di atas gambar profil.
                          </div>
                        </div>
                        <Switch
                          checked={settings.about_show_video !== 'false'}
                          onChange={(e) => setSettings({ ...settings, about_show_video: String(e.target ? e.target.checked : e) })}
                        />
                      </div>

                      {settings.about_show_video !== 'false' && (
                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>URL Video YouTube atau ID Video</Label>
                          <Input
                            placeholder="Contoh: https://www.youtube.com/watch?v=4xe72U7mXNg atau 4xe72U7mXNg"
                            value={settings.about_video_url || ''}
                            onChange={(e) => setSettings({ ...settings, about_video_url: e.target.value })}
                          />
                          <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', marginTop: '4px' }}>
                            Mendukung tautan lengkap YouTube maupun kode Video ID 11 karakter.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Tab Visi, Misi & Nilai Redaksi (Dinamis: Bisa Ditambah & Dikurang) */}
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <CardTitle icon="fa-th-list">Tab Visi, Misi & Nilai Redaksi (Dinamis)</CardTitle>
                      <CardDescription>Tambah, edit, atau hapus tab interaktif yang ditampilkan di samping hero profil Tentang Kami.</CardDescription>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAddTab}
                      style={{ fontSize: '13px', height: '34px', gap: '6px' }}
                    >
                      <i className="fa fa-plus"></i> Tambah Tab
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {getAboutTabs().map((tab, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '16px 18px',
                          background: 'var(--dash-surface-secondary, #f8fafc)',
                          borderRadius: '12px',
                          border: '1px solid var(--dash-border)',
                          position: 'relative'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px dashed var(--dash-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              background: 'var(--dash-primary, #da0105)',
                              color: '#fff',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '6px'
                            }}>
                              Tab #{idx + 1}
                            </span>
                            <strong style={{ fontSize: '14px', color: 'var(--dash-text-heading)' }}>
                              {tab.title || 'Tab Tanpa Judul'}
                            </strong>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveTab(idx)}
                            title="Hapus tab ini"
                            style={{
                              border: 'none',
                              background: '#fee2e2',
                              color: '#dc2626',
                              borderRadius: '6px',
                              padding: '4px 10px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              fontWeight: 600,
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <i className="fa fa-trash"></i> Hapus Tab
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                          <div className="dash-form-group" style={{ margin: 0 }}>
                            <Label>Judul Tab</Label>
                            <Input
                              placeholder="Contoh: Visi Kami"
                              value={tab.title || ''}
                              onChange={(e) => handleUpdateTab(idx, 'title', e.target.value)}
                            />
                          </div>
                          <div className="dash-form-group" style={{ margin: 0 }}>
                            <Label>Konten / Isi Tab</Label>
                            <textarea
                              className="dash-input"
                              rows={3}
                              placeholder="Penjelasan isi tab..."
                              value={tab.content || ''}
                              onChange={(e) => handleUpdateTab(idx, 'content', e.target.value)}
                              style={{ width: '100%', resize: 'vertical' }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddTab}
                      style={{
                        width: '100%',
                        border: '2px dashed var(--dash-border, #cbd5e1)',
                        background: 'transparent',
                        color: 'var(--dash-primary, #da0105)',
                        borderRadius: '10px',
                        padding: '12px',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <i className="fa fa-plus-circle"></i> Tambah Tab Baru
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3: Seksi Card Dinamis (Pilar / Nilai Utama / Keunggulan) */}
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <CardTitle icon="fa-th-large">Seksi Card Dinamis (Pilar Jurnalisme & Nilai Utama)</CardTitle>
                      <CardDescription>Tampilkan beberapa kartu informasi pilar atau keunggulan redaksi yang dapat ditambah dan dikurang secara bebas.</CardDescription>
                    </div>
                    <Switch
                      checked={settings.about_show_cards !== 'false'}
                      onChange={(e) => setSettings({ ...settings, about_show_cards: String(e.target ? e.target.checked : e) })}
                    />
                  </div>
                </CardHeader>
                {settings.about_show_cards !== 'false' && (
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Label / Badge Seksi Card (Eyebrow)</Label>
                          <Input
                            placeholder="Contoh: Pilar & Nilai Kami"
                            value={settings.about_cards_badge || ''}
                            onChange={(e) => setSettings({ ...settings, about_cards_badge: e.target.value })}
                          />
                        </div>

                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Judul Seksi Card</Label>
                          <Input
                            placeholder="Contoh: Pilar Jurnalisme & Nilai Utama"
                            value={settings.about_cards_title || ''}
                            onChange={(e) => setSettings({ ...settings, about_cards_title: e.target.value })}
                          />
                        </div>

                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Sub-judul / Keterangan Seksi Card</Label>
                          <Input
                            placeholder="Contoh: Prinsip independensi dan fakta berimbang Dua Narasi"
                            value={settings.about_cards_subtitle || ''}
                            onChange={(e) => setSettings({ ...settings, about_cards_subtitle: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* List of Cards */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {getAboutCards().map((card, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '16px 18px',
                              background: 'var(--dash-surface-secondary, #f8fafc)',
                              borderRadius: '12px',
                              border: '1px solid var(--dash-border)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px dashed var(--dash-border)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                  background: '#0284c7',
                                  color: '#fff',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  padding: '2px 8px',
                                  borderRadius: '6px'
                                }}>
                                  Card #{idx + 1}
                                </span>
                                <i className={`fa ${card.icon || 'fa-star'}`} style={{ color: 'var(--dash-primary, #da0105)' }}></i>
                                <strong style={{ fontSize: '14px', color: 'var(--dash-text-heading)' }}>
                                  {card.title || 'Card Tanpa Judul'}
                                </strong>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveCard(idx)}
                                title="Hapus card ini"
                                style={{
                                  border: 'none',
                                  background: '#fee2e2',
                                  color: '#dc2626',
                                  borderRadius: '6px',
                                  padding: '4px 10px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  fontWeight: 600
                                }}
                              >
                                <i className="fa fa-trash"></i> Hapus Card
                              </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                              <div className="dash-form-group" style={{ margin: 0 }}>
                                <Label>Ikon FontAwesome</Label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <Input
                                    placeholder="Contoh: fa-balance-scale"
                                    value={card.icon || ''}
                                    onChange={(e) => handleUpdateCard(idx, 'icon', e.target.value)}
                                  />
                                  <div style={{ width: '38px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid var(--dash-border)', borderRadius: '8px', color: 'var(--dash-primary, #da0105)' }}>
                                    <i className={`fa ${card.icon || 'fa-star'}`}></i>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                                  {['fa-balance-scale', 'fa-check-circle', 'fa-shield', 'fa-users', 'fa-bolt', 'fa-star', 'fa-globe', 'fa-newspaper-o', 'fa-award', 'fa-heart'].map(presetIcon => (
                                    <button
                                      key={presetIcon}
                                      type="button"
                                      onClick={() => handleUpdateCard(idx, 'icon', presetIcon)}
                                      style={{
                                        border: card.icon === presetIcon ? '1px solid var(--dash-primary, #da0105)' : '1px solid var(--dash-border)',
                                        background: card.icon === presetIcon ? '#fee2e2' : '#fff',
                                        borderRadius: '4px',
                                        padding: '2px 6px',
                                        fontSize: '11px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <i className={`fa ${presetIcon}`}></i>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="dash-form-group" style={{ margin: 0 }}>
                                <Label>Judul Card</Label>
                                <Input
                                  placeholder="Contoh: Dua Sudut Pandang"
                                  value={card.title || ''}
                                  onChange={(e) => handleUpdateCard(idx, 'title', e.target.value)}
                                />
                              </div>

                              <div className="dash-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                                <Label>Deskripsi Singkat Card</Label>
                                <textarea
                                  className="dash-input"
                                  rows={2}
                                  placeholder="Penjelasan card..."
                                  value={card.description || ''}
                                  onChange={(e) => handleUpdateCard(idx, 'description', e.target.value)}
                                  style={{ width: '100%', resize: 'vertical' }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={handleAddCard}
                          style={{
                            width: '100%',
                            border: '2px dashed var(--dash-border, #cbd5e1)',
                            background: 'transparent',
                            color: 'var(--dash-primary, #da0105)',
                            borderRadius: '10px',
                            padding: '12px',
                            fontWeight: 600,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <i className="fa fa-plus-circle"></i> Tambah Card Baru
                        </button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Card 4: Seksi Tim Redaksi (Our Team) */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-users">Seksi Tim Redaksi (Our Team)</CardTitle>
                  <CardDescription>Pengaturan daftar pengurus dan jurnalis pada halaman Tentang Kami.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <Label style={{ margin: 0 }}>Tampilkan Seksi Tim Redaksi</Label>
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                          Aktifkan untuk menampilkan jajaran anggota redaksi dan penulis.
                        </div>
                      </div>
                      <Switch
                        checked={settings.about_show_team !== 'false'}
                        onChange={(e) => setSettings({ ...settings, about_show_team: String(e.target ? e.target.checked : e) })}
                      />
                    </div>

                    {settings.about_show_team !== 'false' && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', borderTop: '1px solid var(--dash-border)', paddingTop: '16px' }}>
                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Judul Seksi Tim</Label>
                          <Input
                            placeholder="Contoh: Dewan Redaksi & Tim Penulis"
                            value={settings.about_team_title || ''}
                            onChange={(e) => setSettings({ ...settings, about_team_title: e.target.value })}
                          />
                        </div>

                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Sub-judul / Deskripsi Tim</Label>
                          <Input
                            placeholder="Contoh: Sosok profesional di balik liputan berimbang Dua Narasi"
                            value={settings.about_team_subtitle || ''}
                            onChange={(e) => setSettings({ ...settings, about_team_subtitle: e.target.value })}
                          />
                        </div>

                        <div style={{ gridColumn: '1 / -1', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '14px 18px', color: '#1e40af', fontSize: '13px', lineHeight: 1.5 }}>
                          <i className="fa fa-info-circle" style={{ marginRight: '8px' }}></i>
                          <strong>Terhubung Otomatis ke Database:</strong> Anggota tim diambil secara otomatis dari database pengguna (role ADMIN, EDITOR, atau AUTHOR). Anda dapat menambah atau mengedit nama, jabatan (designation), avatar, dan bio anggota di menu <a href="/dashboard/users" style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'underline' }}>Pengguna & Redaksi</a>.
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Card 5: Mitra & Featured On */}
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <CardTitle icon="fa-handshake-o">Seksi Mitra & Media Partner (Brands)</CardTitle>
                      <CardDescription>Menampilkan logo carousel media partner dan jaringan kerja sama (dapat ditambah dan dikurang).</CardDescription>
                    </div>
                    <Switch
                      checked={settings.about_show_brands !== 'false'}
                      onChange={(e) => setSettings({ ...settings, about_show_brands: String(e.target ? e.target.checked : e) })}
                    />
                  </div>
                </CardHeader>
                {settings.about_show_brands !== 'false' && (
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Judul Seksi Mitra</Label>
                          <Input
                            placeholder="Contoh: Mitra & Media Partner"
                            value={settings.about_brands_title || ''}
                            onChange={(e) => setSettings({ ...settings, about_brands_title: e.target.value })}
                          />
                        </div>

                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Sub-judul Mitra</Label>
                          <Input
                            placeholder="Contoh: Dipercaya dan berkolaborasi bersama media terkemuka"
                            value={settings.about_brands_subtitle || ''}
                            onChange={(e) => setSettings({ ...settings, about_brands_subtitle: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Dynamic Partner Logo List */}
                      <div style={{ borderTop: '1px solid var(--dash-border)', paddingTop: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                          <Label style={{ margin: 0, fontSize: '13px', fontWeight: 700 }}>
                            Daftar Logo Media Partner ({getAboutBrands().length})
                          </Label>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleAddBrand}
                            style={{ fontSize: '12px', height: '32px', gap: '6px' }}
                          >
                            <i className="fa fa-plus"></i> Tambah Logo Mitra
                          </Button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                          {getAboutBrands().map((brand, idx) => (
                            <div
                              key={idx}
                              style={{
                                padding: '16px',
                                background: 'var(--dash-surface-secondary, #f8fafc)',
                                borderRadius: '12px',
                                border: '1px solid var(--dash-border)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{
                                    background: '#475569',
                                    color: '#fff',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    padding: '2px 8px',
                                    borderRadius: '6px'
                                  }}>
                                    Mitra #{idx + 1}
                                  </span>
                                  <strong style={{ fontSize: '13px', color: 'var(--dash-text-heading)' }}>
                                    {brand.name || `Mitra ${idx + 1}`}
                                  </strong>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleRemoveBrand(idx)}
                                  title="Hapus logo mitra ini"
                                  style={{
                                    border: 'none',
                                    background: '#fee2e2',
                                    color: '#dc2626',
                                    borderRadius: '6px',
                                    padding: '3px 8px',
                                    fontSize: '11.5px',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontWeight: 600
                                  }}
                                >
                                  <i className="fa fa-trash"></i> Hapus
                                </button>
                              </div>

                              <div className="dash-form-group" style={{ margin: 0 }}>
                                <Label style={{ fontSize: '11.5px' }}>Nama Mitra / Alt Text</Label>
                                <Input
                                  placeholder="Contoh: Media Partner A"
                                  value={brand.name || ''}
                                  onChange={(e) => handleUpdateBrand(idx, 'name', e.target.value)}
                                />
                              </div>

                              <div>
                                <ImageUploader
                                  label="Upload Logo Mitra (Langsung ke ImgBB)"
                                  value={brand.img || ''}
                                  onChange={(url) => handleUpdateBrand(idx, 'img', url)}
                                  presetImages={[]}
                                  maxPreviewHeight={65}
                                />
                              </div>

                              <div className="dash-form-group" style={{ margin: 0 }}>
                                <Label style={{ fontSize: '11.5px' }}>Tautan Website Mitra (Opsional)</Label>
                                <Input
                                  placeholder="https://mitra-kami.com"
                                  value={brand.url || ''}
                                  onChange={(e) => handleUpdateBrand(idx, 'url', e.target.value)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={handleAddBrand}
                          style={{
                            width: '100%',
                            border: '2px dashed var(--dash-border, #cbd5e1)',
                            background: 'transparent',
                            color: 'var(--dash-primary, #da0105)',
                            borderRadius: '10px',
                            padding: '12px',
                            fontWeight: 600,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease',
                            marginTop: '14px'
                          }}
                        >
                          <i className="fa fa-plus-circle"></i> Tambah Logo Mitra Baru
                        </button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Card 6: Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-envelope-open">Seksi Berlangganan Newsletter</CardTitle>
                  <CardDescription>Formulir pendaftaran email newsletter pembaca di bagian bawah halaman.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <Label style={{ margin: 0 }}>Tampilkan Seksi Newsletter</Label>
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                          Aktifkan kotak berlangganan email newsletter.
                        </div>
                      </div>
                      <Switch
                        checked={settings.about_show_newsletter !== 'false'}
                        onChange={(e) => setSettings({ ...settings, about_show_newsletter: String(e.target ? e.target.checked : e) })}
                      />
                    </div>

                    {settings.about_show_newsletter !== 'false' && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', borderTop: '1px solid var(--dash-border)', paddingTop: '16px' }}>
                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Judul Newsletter</Label>
                          <Input
                            placeholder="Contoh: Dapatkan Pembaruan Berita Setiap Minggu"
                            value={settings.about_newsletter_title || ''}
                            onChange={(e) => setSettings({ ...settings, about_newsletter_title: e.target.value })}
                          />
                        </div>

                        <div className="dash-form-group" style={{ margin: 0 }}>
                          <Label>Sub-judul Newsletter</Label>
                          <Input
                            placeholder="Contoh: Berlangganan buletin kabar terbaru langsung di email Anda"
                            value={settings.about_newsletter_subtitle || ''}
                            onChange={(e) => setSettings({ ...settings, about_newsletter_subtitle: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* ================= TAB 7: BREAKING NEWS ================= */}
          <TabsContent value="breaking">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-bolt">Pengaturan Bilah & Fitur Breaking News</CardTitle>
                  <CardDescription>
                    Kelola visibilitas bilah ticker kilas berita (headline running text) di bagian atas header portal dan konfigurasi siaran pengumuman kilat.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Toggle Bilah Breaking News */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--dash-muted-bg)', borderRadius: '10px', border: '1px solid var(--dash-border)' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--dash-text-main)', marginBottom: '4px' }}>
                          <i className="fa fa-television" style={{ color: '#da0105', marginRight: '6px' }} />
                          Aktifkan Bilah Breaking News Ticker di Header
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                          Bilah ticker merah di header portal yang menampilkan rotasi kilas berita terkini berjalan secara dinamis.
                        </div>
                      </div>
                      <Switch
                        checked={settings.breaking_ticker_enabled !== 'false'}
                        onChange={(e) => setSettings({ ...settings, breaking_ticker_enabled: String(e.target ? e.target.checked : e) })}
                      />
                    </div>

                    {/* Judul / Badge Ticker */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Label Badge Ticker *</Label>
                        <Input
                          placeholder="Contoh: BREAKING NEWS"
                          value={settings.breaking_ticker_title || 'BREAKING NEWS'}
                          onChange={(e) => setSettings({ ...settings, breaking_ticker_title: e.target.value })}
                        />
                        <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '4px' }}>
                          Teks badge merah menyala di sisi kiri bilah ticker (Default: BREAKING NEWS).
                        </div>
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Tautan Halaman Khusus Breaking News</Label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                          <Input
                            value="/breaking-news"
                            disabled
                            style={{ background: 'var(--dash-muted-bg)', cursor: 'not-allowed' }}
                          />
                          <a
                            href="/breaking-news"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dash-btn dash-btn-secondary"
                            style={{ whiteSpace: 'nowrap', padding: '9px 14px', textDecoration: 'none' }}
                          >
                            <i className="fa fa-external-link" /> Buka Laman
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Siaran Pengumuman Darurat Kilat */}
                    <div className="dash-form-group" style={{ margin: 0, borderTop: '1px solid var(--dash-border)', paddingTop: '16px' }}>
                      <Label>Siaran Pengumuman Kilat Manual (Opsional)</Label>
                      <Input
                        placeholder="Contoh: BREAKING: Gempa bumi M 5.4 guncang wilayah pesisir selatan, tidak berpotensi tsunami..."
                        value={settings.breaking_ticker_custom_text || ''}
                        onChange={(e) => setSettings({ ...settings, breaking_ticker_custom_text: e.target.value })}
                      />
                      <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '4px' }}>
                        Jika diisi, bilah ticker akan memprioritaskan teks pengumuman darurat ini alih-alih judul artikel reguler. Kosongkan jika ingin menampilkan headline artikel terbaru secara otomatis.
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>

              {/* Panduan Penggunaan Breaking News */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-info-circle">Panduan Penulisan & Alur Breaking News</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--dash-text-main)', lineHeight: 1.6 }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fef2f2', color: '#da0105', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>1</span>
                      <div>
                        <strong>Menandai Artikel sebagai Breaking News:</strong> Saat menulis artikel baru atau menyunting di menu <em>Articles & Posts</em>, cukup centang opsi <span style={{ color: '#da0105', fontWeight: 700 }}>⚡ Tandai sebagai Breaking News</span>.
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fef2f2', color: '#da0105', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>2</span>
                      <div>
                        <strong>Tampil Otomatis di Berbagai Titik:</strong> Artikel yang ditandai akan otomatis muncul di bilah ticker berjalan di header, menu navigasi utama <em>Breaking News</em>, dan laman arsip kilas <code>/breaking-news</code>.
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fef2f2', color: '#da0105', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>3</span>
                      <div>
                        <strong>Badge Indikator Live:</strong> Menu navigasi dilengkapi animasi lampu berkedip (pulsing dot) warna merah menyerupai siaran berita langsung televisi.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>
        </Tabs>
      </form>
    </DashboardLayout>
  )
}
