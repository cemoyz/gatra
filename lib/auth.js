import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as cookieLib from 'cookie'
import prisma from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'hoom-magazine-super-secret-jwt-key-2026'
const COOKIE_NAME = 'hoom_auth_token'

export function hashPassword(password) {
  return bcrypt.hashSync(password, 10)
}

export function verifyPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}

function serializeCookie(name, val, options = {}) {
  // Check if cookie package v2 stringifySetCookie exists
  if (typeof cookieLib.stringifySetCookie === 'function') {
    return cookieLib.stringifySetCookie({
      name,
      value: val,
      ...options
    })
  }

  // Check if cookie package v0/v1 serialize exists
  if (typeof cookieLib.serialize === 'function') {
    return cookieLib.serialize(name, val, options)
  }

  // Fallback native RFC 6265 standard cookie serializer
  let str = `${name}=${encodeURIComponent(val)}`
  if (options.maxAge !== undefined) {
    str += `; Max-Age=${Math.floor(options.maxAge)}`
  }
  if (options.domain) str += `; Domain=${options.domain}`
  if (options.path) str += `; Path=${options.path}`
  if (options.expires) str += `; Expires=${options.expires.toUTCString()}`
  if (options.httpOnly) str += `; HttpOnly`
  if (options.secure) str += `; Secure`
  if (options.sameSite) {
    const sameSiteVal = typeof options.sameSite === 'string'
      ? options.sameSite.charAt(0).toUpperCase() + options.sameSite.slice(1).toLowerCase()
      : 'Lax'
    str += `; SameSite=${sameSiteVal}`
  }
  return str
}

function parseCookieHeader(cookieHeader) {
  if (!cookieHeader || typeof cookieHeader !== 'string') return {}

  if (typeof cookieLib.parseCookie === 'function') {
    return cookieLib.parseCookie(cookieHeader)
  }

  if (typeof cookieLib.parse === 'function') {
    return cookieLib.parse(cookieHeader)
  }

  // Fallback native parser
  const cookies = {}
  cookieHeader.split(';').forEach(pair => {
    const parts = pair.split('=')
    const key = parts[0]?.trim()
    const val = parts.slice(1).join('=').trim()
    if (key) {
      try {
        cookies[key] = decodeURIComponent(val)
      } catch {
        cookies[key] = val
      }
    }
  })
  return cookies
}

export function setAuthCookie(res, token) {
  const cookieHeader = serializeCookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  })
  res.setHeader('Set-Cookie', cookieHeader)
}

export function clearAuthCookie(res) {
  const cookieHeader = serializeCookie(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: -1,
    path: '/'
  })
  res.setHeader('Set-Cookie', cookieHeader)
}

export async function getUserFromRequest(req) {
  try {
    const cookies = parseCookieHeader(req.headers?.cookie || '')
    const token = cookies[COOKIE_NAME] || (req.headers?.authorization ? req.headers.authorization.replace('Bearer ', '') : null)

    if (!token) return null

    const decoded = verifyToken(token)
    if (!decoded || !decoded.userId) return null

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        createdAt: true
      }
    })

    return user
  } catch (error) {
    return null
  }
}
