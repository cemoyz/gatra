import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { PageHeader, Card, CardHeader, CardTitle, Toast, Badge, EmptyState } from '@/components/dashboard/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DashboardComments() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchComments = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/comments')
      const data = await res.json()
      if (data.success && Array.isArray(data.comments)) {
        setComments(data.comments)
      } else {
        setComments([])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleDeleteComment = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus komentar ini?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setComments(prev => prev.filter(c => c.id !== id))
        setToast({ msg: 'Komentar berhasil dihapus', type: 'success' })
      } else {
        setToast({ msg: data.message || 'Gagal menghapus komentar', type: 'error' })
      }
    } catch (err) {
      setToast({ msg: 'Error menghapus komentar', type: 'error' })
    } finally {
      setDeletingId(null)
      setTimeout(() => setToast(null), 4000)
    }
  }

  const filteredComments = comments.filter(c => {
    const q = search.toLowerCase()
    return (
      c.name?.toLowerCase().includes(q) ||
      c.content?.toLowerCase().includes(q) ||
      c.post?.title?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q)
    )
  })

  return (
    <DashboardLayout title="Moderasi Komentar Pembaca">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Page Header Component */}
      <PageHeader
        title="Moderasi Komentar Pembaca"
        description="Tinjau, moderasi, dan kelola diskusi dari pembaca pada artikel portal berita Anda."
        badge={`${comments.length} Komentar`}
        icon="fa-comments-o"
        actions={
          <button
            onClick={fetchComments}
            className="dash-btn dash-btn-secondary"
            style={{ padding: '8px 16px', borderRadius: '10px' }}
          >
            <i className="fa fa-refresh"></i>
            <span>Segarkan</span>
          </button>
        }
      />

      {/* Search & Filter Card */}
      <Card style={{ marginBottom: '20px', padding: '14px 18px' }} animate={false}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--dash-muted-bg)',
            border: '1px solid var(--dash-border)',
            borderRadius: '10px',
            padding: '7px 14px'
          }}
        >
          <i className="fa fa-search" style={{ color: 'var(--dash-text-muted)', fontSize: '14px' }}></i>
          <input
            type="text"
            placeholder="Cari komentar berdasarkan nama pembaca, pesan, atau judul artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '13.5px',
              color: 'var(--dash-text-main)'
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ background: 'none', border: 'none', color: 'var(--dash-text-muted)', cursor: 'pointer', fontSize: '12px' }}
            >
              <i className="fa fa-times-circle"></i>
            </button>
          )}
        </div>
      </Card>

      {/* Comments Table Card */}
      <Card>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--dash-text-muted)' }}>
            <i className="fa fa-spinner fa-spin fa-2x" style={{ marginBottom: '12px', display: 'block' }}></i>
            <div>Memuat komentar pembaca...</div>
          </div>
        ) : filteredComments.length === 0 ? (
          <EmptyState
            icon="fa-comments-o"
            title="Tidak Ada Komentar"
            description={search ? 'Tidak ada komentar yang cocok dengan kata kunci pencarian.' : 'Belum ada komentar pembaca yang dikirimkan.'}
          />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="dash-table-wrapper dash-desktop-table" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--dash-muted-bg)', borderBottom: '1px solid var(--dash-border)' }}>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Pembaca</th>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Isi Komentar</th>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Artikel Berita</th>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Tanggal</th>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComments.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                      <td style={{ padding: '14px 18px', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 700, color: 'var(--dash-text-main)', fontSize: '13.5px' }}>{c.name}</div>
                        {c.email && (
                          <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>{c.email}</div>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px', maxWidth: '380px', verticalAlign: 'top' }}>
                        <div style={{ fontSize: '13.5px', lineHeight: '1.5', color: 'var(--dash-text-main)' }}>
                          "{c.content}"
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px', verticalAlign: 'top' }}>
                        {c.post ? (
                          <Link
                            href={`/blog/${c.post.id}`}
                            target="_blank"
                            style={{
                              color: 'var(--dash-primary)',
                              textDecoration: 'none',
                              fontSize: '13px',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>{c.post.title?.length > 35 ? c.post.title.substring(0, 35) + '...' : c.post.title}</span>
                            <i className="fa fa-external-link" style={{ fontSize: '10px' }}></i>
                          </Link>
                        ) : (
                          <Badge variant="outline">Umum</Badge>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '12.5px', color: 'var(--dash-text-muted)', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                        {new Date(c.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', verticalAlign: 'top' }}>
                        <button
                          onClick={() => handleDeleteComment(c.id)}
                          disabled={deletingId === c.id}
                          className="dash-icon-btn"
                          style={{ width: '32px', height: '32px', fontSize: '13px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px' }}
                          title="Hapus Komentar"
                        >
                          <i className={`fa ${deletingId === c.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards List */}
            <div className="dash-mobile-cards">
              {filteredComments.map((c) => (
                <div key={c.id} className="dash-mobile-card-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--dash-text-main)' }}>{c.name}</div>
                      {c.email && <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)' }}>{c.email}</div>}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--dash-text-muted)' }}>
                      {new Date(c.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--dash-text-main)', background: 'var(--dash-muted-bg)', padding: '10px 12px', borderRadius: '8px', fontStyle: 'italic', lineHeight: 1.4 }}>
                    "{c.content}"
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--dash-border)' }}>
                    {c.post ? (
                      <Link
                        href={`/blog/${c.post.id}`}
                        target="_blank"
                        style={{ fontSize: '12px', color: 'var(--dash-primary)', textDecoration: 'none', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}
                      >
                        <i className="fa fa-newspaper-o" style={{ marginRight: '4px' }}></i> {c.post.title}
                      </Link>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>Umum</span>
                    )}

                    <button
                      onClick={() => handleDeleteComment(c.id)}
                      disabled={deletingId === c.id}
                      className="dash-btn dash-btn-danger dash-btn-sm"
                    >
                      <i className="fa fa-trash"></i> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </DashboardLayout>
  )
}
