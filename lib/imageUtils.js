export function getImageUrl(img, defaultImage = "blog-2-1.webp") {
  if (!img || typeof img !== 'string') {
    return `/assets/img/blog/${defaultImage}`
  }

  const trimmed = img.trim()
  if (!trimmed) {
    return `/assets/img/blog/${defaultImage}`
  }

  // If full external URL or absolute path
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed
  }

  // Check if it's a valid local image filename with extension
  const hasExtension = /\.(webp|jpg|jpeg|png|gif|svg|avif)$/i.test(trimmed)
  if (hasExtension) {
    return `/assets/img/blog/${trimmed}`
  }

  // Fallback for seed names or invalid strings (e.g. "Dehn", "Silvain")
  return `/assets/img/blog/${defaultImage}`
}

export default getImageUrl
