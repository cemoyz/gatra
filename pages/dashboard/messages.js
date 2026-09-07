import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { PageHeader, Card, CardHeader, CardTitle, CardBody, Badge, Toast, EmptyState } from '@/components/dashboard/ui'
import { useEffect, useState } from 'react'

export default function DashboardMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all | unread | read
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/contact?status=${filter}`)
      const data = await res.json()
      if (data.success) {
        setMessages(data.messages || [])
      }
    } catch (err) {
      console.error(err)
      showToast('Gagal memuat pesan masuk', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [filter])

  const handleToggleStatus = async (msg) => {
    const newStatus = msg.status === 'UNREAD' ? 'READ' : 'UNREAD'
    try {
      const res = await fetch(`/api/contact/${msg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await res.json()
      if (data.success) {
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: newStatus } : m))
        if (selectedMessage?.id === msg.id) {
          setSelectedMessage(prev => ({ ...prev, status: newStatus }))
        }
        showToast(`Pesan ditandai sebagai ${newStatus === 'READ' ? 'Sudah Dibaca' : 'Belum Dibaca'}`)
      }
    } catch (err) {
      showToast('Gagal memperbarui status pesan', 'error')
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Hapus pesan masuk dari "${name}"?`)) return

    setDeletingId(id)
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setMessages(prev => prev.filter(m => m.id !== id))
        if (selectedMessage?.id === id) setSelectedMessage(null)
        showToast('Pesan berhasil dihapus.')
      } else {
        showToast(data.message || 'Gagal menghapus pesan', 'error')
      }
    } catch (err) {
      showToast('Error koneksi saat menghapus pesan', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const unreadCount = messages.filter(m => m.status === 'UNREAD').length

  return (
    <DashboardLayout title="Kotak Masuk Pesan (Inbox)">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Page Header */}
      <PageHeader
        title="Kotak Masuk Redaksi (Inbox)"
        description="Daftar pertanyaan, pesan pembaca, dan penawaran kerja sama dari formulir kontak."
        badge={`${messages.length} Pesan`}
        icon="fa-envelope-o"
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'unread', 'read'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="dash-btn"
                style={{
                  background: filter === f ? 'var(--dash-primary-btn)' : 'var(--dash-card-bg)',
                  color: filter === f ? 'var(--dash-primary-btn-text)' : 'var(--dash-text-muted)',
                  fontWeight: 700,
                  border: '1px solid var(--dash-border)',
                  padding: '7px 14px',
                  fontSize: '13px',
                  borderRadius: '10px'
                }}
              >
                {f === 'all' ? 'Semua' : f === 'unread' ? `Belum Dibaca (${unreadCount})` : 'Sudah Dibaca'}
              </button>
            ))}
            <button onClick={fetchMessages} className="dash-btn dash-btn-secondary" style={{ padding: '7px 14px', borderRadius: '10px' }}>
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        }
      />

      {/* Messages Layout Grid */}
      <div className={`dash-inbox-grid ${selectedMessage ? 'has-selected' : ''}`} style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1.1fr 1.9fr' : '1fr', gap: '24px' }}>
        {/* Messages List Card */}
        <div className="dash-inbox-list">
          <Card>
            <CardHeader>
              <CardTitle icon="fa-list">Daftar Pesan Masuk ({messages.length})</CardTitle>
            </CardHeader>
            {/* Desktop Table */}
            <div className="dash-table-wrapper dash-desktop-table" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--dash-muted-bg)', borderBottom: '1px solid var(--dash-border)' }}>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Pengirim</th>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Subjek</th>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Tanggal</th>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '48px', color: 'var(--dash-text-muted)' }}>
                        <i className="fa fa-spinner fa-spin fa-2x" style={{ display: 'block', marginBottom: '8px' }}></i>
                        Memuat pesan masuk...
                      </td>
                    </tr>
                  ) : messages.length === 0 ? (
                    <tr>
                      <td colSpan="5">
                        <EmptyState
                          icon="fa-inbox"
                          title="Tidak Ada Pesan"
                          description="Tidak ada pesan masuk pada filter yang dipilih saat ini."
                        />
                      </td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        style={{
                          cursor: 'pointer',
                          background: selectedMessage?.id === msg.id ? 'var(--dash-muted-bg)' : 'transparent',
                          borderBottom: '1px solid var(--dash-border)',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: msg.status === 'UNREAD' ? 800 : 600, color: 'var(--dash-text-main)', fontSize: '13.5px' }}>
                            {msg.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>{msg.email}</div>
                        </td>
                        <td style={{ padding: '14px 18px', maxWidth: '220px' }}>
                          <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--dash-text-main)' }}>{msg.subject || 'Umum'}</div>
                          <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {msg.message}
                          </div>
                        </td>
                        <td style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', whiteSpace: 'nowrap' }}>
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '—'}
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <Badge variant={msg.status === 'UNREAD' ? 'danger' : 'default'} dot={msg.status === 'UNREAD'}>
                            {msg.status === 'UNREAD' ? 'Baru' : 'Dibaca'}
                          </Badge>
                        </td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleToggleStatus(msg)}
                              className="dash-icon-btn"
                              style={{ width: '30px', height: '30px', fontSize: '12px', borderRadius: '8px' }}
                              title={msg.status === 'UNREAD' ? 'Tandai sudah dibaca' : 'Tandai belum dibaca'}
                            >
                              <i className={`fa ${msg.status === 'UNREAD' ? 'fa-envelope-open' : 'fa-envelope'}`}></i>
                            </button>
                            <button
                              onClick={() => handleDelete(msg.id, msg.name)}
                              disabled={deletingId === msg.id}
                              className="dash-icon-btn"
                              style={{ width: '30px', height: '30px', fontSize: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px' }}
                              title="Hapus Pesan"
                            >
                              <i className={`fa ${deletingId === msg.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
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
              {messages.length === 0 && !loading ? (
                <EmptyState
                  icon="fa-inbox"
                  title="Tidak Ada Pesan"
                  description="Tidak ada pesan masuk."
                />
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className="dash-mobile-card-item"
                    style={{
                      cursor: 'pointer',
                      borderLeft: msg.status === 'UNREAD' ? '3px solid #da0105' : '1px solid var(--dash-border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                      <div>
                        <div style={{ fontSize: '14.5px', fontWeight: msg.status === 'UNREAD' ? 800 : 700, color: 'var(--dash-text-main)' }}>
                          {msg.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)' }}>{msg.email}</div>
                      </div>
                      <Badge variant={msg.status === 'UNREAD' ? 'danger' : 'default'} dot={msg.status === 'UNREAD'} style={{ fontSize: '10px' }}>
                        {msg.status === 'UNREAD' ? 'Baru' : 'Dibaca'}
                      </Badge>
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dash-text-main)', marginBottom: '2px' }}>
                        {msg.subject || 'Pertanyaan Umum'}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.4 }}>
                        {msg.message}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--dash-border)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--dash-text-muted)' }}>
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : ''}
                      </span>

                      <div style={{ display: 'flex', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleToggleStatus(msg)}
                          className="dash-btn dash-btn-secondary dash-btn-sm"
                        >
                          <i className={`fa ${msg.status === 'UNREAD' ? 'fa-envelope-open' : 'fa-envelope'}`}></i>
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id, msg.name)}
                          disabled={deletingId === msg.id}
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

        {/* Selected Message Detail Viewer Card */}
        {selectedMessage && (
          <div className="dash-inbox-detail">
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(null)}
                    className="dash-btn dash-btn-secondary dash-btn-sm"
                    style={{ padding: '4px 10px', fontSize: '12px' }}
                  >
                    <i className="fa fa-arrow-left"></i>
                    <span>Kembali</span>
                  </button>
                  <CardTitle icon="fa-envelope-open-o">Detail Pesan</CardTitle>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="dash-icon-btn"
                  style={{ width: '28px', height: '28px' }}
                  title="Tutup Pesan"
                >
                  <i className="fa fa-times"></i>
                </button>
              </CardHeader>
            <CardBody>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--dash-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: 'var(--dash-text-main)', fontWeight: 700 }}>{selectedMessage.name}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--dash-primary)' }}>
                    <i className="fa fa-envelope" style={{ marginRight: '6px' }}></i>
                    <a href={`mailto:${selectedMessage.email}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div style={{ fontSize: '13px', color: 'var(--dash-text-muted)', marginTop: '4px' }}>
                      <i className="fa fa-phone" style={{ marginRight: '6px' }}></i> {selectedMessage.phone}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Badge variant={selectedMessage.status === 'UNREAD' ? 'danger' : 'default'} dot={selectedMessage.status === 'UNREAD'}>
                    {selectedMessage.status === 'UNREAD' ? 'Belum Dibaca' : 'Sudah Dibaca'}
                  </Badge>
                  <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', marginTop: '6px' }}>
                    {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString('id-ID') : ''}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--dash-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Subjek Pesan
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--dash-text-main)' }}>
                  {selectedMessage.subject || 'Pertanyaan Umum'}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--dash-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  Isi Pesan
                </div>
                <div
                  style={{
                    background: 'var(--dash-muted-bg)',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid var(--dash-border)',
                    fontSize: '13.5px',
                    lineHeight: '1.7',
                    color: 'var(--dash-text-main)',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {selectedMessage.message}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Pesan dari Hoom Magazine')}`}
                  className="dash-btn dash-btn-primary"
                >
                  <i className="fa fa-reply"></i>
                  <span>Balas Email</span>
                </a>
                <button
                  onClick={() => handleToggleStatus(selectedMessage)}
                  className="dash-btn dash-btn-secondary"
                >
                  <i className={`fa ${selectedMessage.status === 'UNREAD' ? 'fa-check' : 'fa-envelope'}`}></i>
                  <span>{selectedMessage.status === 'UNREAD' ? 'Tandai Dibaca' : 'Tandai Belum Dibaca'}</span>
                </button>
                <button
                  onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                  className="dash-btn dash-btn-danger"
                  style={{ background: '#ef4444', color: '#fff' }}
                >
                  <i className="fa fa-trash"></i>
                  <span>Hapus</span>
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
        )}
      </div>
    </DashboardLayout>
  )
}
