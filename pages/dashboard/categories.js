import DashboardLayout from '@/components/dashboard/DashboardLayout'
import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardLoadingOverlay,
  Badge,
  Button,
  Input,
  Textarea,
  Label,
  Switch,
  Toast,
  Modal,
  EmptyState
} from '@/components/dashboard/ui'
import { useEffect, useState } from 'react'

let cachedCategories = []

export default function CategoriesManagement() {
  const [categories, setCategories] = useState(cachedCategories)
  const [loading, setLoading] = useState(cachedCategories.length === 0)
  const [toast, setToast] = useState(null)

  // New Category Form
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [showInHeader, setShowInHeader] = useState(true)
  const [creating, setCreating] = useState(false)

  // Edit / Delete Target
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [togglingId, setTogglingId] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchCategories = async () => {
    if (cachedCategories.length === 0) setLoading(true)
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      if (data.success) {
        cachedCategories = data.categories || []
        setCategories(cachedCategories)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleNameChange = (e) => {
    const val = e.target.value
    setName(val)
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setCreating(true)
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, description, showInHeader })
      })
      const data = await res.json()
      if (data.success) {
        showToast('Kategori berhasil ditambahkan!')
        setName('')
        setSlug('')
        setDescription('')
        setShowInHeader(true)
        fetchCategories()
      } else {
        showToast(data.message || 'Gagal menambahkan kategori', 'error')
      }
    } catch (err) {
      showToast('Error saat membuat kategori', 'error')
    } finally {
      setCreating(false)
    }
  }

  const handleToggleHeader = async (cat) => {
    const newStatus = !cat.showInHeader
    setTogglingId(cat.id)

    // Optimistic UI update
    setCategories(prev =>
      prev.map(c => (c.id === cat.id ? { ...c, showInHeader: newStatus } : c))
    )

    try {
      const res = await fetch(`/api/categories/${cat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showInHeader: newStatus })
      })
      const data = await res.json()
      if (data.success) {
        showToast(
          newStatus
            ? `Kategori "${cat.name}" sekarang ditampilkan di Menu Header!`
            : `Kategori "${cat.name}" disembunyikan dari Menu Header.`
        )
      } else {
        setCategories(prev =>
          prev.map(c => (c.id === cat.id ? { ...c, showInHeader: !newStatus } : c))
        )
        showToast(data.message || 'Gagal mengubah status menu header', 'error')
      }
    } catch (err) {
      setCategories(prev =>
        prev.map(c => (c.id === cat.id ? { ...c, showInHeader: !newStatus } : c))
      )
      showToast('Terjadi kesalahan saat mengubah status header', 'error')
    } finally {
      setTogglingId(null)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editTarget || !editTarget.name.trim()) return

    try {
      const res = await fetch(`/api/categories/${editTarget.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editTarget)
      })
      const data = await res.json()
      if (data.success) {
        showToast('Kategori berhasil diperbarui!')
        setEditTarget(null)
        fetchCategories()
      } else {
        showToast(data.message || 'Gagal memperbarui kategori', 'error')
      }
    } catch (err) {
      showToast('Error saat memperbarui kategori', 'error')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/categories/${deleteTarget.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        showToast('Kategori berhasil dihapus!')
        setDeleteTarget(null)
        fetchCategories()
      } else {
        showToast(data.message || 'Gagal menghapus kategori', 'error')
      }
    } catch (err) {
      showToast('Error saat menghapus kategori', 'error')
    }
  }

  return (
    <DashboardLayout title="Manajemen Kategori">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Page Header */}
      <PageHeader
        title="Kategori Berita"
        description="Kelola kategori artikel dan atur kategori yang ditampilkan pada navigasi portal berita."
        badge={`${categories.length} Kategori`}
        icon="fa-folder-open-o"
      />

      <div className="dash-responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 380px) 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Create Category Form Card */}
        <Card>
          <CardHeader>
            <CardTitle icon="fa-plus-circle">Tambah Kategori Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="dash-form-group" style={{ margin: 0 }}>
                <Label>Nama Kategori *</Label>
                <Input
                  placeholder="Contoh: Teknologi, Bisnis, Olahraga"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>

              <div className="dash-form-group" style={{ margin: 0 }}>
                <Label>Slug URL</Label>
                <Input
                  placeholder="Contoh: teknologi"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div className="dash-form-group" style={{ margin: 0 }}>
                <Label>Deskripsi</Label>
                <Textarea
                  rows={3}
                  placeholder="Deskripsi singkat kategori (opsional)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Toggle Switch Tampilkan di Header */}
              <div
                style={{
                  background: 'var(--dash-muted-bg)',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--dash-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ color: 'var(--dash-text-main)', fontWeight: 600, fontSize: '13px', marginBottom: '2px' }}>
                    Tampilkan di Menu Header
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)' }}>
                    Muncul di navigasi header laman depan
                  </div>
                </div>
                <Switch
                  checked={showInHeader}
                  onChange={(e) => setShowInHeader(e.target.checked)}
                />
              </div>

              <Button
                type="submit"
                loading={creating}
                icon={!creating ? 'fa-plus' : undefined}
                variant="default"
                style={{ width: '100%', height: '38px', marginTop: '4px' }}
              >
                <span>{creating ? 'Menyimpan...' : 'Tambah Kategori'}</span>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Categories List Card */}
        <Card style={{ position: 'relative', minHeight: '380px' }}>
          <CardLoadingOverlay loading={loading && categories.length === 0} text="Memuat kategori..." />
          <CardHeader>
            <CardTitle icon="fa-folder-o">Daftar Kategori ({categories.length})</CardTitle>
          </CardHeader>
          {/* Desktop Table */}
          <div className="dash-table-wrapper dash-desktop-table" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--dash-muted-bg)', borderBottom: '1px solid var(--dash-border)' }}>
                  <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Nama Kategori</th>
                  <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Slug</th>
                  <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Artikel</th>
                  <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, textAlign: 'center' }}>Menu Header</th>
                  <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="5">
                      <EmptyState
                        icon="fa-folder-open-o"
                        title="Belum Ada Kategori"
                        description="Mulai buat kategori berita pertama Anda menggunakan formulir di sebelah kiri."
                      />
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--dash-text-main)' }}>
                        <div>{cat.name}</div>
                        {cat.description && (
                          <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', fontWeight: 400, marginTop: '2px' }}>
                            {cat.description}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px', color: 'var(--dash-text-muted)', fontSize: '13px' }}>
                        /{cat.slug}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <Badge variant="outline">{cat.postsCount || 0} pos</Badge>
                      </td>
                      {/* Toggle Button Menu Header */}
                      <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleHeader(cat)}
                          disabled={togglingId === cat.id}
                          title={cat.showInHeader ? 'Klik untuk sembunyikan dari header' : 'Klik untuk tampilkan di header'}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '36px',
                              height: '20px',
                              borderRadius: '20px',
                              backgroundColor: cat.showInHeader ? '#10b981' : '#64748b',
                              position: 'relative',
                              transition: 'background-color 0.2s ease'
                            }}
                          >
                            <div
                              style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                backgroundColor: '#ffffff',
                                position: 'absolute',
                                top: '3px',
                                left: cat.showInHeader ? '19px' : '3px',
                                transition: 'left 0.2s ease',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 600,
                              color: cat.showInHeader ? '#10b981' : 'var(--dash-text-muted)'
                            }}
                          >
                            {cat.showInHeader ? 'Tampil' : 'Sembunyi'}
                          </span>
                        </button>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => setEditTarget(cat)}
                            className="dash-icon-btn"
                            style={{ width: '30px', height: '30px', fontSize: '12px', borderRadius: '8px' }}
                            title="Edit Kategori"
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                          <button
                            onClick={() => setDeleteTarget(cat)}
                            className="dash-icon-btn"
                            style={{ width: '30px', height: '30px', fontSize: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px' }}
                            title="Hapus Kategori"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards List */}
          <div className="dash-mobile-cards">
            {categories.length === 0 && !loading ? (
              <EmptyState
                icon="fa-folder-open-o"
                title="Belum Ada Kategori"
                description="Mulai buat kategori berita pertama Anda."
              />
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="dash-mobile-card-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--dash-text-main)' }}>{cat.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', marginTop: '2px' }}>/{cat.slug}</div>
                    </div>
                    <Badge variant="outline">{cat.postsCount || 0} Artikel</Badge>
                  </div>

                  {cat.description && (
                    <div style={{ fontSize: '12.5px', color: 'var(--dash-text-muted)', lineHeight: 1.4 }}>
                      {cat.description}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--dash-border)' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleHeader(cat)}
                      disabled={togglingId === cat.id}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: cat.showInHeader ? '#10b981' : 'var(--dash-text-muted)', fontWeight: 600 }}
                    >
                      <i className={`fa ${cat.showInHeader ? 'fa-toggle-on' : 'fa-toggle-off'}`} style={{ fontSize: '16px' }}></i>
                      <span>Header Menu: {cat.showInHeader ? 'Tampil' : 'Sembunyi'}</span>
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => setEditTarget(cat)}
                        className="dash-btn dash-btn-secondary dash-btn-sm"
                      >
                        <i className="fa fa-pencil"></i> Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        className="dash-btn dash-btn-danger dash-btn-sm"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Edit Category Modal Component */}
      <Modal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Kategori"
        icon="fa-pencil"
      >
        {editTarget && (
          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="dash-form-group" style={{ margin: 0 }}>
              <Label>Nama Kategori *</Label>
              <Input
                value={editTarget.name}
                onChange={(e) => setEditTarget({ ...editTarget, name: e.target.value })}
                required
              />
            </div>

            <div className="dash-form-group" style={{ margin: 0 }}>
              <Label>Slug URL</Label>
              <Input
                value={editTarget.slug}
                onChange={(e) => setEditTarget({ ...editTarget, slug: e.target.value })}
              />
            </div>

            <div className="dash-form-group" style={{ margin: 0 }}>
              <Label>Deskripsi</Label>
              <Textarea
                rows={3}
                value={editTarget.description || ''}
                onChange={(e) => setEditTarget({ ...editTarget, description: e.target.value })}
              />
            </div>

            {/* Toggle Switch Edit */}
            <div
              style={{
                background: 'var(--dash-muted-bg)',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '1px solid var(--dash-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ color: 'var(--dash-text-main)', fontWeight: 600, fontSize: '13px', marginBottom: '2px' }}>
                  Tampilkan di Menu Header
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)' }}>
                  Muncul di navigasi header laman depan
                </div>
              </div>
              <Switch
                checked={editTarget.showInHeader ?? true}
                onChange={(e) => setEditTarget({ ...editTarget, showInHeader: e.target.checked })}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <Button
                type="submit"
                variant="default"
                style={{ flex: 1, height: '38px' }}
              >
                Simpan Perubahan
              </Button>
              <Button
                type="button"
                onClick={() => setEditTarget(null)}
                variant="secondary"
                style={{ height: '38px' }}
              >
                Batal
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation Modal Component */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Hapus Kategori"
        icon="fa-exclamation-triangle"
      >
        {deleteTarget && (
          <div>
            <p style={{ fontSize: '14px', color: 'var(--dash-text-main)', marginTop: 0, lineHeight: 1.6 }}>
              Apakah Anda yakin ingin menghapus kategori <strong>"{deleteTarget.name}"</strong>?
            </p>
            <p style={{ fontSize: '13px', color: 'var(--dash-text-muted)', marginBottom: '24px' }}>
              Artikel dalam kategori ini tidak akan terhapus, namun akan kehilangan relasi kategorinya.
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
                variant="destructive"
                style={{ height: '36px', background: '#ef4444', color: '#fff' }}
              >
                Ya, Hapus
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
