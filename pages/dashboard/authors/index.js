import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { PageHeader, Card, CardHeader, CardTitle, Badge, Toast, Modal, EmptyState } from '@/components/dashboard/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DashboardAuthors() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [toast, setToast] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Penulis',
    avatar: '/assets/img/author/author-1.webp',
    bio: ''
  })

  const avatarOptions = [
    '/assets/img/author/author-1.webp',
    '/assets/img/author/author-2.webp',
    '/assets/img/author/author-3.webp',
    '/assets/img/author/author-4.webp',
    '/assets/img/author/author-5.webp',
    '/assets/img/author/author-6.webp',
    '/assets/img/author/author-7.webp',
    '/assets/img/author/author-8.webp',
  ]

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/authors')
      const data = await res.json()
      if (data.success) {
        setAuthors(data.authors || [])
      }
    } catch (err) {
      console.error(err)
      showToast('Gagal memuat data penulis redaksi', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpenModal = (author = null) => {
    if (author) {
      setEditingAuthor(author)
      setFormData({
        name: author.name || '',
        email: author.email || '',
        role: author.designation || author.role || 'Penulis',
        avatar: author.avatar || '/assets/img/author/author-1.webp',
        bio: author.bio || ''
      })
    } else {
      setEditingAuthor(null)
      setFormData({
        name: '',
        email: '',
        role: 'Penulis',
        avatar: '/assets/img/author/author-1.webp',
        bio: ''
      })
    }
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      showToast('Nama author wajib diisi', 'error')
      return
    }

    setSubmitting(true)
    try {
      const url = editingAuthor ? `/api/authors/${editingAuthor.id}` : '/api/authors'
      const method = editingAuthor ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success) {
        showToast(editingAuthor ? 'Data author berhasil diperbarui!' : 'Author baru berhasil ditambahkan!')
        setModalOpen(false)
        fetchData()
      } else {
        showToast(data.message || 'Gagal menyimpan author', 'error')
      }
    } catch (err) {
      showToast('Error koneksi saat menyimpan author', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Hapus profil author "${name}"? Artikel yang ditulisnya akan tetap ada di database.`)) {
      return
    }

    setDeletingId(id)
    try {
      const res = await fetch(`/api/authors/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        showToast(`Author "${name}" berhasil dihapus.`)
        fetchData()
      } else {
        showToast(data.message || 'Gagal menghapus author', 'error')
      }
    } catch (err) {
      showToast('Error koneksi saat menghapus author', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const totalAuthors = authors.length
  const linkedAuthors = authors.filter(a => a.userId).length
  const totalPostsWritten = authors.reduce((acc, a) => acc + (a.postsCount || 0), 0)

  return (
    <DashboardLayout title="Tim Redaksi & Penulis (Authors)">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Page Header */}
      <PageHeader
        title="Tim Redaksi & Penulis"
        description="Kelola profil penulis artikel, foto avatar, biografi, dan hubungkan dengan akun pengguna."
        badge={`${authors.length} Penulis`}
        icon="fa-user-circle-o"
        actions={
          <button onClick={() => handleOpenModal()} className="dash-btn dash-btn-primary">
            <i className="fa fa-plus"></i>
            <span>Tambah Penulis Baru</span>
          </button>
        }
      />

      {/* Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <Card animate={false} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--dash-muted-bg)', border: '1px solid var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--dash-text-main)' }}>
              <i className="fa fa-user-circle"></i>
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: 'var(--dash-text-muted)', fontWeight: 600 }}>Total Penulis</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--dash-text-main)', marginTop: '2px' }}>{totalAuthors}</div>
            </div>
          </div>
        </Card>

        <Card animate={false} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#10b981' }}>
              <i className="fa fa-link"></i>
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: 'var(--dash-text-muted)', fontWeight: 600 }}>Terhubung ke Akun User</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--dash-text-main)', marginTop: '2px' }}>{linkedAuthors}</div>
            </div>
          </div>
        </Card>

        <Card animate={false} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--dash-muted-bg)', border: '1px solid var(--dash-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--dash-text-main)' }}>
              <i className="fa fa-file-text-o"></i>
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: 'var(--dash-text-muted)', fontWeight: 600 }}>Total Artikel Ditulis</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--dash-text-main)', marginTop: '2px' }}>{totalPostsWritten}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Authors List Table Card */}
      <Card>
        <CardHeader>
          <CardTitle icon="fa-users">Daftar Penulis & Profil</CardTitle>
          <Badge variant="outline">{authors.length} Penulis</Badge>
        </CardHeader>
        {/* Desktop Table */}
        <div className="dash-table-wrapper dash-desktop-table" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--dash-muted-bg)', borderBottom: '1px solid var(--dash-border)' }}>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Penulis / Avatar</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Peran / Jabatan</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Email</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Peran Sistem</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Total Artikel</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '48px', color: 'var(--dash-text-muted)' }}>
                    <i className="fa fa-spinner fa-spin fa-2x" style={{ display: 'block', marginBottom: '8px' }}></i>
                    Memuat data author...
                  </td>
                </tr>
              ) : authors.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <EmptyState
                      icon="fa-user-circle-o"
                      title="Belum Ada Penulis"
                      description="Klik tombol 'Tambah Penulis Baru' untuk membuat profil penulis tim redaksi."
                    />
                  </td>
                </tr>
              ) : (
                authors.map((author) => (
                  <tr key={author.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={author.avatar || '/assets/img/author/author-1.webp'}
                          alt={author.name}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            backgroundColor: 'var(--dash-muted-bg)',
                            border: '1px solid var(--dash-border)'
                          }}
                          onError={(e) => { e.currentTarget.src = '/avatar.png' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--dash-text-main)', fontSize: '14px' }}>
                            {author.name}
                          </div>
                          {author.bio && (
                            <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {author.bio}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <Badge variant="default">{author.role || 'Penulis'}</Badge>
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--dash-text-main)', fontSize: '13px' }}>
                      {author.email || <span style={{ color: 'var(--dash-text-muted)' }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <Badge variant={author.userRole === 'ADMIN' ? 'primary' : author.userRole === 'EDITOR' ? 'info' : 'warning'}>
                        {author.userRole || 'AUTHOR'}
                      </Badge>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--dash-text-main)', fontSize: '13px' }}>
                        {author.postsCount || 0} artikel
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => handleOpenModal(author)}
                          className="dash-icon-btn"
                          style={{ width: '30px', height: '30px', fontSize: '12px', borderRadius: '8px' }}
                          title="Edit Penulis"
                        >
                          <i className="fa fa-pencil"></i>
                        </button>
                        <Link
                          href={`/author?id=${author.id}`}
                          target="_blank"
                          className="dash-icon-btn"
                          style={{ width: '30px', height: '30px', fontSize: '12px', borderRadius: '8px', textDecoration: 'none' }}
                          title="Lihat Laman Penulis Publik"
                        >
                          <i className="fa fa-external-link"></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(author.id, author.name)}
                          disabled={deletingId === author.id}
                          className="dash-icon-btn"
                          style={{ width: '30px', height: '30px', fontSize: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px' }}
                          title="Hapus Penulis"
                        >
                          <i className={`fa ${deletingId === author.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
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
          {authors.length === 0 && !loading ? (
            <EmptyState
              icon="fa-user-circle-o"
              title="Belum Ada Penulis"
              description="Klik 'Tambah Penulis Baru' untuk membuat profil penulis."
            />
          ) : (
            authors.map((author) => (
              <div key={author.id} className="dash-mobile-card-item">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src={author.avatar || '/assets/img/author/author-1.webp'}
                    alt=""
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--dash-border)', flexShrink: 0 }}
                    onError={(e) => { e.currentTarget.src = '/avatar.png' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--dash-text-main)' }}>{author.name}</div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                      <Badge variant="default" style={{ fontSize: '10px' }}>{author.role || 'Editor'}</Badge>
                      <span style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)' }}>{author.postsCount || 0} artikel</span>
                    </div>
                  </div>
                </div>

                {author.bio && (
                  <div style={{ fontSize: '12.5px', color: 'var(--dash-text-muted)', lineHeight: 1.4 }}>
                    {author.bio}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--dash-border)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>
                    {author.linkedUser ? (
                      <span style={{ color: '#10b981', fontWeight: 600 }}><i className="fa fa-check-circle"></i> User: {author.linkedUser.name}</span>
                    ) : (
                      <span>Profil Mandiri</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleOpenModal(author)}
                      className="dash-btn dash-btn-secondary dash-btn-sm"
                    >
                      <i className="fa fa-pencil"></i> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(author.id, author.name)}
                      disabled={deletingId === author.id}
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

      {/* Add / Edit Author Modal Component */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAuthor ? 'Edit Profil Penulis' : 'Tambah Penulis Baru'}
        icon="fa-user-circle"
        maxWidth="560px"
      >
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="dash-form-group">
            <label className="dash-form-label">Nama Penulis *</label>
            <input
              type="text"
              required
              className="dash-input"
              placeholder="Contoh: Alexis D. Humble"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Email & Role */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="dash-form-group">
              <label className="dash-form-label">Email Penulis</label>
              <input
                type="email"
                className="dash-input"
                placeholder="author@hoom.id"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="dash-form-group">
              <label className="dash-form-label">Peran / Jabatan</label>
              <input
                type="text"
                className="dash-input"
                placeholder="Contoh: Senior Journalist, Editor"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
          </div>

          {/* Avatar Picker */}
          <div className="dash-form-group">
            <label className="dash-form-label">Pilih Foto Avatar</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {avatarOptions.map((av, idx) => (
                <img
                  key={idx}
                  src={av}
                  alt={`Avatar ${idx + 1}`}
                  onClick={() => setFormData({ ...formData, avatar: av })}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    objectFit: 'cover',
                    border: formData.avatar === av ? '3px solid var(--dash-primary)' : '2px solid var(--dash-border)',
                    boxShadow: formData.avatar === av ? '0 0 8px rgba(0,0,0,0.2)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                />
              ))}
            </div>
            <input
              type="text"
              className="dash-input"
              placeholder="Atau masukkan URL avatar kustom..."
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />
          </div>

          {/* Bio */}
          <div className="dash-form-group">
            <label className="dash-form-label">Biografi Singkat</label>
            <textarea
              className="dash-textarea"
              rows={3}
              placeholder="Deskripsi singkat mengenai latar belakang atau spesialisasi penulis..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button
              type="submit"
              disabled={submitting}
              className="dash-btn dash-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <i className={`fa ${submitting ? 'fa-spinner fa-spin' : 'fa-check'}`}></i>
              <span>{submitting ? 'Menyimpan...' : editingAuthor ? 'Simpan Perubahan' : 'Tambah Author'}</span>
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="dash-btn dash-btn-secondary"
            >
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}
