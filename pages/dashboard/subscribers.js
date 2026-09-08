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
  Label,
  Select,
  SelectItem,
  Toast,
  Modal,
  EmptyState
} from '@/components/dashboard/ui'
import { useEffect, useState } from 'react'

let cachedSubscribers = []

export default function SubscribersManagement() {
  const [subscribers, setSubscribers] = useState(cachedSubscribers)
  const [loading, setLoading] = useState(cachedSubscribers.length === 0)
  const [stats, setStats] = useState({ total: 0, active: 0, unsubscribed: 0 })
  const [categories, setCategories] = useState([])
  const [toast, setToast] = useState(null)

  // Filters & Search
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [freqFilter, setFreqFilter] = useState('ALL')

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newSub, setNewSub] = useState({ email: '', name: '', topics: [], frequency: 'weekly', status: 'ACTIVE' })
  const [submitting, setSubmitting] = useState(false)

  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [copying, setCopying] = useState(false)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Fetch Categories for Dynamic Topic Selector
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories.map(c => c.name))
        }
      })
      .catch(console.error)
  }, [])

  const fetchSubscribers = async () => {
    if (cachedSubscribers.length === 0) setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (statusFilter !== 'ALL') params.append('status', statusFilter)
      if (freqFilter !== 'ALL') params.append('frequency', freqFilter)

      const res = await fetch(`/api/subscribers?${params.toString()}`)
      const data = await res.json()
      if (data.success && Array.isArray(data.subscribers)) {
        setSubscribers(data.subscribers)
        cachedSubscribers = data.subscribers
        if (data.stats) setStats(data.stats)
      }
    } catch (err) {
      showToast('Gagal memuat daftar pelanggan newsletter', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [search, statusFilter, freqFilter])

  const handleToggleModalTopic = (topicName) => {
    if (newSub.topics.includes(topicName)) {
      setNewSub({ ...newSub, topics: newSub.topics.filter(t => t !== topicName) })
    } else {
      setNewSub({ ...newSub, topics: [...newSub.topics, topicName] })
    }
  }

  const handleAddSubscriber = async (e) => {
    e.preventDefault()
    if (!newSub.email.trim() || !newSub.email.includes('@')) {
      showToast('Alamat email valid wajib diisi', 'error')
      return
    }
    setSubmitting(true)
    try {
      const topicsPayload = newSub.topics.length > 0 ? newSub.topics.join(', ') : 'Semua Topik'
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newSub,
          topics: topicsPayload
        })
      })
      const data = await res.json()
      if (data.success) {
        showToast('Subscriber baru berhasil ditambahkan!')
        setIsAddModalOpen(false)
        setNewSub({ email: '', name: '', topics: [], frequency: 'weekly', status: 'ACTIVE' })
        fetchSubscribers()
      } else {
        showToast(data.message || 'Gagal menambahkan subscriber', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleStatus = async (sub) => {
    const nextStatus = sub.status === 'ACTIVE' ? 'UNSUBSCRIBED' : 'ACTIVE'
    try {
      const res = await fetch(`/api/subscribers/${sub.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      })
      const data = await res.json()
      if (data.success) {
        showToast(`Status pelanggan diubah ke ${nextStatus}`)
        fetchSubscribers()
      } else {
        showToast('Gagal memperbarui status', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan sistem', 'error')
    }
  }

  const handleDeleteSubscriber = async () => {
    if (!deleteTarget) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/subscribers/${deleteTarget.id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        showToast('Pelanggan berhasil dihapus dari daftar')
        setDeleteTarget(null)
        fetchSubscribers()
      } else {
        showToast('Gagal menghapus subscriber', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCopyActiveEmails = () => {
    const activeEmails = subscribers
      .filter(s => s.status === 'ACTIVE')
      .map(s => s.email)
      .join(', ')

    if (!activeEmails) {
      showToast('Tidak ada email aktif untuk disalin', 'error')
      return
    }

    navigator.clipboard.writeText(activeEmails)
    setCopying(true)
    showToast(`Disalin ${subscribers.filter(s => s.status === 'ACTIVE').length} email aktif ke clipboard!`)
    setTimeout(() => setCopying(false), 3000)
  }

  const renderTopicBadges = (topicsString) => {
    if (!topicsString) return <span className="badge bg-light text-dark border fw-normal" style={{ fontSize: '11px' }}>Semua Topik</span>
    const list = topicsString.split(',').map(t => t.trim()).filter(Boolean)

    return (
      <div className="d-flex flex-wrap gap-1">
        {list.map((t, idx) => (
          <span key={idx} className="badge bg-light text-dark border fw-normal" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
            {t}
          </span>
        ))}
      </div>
    )
  }

  return (
    <DashboardLayout title="Manajemen Pelanggan / Subscribers">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <PageHeader
        title="Pelanggan Newsletter"
        subtitle="Kelola daftar pembaca yang berlangganan kabar berita Dua Narasi"
        action={
          <div className="d-flex gap-2 flex-wrap">
            <Button variant="secondary" onClick={handleCopyActiveEmails} disabled={copying}>
              <i className={`fa ${copying ? 'fa-check' : 'fa-copy'} me-2`} />
              {copying ? 'Tersalin!' : 'Salin Email Aktif'}
            </Button>
            <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
              <i className="fa fa-plus me-2" />
              Tambah Pelanggan
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <Card>
            <CardContent className="p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small d-block">Total Pelanggan</span>
                <h3 className="mb-0 fw-bold">{stats.total || subscribers.length}</h3>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(218, 1, 5, 0.1)', color: '#da0105', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                <i className="fa fa-users" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <Card>
            <CardContent className="p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small d-block">Pelanggan Aktif</span>
                <h3 className="mb-0 fw-bold text-success">{stats.active || subscribers.filter(s => s.status === 'ACTIVE').length}</h3>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                <i className="fa fa-check-circle" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <Card>
            <CardContent className="p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small d-block">Berhenti Berlangganan</span>
                <h3 className="mb-0 fw-bold text-secondary">{stats.unsubscribed || subscribers.filter(s => s.status === 'UNSUBSCRIBED').length}</h3>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(100, 116, 139, 0.1)', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                <i className="fa fa-user-times" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Table Card */}
      <Card className="position-relative">
        {loading && <CardLoadingOverlay />}
        
        <CardHeader className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <CardTitle>Daftar Pelanggan Newsletter</CardTitle>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div style={{ width: '220px' }}>
              <Input
                placeholder="Cari email, nama, topik..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon="fa-search"
              />
            </div>
            <div style={{ width: '150px' }}>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <SelectItem value="ALL">Semua Status</SelectItem>
                <SelectItem value="ACTIVE">Aktif (Active)</SelectItem>
                <SelectItem value="UNSUBSCRIBED">Berhenti</SelectItem>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {!loading && subscribers.length === 0 ? (
            <EmptyState
              icon="fa-envelope-open-o"
              title="Belum Ada Pelanggan Newsletter"
              description="Belum ada pembaca yang mendaftar newsletter atau pencarian Anda tidak ditemukan."
            />
          ) : (
            <>
              {/* Desktop View Table */}
              <div className="table-responsive d-none d-md-block">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '40px', paddingLeft: '20px' }}>#</th>
                      <th>Pembaca / Subscriber</th>
                      <th>Email</th>
                      <th>Pilihan Topik Berita</th>
                      <th>Frekuensi</th>
                      <th>Status</th>
                      <th>Tanggal Berlangganan</th>
                      <th className="text-end" style={{ paddingRight: '20px' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub, idx) => (
                      <tr key={sub.id || idx}>
                        <td style={{ paddingLeft: '20px' }} className="text-muted small">{idx + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: '#f1f5f9',
                              color: '#0f172a',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '13px',
                              border: '1px solid #e2e8f0'
                            }}>
                              {(sub.name || sub.email || 'S').charAt(0).toUpperCase()}
                            </div>
                            <span className="fw-semibold">{sub.name || 'Pembaca Terdaftar'}</span>
                          </div>
                        </td>
                        <td>
                          <a href={`mailto:${sub.email}`} className="text-decoration-none text-dark font-monospace small">
                            {sub.email}
                          </a>
                        </td>
                        <td>
                          {renderTopicBadges(sub.topics)}
                        </td>
                        <td>
                          <span className="text-capitalize small text-muted">
                            {sub.frequency === 'weekly' ? 'Mingguan' : sub.frequency === 'daily' ? 'Harian' : 'Bulanan'}
                          </span>
                        </td>
                        <td>
                          <Badge variant={sub.status === 'ACTIVE' ? 'success' : 'secondary'}>
                            {sub.status === 'ACTIVE' ? 'AKTIF' : 'BERHENTI'}
                          </Badge>
                        </td>
                        <td className="small text-muted">
                          {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                        </td>
                        <td className="text-end" style={{ paddingRight: '20px' }}>
                          <div className="d-flex justify-content-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              title={sub.status === 'ACTIVE' ? 'Set Nonaktif / Berhenti' : 'Set Aktif Kembali'}
                              onClick={() => handleToggleStatus(sub)}
                            >
                              <i className={`fa ${sub.status === 'ACTIVE' ? 'fa-ban text-warning' : 'fa-check text-success'}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Hapus Subscriber"
                              onClick={() => setDeleteTarget(sub)}
                            >
                              <i className="fa fa-trash text-danger" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View Cards (< 768px) */}
              <div className="d-block d-md-none p-3">
                <div className="d-flex flex-column gap-3">
                  {subscribers.map((sub, idx) => (
                    <div
                      key={sub.id || idx}
                      className="p-3 border rounded-3 bg-white position-relative shadow-sm"
                    >
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <div style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            background: '#f1f5f9',
                            color: '#0f172a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '12px',
                            border: '1px solid #e2e8f0'
                          }}>
                            {(sub.name || sub.email || 'S').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{sub.name || 'Pembaca'}</h6>
                            <span className="text-muted font-monospace" style={{ fontSize: '11px' }}>{sub.email}</span>
                          </div>
                        </div>
                        <Badge variant={sub.status === 'ACTIVE' ? 'success' : 'secondary'}>
                          {sub.status === 'ACTIVE' ? 'AKTIF' : 'BERHENTI'}
                        </Badge>
                      </div>

                      <div className="my-2 pt-2 border-top d-flex justify-content-between align-items-center" style={{ fontSize: '12px' }}>
                        <span className="text-muted">Pilihan Topik:</span>
                        <div style={{ maxWidth: '60%', textAlign: 'right' }}>
                          {renderTopicBadges(sub.topics)}
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                        <span className="text-muted" style={{ fontSize: '11px' }}>
                          Terdaftar: {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                        </span>
                        <div className="d-flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleToggleStatus(sub)}
                          >
                            <i className={`fa ${sub.status === 'ACTIVE' ? 'fa-ban text-warning' : 'fa-check text-success'} me-1`} />
                            {sub.status === 'ACTIVE' ? 'Nonaktifkan' : 'Aktifkan'}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setDeleteTarget(sub)}
                          >
                            <i className="fa fa-trash" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Modal Add Subscriber */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Pelanggan Newsletter Baru"
      >
        <form onSubmit={handleAddSubscriber}>
          <div className="mb-3">
            <Label>Alamat Email (*Wajib)</Label>
            <Input
              type="email"
              placeholder="contoh: pembaca@gmail.com"
              value={newSub.email}
              onChange={(e) => setNewSub({ ...newSub, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <Label>Nama Lengkap (Opsional)</Label>
            <Input
              type="text"
              placeholder="Nama pembaca"
              value={newSub.name}
              onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <Label>Pilih Topik Berita Minat Pembaca</Label>
            <div className="d-flex flex-wrap gap-2 p-2 border rounded-3 bg-light" style={{ maxHeight: '140px', overflowY: 'auto' }}>
              {(categories.length > 0 ? categories : ['Politik', 'Teknologi', 'Bisnis', 'Opini', 'Gaya Hidup', 'Olahraga']).map((catName) => {
                const isSelected = newSub.topics.includes(catName)
                return (
                  <button
                    key={catName}
                    type="button"
                    onClick={() => handleToggleModalTopic(catName)}
                    className={`btn btn-sm ${isSelected ? 'btn-danger' : 'btn-outline-secondary'}`}
                    style={{ fontSize: '12px' }}
                  >
                    <i className={`fa ${isSelected ? 'fa-check-square-o' : 'fa-square-o'} me-1`} />
                    {catName}
                  </button>
                )
              })}
            </div>
            <small className="text-muted mt-1 d-block" style={{ fontSize: '11px' }}>
              *Klik untuk memilih satu atau beberapa topik berita. Jika tidak ada yang dipilih, sistem otomatis menetapkan "Semua Topik".
            </small>
          </div>

          <div className="mb-3">
            <Label>Frekuensi Buletin</Label>
            <Select
              value={newSub.frequency}
              onChange={(e) => setNewSub({ ...newSub, frequency: e.target.value })}
            >
              <SelectItem value="weekly">Mingguan (Weekly)</SelectItem>
              <SelectItem value="daily">Harian (Daily)</SelectItem>
              <SelectItem value="monthly">Bulanan (Monthly)</SelectItem>
            </Select>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Menyimpan...' : 'Simpan Subscriber'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Hapus Pelanggan Newsletter"
      >
        <p>Apakah Anda yakin ingin menghapus <strong>{deleteTarget?.email}</strong> dari daftar langganan?</p>
        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeleteSubscriber} disabled={submitting}>
            {submitting ? 'Menghapus...' : 'Ya, Hapus'}
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  )
}
