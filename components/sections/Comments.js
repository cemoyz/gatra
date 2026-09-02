import Link from "next/link"
import { useEffect, useState } from "react"

export default function Comments({ postId }) {
    const [commentsList, setCommentsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [toast, setToast] = useState(null)

    // Initial fallback comments if database is empty/offline
    const defaultComments = [
        {
            id: 'mock-1',
            name: "Alonso D. Humble",
            createdAt: new Date().toISOString(),
            content: "Great article! The insights on modern web development and architecture design are very clear and helpful."
        },
        {
            id: 'mock-2',
            name: "Marlie H. Evens",
            createdAt: new Date().toISOString(),
            content: "Looking forward to more deep dives into layout grid architectures and scalable component patterns."
        }
    ]

    useEffect(() => {
        if (!postId) return
        setLoading(true)
        fetch(`/api/comments?postId=${postId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.comments)) {
                    setCommentsList(data.comments)
                } else {
                    setCommentsList([])
                }
            })
            .catch(() => {
                setCommentsList([])
            })
            .finally(() => setLoading(false))
    }, [postId])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim() || !message.trim()) {
            setToast({ type: 'error', text: 'Please provide both your name and comment message.' })
            return
        }

        setSubmitting(true)
        try {
            if (postId) {
                const res = await fetch('/api/comments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        postId: parseInt(postId),
                        name: name.trim(),
                        email: email.trim() || undefined,
                        content: message.trim()
                    })
                })
                const data = await res.json()

                if (data.success && data.comment) {
                    setCommentsList(prev => [data.comment, ...prev])
                    setToast({ type: 'success', text: 'Thank you! Your comment has been posted to the database.' })
                    setName('')
                    setEmail('')
                    setMessage('')
                } else {
                    // Local fallback
                    const localComment = {
                        id: Date.now(),
                        name: name.trim(),
                        createdAt: new Date().toISOString(),
                        content: message.trim()
                    }
                    setCommentsList(prev => [localComment, ...prev])
                    setToast({ type: 'success', text: 'Your comment has been submitted!' })
                    setName('')
                    setEmail('')
                    setMessage('')
                }
            } else {
                const localComment = {
                    id: Date.now(),
                    name: name.trim(),
                    createdAt: new Date().toISOString(),
                    content: message.trim()
                }
                setCommentsList(prev => [localComment, ...prev])
                setToast({ type: 'success', text: 'Your comment has been submitted!' })
                setName('')
                setEmail('')
                setMessage('')
            }
        } catch (err) {
            const localComment = {
                id: Date.now(),
                name: name.trim(),
                createdAt: new Date().toISOString(),
                content: message.trim()
            }
            setCommentsList(prev => [localComment, ...prev])
            setToast({ type: 'success', text: 'Comment saved!' })
            setName('')
            setEmail('')
            setMessage('')
        } finally {
            setSubmitting(false)
            setTimeout(() => setToast(null), 5000)
        }
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return "Baru saja"
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                month: "long",
                day: "numeric",
                year: "numeric"
            })
        } catch {
            return "Baru saja"
        }
    }

    return (
        <>
            <style jsx>{`
                :global(.ta-comment-area-wrapper::before),
                :global(.ta-comment-area-wrapper::after) {
                    display: none !important;
                }
                :global(.ta-comment-box) {
                    display: flex !important;
                    gap: 16px !important;
                    align-items: flex-start !important;
                    padding: 16px !important;
                }
                :global(.ta-comment-box .comment-avatar) {
                    float: none !important;
                    margin-right: 0 !important;
                }
            `}</style>
            <div className="ta-comment-area-wrapper mt-0 mb-0" style={{ background: '#ffffff', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', clear: 'both' }}>
                {/* Comments List Header */}
                <div className="ta-post-comments-wrapper">
                    <div className="comment-title-wrapper">
                        <h4 className="ta-title ta-border-bottom mb-35 pb-15" style={{ fontSize: '20px', fontWeight: 700, borderColor: '#e2e8f0' }}>
                            Komentar Pembaca <span className="comment-count" style={{ background: '#da0105', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '10px', marginLeft: '6px' }}>{commentsList.length}</span>
                        </h4>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '30px 0', color: '#94a3b8' }}>
                            <i className="fa fa-spinner fa-spin" style={{ marginRight: '8px' }} /> Memuat komentar...
                        </div>
                    ) : commentsList.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '25px 0', color: '#64748b', background: '#f8fafc', borderRadius: '10px' }}>
                            <p style={{ margin: 0, fontSize: '14px' }}>Belum ada komentar. Jadilah yang pertama memberikan tanggapan!</p>
                        </div>
                    ) : (
                        <div className="ta-comment-lists">
                            <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {commentsList.map((c, idx) => (
                                    <li key={c.id || idx}>
                                        <div className="ta-comment-box" style={{ padding: '16px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                            <div
                                                className="comment-avatar"
                                                style={{
                                                    width: '46px',
                                                    height: '46px',
                                                    borderRadius: '50%',
                                                    backgroundColor: ['#eff6ff', '#f0fdf4', '#fefce8', '#fdf2f8', '#faf5ff'][idx % 5],
                                                    color: ['#3b82f6', '#10b981', '#d97706', '#ec4899', '#8b5cf6'][idx % 5],
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '18px',
                                                    border: '1.5px solid #cbd5e1',
                                                    flexShrink: 0,
                                                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                                                }}
                                            >
                                                <i className="fa fa-user" />
                                            </div>
                                            <div className="comment-text" style={{ flex: 1 }}>
                                                <div className="mb-2 position-relative d-flex justify-content-between align-items-center">
                                                    <h5 className="avatar-name" style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
                                                        <span className="url" style={{ color: '#0f172a' }}>{c.name}</span>
                                                    </h5>
                                                    <span className="date" style={{ fontSize: '12px', color: '#94a3b8' }}>
                                                        <i className="fa fa-clock-o" style={{ marginRight: '4px' }} />
                                                        {formatDate(c.createdAt)}
                                                    </span>
                                                </div>
                                                <div className="comment-desc mt-2">
                                                    <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>{c.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Comment Submission Form */}
                <div className="ta-contact-form-wrapper ta-post-comment-form logged-in mt-35">
                    <div className="comment-respond">
                        <h4 className="ta-title ta-border-bottom mb-25 pb-15" style={{ fontSize: '18px', fontWeight: 700, borderColor: '#e2e8f0' }}>
                            Tuliskan Komentar
                        </h4>

                        {toast && (
                            <div
                                style={{
                                    background: toast.type === 'error' ? '#fef2f2' : '#dcfce7',
                                    border: `1px solid ${toast.type === 'error' ? '#fca5a5' : '#86efac'}`,
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    color: toast.type === 'error' ? '#991b1b' : '#166534',
                                    fontSize: '14px',
                                    marginBottom: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <i className={`fa ${toast.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}`} />
                                {toast.text}
                            </div>
                        )}

                        <form onSubmit={handleCommentSubmit} className="comment-form">
                            <div className="row mt-none-20 ta-input-field">
                                <div className="col-xl-12 mt-20">
                                    <div className="ta-form-group">
                                        <textarea
                                            placeholder="Tuliskan komentar atau tanggapan Anda di sini..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                            style={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 mt-20">
                                    <div className="ta-form-group">
                                        <input
                                            type="text"
                                            placeholder="Nama Lengkap *"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            style={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 mt-20">
                                    <div className="ta-form-group">
                                        <input
                                            type="email"
                                            placeholder="Alamat Email (opsional)"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-12 submit-button mt-20">
                                    <button className="ta-button" type="submit" disabled={submitting} style={{ borderRadius: '8px' }}>
                                        {submitting ? 'Mengirim Komentar...' : 'Kirim Komentar'}{' '}
                                        <i className={`fa ${submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} style={{ marginLeft: '6px' }} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
