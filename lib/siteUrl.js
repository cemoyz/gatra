export function normalizeSiteUrl(value, fallback = 'http://localhost:3000') {
  const siteUrl = String(value || fallback).trim().replace(/\/+$/, '')
  if (/^https?:\/\//i.test(siteUrl)) return siteUrl

  const isLocalHost = /^(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/i.test(siteUrl)
  return `${isLocalHost ? 'http' : 'https'}://${siteUrl}`
}