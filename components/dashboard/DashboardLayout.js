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
import { getImageUrl } from '@/lib/imageUtils'

let cachedDashboardUser = null
let cachedSiteSettings = null
let cachedMessages = []
let cachedComments = []
let cachedUnreadCount = 0

export default function DashboardLayout({ children, title = 'Dashboard' }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [themeMode, setThemeMode] = useState('light')
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false)
  const [notifFilter, setNotifFilter] = useState('all') // 'all' | 'unread' | 'comments' | 'messages'
  const [messages, setMessages] = useState(cachedMessages)
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(cachedUnreadCount)
  const [recentComments, setRecentComments] = useState(cachedComments)
  const [readCommentIds, setReadCommentIds] = useState([])
  const [lastSeenTime, setLastSeenTime] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [siteSettings, setSiteSettings] = useState({
    site_title: 'duanarasi.com',
    site_tagline: 'Editorial Control Panel',
    site_logo: ''
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = sessionStorage.getItem('dash_user')
      if (stored) {
        const u = JSON.parse(stored)
        cachedDashboardUser = u
        setCurrentUser(u)
        setAuthLoading(false)
      }
      const savedTheme = localStorage.getItem('dash-theme')
      if (savedTheme) {
        setThemeMode(savedTheme)
      }
      const savedRead = localStorage.getItem('dash_read_comment_ids')
      if (savedRead) {
        setReadCommentIds(JSON.parse(savedRead))
      }
      const storedSettings = sessionStorage.getItem('dash_site_settings')
      if (storedSettings) {
        setSiteSettings(JSON.parse(storedSettings))
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [router.pathname])

  useEffect(() => {
    // Fetch site settings for dynamic logo and title
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          cachedSiteSettings = data.settings
          try { sessionStorage.setItem('dash_site_settings', JSON.stringify(data.settings)) } catch (e) {}
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
    let authToken = null
    try {
      authToken = localStorage.getItem('hoom_token') || sessionStorage.getItem('hoom_token')
    } catch (e) {}

    fetch('/api/auth/me', {
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user && ['ADMIN', 'EDITOR', 'AUTHOR'].includes(data.user.role)) {
          cachedDashboardUser = data.user
          try { sessionStorage.setItem('dash_user', JSON.stringify(data.user)) } catch (e) {}
          setCurrentUser(data.user)
          setAuthLoading(false)
        } else {
          cachedDashboardUser = null
          try {
            sessionStorage.removeItem('dash_user')
            localStorage.removeItem('hoom_token')
            sessionStorage.removeItem('hoom_token')
            document.cookie = 'hoom_auth_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
            fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
          } catch (e) {}
          router.replace('/login')
        }
      })
      .catch(() => {
        cachedDashboardUser = null
        try {
          sessionStorage.removeItem('dash_user')
          localStorage.removeItem('hoom_token')
          sessionStorage.removeItem('hoom_token')
          document.cookie = 'hoom_auth_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
          fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
        } catch (e) {}
        router.replace('/login')
      })

    // Function to load both messages and comments notifications
    const refreshNotifications = () => {
      // 1. Fetch Inbox Messages
      fetch('/api/messages')
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.messages)) {
            cachedMessages = data.messages
            setMessages(data.messages)
            const unread = data.messages.filter(m => m.status === 'UNREAD').length
            cachedUnreadCount = unread
            setUnreadMessagesCount(unread)
          }
        })
        .catch(() => {})

      // 2. Fetch Recent Comments
      fetch('/api/comments?limit=10')
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.comments)) {
            cachedComments = data.comments
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
      cachedDashboardUser = null
      try { sessionStorage.removeItem('dash_user') } catch (e) {}
      setCurrentUser(null)
      window.location.href = '/login'
    }
  }

  // Mark single comment as read
  const markCommentAsRead = (commentId) => {
    setReadCommentIds(prev => {
      if (prev.includes(commentId)) return prev
      const next = [...prev, commentId]
      try { localStorage.setItem('dash_read_comment_ids', JSON.stringify(next)) } catch (e) {}
      return next
    })
  }

  // Mark single message as read
  const markMessageAsRead = async (messageId) => {
    try {
      await fetch(`/api/contact/${messageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'READ' })
      })
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'READ' } : m))
      setUnreadMessagesCount(prev => Math.max(0, prev - 1))
    } catch (e) {
      console.error('Error marking message as read:', e)
    }
  }

  // Mark all notifications (messages + comments) as read
  const handleMarkAllAsRead = async () => {
    try {
      await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_all_read' })
      })
      setMessages(prev => prev.map(m => ({ ...m, status: 'READ' })))
      setUnreadMessagesCount(0)
    } catch (e) {
      console.error('Error marking all messages as read:', e)
    }

    if (recentComments.length > 0) {
      const allCommentIds = recentComments.map(c => c.id)
      setReadCommentIds(prev => {
        const combined = Array.from(new Set([...prev, ...allCommentIds]))
        try { localStorage.setItem('dash_read_comment_ids', JSON.stringify(combined)) } catch (e) {}
        return combined
      })
    }
  }

  // Handle open notifications: toggle popover
  const handleOpenNotif = () => {
    setNotifDropdownOpen(prev => !prev)
  }

  // Format comments with read state
  const formattedComments = recentComments.map(c => {
    const isUnread = !readCommentIds.includes(c.id)
    return {
      id: `comment-${c.id}`,
      rawId: c.id,
      type: 'comment',
      title: c.name || 'Pembaca',
      subtitle: `Mengomentari: ${c.post?.title || 'Artikel Berita'}`,
      content: c.content,
      isUnread,
      createdAt: c.createdAt,
      link: '/dashboard/comments'
    }
  })

  // Format messages with read state
  const formattedMessages = messages.map(m => {
    const isUnread = m.status === 'UNREAD'
    return {
      id: `msg-${m.id}`,
      rawId: m.id,
      type: 'message',
      title: m.name || 'Pengirim',
      subtitle: m.subject || 'Pesan dari Form Kontak',
      content: m.message,
      isUnread,
      createdAt: m.createdAt,
      link: '/dashboard/messages'
    }
  })

  // Calculate unread totals accurately
  const unreadMessagesTotal = messages.filter(m => m.status === 'UNREAD').length
  const unreadCommentsTotal = recentComments.filter(c => !readCommentIds.includes(c.id)).length
  const totalUnreadNotifCount = unreadMessagesTotal + unreadCommentsTotal

  const allNotifications = [...formattedMessages, ...formattedComments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10)

  const filteredNotifications = notifFilter === 'unread'
    ? allNotifications.filter(n => n.isUnread)
    : notifFilter === 'comments'
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
    { label: userRole === 'AUTHOR' ? 'Artikel Saya' : 'Semua Artikel', path: '/dashboard/posts', icon: 'fa-newspaper', roles: ['ADMIN', 'EDITOR', 'AUTHOR'] },
    { label: 'Tulis Artikel Baru', path: '/dashboard/posts/new', icon: 'fa-edit', roles: ['ADMIN', 'EDITOR', 'AUTHOR'] },
    { label: 'Kategori Berita', path: '/dashboard/categories', icon: 'fa-folder-open', roles: ['ADMIN', 'EDITOR'] },
    { label: 'Tim Penulis / Authors', path: '/dashboard/authors', icon: 'fa-user-circle', roles: ['ADMIN', 'EDITOR', 'AUTHOR'] },
    { label: 'Manajemen Pengguna', path: '/dashboard/users', icon: 'fa-users', roles: ['ADMIN'] },
    { label: 'Pelanggan / Subscriber', path: '/dashboard/subscribers', icon: 'fa-paper-plane', roles: ['ADMIN', 'EDITOR'] },
    { label: 'Komentar Pembaca', path: '/dashboard/comments', icon: 'fa-comments', badge: recentComments.length, roles: ['ADMIN', 'EDITOR', 'AUTHOR'] },
    { label: 'Pesan Masuk (Inbox)', path: '/dashboard/messages', icon: 'fa-envelope', badge: unreadMessagesCount, roles: ['ADMIN', 'EDITOR'] },
    { label: 'Pengaturan Website', path: '/dashboard/settings', icon: 'fa-sliders', roles: ['ADMIN'] },
  ]

  const navItems = allNavItems.filter(item => !item.roles || item.roles.includes(userRole))
  const isRouteForbidden = !canAccessRoute(userRole, router.pathname)

  if (!mounted || authLoading || !currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        color: '#09090b',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}>
        <Head>
          <title>Memuat Panel Dashboard...</title>
        </Head>
        <div style={{
          width: '36px',
          height: '36px',
          border: '3px solid rgba(0,0,0,0.08)',
          borderTopColor: '#da0105',
          borderRadius: '50%',
          animation: 'dashSpin 0.7s linear infinite'
        }} />
        <p style={{ marginTop: '16px', color: '#64748b', fontSize: '13.5px', fontWeight: 500 }}>
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
        <link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon-512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon-192.png" sizes="192x192" />
        <link rel="shortcut icon" href="/favicon-192.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>

      <div className={`dash-container ${themeMode === 'dark' ? 'dash-theme-dark' : 'dash-theme-light'}`}>
        {/* Mobile Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div
            className="dash-sidebar-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Nav */}
        <aside className={`dash-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {/* Logo Header */}
          <div className="dash-sidebar-header">
            <Link
              href="/"
              target="_blank"
              title={`${siteSettings.site_title || 'Dua Narasi'} - Kunjungi Website`}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                maxWidth: 'calc(100% - 32px)',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <img
                src={getImageUrl(
                  themeMode === 'dark'
                    ? (siteSettings.logo_header_dark || siteSettings.logo_dashboard || siteSettings.logo_header || siteSettings.site_logo)
                    : (siteSettings.logo_dashboard || siteSettings.logo_header || siteSettings.site_logo),
                  themeMode === 'dark' ? '/assets/img/logo/logo-white.webp' : '/assets/img/logo/logo.webp'
                )}
                alt={siteSettings.site_title || "Logo"}
                style={{
                  maxHeight: '38px',
                  maxWidth: '180px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  e.currentTarget.src = themeMode === 'dark' ? '/assets/img/logo/logo-white.webp' : '/assets/img/logo/logo.webp'
                }}
              />
            </Link>

            {/* Mobile Close Button inside Sidebar */}
            <button
              type="button"
              className="dash-mobile-sidebar-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <i className="fa fa-times"></i>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="dash-sidebar-nav">
            {navItems.map((item) => {
              const isActive = router.pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`dash-menu-subitem ${isActive ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8.5px 12px',
                    borderRadius: '9px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 700 : 600,
                    marginBottom: '2px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                    <i className={`fa ${item.icon}`} style={{ width: '18px', textAlign: 'center', fontSize: '15px' }}></i>
                    <span>{item.label}</span>
                  </div>
                </Link>
              )
            })}

            {/* Quick Live Preview Link */}
            <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
              <Link
                href="/"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="dash-menu-subitem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8.5px 12px',
                  borderRadius: '9px',
                  border: '1px dashed var(--dash-border)',
                  color: 'var(--dash-text-muted)',
                  fontSize: '13px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fa fa-globe" style={{ fontSize: '15px', color: '#09090b' }}></i>
                  <span style={{ fontWeight: 600 }}>Lihat Website Live</span>
                </div>
                <i className="fa fa-external-link" style={{ fontSize: '11px', opacity: 0.6 }}></i>
              </Link>
            </div>
          </div>

          {/* User Card at Sidebar Bottom */}
          <div className="dash-sidebar-footer" style={{ padding: '12px 14px' }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="dash-user-card-compact" style={{ padding: '8px 10px', borderRadius: '10px' }}>
                  <img
                    src={currentUser?.avatar || '/avatar.png'}
                    alt=""
                    className="dash-user-avatar-sm"
                    style={{ width: '34px', height: '34px', flexShrink: 0 }}
                    onError={(e) => { e.currentTarget.src = '/avatar.png' }}
                  />
                  <div style={{ flex: 1, minWidth: 0, lineHeight: 1.25 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--dash-text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {currentUser?.name || 'Redaksi Hoom'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        letterSpacing: '0.4px',
                        textTransform: 'uppercase',
                        display: 'inline-block',
                        ...getRoleBadgeStyle(userRole)
                      }}>
                        {userRole}
                      </span>
                    </div>
                  </div>
                  <i className="fa fa-angle-up" style={{ color: 'var(--dash-text-muted)', fontSize: '13px', marginLeft: 'auto', flexShrink: 0 }}></i>
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

                <DropdownMenuItem href="/dashboard/posts" icon="fa-newspaper">
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
              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                className="dash-mobile-toggle-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
              >
                <i className={`fa ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>

              {/* Mobile Brand Title */}
              <div className="dash-mobile-brand">
                <span className="dash-mobile-brand-title">
                  {siteSettings.site_title || 'Dua Narasi'}
                </span>
              </div>

              <div className="dash-topbar-links">
                <Link
                  href="/"
                  target="_blank"
                  className="dash-topbar-link"
                >
                  <i className="fa fa-globe" style={{ marginRight: '6px', color: '#09090b' }}></i> Website Live
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
                  <i className="fa fa-edit" style={{ marginRight: '6px' }}></i> Tulis Berita
                </Link>
              </div>
            </div>

            {/* Right Nav */}
            <div className="dash-topbar-right">

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
                <i className={`fa ${themeMode === 'light' ? 'fa-sun' : 'fa-moon'}`} style={{ fontSize: '16px', color: themeMode === 'light' ? '#f59e0b' : '#38bdf8' }}></i>
              </button>

              {/* Unified Notification Center (Comments + Messages) */}
              <div style={{ position: 'relative' }} ref={notifRef}>
                <button
                  type="button"
                  onClick={handleOpenNotif}
                  className="dash-icon-btn"
                  title="Pusat Notifikasi (Komentar & Pesan Masuk)"
                  style={{ position: 'relative' }}
                  aria-label="Pusat Notifikasi"
                >
                  <i className="fa fa-bell" style={{ fontSize: '16px' }}></i>
                  {totalUnreadNotifCount > 0 && (
                    <span className="dash-badge-dot" style={{ background: '#da0105', color: '#fff', fontSize: '10px', fontWeight: 800 }}>
                      {totalUnreadNotifCount > 99 ? '99+' : totalUnreadNotifCount}
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
                      width: '380px',
                      maxWidth: '92vw',
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
                        {totalUnreadNotifCount > 0 ? (
                          <span style={{ fontSize: '11px', background: 'rgba(218, 1, 5, 0.12)', color: '#da0105', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                            {totalUnreadNotifCount} Baru
                          </span>
                        ) : (
                          <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                            Semua Dibaca
                          </span>
                        )}
                      </div>

                      {totalUnreadNotifCount > 0 && (
                        <button
                          type="button"
                          onClick={handleMarkAllAsRead}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#3b82f6',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          Tandai Semua Dibaca
                        </button>
                      )}
                    </div>

                    {/* Filter Tabs */}
                    <div
                      style={{
                        display: 'flex',
                        padding: '6px 10px',
                        background: 'var(--dash-muted-bg)',
                        borderBottom: '1px solid var(--dash-border)',
                        gap: '4px'
                      }}
                    >
                      {[
                        { id: 'all', label: `Semua (${allNotifications.length})` },
                        { id: 'unread', label: `Belum Dibaca (${totalUnreadNotifCount})`, color: '#da0105' },
                        { id: 'comments', label: `💬 (${formattedComments.length})` },
                        { id: 'messages', label: `✉️ (${formattedMessages.length})` }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setNotifFilter(tab.id)}
                          style={{
                            flex: 1,
                            padding: '5px 4px',
                            fontSize: '11px',
                            fontWeight: notifFilter === tab.id ? 700 : 500,
                            border: 'none',
                            borderRadius: '6px',
                            background: notifFilter === tab.id ? 'var(--dash-card-bg)' : 'transparent',
                            color: notifFilter === tab.id ? (tab.color || 'var(--dash-text-main)') : 'var(--dash-text-muted)',
                            boxShadow: notifFilter === tab.id ? 'var(--dash-shadow)' : 'none',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Notification Item List */}
                    <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                      {filteredNotifications.length === 0 ? (
                        <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--dash-text-muted)', fontSize: '13px' }}>
                          <i className="fa fa-bell-slash" style={{ fontSize: '24px', marginBottom: '8px', display: 'block', opacity: 0.5 }}></i>
                          Tidak ada notifikasi {notifFilter === 'unread' ? 'belum dibaca' : ''} saat ini
                        </div>
                      ) : (
                        filteredNotifications.map((item) => (
                          <Link
                            key={item.id}
                            href={item.link}
                            onClick={() => {
                              if (item.isUnread) {
                                if (item.type === 'message') markMessageAsRead(item.rawId)
                                if (item.type === 'comment') markCommentAsRead(item.rawId)
                              }
                              setNotifDropdownOpen(false)
                            }}
                            style={{
                              display: 'flex',
                              gap: '12px',
                              padding: '12px 16px',
                              borderBottom: '1px solid var(--dash-border)',
                              textDecoration: 'none',
                              color: 'inherit',
                              transition: 'background 0.15s ease',
                              background: item.isUnread
                                ? (item.type === 'comment' ? 'rgba(16, 185, 129, 0.06)' : 'rgba(218, 1, 5, 0.06)')
                                : 'transparent',
                              opacity: item.isUnread ? 1 : 0.75
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--dash-muted-bg)' }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = item.isUnread
                                ? (item.type === 'comment' ? 'rgba(16, 185, 129, 0.06)' : 'rgba(218, 1, 5, 0.06)')
                                : 'transparent'
                            }}
                          >
                            {/* Type Icon with Status Indicator */}
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
                                flexShrink: 0,
                                position: 'relative'
                              }}
                            >
                              <i className={`fa ${item.type === 'comment' ? 'fa-comment' : 'fa-envelope'}`}></i>
                              {item.isUnread && (
                                <span
                                  style={{
                                    position: 'absolute',
                                    top: '-2px',
                                    right: '-2px',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#da0105',
                                    border: '2px solid var(--dash-card-bg)'
                                  }}
                                />
                              )}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                                <strong style={{ fontSize: '13px', color: 'var(--dash-text-main)', fontWeight: item.isUnread ? 700 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {item.title}
                                </strong>
                                {item.isUnread ? (
                                  <span style={{ fontSize: '10px', background: item.type === 'comment' ? '#10b981' : '#da0105', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                    Baru
                                  </span>
                                ) : (
                                  <span style={{ fontSize: '10px', background: 'var(--dash-muted-bg)', color: 'var(--dash-text-muted)', padding: '1px 6px', borderRadius: '4px', fontWeight: 500 }}>
                                    <i className="fa fa-check" style={{ marginRight: '3px' }} /> Dibaca
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '11.5px', color: 'var(--dash-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }}>
                                {item.subtitle}
                              </div>
                              <div style={{ fontSize: '12px', color: 'var(--dash-text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: item.isUnread ? 0.95 : 0.7 }}>
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

                  <DropdownMenuItem href="/dashboard/posts" icon="fa-newspaper">
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
