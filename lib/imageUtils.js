export function getImageUrl(img, defaultImage = "blog-2-1.webp") {
  const fallback = defaultImage.startsWith('/') || defaultImage.startsWith('http')
    ? defaultImage
    : `/assets/img/blog/${defaultImage}`

  if (!img || typeof img !== 'string') {
    return fallback
  }

  const trimmed = img.trim()
  if (!trimmed) {
    return fallback
  }

  // If full external URL, data URI, or absolute path starting with /
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed
  }

  // If path starts with uploads/ or assets/ (relative without leading slash)
  if (trimmed.startsWith('uploads/') || trimmed.startsWith('assets/')) {
    return `/${trimmed}`
  }

  // Check if it's a valid local image filename with extension
  const hasExtension = /\.(webp|jpg|jpeg|png|gif|svg|avif)$/i.test(trimmed)
  if (hasExtension) {
    return `/assets/img/blog/${trimmed}`
  }

  // Fallback for seed names or invalid strings (e.g. "Dehn", "Silvain")
  return fallback
}

export default getImageUrl
