import DashboardLayout from '@/components/dashboard/DashboardLayout'
import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardLoadingOverlay,
  Badge,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Toast,
  Modal,
  EmptyState
} from '@/components/dashboard/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

let cachedPosts = []
let cachedCategories = []
let cachedPagination = { page: 1, totalPages: 1, total: 0 }

export default function PostsManagement() {
  const [currentUser, setCurrentUser] = useState(null)
  const [posts, setPosts] = useState(cachedPosts)
  const [categories, setCategories] = useState(cachedCategories)
  const [loading, setLoading] = useState(cachedPosts.length === 0)
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [pagination, setPagination] = useState(cachedPagination)
  const [toast, setToast] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const postTypes = [
    { id: 'all', label: 'Semua Format' },
    { id: 'standard', label: 'Standard' },
    { id: 'video', label: 'Video' },
    { id: 'audio', label: 'Audio / Podcast' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'quote', label: 'Quote' },
    { id: 'link', label: 'Link' },
    { id: 'status', label: 'Status' }
  ]

  // Fetch current user and categories
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) setCurrentUser(data.user)
      })
      .catch(console.error)

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.categories)) {
          cachedCategories = data.categories
          setCategories(data.categories)
        }
      })
      .catch(console.error)
  }, [])

  const fetchPosts = async (page = 1, user = currentUser) => {
    if (cachedPosts.length === 0) setLoading(true)
    try {
      const params = {
        page,
        limit: 15,
        search,
        category: selectedCat,
        status: selectedStatus,
        postType: selectedType
      }

      if (user?.role === 'AUTHOR' && user.author?.id) {
        params.authorId = user.author.id
      }

      const query = new URLSearchParams(params)
      const res = await fetch(`/api/posts?${query.toString()}`)
      const data = await res.json()
      if (data.success) {
        cachedPosts = data.posts || []
        cachedPagination = data.pagination || { page: 1, totalPages: 1, total: 0 }
        setPosts(cachedPosts)
        setPagination(cachedPagination)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts(1, currentUser)
  }, [selectedCat, selectedStatus, selectedType, currentUser])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchPosts(1)
  }

  const handleResetFilters = () => {
    setSearch('')
    setSelectedCat('all')
    setSelectedStatus('all')
    setSelectedType('all')
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/posts/${deleteTarget.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        showToast('Artikel berhasil dihapus')
        setDeleteTarget(null)
        fetchPosts(pagination.page)
      } else {
        showToast(data.message || 'Gagal menghapus artikel', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan', 'error')
    } finally {
      setDeleting(false)
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'fa-play-circle-o'
      case 'audio': return 'fa-volume-up'
      case 'gallery': return 'fa-picture-o'
      case 'quote': return 'fa-quote-left'
      case 'link': return 'fa-link'
      case 'status': return 'fa-commenting-o'
      default: return 'fa-file-text-o'
    }
  }

  const getPreviewUrl = (post) => {
    switch (post.postType) {
      case 'video': return '/blog-details-video'
      case 'audio': return '/blog-details-audio'
      case 'gallery': return '/blog-details-gallery'
      case 'quote': return '/blog-details-quote'
      case 'link': return '/blog-details-link'
      case 'status': return '/blog-details-status'
      default: return `/blog/${post.id}`
    }
  }

  const isFiltered = search || selectedCat !== 'all' || selectedStatus !== 'all' || selectedType !== 'all'

  return (
    <DashboardLayout title="Manajemen Berita & Artikel">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Page Header */}
      <PageHeader
        title="Manajemen Berita & Artikel"
        description="Kelola, filter format konten, sunting naskah, dan publikasikan artikel berita portal."
        badge={`${pagination.total || posts.length} Artikel`}
        icon="fa-newspaper-o"
        actions={
          <Link
            href="/dashboard/posts/new"
            className="dash-btn dash-btn-primary dash-pageheader-btn"
          >
            <i className="fa fa-plus"></i>
            <span>Tulis Artikel Baru</span>
          </Link>
        }
      />

      {/* Main Table Card with Integrated Header Toolbar matching main-files */}
      <Card style={{ position: 'relative', minHeight: '380px' }}>
        <CardLoadingOverlay loading={loading && posts.length === 0} text="Memuat daftar artikel..." />
        <CardHeader style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', width: '100%' }}>
            <CardTitle icon="fa-list">
              Daftar Artikel ({pagination.total || posts.length})
            </CardTitle>

            {/* Reset Filter Button if active */}
            {isFiltered && (
              <Button
                onClick={handleResetFilters}
                variant="ghost"
                size="sm"
                style={{ color: '#ef4444', fontSize: '12px' }}
                icon="fa-times"
              >
                Reset Semua Filter
              </Button>
            )}
          </div>

          {/* Unified Filter Row */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', flex: '1 1 280px', minWidth: '240px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <i
                  className="fa fa-search"
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--dash-text-muted)',
                    fontSize: '13px',
                    pointerEvents: 'none'
                  }}
                ></i>
                <input
                  type="text"
                  placeholder="Cari judul berita, ringkasan, atau isi konten..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: '100%',
                    height: '36px',
                    padding: '0 12px 0 34px',
                    borderRadius: '8px',
                    border: '1px solid var(--dash-border)',
                    background: 'var(--dash-card-bg)',
                    color: 'var(--dash-text-main)',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.15s ease'
                  }}
                />
              </div>
            </form>

            {/* Format Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger style={{ height: '36px', minWidth: '145px' }}>
                <SelectValue placeholder="Semua Format" />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={selectedCat} onValueChange={setSelectedCat}>
              <SelectTrigger style={{ height: '36px', minWidth: '160px' }}>
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger style={{ height: '36px', minWidth: '145px' }}>
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="PUBLISHED">Terbit (Published)</SelectItem>
                <SelectItem value="DRAFT">Draf (Draft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        {/* Table Content */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--dash-muted-bg)', borderBottom: '1px solid var(--dash-border)' }}>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, width: '40px' }}>#</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Judul Berita & Thumbnail</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Format</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Kategori</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Penulis</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Pembaca</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 && !loading ? (
                <tr>
                  <td colSpan="8">
                    <EmptyState
                      icon="fa-newspaper-o"
                      title="Tidak Ada Artikel Ditemukan"
                      description="Tidak ada artikel yang cocok dengan kata kunci atau filter yang Anda pilih."
                    />
                  </td>
                </tr>
              ) : (
                posts.map((post, idx) => (
                  <tr key={post.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                    <td style={{ padding: '14px 18px', color: 'var(--dash-text-muted)', fontSize: '12.5px', fontWeight: 600 }}>
                      {(pagination.page - 1) * 15 + idx + 1}
                    </td>
                    <td style={{ padding: '14px 18px', maxWidth: '360px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img
                          src={post.img?.startsWith('http') ? post.img : `/assets/img/blog/${post.img || 'blog-2-1.webp'}`}
                          alt=""
                          style={{
                            width: '44px',
                            height: '44px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            backgroundColor: 'var(--dash-muted-bg)',
                            flexShrink: 0,
                            border: '1px solid var(--dash-border)'
                          }}
                          onError={(e) => {
                            e.currentTarget.src = '/assets/img/blog/blog-2-1.webp'
                          }}
                        />
                        <div style={{ overflow: 'hidden' }}>
                          <Link
                            href={`/dashboard/posts/edit/${post.id}`}
                            style={{
                              fontWeight: 600,
                              color: 'var(--dash-text-main)',
                              fontSize: '13.5px',
                              marginBottom: '3px',
                              display: 'block',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              textDecoration: 'none'
                            }}
                          >
                            {post.title}
                          </Link>
                          <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            /{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          color: 'var(--dash-text-main)',
                          background: 'var(--dash-muted-bg)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--dash-border)',
                          textTransform: 'capitalize',
                          fontWeight: 500
                        }}
                      >
                        <i className={`fa ${getTypeIcon(post.postType)}`} style={{ opacity: 0.7 }}></i>
                        <span>{post.postType || 'standard'}</span>
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <Badge variant="outline">{post.category || 'Berita'}</Badge>
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--dash-text-main)', fontSize: '13px', fontWeight: 600 }}>
                      {post.author || 'Redaksi'}
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--dash-text-muted)', fontSize: '13px' }}>
                      <i className="fa fa-eye" style={{ marginRight: '5px', opacity: 0.7 }}></i>
                      {post.views?.toLocaleString() || 0}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <Badge
                        variant={post.status === 'PUBLISHED' ? 'success' : 'warning'}
                        dot
                      >
                        {post.status === 'PUBLISHED' ? 'Terbit' : 'Draf'}
                      </Badge>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <Link
                          href={getPreviewUrl(post)}
                          target="_blank"
                          className="dash-icon-btn"
                          style={{ width: '32px', height: '32px', fontSize: '12px', borderRadius: '8px', textDecoration: 'none' }}
                          title="Pratinjau Halaman Live"
                        >
                          <i className="fa fa-external-link"></i>
                        </Link>
                        {(currentUser?.role !== 'AUTHOR' || (currentUser?.author?.id && post.authorId === currentUser.author.id)) && (
                          <>
                            <Link
                              href={`/dashboard/posts/edit/${post.id}`}
                              className="dash-icon-btn"
                              style={{ width: '32px', height: '32px', fontSize: '12px', borderRadius: '8px', textDecoration: 'none' }}
                              title="Sunting Artikel"
                            >
                              <i className="fa fa-pencil"></i>
                            </Link>
                            <button
                              onClick={() => setDeleteTarget(post)}
                              className="dash-icon-btn"
                              style={{ width: '32px', height: '32px', fontSize: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px' }}
                              title="Hapus Artikel"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {pagination.totalPages > 1 && (
          <div
            style={{
              padding: '14px 20px',
              borderTop: '1px solid var(--dash-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--dash-muted-bg)',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ fontSize: '12.5px', color: 'var(--dash-text-muted)' }}>
              Menampilkan halaman <strong>{pagination.page}</strong> dari <strong>{pagination.totalPages}</strong> ({pagination.total} artikel)
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Button
                onClick={() => fetchPosts(pagination.page - 1)}
                disabled={pagination.page <= 1}
                variant="secondary"
                size="sm"
                icon="fa-angle-left"
              >
                Sebelumnya
              </Button>
              <Button
                onClick={() => fetchPosts(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                variant="secondary"
                size="sm"
              >
                <span>Selanjutnya</span>
                <i className="fa fa-angle-right" style={{ marginLeft: '4px' }}></i>
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal Component */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Hapus Artikel Berita"
        icon="fa-trash"
      >
        {deleteTarget && (
          <div>
            <p style={{ fontSize: '14px', color: 'var(--dash-text-main)', marginTop: 0, lineHeight: 1.6 }}>
              Apakah Anda yakin ingin menghapus artikel <strong>"{deleteTarget.title}"</strong>?
            </p>
            <p style={{ fontSize: '13px', color: 'var(--dash-text-muted)', marginBottom: '24px' }}>
              Tindakan ini permanen dan artikel akan dihapus dari sistem portal berita.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button
                type="button"
                onClick={() => setDeleteTarget(null)}
                variant="secondary"
                style={{ height: '36px' }}
              >
                Batal
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                loading={deleting}
                variant="destructive"
                style={{ height: '36px', background: '#ef4444', color: '#fff' }}
              >
                Ya, Hapus Artikel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
