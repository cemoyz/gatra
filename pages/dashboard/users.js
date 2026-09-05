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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  Label,
  Toast,
  Modal,
  EmptyState
} from '@/components/dashboard/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

let cachedUsers = []

export default function DashboardUsers() {
  const [users, setUsers] = useState(cachedUsers)
  const [loading, setLoading] = useState(cachedUsers.length === 0)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const [toast, setToast] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editUserModal, setEditUserModal] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EDITOR',
    authorTitle: 'Senior Editor',
    bio: ''
  })

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: 'EDITOR',
    authorTitle: '',
    bio: '',
    password: ''
  })

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchUsers = async () => {
    if (cachedUsers.length === 0) setLoading(true)
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      if (data.success && Array.isArray(data.users)) {
        cachedUsers = data.users
        setUsers(data.users)
      } else if (cachedUsers.length === 0) {
        setUsers([])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleAddUser = async (e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.email || !newUser.password) {
      showToast('Mohon lengkapi nama, email, dan kata sandi', 'error')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
      const data = await res.json()
      if (data.success) {
        showToast('Pengguna baru berhasil ditambahkan!')
        setShowAddModal(false)
        setNewUser({
          name: '',
          email: '',
          password: '',
          role: 'EDITOR',
          authorTitle: 'Senior Editor',
          bio: ''
        })
        fetchUsers()
      } else {
        showToast(data.message || 'Gagal menambahkan pengguna', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan sistem', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditUser = async (e) => {
    e.preventDefault()
    if (!editForm.name || !editForm.email) {
      showToast('Mohon lengkapi nama dan email', 'error')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`/api/users/${editUserModal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      const data = await res.json()
      if (data.success) {
        showToast('Data pengguna berhasil diperbarui!')
        setEditUserModal(null)
        fetchUsers()
      } else {
        showToast(data.message || 'Gagal memperbarui pengguna', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan sistem', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!deleteTarget) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/users/${deleteTarget.id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        showToast('Pengguna berhasil dihapus!')
        setDeleteTarget(null)
        fetchUsers()
      } else {
        showToast(data.message || 'Gagal menghapus pengguna', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan sistem', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const openEditModal = (u) => {
    setEditUserModal(u)
    setEditForm({
      name: u.name || '',
      email: u.email || '',
      role: u.role || 'EDITOR',
      authorTitle: u.author?.role || '',
      bio: u.author?.bio || '',
      password: ''
    })
  }

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'ADMIN': return 'primary'
      case 'EDITOR': return 'info'
      case 'AUTHOR': return 'warning'
      default: return 'outline'
    }
  }

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.author?.role?.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const isFiltered = search !== '' || roleFilter !== 'all'

  return (
    <DashboardLayout title="Manajemen Pengguna & Redaksi">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <PageHeader
        title="Manajemen Pengguna"
        description="Kelola akun pengguna, hak akses redaksi, serta profil jurnalis dan penulis portal berita."
        badge={`${users.length} Total Pengguna`}
        icon="fa-users"
        action={
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="dash-btn dash-btn-primary dash-pageheader-btn"
          >
            <i className="fa fa-user-plus"></i>
            <span>Tambah Pengguna</span>
          </button>
        }
      />

      <Card style={{ position: 'relative', minHeight: '380px' }}>
        <CardLoadingOverlay loading={loading && users.length === 0} text="Memuat data pengguna..." />

        <CardHeader style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', width: '100%' }}>
            <CardTitle icon="fa-address-book-o">
              Daftar Pengguna & Tim Redaksi ({filteredUsers.length})
            </CardTitle>

            {isFiltered && (
              <Button
                onClick={() => { setSearch(''); setRoleFilter('all') }}
                variant="ghost"
                size="sm"
                style={{ color: '#ef4444', fontSize: '12px' }}
                icon="fa-times"
              >
                Reset Filter
              </Button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
            <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '240px' }}>
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
                placeholder="Cari nama pengguna, email, atau gelar penulis..."
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

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger style={{ height: '36px', minWidth: '180px' }}>
                <SelectValue placeholder="Semua Peran / Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Peran / Role</SelectItem>
                <SelectItem value="ADMIN">Administrator (ADMIN)</SelectItem>
                <SelectItem value="EDITOR">Editor Redaksi (EDITOR)</SelectItem>
                <SelectItem value="AUTHOR">Penulis / Wartawan (AUTHOR)</SelectItem>
                <SelectItem value="SUBSCRIBER">Pembaca (SUBSCRIBER)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--dash-muted-bg)', borderBottom: '1px solid var(--dash-border)' }}>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, width: '40px' }}>#</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Pengguna & Profil Penulis</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Hak Akses / Peran</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Artikel Terbit</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Profil Publik</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700 }}>Terdaftar</th>
                <th style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--dash-text-muted)', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 && !loading ? (
                <tr>
                  <td colSpan="7">
                    <EmptyState
                      icon="fa-users"
                      title="Tidak Ada Pengguna Ditemukan"
                      description="Tidak ada pengguna yang cocok dengan kriteria pencarian atau filter peran Anda."
                    />
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, idx) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--dash-border)' }}>
                    <td style={{ padding: '14px 18px', color: 'var(--dash-text-muted)', fontSize: '12.5px', fontWeight: 600 }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: '14px 18px', maxWidth: '320px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={u.avatar || '/assets/img/author/author-1.webp'}
                          alt=""
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid var(--dash-border)',
                            flexShrink: 0
                          }}
                          onError={(e) => { e.currentTarget.src = '/avatar.png' }}
                        />
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontWeight: 700, color: 'var(--dash-text-main)', fontSize: '13.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {u.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--dash-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {u.email}
                          </div>
                          {u.author?.role && (
                            <div style={{ fontSize: '11px', color: 'var(--dash-primary)', fontWeight: 600, marginTop: '2px' }}>
                              <i className="fa fa-pencil" style={{ marginRight: '4px' }}></i>
                              {u.author.role}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <Badge variant={getRoleBadgeVariant(u.role)}>
                        {u.role || 'SUBSCRIBER'}
                      </Badge>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--dash-text-main)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa fa-newspaper-o" style={{ color: 'var(--dash-text-muted)' }}></i>
                        {u.postsCount || 0} Artikel
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      {u.author ? (
                        <Link
                          href={`/author?id=${u.author.id}`}
                          target="_blank"
                          className="dash-btn dash-btn-secondary"
                          style={{ height: '28px', padding: '0 9px', fontSize: '11.5px', borderRadius: '6px' }}
                        >
                          <span>Laman Publik</span>
                          <i className="fa fa-external-link" style={{ fontSize: '10px', marginLeft: '4px' }}></i>
                        </Link>
                      ) : (
                        <span style={{ fontSize: '12px', color: 'var(--dash-text-muted)' }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 18px', fontSize: '12.5px', color: 'var(--dash-text-muted)' }}>
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => openEditModal(u)}
                          className="dash-icon-btn"
                          style={{ width: '32px', height: '32px', fontSize: '12px', borderRadius: '8px' }}
                          title="Sunting Pengguna & Profil Penulis"
                        >
                          <i className="fa fa-pencil"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(u)}
                          className="dash-icon-btn"
                          style={{ width: '32px', height: '32px', fontSize: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px' }}
                          title="Hapus Akun Pengguna"
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
      </Card>

      {/* ================= MODAL: TAMBAH PENGGUNA BARU ================= */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Tambah Pengguna & Penulis Baru"
        icon="fa-user-plus"
      >
        <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="dash-form-group" style={{ margin: 0 }}>
            <Label>Nama Lengkap Pengguna / Penulis *</Label>
            <Input
              placeholder="Contoh: Alexis Dowson"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>

          <div className="dash-form-group" style={{ margin: 0 }}>
            <Label>Alamat Email *</Label>
            <Input
              type="email"
              placeholder="nama@portalberita.com"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>

          <div className="dash-form-group" style={{ margin: 0 }}>
            <Label>Kata Sandi (Password) *</Label>
            <Input
              type="password"
              placeholder="Minimal 6 karakter"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          </div>

          <div className="dash-form-group" style={{ margin: 0 }}>
            <Label>Peran / Hak Akses (Role)</Label>
            <Select value={newUser.role} onValueChange={(val) => setNewUser({ ...newUser, role: val })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">ADMIN - Akses Penuh ke Seluruh Dashboard</SelectItem>
                <SelectItem value="EDITOR">EDITOR - Dapat Menulis & Mengedit Berita</SelectItem>
                <SelectItem value="AUTHOR">AUTHOR - Hanya Menulis Naskah Sendiri</SelectItem>
                <SelectItem value="SUBSCRIBER">SUBSCRIBER - Pembaca Biasa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {newUser.role !== 'SUBSCRIBER' && (
            <div className="dash-form-group" style={{ margin: 0 }}>
              <Label>Gelar / Jabatan Redaksi (Profil Penulis)</Label>
              <Input
                placeholder="Contoh: Senior Tech Editor, Jurnalis Olahraga"
                value={newUser.authorTitle}
                onChange={(e) => setNewUser({ ...newUser, authorTitle: e.target.value })}
              />
            </div>
          )}

          <div className="dash-form-group" style={{ margin: 0 }}>
            <Label>Biografi Singkat Penulis (Opsional)</Label>
            <Textarea
              rows={2}
              placeholder="Tuliskan latar belakang singkat dan keahlian jurnalis..."
              value={newUser.bio}
              onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddModal(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              loading={submitting}
              variant="default"
              style={{ background: '#090d16', color: '#fff' }}
            >
              Simpan Pengguna
            </Button>
          </div>
        </form>
      </Modal>

      {/* ================= MODAL: SUNTING PENGGUNA & PROFIL ================= */}
      <Modal
        isOpen={!!editUserModal}
        onClose={() => setEditUserModal(null)}
        title="Sunting Pengguna & Profil Penulis"
        icon="fa-pencil"
      >
        {editUserModal && (
          <form onSubmit={handleEditUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="dash-form-group" style={{ margin: 0 }}>
              <Label>Nama Lengkap *</Label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </div>

            <div className="dash-form-group" style={{ margin: 0 }}>
              <Label>Alamat Email *</Label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
            </div>

            <div className="dash-form-group" style={{ margin: 0 }}>
              <Label>Hak Akses / Peran (Role)</Label>
              <Select value={editForm.role} onValueChange={(val) => setEditForm({ ...editForm, role: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN - Akses Penuh Sistem</SelectItem>
                  <SelectItem value="EDITOR">EDITOR - Manajemen Konten & Naskah</SelectItem>
                  <SelectItem value="AUTHOR">AUTHOR - Penulis Artikel</SelectItem>
                  <SelectItem value="SUBSCRIBER">SUBSCRIBER - Pembaca Terdaftar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="dash-form-group" style={{ margin: 0 }}>
              <Label>Biografi / Deskripsi Jurnalis</Label>
              <Textarea
                rows={3}
                placeholder="Biografi singkat..."
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              />
            </div>

            <div className="dash-form-group" style={{ margin: 0 }}>
              <Label>Kata Sandi Baru (Kosongkan jika tidak diubah)</Label>
              <Input
                type="password"
                placeholder="Masukkan kata sandi baru jika ingin mengganti"
                value={editForm.password}
                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditUserModal(null)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                loading={submitting}
                variant="default"
                style={{ background: '#090d16', color: '#fff' }}
              >
                Simpan Perubahan
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* ================= MODAL: KONFIRMASI HAPUS ================= */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Pengguna"
        icon="fa-trash"
      >
        {deleteTarget && (
          <div>
            <p style={{ fontSize: '14px', color: 'var(--dash-text-main)', marginTop: 0, lineHeight: 1.6 }}>
              Apakah Anda yakin ingin menghapus akun pengguna <strong>"{deleteTarget.name}"</strong> ({deleteTarget.email})?
            </p>
            <p style={{ fontSize: '13px', color: 'var(--dash-text-muted)', marginBottom: '24px' }}>
              Tindakan ini permanen dan profil penulis yang terhubung juga akan dihapus dari portal berita.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button
                type="button"
                onClick={() => setDeleteTarget(null)}
                variant="secondary"
              >
                Batal
              </Button>
              <Button
                type="button"
                onClick={handleDeleteConfirm}
                loading={submitting}
                variant="destructive"
                style={{ background: '#ef4444', color: '#fff' }}
              >
                Ya, Hapus Pengguna
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
