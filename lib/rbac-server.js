import { getUserFromRequest } from './auth'
import { ROLES, canManagePost } from './rbac'

export async function requireApiAuth(req, res, allowedRoles = []) {
  const user = await getUserFromRequest(req)

  if (!user) {
    res.status(401).json({ success: false, message: 'Authentication required. Please log in.' })
    return null
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    res.status(403).json({
      success: false,
      message: `Access denied. Role '${user.role}' is not authorized for this action.`
    })
    return null
  }

  return user
}

export { ROLES, canManagePost }
