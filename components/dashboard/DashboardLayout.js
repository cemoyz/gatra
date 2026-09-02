import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/dashboard/ui'
import { canAccessRoute } from '@/lib/rbac'

export default function DashboardLayout({ children, title = 'Dashboard' }) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('dash-theme') || 'light'
      } catch (e) {
        return 'light'
      }
    }
    return 'light'
  })
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false)
  const [notifFilter, setNotifFilter] = useState('all') // 'all' | 'comments' | 'messages'
  const [messages, setMessages] = useState([])
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0)
  const [recentComments, setRecentComments] = useState([])
  const [lastSeenTime, setLastSeenTime] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [siteSettings, setSiteSettings] = useState({
    site_title: 'Dua Narasi',
    site_tagline: 'Editorial Control Panel',
    site_logo: ''
  })
  const notifRef = useRef(null)

  useEffect(() => {
    // Fetch site settings for dynamic logo and title
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSiteSettings(prev => ({
            ...prev,
            ...data.settings
          }))
        }
      })
      .catch(() => {})
    try {
      const savedTheme = localStorage.getItem('dash-theme')
      if (savedTheme && savedTheme !== themeMode) {
        setThemeMode(savedTheme)
      }
      const savedSeen = localStorage.getItem('dash_last_seen_notif')
      if (savedSeen) setLastSeenTime(parseInt(savedSeen))
    } catch (e) {}

    // Scroll listener to toggle frosted glass shadow on header
    const onScroll = () => {
      const isScrolled = window.scrollY > 8 || (document.querySelector('.dash-main')?.scrollTop || 0) > 8
      setScrolled(isScrolled)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const mainEl = document.querySelector('.dash-main')
    if (mainEl) mainEl.addEventListener('scroll', onScroll, { passive: true })

    // Load logged in user & enforce auth guard
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user && ['ADMIN', 'EDITOR', 'AUTHOR'].includes(data.user.role)) {
          setCurrentUser(data.user)
          setAuthLoading(false)
        } else {
          router.replace('/login')
        }
      })
      .catch(() => {
        router.replace('/login')
      })

    // Function to load both messages and comments notifications
    const refreshNotifications = () => {
      // 1. Fetch Inbox Messages
      fetch('/api/messages')
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.messages)) {
            setMessages(data.messages)
            const unread = data.messages.filter(m => !m.isRead).length
            setUnreadMessagesCount(unread)
          }
        })
        .catch(() => {})

      // 2. Fetch Recent Comments
      fetch('/api/comments?limit=5')
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.comments)) {
            setRecentComments(data.comments)
          }
        })
        .catch(() => {})
    }

    refreshNotifications()

    // 1. Passive Server-Sent Events (SSE) stream listener (0 constant polling)
    let eventSource
    try {
      eventSource = new EventSource('/api/events')
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'new_comment' || data.type === 'new_message' || data.type === 'view_incremented' || data.type === 'post_updated') {
            refreshNotifications()
          }
        } catch (e) {}
      }
    } catch (e) {}

    // 2. Smart Focus / Visibility Listener (instant refresh when tab becomes active)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshNotifications()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Click outside listener for dropdowns
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (mainEl) mainEl.removeEventListener('scroll', onScroll)
      if (eventSource) eventSource.close()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleThemeMode = () => {
    const next = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(next)
    try {
      localStorage.setItem('dash-theme', next)
    } catch (e) {}
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (err) {
      console.error(err)
    } finally {
      setCurrentUser(null)
      window.location.href = '/login'
    }
  }

  // Handle open notifications: mark as seen and clear the red active badge
  const handleOpenNotif = () => {
    const nextState = !notifDropdownOpen
    setNotifDropdownOpen(nextState)
    if (nextState) {
      const now = Date.now()
      setLastSeenTime(now)
      try {
        localStorage.setItem('dash_last_seen_notif', String(now))
      } catch (e) {}
    }
  }

  // Active unread badge count: only items newer than lastSeenTime
  const unreadNewMessages = messages.filter(m => !m.isRead && (!lastSeenTime || new Date(m.createdAt).getTime() > lastSeenTime)).length
  const unreadNewComments = recentComments.filter(c => !lastSeenTime || new Date(c.createdAt).getTime() > lastSeenTime).length
  const activeBadgeCount = unreadNewMessages + unreadNewComments
  const totalNotifCount = unreadMessagesCount + Math.min(recentComments.length, 5)

  // Merge and format notifications for the dropdown
  const formattedComments = recentComments.map(c => ({
    id: `comment-${c.id}`,
    type: 'comment',
    title: c.name || 'Pembaca',
    subtitle: `Mengomentari: ${c.post?.title || 'Artikel Berita'}`,
    content: c.content,
    createdAt: c.createdAt,
    link: '/dashboard/comments'
  }))

  const formattedMessages = messages.map(m => ({
    id: `msg-${m.id}`,
    type: 'message',
    title: m.name || 'Pengirim',
    subtitle: m.subject || 'Pesan dari Form Kontak',
    content: m.message,
    isUnread: !m.isRead,
    createdAt: m.createdAt,
    link: '/dashboard/messages'
  }))

  const allNotifications = [...formattedMessages, ...formattedComments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8)

  const filteredNotifications = notifFilter === 'comments'
    ? formattedComments
    : notifFilter === 'messages'
    ? formattedMessages
    : allNotifications

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'ADMIN':
        return { background: 'rgba(218, 1, 5, 0.12)', color: '#da0105', border: '1px solid rgba(218, 1, 5, 0.25)' }
      case 'EDITOR':
        return { background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', border: '1px solid rgba(99, 102, 241, 0.25)' }
      case 'AUTHOR':
        return { background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.25)' }
      default:
        return { background: 'rgba(100, 116, 139, 0.12)', color: '#64748b', border: '1px solid rgba(100, 116, 139, 0.25)' }
    }
  }

  const userRole = currentUser?.role || 'SUBSCRIBER'

  const allNavItems = [
    { label: 'Ringkasan / Analytics', path: '/dashboard', icon: 'fa-tachometer', roles: ['ADMIN', 'EDITOR', 'AUTHOR'] },
    { label: userRole === 'AUTHOR' ? 'Artikel Saya' : 'Semua Artikel', path: '/dashboard/posts', icon: 'fa-newspaper-o', roles: ['ADMIN', 'EDITOR', 'AUTHOR'] },
    { label: 'Tulis Artikel Baru', path: '/dashboard/posts/new', icon: 'fa-pencil-square-o', roles: ['ADMIN', 'EDITOR', 'AUTHOR'] },
    { label: 'Kategori Berita', path: '/dashboard/categories', icon: 'fa-folder-open-o', roles: ['ADMIN', 'EDITOR'] },
    { label: 'Tim Penulis / Authors', path: '/dashboard/authors', icon: 'fa-user-circle-o', roles: ['ADMIN', 'EDITOR', 'AUTHOR'] },
    { label: 'Manajemen Pengguna', path: '/dashboard/users', icon: 'fa-users', roles: ['ADMIN'] },
    { label: 'Komentar Pembaca', path: '/dashboard/comments', icon: 'fa-comments-o', badge: recentComments.length, roles: ['ADMIN', 'EDITOR', 'AUTHOR'] },
    { label: 'Pesan Masuk (Inbox)', path: '/dashboard/messages', icon: 'fa-envelope-o', badge: unreadMessagesCount, roles: ['ADMIN', 'EDITOR'] },
    { label: 'Pengaturan Website', path: '/dashboard/settings', icon: 'fa-sliders', roles: ['ADMIN'] },
  ]

  const navItems = allNavItems.filter(item => !item.roles || item.roles.includes(userRole))
  const isRouteForbidden = !canAccessRoute(userRole, router.pathname)

  if (authLoading || !currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <Head>
          <title>Memuat Panel Dashboard...</title>
        </Head>
        <div style={{
          width: '38px',
          height: '38px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#da0105',
          borderRadius: '50%',
          animation: 'dashSpin 0.7s linear infinite'
        }} />
        <p style={{ marginTop: '16px', color: '#94a3b8', fontSize: '13.5px', fontWeight: 500 }}>
          Memverifikasi hak akses...
        </p>
        <style jsx>{`
          @keyframes dashSpin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{title} &bull; {siteSettings.site_title || 'Dua Narasi'} Control Panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>

      <div className={`dash-container ${themeMode === 'dark' ? 'dash-theme-dark' : 'dash-theme-light'}`}>
        {/* Sidebar Nav */}
        <aside className="dash-sidebar">
          {/* Logo Header */}
          <div className="dash-sidebar-header">
            <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', width: '100%' }}>
              {siteSettings.site_logo ? (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#09090b',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18), 0 1px 3px rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px',
                    flexShrink: 0,
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={siteSettings.site_logo.startsWith('http') || siteSettings.site_logo.startsWith('/') ? siteSettings.site_logo : `/assets/img/logo/${siteSettings.site_logo}`}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              ) : (
                <div
                  className="dash-sidebar-logo-icon"
                  style={{
                    background: '#09090b',
                    color: '#fff',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18), 0 1px 3px rgba(0, 0, 0, 0.12)',
                    flexShrink: 0
                  }}
                >
                  <i className="fa fa-newspaper-o"></i>
                </div>
              )}
              <div className="dash-sidebar-logo-text" style={{ minWidth: 0, flex: 1 }}>
                <span className="dash-sidebar-logo-title" style={{ fontSize: '15px', fontWeight: 800, color: 'var(--dash-text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                  {siteSettings.site_title || 'Dua Narasi'}
                </span>
                <span className="dash-sidebar-logo-subtitle" style={{ color: 'var(--dash-text-muted)', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                  {siteSettings.site_tagline || 'Editorial Control Panel'}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="dash-sidebar-nav">
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--dash-text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', padding: '8px 12px 4px' }}>
              Menu Redaksi
            </div>

            {navItems.map((item) => {
              const isActive = router.pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`dash-menu-subitem ${isActive ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 700 : 500,
                    marginBottom: '2px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <i className={`fa ${item.icon}`} style={{ width: '18px', textAlign: 'center', fontSize: '15px', color: isActive ? 'var(--dash-primary)' : 'inherit' }}></i>
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span style={{ fontSize: '10px', background: '#da0105', color: '#fff', padding: '2px 7px', borderRadius: '10px', fontWeight: 800 }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}

            {/* Quick Live Preview Link */}
            <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
              <Link
                href="/"
                target="_blank"
                className="dash-menu-subitem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px dashed var(--dash-border)',
                  color: 'var(--dash-text-muted)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fa fa-globe" style={{ fontSize: '15px', color: '#10b981' }}></i>
                  <span style={{ fontWeight: 600 }}>Lihat Website Live</span>
                </div>
                <i className="fa fa-external-link" style={{ fontSize: '11px', opacity: 0.6 }}></i>
              </Link>
            </div>
          </div>

          {/* User Card at Sidebar Bottom */}
          <div className="dash-sidebar-footer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="dash-user-card-compact">
                  <img
                    src={currentUser?.avatar || '/avatar.png'}
                    alt=""
                    className="dash-user-avatar-sm"
                    onError={(e) => { e.currentTarget.src = '/avatar.png' }}
                  />
                  <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--dash-text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {currentUser?.name || 'Redaksi Hoom'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: 800,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        letterSpacing: '0.4px',
                        textTransform: 'uppercase',
                        ...getRoleBadgeStyle(userRole)
                      }}>
                        {userRole}
                      </span>
                    </div>
                  </div>
                  <i className="fa fa-sort" style={{ color: 'var(--dash-text-muted)', fontSize: '12px' }}></i>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" width="240px" style={{ bottom: '100%', top: 'auto', marginBottom: '8px' }}>
                <DropdownMenuLabel>
                  <div style={{ color: 'var(--dash-text-main)', fontSize: '13px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser?.name || 'Redaksi Hoom'}
                  </div>
                  <div style={{ color: 'var(--dash-text-muted)', fontSize: '11px', fontWeight: 500, textTransform: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                    {currentUser?.email || 'admin@hoom.id'}
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      ...getRoleBadgeStyle(userRole)
                    }}>
                      Role: {userRole}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {userRole === 'ADMIN' && (
                  <DropdownMenuItem href="/dashboard/users" icon="fa-user-circle">
                    Kelola Pengguna & Redaksi
                  </DropdownMenuItem>
                )}

                {userRole === 'ADMIN' && (
                  <DropdownMenuItem href="/dashboard/settings" icon="fa-sliders">
                    Pengaturan Website
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem href="/dashboard/posts" icon="fa-newspaper-o">
                  {userRole === 'AUTHOR' ? 'Artikel Saya' : 'Semua Artikel'}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout} icon="fa-sign-out" destructive>
                  Keluar / Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="dash-main">
          {/* Topbar */}
          <header
            className={`dash-topbar ${scrolled ? 'scrolled' : ''}`}
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              backdropFilter: 'blur(20px) saturate(190%)',
              WebkitBackdropFilter: 'blur(20px) saturate(190%)'
            }}
          >
            {/* Left Nav (matching main-files header-quick-link) */}
            <div className="dash-topbar-left">
              <div className="dash-topbar-links">
                <Link
                  href="/"
                  target="_blank"
                  className="dash-topbar-link"
                >
                  <i className="fa fa-globe" style={{ marginRight: '6px', color: '#10b981' }}></i> Website Live
                </Link>
                <Link
                  href="/dashboard"
                  className={`dash-topbar-link ${router.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  <i className="fa fa-tachometer" style={{ marginRight: '6px' }}></i> Ringkasan
                </Link>
                <Link
                  href="/dashboard/posts/new"
                  className={`dash-topbar-link ${router.pathname === '/dashboard/posts/new' ? 'active' : ''}`}
                >
                  <i className="fa fa-pencil" style={{ marginRight: '6px' }}></i> Tulis Berita
                </Link>
              </div>
            </div>

            {/* Right Nav */}
            <div className="dash-topbar-right">
              {/* Real-time Live Sync Indicator */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  letterSpacing: '0.5px'
                }}
                title="Sistem sinkronisasi real-time aktif (otomatis update tanpa reload)"
              >
                <span className="dash-pulse-dot" />
                LIVE
              </div>

              {/* Search Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const val = e.currentTarget.elements.search?.value
                  if (val) router.push(`/dashboard/posts?search=${encodeURIComponent(val)}`)
                }}
                className="dash-search-input-box"
              >
                <i className="fa fa-search" style={{ fontSize: '13px', color: 'var(--dash-text-muted)' }}></i>
                <input name="search" type="text" placeholder="Cari artikel..." />
                <span className="dash-kbd">↵ Enter</span>
              </form>

              {/* Theme Toggle (Sun/Moon) */}
              <button
                type="button"
                onClick={toggleThemeMode}
                className="dash-icon-btn"
                title={themeMode === 'light' ? 'Ganti ke Dark Mode' : 'Ganti ke Light Mode'}
                aria-label="Toggle Theme"
              >
                <i className={`fa ${themeMode === 'light' ? 'fa-sun-o' : 'fa-moon-o'}`} style={{ color: themeMode === 'light' ? '#f59e0b' : '#94a3b8' }}></i>
              </button>

              {/* Unified Notification Center (Comments + Messages) */}
              <div style={{ position: 'relative' }} ref={notifRef}>
                <button
                  type="button"
                  onClick={handleOpenNotif}
                  className="dash-icon-btn"
                  title="Pusat Notifikasi (Komentar & Pesan Masuk)"
                  style={{ position: 'relative' }}
                >
                  <i className="fa fa-bell-o"></i>
                  {activeBadgeCount > 0 && (
                    <span className="dash-badge-dot" style={{ background: '#da0105', color: '#fff', fontSize: '10px', fontWeight: 800 }}>
                      {activeBadgeCount}
                    </span>
                  )}
                </button>

                {/* Dropdown Popover */}
                {notifDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      right: 0,
                      width: '360px',
                      maxWidth: '90vw',
                      background: 'var(--dash-card-bg)',
                      border: '1px solid var(--dash-border)',
                      borderRadius: '14px',
                      boxShadow: 'var(--dash-shadow-lg)',
                      zIndex: 1000,
                      overflow: 'hidden',
                      animation: 'dashFadeSlideUp 0.25s ease forwards'
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        padding: '14px 18px 10px',
                        borderBottom: '1px solid var(--dash-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: 'var(--dash-text-main)' }}>
                          Pusat Notifikasi
                        </h4>
                        {totalNotifCount > 0 && (
                          <span style={{ fontSize: '11px', background: 'rgba(218, 1, 5, 0.12)', color: '#da0105', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                            {totalNotifCount} Baru
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--dash-text-muted)' }}>
                        <span className="dash-pulse-dot" style={{ width: '6px', height: '6px', marginRight: '4px' }} /> Realtime
                      </span>
                    </div>

                    {/* Filter Tabs */}
                    <div
                      style={{
                        display: 'flex',
                        padding: '6px 12px',
                        background: 'var(--dash-muted-bg)',
                        borderBottom: '1px solid var(--dash-border)',
                        gap: '6px'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setNotifFilter('all')}
                        style={{
                          flex: 1,
                          padding: '5px 8px',
                          fontSize: '11.5px',
                          fontWeight: notifFilter === 'all' ? 700 : 500,
                          border: 'none',
                          borderRadius: '6px',
                          background: notifFilter === 'all' ? 'var(--dash-card-bg)' : 'transparent',
                          color: notifFilter === 'all' ? 'var(--dash-text-main)' : 'var(--dash-text-muted)',
                          boxShadow: notifFilter === 'all' ? 'var(--dash-shadow)' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Semua ({allNotifications.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setNotifFilter('comments')}
                        style={{
                          flex: 1,
                          padding: '5px 8px',
                          fontSize: '11.5px',
                          fontWeight: notifFilter === 'comments' ? 700 : 500,
                          border: 'none',
                          borderRadius: '6px',
                          background: notifFilter === 'comments' ? 'var(--dash-card-bg)' : 'transparent',
                          color: notifFilter === 'comments' ? '#10b981' : 'var(--dash-text-muted)',
                          boxShadow: notifFilter === 'comments' ? 'var(--dash-shadow)' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        💬 Komentar ({formattedComments.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setNotifFilter('messages')}
                        style={{
                          flex: 1,
                          padding: '5px 8px',
                          fontSize: '11.5px',
                          fontWeight: notifFilter === 'messages' ? 700 : 500,
                          border: 'none',
                          borderRadius: '6px',
                          background: notifFilter === 'messages' ? 'var(--dash-card-bg)' : 'transparent',
                          color: notifFilter === 'messages' ? '#da0105' : 'var(--dash-text-muted)',
                          boxShadow: notifFilter === 'messages' ? 'var(--dash-shadow)' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        ✉️ Pesan ({formattedMessages.length})
                      </button>
                    </div>

                    {/* Notification Item List */}
                    <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                      {filteredNotifications.length === 0 ? (
                        <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--dash-text-muted)', fontSize: '13px' }}>
                          <i className="fa fa-bell-slash-o" style={{ fontSize: '24px', marginBottom: '8px', display: 'block', opacity: 0.5 }}></i>
                          Tidak ada notifikasi saat ini
                        </div>
                      ) : (
                        filteredNotifications.map((item) => (
                          <Link
                            key={item.id}
                            href={item.link}
                            onClick={() => setNotifDropdownOpen(false)}
                            style={{
                              display: 'flex',
                              gap: '12px',
                              padding: '12px 16px',
                              borderBottom: '1px solid var(--dash-border)',
                              textDecoration: 'none',
                              color: 'inherit',
                              transition: 'background 0.15s ease',
                              background: item.isUnread ? 'rgba(218, 1, 5, 0.04)' : 'transparent'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--dash-muted-bg)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = item.isUnread ? 'rgba(218, 1, 5, 0.04)' : 'transparent' }}
                          >
                            {/* Type Icon */}
                            <div
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: item.type === 'comment' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(218, 1, 5, 0.12)',
                                color: item.type === 'comment' ? '#10b981' : '#da0105',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '15px',
                                flexShrink: 0
                              }}
                            >
                              <i className={`fa ${item.type === 'comment' ? 'fa-comment' : 'fa-envelope'}`}></i>
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                                <strong style={{ fontSize: '13px', color: 'var(--dash-text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {item.title}
                                </strong>
                                <span style={{ fontSize: '10.5px', color: 'var(--dash-text-muted)', whiteSpace: 'nowrap' }}>
                                  {item.type === 'comment' ? 'Komentar' : 'Pesan'}
                                </span>
                              </div>
                              <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }}>
                                {item.subtitle}
                              </div>
                              <div style={{ fontSize: '12px', color: 'var(--dash-text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.85 }}>
                                "{item.content}"
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div
                      style={{
                        padding: '10px 14px',
                        background: 'var(--dash-muted-bg)',
                        borderTop: '1px solid var(--dash-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}
                    >
                      <Link
                        href="/dashboard/comments"
                        onClick={() => setNotifDropdownOpen(false)}
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '6px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#10b981',
                          textDecoration: 'none',
                          background: 'var(--dash-card-bg)',
                          border: '1px solid var(--dash-border)',
                          borderRadius: '8px'
                        }}
                      >
                        💬 Semua Komentar
                      </Link>
                      <Link
                        href="/dashboard/messages"
                        onClick={() => setNotifDropdownOpen(false)}
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '6px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#da0105',
                          textDecoration: 'none',
                          background: 'var(--dash-card-bg)',
                          border: '1px solid var(--dash-border)',
                          borderRadius: '8px'
                        }}
                      >
                        ✉️ Buka Kotak Masuk
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar Dropdown (matching main-files UserDropdown) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Profil & Pengaturan Akun"
                  >
                    <img
                      src={currentUser?.avatar || '/avatar.png'}
                      alt={currentUser?.name || 'User'}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '9999px',
                        objectFit: 'cover',
                        border: '1px solid var(--dash-border)',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)'
                      }}
                      onError={(e) => { e.currentTarget.src = '/avatar.png' }}
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" width="240px">
                  <DropdownMenuLabel>
                    <div style={{ color: 'var(--dash-text-main)', fontSize: '13px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currentUser?.name || 'Redaksi Hoom'}
                    </div>
                    <div style={{ color: 'var(--dash-text-muted)', fontSize: '11px', fontWeight: 500, textTransform: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                      {currentUser?.email || 'admin@hoom.id'}
                    </div>
                    <div style={{ marginTop: '6px' }}>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        ...getRoleBadgeStyle(userRole)
                      }}>
                        Role: {userRole}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {userRole === 'ADMIN' && (
                    <DropdownMenuItem href="/dashboard/users" icon="fa-user-circle">
                      Kelola Pengguna & Redaksi
                    </DropdownMenuItem>
                  )}

                  {userRole === 'ADMIN' && (
                    <DropdownMenuItem href="/dashboard/settings" icon="fa-sliders">
                      Pengaturan Website
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem href="/dashboard/posts" icon="fa-newspaper-o">
                    {userRole === 'AUTHOR' ? 'Artikel Saya' : 'Semua Artikel'}
                  </DropdownMenuItem>

                  <DropdownMenuItem href="/" target="_blank" icon="fa-globe">
                    Lihat Website Live
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout} icon="fa-sign-out" destructive>
                    Keluar / Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="dash-content">
            {isRouteForbidden ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                padding: '40px 20px',
                background: 'var(--dash-card-bg)',
                borderRadius: '16px',
                border: '1px solid var(--dash-border)',
                margin: '20px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(218, 1, 5, 0.1)',
                  color: '#da0105',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '16px'
                }}>
                  <i className="fa fa-ban"></i>
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px', color: 'var(--dash-text-main)' }}>
                  403 - Akses Ditolak
                </h2>
                <p style={{ color: 'var(--dash-text-muted)', maxWidth: '440px', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}>
                  Akun Anda dengan peran <strong style={{ color: 'var(--dash-text-main)' }}>{userRole}</strong> tidak memiliki izin untuk mengakses halaman ini.
                </p>
                <Link
                  href="/dashboard"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: '#da0105',
                    color: '#fff',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  <i className="fa fa-arrow-left"></i> Kembali ke Dashboard
                </Link>
              </div>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    </>
  )
}
