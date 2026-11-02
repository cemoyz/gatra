import DashboardLayout from '@/components/dashboard/DashboardLayout'
import {
  PageHeader,
  Toast,
  RichTextEditor,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/dashboard/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ImageUploader from '@/components/elements/ImageUploader'

export default function NewPost() {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categoryId: '',
    authorId: '',
    tagsInput: 'Berita, Teknologi',
    img: 'blog-2-1.webp',
    excerpt: '',
    content: '',
    status: 'PUBLISHED',
    featured: false,
    isBreaking: false,
    postType: 'standard',
    layout: 'right-sidebar',
    videoUrl: '',
    audioUrl: '',
    quoteText: '',
    quoteAuthor: '',
    externalUrl: '',
    gallery: ''
  })

  const postTypes = [
    { id: 'standard', label: 'Standard', icon: 'fa-file-text-o' },
    { id: 'video', label: 'Video', icon: 'fa-play-circle-o' },
    { id: 'audio', label: 'Audio', icon: 'fa-volume-up' },
    { id: 'gallery', label: 'Gallery', icon: 'fa-picture-o' },
    { id: 'quote', label: 'Quote', icon: 'fa-quote-left' },
    { id: 'link', label: 'Link', icon: 'fa-link' },
    { id: 'status', label: 'Status', icon: 'fa-commenting-o' }
  ]

  const layouts = [
    { id: 'right-sidebar', label: 'Sidebar Kanan (Standar)' },
    { id: 'left-sidebar', label: 'Sidebar Kiri' },
    { id: 'no-sidebar', label: 'Tanpa Sidebar (Full Width)' },
    { id: 'info-right', label: 'Info Kanan' },
    { id: 'compact', label: 'Tampilan Ringkas' }
  ]

  const [presetImages, setPresetImages] = useState([
    'blog-2-1.webp', 'blog-2-2.webp', 'blog-2-3.webp', 'blog-2-4.webp',
    'blog-2-5.webp', 'blog-2-6.webp', 'blog-2-7.webp', 'blog-2-8.webp'
  ])

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/authors').then(r => r.json()),
      fetch('/api/settings').then(r => r.json())
    ])
      .then(([catData, authorData, settingsData]) => {
        if (catData.success && catData.categories?.length > 0) {
          setCategories(catData.categories)
          setFormData(prev => ({ ...prev, categoryId: catData.categories[0].id }))
        }
        if (authorData.success && authorData.authors?.length > 0) {
          setAuthors(authorData.authors)
          setFormData(prev => ({ ...prev, authorId: authorData.authors[0].id }))
        }
        if (settingsData?.success && settingsData.settings?.post_preset_images) {
          try {
            const parsed = JSON.parse(settingsData.settings.post_preset_images)
            if (Array.isArray(parsed) && parsed.length > 0) {
              setPresetImages(parsed)
            }
          } catch (e) {
            const list = settingsData.settings.post_preset_images.split(',').map(s => s.trim()).filter(Boolean)
            if (list.length > 0) setPresetImages(list)
          }
        }
      })
      .catch(console.error)
  }, [])

  const handleTitleChange = (e) => {
    const val = e.target.value
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setFormData(prev => ({ ...prev, title: val, slug }))
  }

  const handleBreakingToggle = (checked) => {
    let currentTags = formData.tagsInput ? formData.tagsInput.split(',').map(t => t.trim()).filter(Boolean) : []
    if (checked) {
      if (!currentTags.some(t => t.toLowerCase() === 'breaking news')) {
        currentTags.push('Breaking News')
      }
    } else {
      currentTags = currentTags.filter(t => !t.toLowerCase().includes('breaking') && !['kilas-berita', 'urgent'].includes(t.toLowerCase()))
    }
    setFormData(prev => ({
      ...prev,
      isBreaking: checked,
      tagsInput: currentTags.join(', ')
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      setToast({ msg: 'Mohon masukkan judul artikel', type: 'error' })
      return
    }

    setLoading(true)
    try {
      const tagsArray = formData.tagsInput
        ? formData.tagsInput.split(',').map(t => t.trim()).filter(Boolean)
        : []

      const payload = {
        ...formData,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
        authorId: formData.authorId ? parseInt(formData.authorId) : null,
        tags: tagsArray
      }

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.success) {
        setToast({ msg: 'Artikel berhasil diterbitkan!', type: 'success' })
        setTimeout(() => router.push('/dashboard/posts'), 1200)
      } else {
        setToast({ msg: data.message || 'Gagal menyimpan artikel', type: 'error' })
      }
    } catch (err) {
      setToast({ msg: 'Error saat menyimpan artikel', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout title="Tulis Berita / Artikel Baru">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Page Header */}
      <PageHeader
        title="Tulis Artikel Baru"
        description="Publikasikan naskah berita, liputan khusus, atau artikel editorial ke portal majalah."
        icon="fa-pencil-square-o"
        actions={
          <Link
            href="/dashboard/posts"
            className="dash-btn dash-btn-secondary dash-pageheader-btn"
          >
            <i className="fa fa-arrow-left"></i>
            <span>Kembali ke Artikel</span>
          </Link>
        }
      />

      {/* Post Format Selector Tabs */}
      <div className="dash-card" style={{ marginBottom: '24px', padding: '18px 24px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--dash-text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          Pilih Format Artikel
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
          {postTypes.map((type) => {
            const isSelected = formData.postType === type.id
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData({ ...formData, postType: type.id })}
                style={{
                  background: isSelected ? 'var(--dash-muted-bg)' : 'var(--dash-card-bg)',
                  border: isSelected ? '2px solid var(--dash-primary)' : '1px solid var(--dash-border)',
                  color: isSelected ? 'var(--dash-text-main)' : 'var(--dash-text-muted)',
                  borderRadius: '10px',
                  padding: '12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'center'
                }}
              >
                <i className={`fa ${type.icon}`} style={{ fontSize: '18px', color: isSelected ? 'var(--dash-primary)' : 'inherit' }}></i>
                <span style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 500 }}>{type.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="dash-grid-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          
          {/* Main Article Content (8 cols) */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Format-Specific Dynamic Inputs */}
            {formData.postType === 'link' && (
              <div className="dash-card" style={{ borderColor: 'rgba(59, 130, 246, 0.4)', background: 'var(--dash-card-bg)' }}>
                <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                  <h3 className="dash-card-title" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6' }}>
                    <i className="fa fa-link"></i> Pengaturan Tautan Sumber (Link Post)
                  </h3>
                </div>
                <div className="dash-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ fontSize: '12.5px', color: 'var(--dash-text-muted)', lineHeight: '1.5' }}>
                    Format <strong>Link Post</strong> menampilkan kotak sorot tautan rujukan aktif di bagian atas halaman artikel sehingga pembaca dapat langsung mengunjungi sumber asli berita.
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                      URL Tautan Luar / Sumber Asli *
                    </label>
                    <input
                      type="url"
                      placeholder="https://contoh-sumber-berita.com/rilis-pers-resmi"
                      value={formData.externalUrl}
                      onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                      className="dash-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                      Teks Judul Tautan / Catatan Rujukan
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Kunjungi Laman Rilis Pers Resmi Kementerian..."
                      value={formData.quoteText}
                      onChange={(e) => setFormData({ ...formData, quoteText: e.target.value })}
                      className="dash-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.postType === 'status' && (
              <div className="dash-card" style={{ borderColor: 'rgba(168, 85, 247, 0.4)', background: 'var(--dash-card-bg)' }}>
                <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                  <h3 className="dash-card-title" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7' }}>
                    <i className="fa fa-commenting"></i> Pengaturan Status Kilat (Status Post)
                  </h3>
                </div>
                <div className="dash-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ fontSize: '12.5px', color: 'var(--dash-text-muted)', lineHeight: '1.5' }}>
                    Format <strong>Status Post</strong> cocok untuk rilis breaking alert, pernyataan kilat narasumber, atau kutipan media sosial penting di bagian atas artikel.
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                      Isi Pesan Status Kilat / Breaking Alert *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tuliskan pernyataan singkat narasumber atau ringkasan status kilat di sini..."
                      value={formData.quoteText}
                      onChange={(e) => setFormData({ ...formData, quoteText: e.target.value })}
                      className="dash-textarea"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                      Sumber Akun / Narasumber
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Akun Resmi @BMKG di X / Twitter"
                      value={formData.quoteAuthor}
                      onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })}
                      className="dash-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.postType === 'quote' && (
              <div className="dash-card" style={{ borderColor: 'rgba(245, 158, 11, 0.4)', background: 'var(--dash-card-bg)' }}>
                <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                  <h3 className="dash-card-title" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b' }}>
                    <i className="fa fa-quote-left"></i> Pengaturan Kutipan Utama (Quote Post)
                  </h3>
                </div>
                <div className="dash-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                      Teks Kutipan Utama (Quote Text) *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Masukkan kutipan langsung narasumber yang ingin ditonjolkan..."
                      value={formData.quoteText}
                      onChange={(e) => setFormData({ ...formData, quoteText: e.target.value })}
                      className="dash-textarea"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                      Nama Tokoh / Narasumber
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Steve Jobs, CEO Apple"
                      value={formData.quoteAuthor}
                      onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })}
                      className="dash-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.postType === 'video' && (
              <div className="dash-card" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', background: 'var(--dash-card-bg)' }}>
                <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                  <h3 className="dash-card-title" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <i className="fa fa-play-circle"></i> Pengaturan Konten Video
                  </h3>
                </div>
                <div className="dash-card-body">
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    URL Embed Video (YouTube / Vimeo)
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="dash-input"
                  />
                </div>
              </div>
            )}

            {formData.postType === 'audio' && (
              <div className="dash-card" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', background: 'var(--dash-card-bg)' }}>
                <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                  <h3 className="dash-card-title" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                    <i className="fa fa-volume-up"></i> Pengaturan Konten Audio / Podcast
                  </h3>
                </div>
                <div className="dash-card-body">
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    URL Stream Audio (SoundCloud / Spotify Embed)
                  </label>
                  <input
                    type="url"
                    placeholder="https://soundcloud.com/... atau tautan embed podcast"
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                    className="dash-input"
                  />
                </div>
              </div>
            )}

            {formData.postType === 'gallery' && (
              <div className="dash-card" style={{ borderColor: 'rgba(14, 165, 233, 0.4)', background: 'var(--dash-card-bg)' }}>
                <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                  <h3 className="dash-card-title" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9' }}>
                    <i className="fa fa-picture-o"></i> Pengaturan Galeri Gambar (Gallery Post)
                  </h3>
                </div>
                <div className="dash-card-body">
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Daftar Nama Gambar Galeri (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    placeholder="blog-2-1.webp, blog-2-2.webp, blog-2-3.webp"
                    value={formData.gallery}
                    onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                    className="dash-input"
                  />
                  <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', marginTop: '6px' }}>
                    Foto-foto di atas akan ditampilkan sebagai slider galeri interaktif di bagian atas halaman artikel.
                  </div>
                </div>
              </div>
            )}

            {/* Standard Article Inputs */}
            <div className="dash-card">
              <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                <h3 className="dash-card-title" style={{ fontSize: '16px' }}>Naskah Berita & Konten</h3>
              </div>
              <div className="dash-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Judul Artikel Berita *
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan judul berita yang menarik..."
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'var(--dash-muted-bg)',
                      border: '1px solid var(--dash-border)',
                      borderRadius: '10px',
                      color: 'var(--dash-text-main)',
                      fontSize: '14px',
                      fontWeight: 600,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Slug URL
                  </label>
                  <input
                    type="text"
                    placeholder="slug-artikel-otomatis"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 14px',
                      background: 'var(--dash-muted-bg)',
                      border: '1px solid var(--dash-border)',
                      borderRadius: '10px',
                      color: 'var(--dash-text-muted)',
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Ringkasan Berita (Excerpt / Meta Deskripsi)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ringkasan singkat untuk tampilan kartu berita dan optimasi SEO..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'var(--dash-muted-bg)',
                      border: '1px solid var(--dash-border)',
                      borderRadius: '10px',
                      color: 'var(--dash-text-main)',
                      fontSize: '13.5px',
                      lineHeight: '1.5',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--dash-text-main)', marginBottom: '8px' }}>
                    Isi Artikel Lengkap (WYSIWYG Rich Text Editor)
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    placeholder="Tuliskan naskah lengkap artikel berita Anda di sini..."
                    minHeight="340px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings (4 cols) */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Publish Action Card */}
            <div className="dash-card">
              <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                <h3 className="dash-card-title" style={{ fontSize: '15px' }}>Publikasi & Tata Letak</h3>
              </div>
              <div className="dash-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Status Artikel
                  </label>
                  <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLISHED">Terbit (Live)</SelectItem>
                      <SelectItem value="DRAFT">Draf (Disimpan)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Template Tata Letak
                  </label>
                  <Select value={formData.layout} onValueChange={(val) => setFormData({ ...formData, layout: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {layouts.map(l => (
                        <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label htmlFor="featured" style={{ cursor: 'pointer', fontSize: '13px', margin: 0, color: 'var(--dash-text-main)', fontWeight: 600 }}>
                    Jadikan Berita Utama (Featured)
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <input
                    type="checkbox"
                    id="isBreaking"
                    checked={formData.isBreaking || false}
                    onChange={(e) => handleBreakingToggle(e.target.checked)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#da0105' }}
                  />
                  <label htmlFor="isBreaking" style={{ cursor: 'pointer', fontSize: '13px', margin: 0, color: '#da0105', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa fa-bolt" /> Tandai sebagai Breaking News
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="dash-btn dash-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '10px' }}
                >
                  <i className={`fa ${loading ? 'fa-spinner fa-spin' : 'fa-check'}`}></i>
                  <span>{loading ? 'Mempublikasikan...' : 'Terbitkan Artikel'}</span>
                </button>
              </div>
            </div>

            {/* Relational Category & Author Card */}
            <div className="dash-card">
              <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                <h3 className="dash-card-title" style={{ fontSize: '15px' }}>Kategori & Penulis</h3>
              </div>
              <div className="dash-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Kategori Berita
                  </label>
                  <Select value={formData.categoryId ? String(formData.categoryId) : ''} onValueChange={(val) => setFormData({ ...formData, categoryId: parseInt(val) })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => (
                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Penulis / Redaktur
                  </label>
                  <Select value={formData.authorId ? String(formData.authorId) : ''} onValueChange={(val) => setFormData({ ...formData, authorId: parseInt(val) })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Penulis..." />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map(a => (
                        <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Nama Editor / Penyunting Berita
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: By Dua Narasi"
                    value={formData.editorName ?? 'By Dua Narasi'}
                    onChange={(e) => setFormData({ ...formData, editorName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'var(--dash-muted-bg)',
                      border: '1px solid var(--dash-border)',
                      borderRadius: '8px',
                      color: 'var(--dash-text-main)',
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '6px' }}>
                    Tag Berita (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    placeholder="Politik, Ekonomi, AI, Tren"
                    value={formData.tagsInput}
                    onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'var(--dash-muted-bg)',
                      border: '1px solid var(--dash-border)',
                      borderRadius: '8px',
                      color: 'var(--dash-text-main)',
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Cover Image Upload Card */}
            <div className="dash-card">
              <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                <h3 className="dash-card-title" style={{ fontSize: '15px' }}>Foto Sampul (Cover)</h3>
              </div>
              <div className="dash-card-body">
                <ImageUploader
                  value={formData.img}
                  onChange={(imgUrl) => setFormData({ ...formData, img: imgUrl })}
                  presetImages={presetImages}
                />
              </div>
            </div>

          </div>

        </div>
      </form>
    </DashboardLayout>
  )
}
