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

export default function EditPost() {
  const router = useRouter()
  const { id } = router.query
  const [currentUser, setCurrentUser] = useState(null)
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [forbidden, setForbidden] = useState(false)
  const [toast, setToast] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categoryId: '',
    authorId: '',
    tagsInput: '',
    img: 'blog-2-1.webp',
    excerpt: '',
    content: '',
    status: 'PUBLISHED',
    featured: false,
    views: 0,
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
    { id: 'right-sidebar', label: 'Right Sidebar' },
    { id: 'left-sidebar', label: 'Left Sidebar' },
    { id: 'no-sidebar', label: 'No Sidebar (Full Width)' },
    { id: 'info-right', label: 'Info Right' },
    { id: 'compact', label: 'Compact' }
  ]

  const [presetImages, setPresetImages] = useState([
    'blog-2-1.webp', 'blog-2-2.webp', 'blog-2-3.webp', 'blog-2-4.webp',
    'blog-2-5.webp', 'blog-2-6.webp', 'blog-2-7.webp', 'blog-2-8.webp'
  ])

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.user) setCurrentUser(data.user)
      })
      .catch(console.error)

    Promise.all([
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/authors').then(r => r.json()),
      fetch('/api/settings').then(r => r.json())
    ])
      .then(([catData, authorData, settingsData]) => {
        if (catData.success) setCategories(catData.categories || [])
        if (authorData.success) setAuthors(authorData.authors || [])
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

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.post) {
          const p = data.post

          // If current user is an AUTHOR, verify post ownership
          if (currentUser && currentUser.role === 'AUTHOR') {
            const postAuthorId = p.authorId || (p.author?.id)
            if (postAuthorId && postAuthorId !== currentUser.id) {
              setForbidden(true)
              setLoading(false)
              return
            }
          }

          setFormData({
            title: p.title || '',
            slug: p.slug || '',
            categoryId: p.categoryId || (p.category?.id || ''),
            authorId: p.authorId || (p.author?.id || ''),
            editorName: p.editorName || 'By Dua Narasi',
            tagsInput: Array.isArray(p.tags) ? p.tags.map(t => t.name).join(', ') : '',
            img: p.img || 'blog-2-1.webp',
            excerpt: p.excerpt || '',
            content: p.content || '',
            status: p.status || 'PUBLISHED',
            featured: Boolean(p.featured),
            views: p.views || 0,
            postType: p.postType || 'standard',
            layout: p.layout || 'right-sidebar',
            videoUrl: p.videoUrl || '',
            audioUrl: p.audioUrl || '',
            quoteText: p.quoteText || '',
            quoteAuthor: p.quoteAuthor || '',
            externalUrl: p.externalUrl || '',
            gallery: p.gallery || ''
          })
        } else {
          setToast({ msg: 'Post not found', type: 'error' })
        }
      })
      .catch(() => setToast({ msg: 'Failed to fetch post', type: 'error' }))
      .finally(() => setLoading(false))
  }, [id, currentUser])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      setToast({ msg: 'Please enter an article title', type: 'error' })
      return
    }

    setSaving(true)
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

      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.success) {
        setToast({ msg: 'Article updated with ORM relations successfully!', type: 'success' })
      } else {
        setToast({ msg: data.message || 'Failed to update article', type: 'error' })
      }
    } catch (err) {
      setToast({ msg: 'Network error updating article', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <DashboardLayout title="Sunting Artikel Berita">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Page Header */}
      <PageHeader
        title="Sunting Artikel Berita"
        description="Perbarui konten berita, format media, kategori, dan detail publikasi artikel."
        icon="fa-pencil"
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link href={`/blog/${id}`} target="_blank" className="dash-btn dash-btn-secondary dash-pageheader-btn">
              <i className="fa fa-external-link"></i>
              <span>Lihat di Web</span>
            </Link>
            <Link href="/dashboard/posts" className="dash-btn dash-btn-secondary dash-pageheader-btn">
              <i className="fa fa-arrow-left"></i>
              <span>Kembali ke Artikel</span>
            </Link>
          </div>
        }
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
          <i className="fa fa-spinner fa-spin fa-2x" style={{ marginBottom: '12px' }}></i>
          <div>Loading article data...</div>
        </div>
      ) : forbidden ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          background: 'var(--dash-card-bg)',
          borderRadius: '16px',
          border: '1px solid var(--dash-border)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(218, 1, 5, 0.12)',
            color: '#da0105',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            marginBottom: '16px'
          }}>
            <i className="fa fa-lock"></i>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: 'var(--dash-text-main)' }}>
            Akses Ditolak
          </h2>
          <p style={{ color: 'var(--dash-text-muted)', fontSize: '14px', maxWidth: '420px', marginBottom: '24px' }}>
            Sebagai Penulis (<strong>AUTHOR</strong>), Anda hanya memiliki izin untuk mengedit artikel karya Anda sendiri.
          </p>
          <Link href="/dashboard/posts" className="dash-btn dash-btn-primary" style={{ textDecoration: 'none' }}>
            <i className="fa fa-arrow-left"></i> Kembali ke Daftar Artikel
          </Link>
        </div>
      ) : (
        <>
          {/* Post Format Selector Tabs */}
          <div className="dash-card" style={{ marginBottom: '24px', padding: '18px 24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Post Format / Type
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {postTypes.map((type) => {
                const isSelected = formData.postType === type.id
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, postType: type.id })}
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(99, 102, 241, 0.25))' : '#0f172a',
                      border: isSelected ? '1.5px solid #3b82f6' : '1px solid var(--dash-border)',
                      color: isSelected ? '#60a5fa' : '#cbd5e1',
                      borderRadius: '10px',
                      padding: '12px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center'
                    }}
                  >
                    <i className={`fa ${type.icon}`} style={{ fontSize: '18px' }}></i>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{type.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="dash-grid-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              {/* Main Column */}
              <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Dynamic format inputs */}
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
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <label className="dash-form-label">URL Tautan Luar / Sumber Asli *</label>
                        <input
                          type="url"
                          placeholder="https://contoh-sumber-berita.com/rilis-pers-resmi"
                          className="dash-input"
                          value={formData.externalUrl || ''}
                          onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                        />
                      </div>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <label className="dash-form-label">Teks Judul Tautan / Catatan Rujukan</label>
                        <input
                          type="text"
                          placeholder="Contoh: Kunjungi Laman Rilis Pers Resmi Kementerian..."
                          className="dash-input"
                          value={formData.quoteText || ''}
                          onChange={(e) => setFormData({ ...formData, quoteText: e.target.value })}
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
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <label className="dash-form-label">Isi Pesan Status Kilat / Breaking Alert *</label>
                        <textarea
                          className="dash-textarea"
                          rows={3}
                          placeholder="Tuliskan pernyataan singkat narasumber atau ringkasan status kilat di sini..."
                          value={formData.quoteText || ''}
                          onChange={(e) => setFormData({ ...formData, quoteText: e.target.value })}
                        />
                      </div>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <label className="dash-form-label">Sumber Akun / Narasumber</label>
                        <input
                          type="text"
                          placeholder="Contoh: Akun Resmi @BMKG di X / Twitter"
                          className="dash-input"
                          value={formData.quoteAuthor || ''}
                          onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.postType === 'quote' && (
                  <div className="dash-card" style={{ borderColor: 'rgba(245, 158, 11, 0.4)', background: 'var(--dash-card-bg)' }}>
                    <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <h3 className="dash-card-title" style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa fa-quote-left"></i> Pengaturan Kutipan Utama (Quote Post)
                      </h3>
                    </div>
                    <div className="dash-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <label className="dash-form-label">Teks Kutipan Utama (Quote Text) *</label>
                        <textarea
                          className="dash-textarea"
                          rows={3}
                          placeholder="Masukkan kutipan langsung narasumber yang ingin ditonjolkan..."
                          value={formData.quoteText || ''}
                          onChange={(e) => setFormData({ ...formData, quoteText: e.target.value })}
                        />
                      </div>
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <label className="dash-form-label">Nama Tokoh / Narasumber</label>
                        <input
                          type="text"
                          placeholder="Contoh: Steve Jobs, CEO Apple"
                          className="dash-input"
                          value={formData.quoteAuthor || ''}
                          onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.postType === 'video' && (
                  <div className="dash-card" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', background: 'var(--dash-card-bg)' }}>
                    <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <h3 className="dash-card-title" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa fa-play-circle"></i> Pengaturan Konten Video
                      </h3>
                    </div>
                    <div className="dash-card-body">
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <label className="dash-form-label">URL Embed Video (YouTube / Vimeo)</label>
                        <input
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="dash-input"
                          value={formData.videoUrl || ''}
                          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.postType === 'audio' && (
                  <div className="dash-card" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', background: 'var(--dash-card-bg)' }}>
                    <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <h3 className="dash-card-title" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa fa-volume-up"></i> Pengaturan Konten Audio / Podcast
                      </h3>
                    </div>
                    <div className="dash-card-body">
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <label className="dash-form-label">Audio Stream / SoundCloud Embed URL</label>
                        <input
                          type="url"
                          placeholder="https://soundcloud.com/... atau tautan embed podcast"
                          className="dash-input"
                          value={formData.audioUrl || ''}
                          onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.postType === 'gallery' && (
                  <div className="dash-card" style={{ borderColor: 'rgba(14, 165, 233, 0.4)', background: 'var(--dash-card-bg)' }}>
                    <div className="dash-card-header" style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <h3 className="dash-card-title" style={{ color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa fa-picture-o"></i> Pengaturan Galeri Gambar (Gallery Post)
                      </h3>
                    </div>
                    <div className="dash-card-body">
                      <div className="dash-form-group" style={{ margin: 0 }}>
                        <label className="dash-form-label">Daftar Nama Gambar Galeri (Pisahkan dengan koma)</label>
                        <input
                          type="text"
                          placeholder="blog-2-1.webp, blog-2-2.webp, blog-2-3.webp"
                          className="dash-input"
                          value={formData.gallery || ''}
                          onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                        />
                        <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', marginTop: '6px' }}>
                          Foto-foto di atas akan ditampilkan sebagai slider galeri interaktif di bagian atas halaman artikel.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="dash-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Article Details</h3>
                  </div>
                  <div className="dash-card-body">
                    <div className="dash-form-group">
                      <label className="dash-form-label">Article Title *</label>
                      <input
                        type="text"
                        className="dash-input"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="dash-form-group">
                      <label className="dash-form-label">Slug</label>
                      <input
                        type="text"
                        className="dash-input"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group">
                      <label className="dash-form-label">Summary / Excerpt</label>
                      <textarea
                        className="dash-textarea"
                        rows={3}
                        style={{ minHeight: '80px' }}
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group">
                      <label className="dash-form-label">Isi Artikel Lengkap (WYSIWYG Rich Text Editor)</label>
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

              {/* Sidebar */}
              <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Publish Settings */}
                <div className="dash-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Presentation & Status</h3>
                  </div>
                  <div className="dash-card-body">
                    <div className="dash-form-group">
                      <label className="dash-form-label">Status</label>
                      <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PUBLISHED">Published (Live)</SelectItem>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="dash-form-group">
                      <label className="dash-form-label">Layout Template</label>
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

                    <div className="dash-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <label htmlFor="featured" style={{ cursor: 'pointer', fontSize: '14px', margin: 0, color: 'var(--dash-text-main)' }}>
                        Featured Article
                      </label>
                    </div>

                    <div className="dash-form-group">
                      <label className="dash-form-label">Total Views</label>
                      <input
                        type="number"
                        className="dash-input"
                        value={formData.views}
                        onChange={(e) => setFormData({ ...formData, views: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="dash-btn dash-btn-primary"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                    >
                      <i className={`fa ${saving ? 'fa-spinner fa-spin' : 'fa-check'}`}></i>
                      <span>{saving ? 'Menyimpan Perubahan...' : 'Simpan Perubahan'}</span>
                    </button>
                  </div>
                </div>

                {/* Relational Category & Author */}
                <div className="dash-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Category, Author & Tags</h3>
                  </div>
                  <div className="dash-card-body">
                    <div className="dash-form-group">
                      <label className="dash-form-label">Category (Relational)</label>
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

                    <div className="dash-form-group">
                      <label className="dash-form-label">Author (Relational)</label>
                      <Select value={formData.authorId ? String(formData.authorId) : ''} onValueChange={(val) => setFormData({ ...formData, authorId: parseInt(val) })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Penulis..." />
                        </SelectTrigger>
                        <SelectContent>
                          {authors.map(a => (
                            <SelectItem key={a.id} value={String(a.id)}>{a.name} ({a.role})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="dash-form-group">
                      <label className="dash-form-label">Nama Editor / Penyunting Berita</label>
                      <input
                        type="text"
                        className="dash-input"
                        placeholder="Contoh: By Dua Narasi"
                        value={formData.editorName || ''}
                        onChange={(e) => setFormData({ ...formData, editorName: e.target.value })}
                      />
                    </div>

                    <div className="dash-form-group">
                      <label className="dash-form-label">Tags (Many-to-Many)</label>
                      <input
                        type="text"
                        className="dash-input"
                        placeholder="e.g. Design, Tech, AI"
                        value={formData.tagsInput}
                        onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="dash-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Cover Image (Upload via ImgBB)</h3>
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
        </>
      )}
    </DashboardLayout>
  )
}
