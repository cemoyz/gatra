import DashboardLayout from '@/components/dashboard/DashboardLayout'
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
import { useEffect, useState } from 'react'

export default function DashboardSettings() {
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [categories, setCategories] = useState([])
  const [allPosts, setAllPosts] = useState([])

  const [settings, setSettings] = useState({
    site_title: 'Hoom Magazine',
    site_tagline: 'Modern Blog & News Publishing Platform',
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
    contact_form_subtitle: 'Isi formulir di bawah ini untuk mengirimkan pertanyaan atau kerja sama langsung ke kotak masuk tim kami.'
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
        showToast('Sinyal sitemap berhasil dikirim ke Google & Search Engine!')
      } else {
        showToast(data.message || 'Gagal mengirim sinyal indexing', 'error')
      }
    } catch (err) {
      showToast('Error koneksi saat mengirim ping', 'error')
    } finally {
      setPinging(false)
    }
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
      } else {
        showToast(data.message || 'Gagal menyimpan pengaturan', 'error')
      }
    } catch (err) {
      showToast('Error koneksi saat menyimpan pengaturan', 'error')
    } finally {
      setSaving(false)
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
            <TabsTrigger value="seo" icon="fa-search">
              Google Indexing & SEO
            </TabsTrigger>
          </TabsList>

          {/* ================= TAB 1: IDENTITAS SITUS ================= */}
          <TabsContent value="general">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                        placeholder="Contoh: Hoom Magazine"
                        value={settings.site_title || ''}
                        onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="dash-form-group" style={{ margin: 0 }}>
                      <Label>Tagline Situs</Label>
                      <Input
                        placeholder="Contoh: Modern Blog & News Publishing Platform"
                        value={settings.site_tagline || ''}
                        onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                      />
                    </div>
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
              
              {/* Google Search Console & Domain Card */}
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
                          placeholder="https://hoom-magazine.com atau http://localhost:3000"
                          value={settings.site_url || ''}
                          onChange={(e) => setSettings({ ...settings, site_url: e.target.value })}
                        />
                        <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '2px' }}>
                          Digunakan untuk tautan absolut pada <code>sitemap.xml</code> dan <code>robots.txt</code>.
                        </div>
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Google Search Console Verification Tag</Label>
                        <Input
                          placeholder="google-site-verification=XXXXXXXXXXXX"
                          value={settings.google_site_verification || ''}
                          onChange={(e) => setSettings({ ...settings, google_site_verification: e.target.value })}
                        />
                        <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '2px' }}>
                          Kode meta tag verifikasi HTML dari Google Search Console.
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Google Analytics ID / GTM ID</Label>
                        <Input
                          placeholder="Contoh: G-XXXXXXXXXX"
                          value={settings.google_analytics_id || ''}
                          onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                        />
                      </div>

                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <Label>Nama Publikasi Google News</Label>
                        <Input
                          placeholder="Hoom Magazine"
                          value={settings.google_news_name || ''}
                          onChange={(e) => setSettings({ ...settings, google_news_name: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instant Sitemap Ping & Bot Crawl Engine */}
              <Card>
                <CardHeader>
                  <CardTitle icon="fa-paper-plane">Instant Google & Search Engine Indexing (Ping API)</CardTitle>
                  <CardDescription>Kirimkan notifikasi langsung ke Googlebot dan crawler mesin pencari untuk mempercepat pengindeksan artikel baru.</CardDescription>
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
                          <i className="fa fa-refresh text-success"></i> Kirim Sinyal Indexing ke Google & Bing (Instant Ping)
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                          Memanggil Google Ping API & IndexNow untuk langsung meng-crawl sitemap XML terbaru portal Anda.
                        </div>
                      </div>

                      <Button
                        type="button"
                        onClick={handlePingGoogle}
                        loading={pinging}
                        icon={!pinging ? 'fa-paper-plane' : undefined}
                        variant="default"
                        style={{ height: '36px', padding: '0 18px' }}
                      >
                        <span>{pinging ? 'Mengirim Sinyal...' : 'Kirim Ping Sekarang'}</span>
                      </Button>
                    </div>

                    {/* Quick SEO Links */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                      <a
                        href="/sitemap.xml"
                        target="_blank"
                        rel="noreferrer"
                        className="dash-btn dash-btn-secondary"
                        style={{ height: '42px', justifyContent: 'flex-start', padding: '0 16px', borderRadius: '10px' }}
                      >
                        <i className="fa fa-sitemap" style={{ marginRight: '6px', color: 'var(--dash-primary)' }}></i>
                        <span>Buka Dynamic <strong>sitemap.xml</strong></span>
                        <i className="fa fa-external-link" style={{ marginLeft: 'auto', opacity: 0.6, fontSize: '11px' }}></i>
                      </a>

                      <a
                        href="/robots.txt"
                        target="_blank"
                        rel="noreferrer"
                        className="dash-btn dash-btn-secondary"
                        style={{ height: '42px', justifyContent: 'flex-start', padding: '0 16px', borderRadius: '10px' }}
                      >
                        <i className="fa fa-android" style={{ marginRight: '6px', color: 'var(--dash-primary)' }}></i>
                        <span>Buka Dynamic <strong>robots.txt</strong></span>
                        <i className="fa fa-external-link" style={{ marginLeft: 'auto', opacity: 0.6, fontSize: '11px' }}></i>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
        </Tabs>
      </form>
    </DashboardLayout>
  )
}
