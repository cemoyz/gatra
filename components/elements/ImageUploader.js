import { useState, useRef } from 'react'
import { getImageUrl } from '@/lib/imageUtils'

export default function ImageUploader({
  value = '',
  onChange,
  label = 'Cover Image',
  presetImages = [
    'blog-2-1.webp', 'blog-2-2.webp', 'blog-2-3.webp', 'blog-2-4.webp',
    'blog-2-5.webp', 'blog-2-6.webp', 'blog-2-7.webp', 'blog-2-8.webp'
  ],
  presetFolder = 'blog',
  maxPreviewHeight = 120
}) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const fileInputRef = useRef(null)

  const processImageUpload = async (file) => {
    setUploading(true)
    setError(null)
    setSuccessMsg('')

    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (err) => reject(err)
      })

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Data,
          name: file.name.replace(/\.[^/.]+$/, '')
        })
      })

      const data = await res.json()
      if (data.success && data.url) {
        onChange(data.url)
        setSuccessMsg('Gambar berhasil diunggah ke ImgBB dan langsung aktif!')
        setTimeout(() => setSuccessMsg(''), 4000)
      } else {
        throw new Error(data.message || 'Gagal memproses upload gambar.')
      }
    } catch (err) {
      console.error('Upload Error:', err)
      setError(err.message || 'Gagal mengunggah gambar.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      processImageUpload(file)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer?.files?.[0]
    if (file && file.type.startsWith('image/')) {
      processImageUpload(file)
    } else {
      setError('Harap masukkan file gambar yang valid (JPG, PNG, GIF, WEBP).')
    }
  }

  const handlePaste = (e) => {
    const items = e.clipboardData?.items
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile()
          if (file) {
            processImageUpload(file)
            break
          }
        }
      }
    }
  }

  const previewSrc = value ? getImageUrl(value) : ''

  return (
    <div className="dash-image-uploader-wrapper" onPaste={handlePaste}>
      {label && <label className="dash-form-label">{label}</label>}

      {/* Image Preview Box (Centered & Natural Aspect Ratio) */}
      {previewSrc && (
        <div className="preview-container mb-3">
          <div className="preview-box position-relative" style={{ maxHeight: `${maxPreviewHeight}px` }}>
            <img
              src={previewSrc}
              alt="Preview"
              className="preview-img"
              style={{ maxHeight: `${maxPreviewHeight - 16}px` }}
            />
          </div>
        </div>
      )}

      {/* Dropzone Area */}
      <div
        className={`dropzone-box ${dragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div className="dropzone-content">
          {uploading ? (
            <div className="uploading-state">
              <i className="fa fa-spinner fa-spin fa-2x text-primary mb-2"></i>
              <p className="mb-0 text-white font-weight-bold">Mengunggah Gambar ke ImgBB...</p>
              <small className="text-muted">Sedang memproses upload...</small>
            </div>
          ) : (
            <>
              <div className="dropzone-icon">
                <i className="fa fa-cloud-upload"></i>
              </div>
              <div className="dropzone-text">
                <p className="main-prompt mb-1">
                  <strong>Klik untuk upload ke ImgBB</strong> atau tarik & lepas file gambar
                </p>
                <small className="sub-prompt">
                  Mendukung PNG, JPG, GIF, WEBP (Bisa paste <kbd>Ctrl + V</kbd>)
                </small>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="alert alert-danger mt-2 py-2 px-3 d-flex align-items-center" style={{ fontSize: '13px', borderRadius: '6px' }}>
          <i className="fa fa-exclamation-circle mr-2" style={{ marginRight: '8px' }}></i>
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="alert alert-success mt-2 py-2 px-3 d-flex align-items-center" style={{ fontSize: '13px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <i className="fa fa-check-circle mr-2" style={{ marginRight: '8px' }}></i>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Manual URL Input */}
      <div className="mt-3">
        <div className="dash-form-group mb-2">
          <label className="dash-form-label" style={{ fontSize: '12px', color: '#94a3b8' }}>
            Path / URL Gambar
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="dash-input"
              style={{ fontSize: '13px' }}
              placeholder="https://i.ibb.co/... atau URL gambar"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {value && (
              <button
                type="button"
                className="dash-btn dash-btn-outline"
                style={{ padding: '0 12px', fontSize: '12px' }}
                onClick={() => onChange('')}
                title="Hapus gambar"
              >
                <i className="fa fa-trash"></i>
              </button>
            )}
          </div>
        </div>

        {/* Preset Selector */}
        {presetImages && presetImages.length > 0 && (
          <div className="preset-selector mt-3">
            <label className="dash-form-label" style={{ fontSize: '12px', color: 'var(--dash-text-muted, #94a3b8)' }}>
              Atau Pilih Preset Gambar Tema:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '8px' }}>
              {presetImages.map((img, idx) => {
                const fullSrc = (img.startsWith('/') || img.startsWith('http://') || img.startsWith('https://'))
                  ? img
                  : `/assets/img/${presetFolder}/${img}`
                const displaySrc = getImageUrl(fullSrc)
                const isSelected = value === fullSrc || value === img
                return (
                  <div
                    key={`${img}-${idx}`}
                    onClick={() => onChange(fullSrc)}
                    style={{
                      height: '46px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isSelected ? '2px solid #3b82f6' : '1px solid var(--dash-border, #e2e8f0)',
                      boxShadow: isSelected ? '0 0 0 2px rgba(59, 130, 246, 0.25)' : 'none',
                      opacity: isSelected ? 1 : 0.8,
                      transition: 'all 0.2s ease',
                      background: 'var(--dash-muted-bg, #f1f5f9)'
                    }}
                    title={img}
                  >
                    <img
                      src={displaySrc}
                      alt={img}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.style.display = 'none'
                        }
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .dash-image-uploader-wrapper {
          width: 100%;
        }

        .preview-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .preview-box {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          width: auto;
          min-width: 160px;
          padding: 8px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--dash-border, #e2e8f0);
          background: var(--dash-muted-bg, #f1f5f9);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .preview-img {
          width: auto;
          height: auto;
          max-width: 100%;
          object-fit: contain;
          display: block;
          border-radius: 6px;
        }

        .dropzone-box {
          border: 2px dashed var(--dash-border, #cbd5e1);
          border-radius: 10px;
          padding: 22px 16px;
          text-align: center;
          cursor: pointer;
          background: var(--dash-muted-bg, #f8fafc);
          transition: all 0.2s ease;
        }

        .dropzone-box:hover, .dropzone-box.active {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.05);
        }

        .dropzone-box.uploading {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .dropzone-icon {
          font-size: 28px;
          color: #3b82f6;
          margin-bottom: 8px;
        }

        .main-prompt {
          font-size: 13px;
          color: var(--dash-text-main, #1e293b);
        }

        .sub-prompt {
          font-size: 11.5px;
          color: var(--dash-text-muted, #64748b);
        }

        kbd {
          background: var(--dash-card-bg, #ffffff);
          color: var(--dash-text-main, #334155);
          border: 1px solid var(--dash-border, #cbd5e1);
          border-radius: 4px;
          padding: 2px 5px;
          font-size: 10.5px;
          font-family: inherit;
        }
      `}</style>
    </div>
  )
}
