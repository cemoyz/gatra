/**
 * Role Definitions & Permission Maps (Client & Server Isomorphic)
 */
export const ROLES = {
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
  AUTHOR: 'AUTHOR',
  SUBSCRIBER: 'SUBSCRIBER'
}

/**
 * Allowed dashboard routes for each role
 */
export const ROUTE_PERMISSIONS = {
  ADMIN: ['*'],
  EDITOR: [
    '/dashboard',
    '/dashboard/analytics',
    '/dashboard/posts',
    '/dashboard/posts/new',
    '/dashboard/posts/edit',
    '/dashboard/categories',
    '/dashboard/comments',
    '/dashboard/messages',
    '/dashboard/authors',
    '/dashboard/subscribers'
  ],
  AUTHOR: [
    '/dashboard',
    '/dashboard/posts',
    '/dashboard/posts/new',
    '/dashboard/posts/edit',
    '/dashboard/comments',
    '/dashboard/authors'
  ],
  SUBSCRIBER: []
}

/**
 * Check if a role can access a specific route
 */
export function canAccessRoute(role, pathname) {
  if (!role) return false
  const allowed = ROUTE_PERMISSIONS[role] || []
  if (allowed.includes('*')) return true

  return allowed.some(route => pathname === route || pathname.startsWith(`${route}/`))
}

/**
 * Check if a user can edit/delete a specific post
 */
export function canManagePost(user, post) {
  if (!user) return false
  if (user.role === ROLES.ADMIN || user.role === ROLES.EDITOR) return true
  if (user.role === ROLES.AUTHOR) {
    if (!post) return false
    const authorId = post.authorId || post.author?.id
    return authorId === user.id
  }
  return false
}
