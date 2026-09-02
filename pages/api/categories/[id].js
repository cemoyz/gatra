import prisma from '@/lib/prisma'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'

export default async function handler(req, res) {
  const authUser = await requireApiAuth(req, res, [ROLES.ADMIN, ROLES.EDITOR])
  if (!authUser) return

  const { id } = req.query
  const catId = parseInt(id)

  if (isNaN(catId)) {
    return res.status(400).json({ success: false, message: 'Invalid category ID' })
  }

  if (req.method === 'PUT') {
    try {
      const { name, slug, description, showInHeader } = req.body
      const updateData = {}
      if (name !== undefined) updateData.name = name
      if (slug !== undefined) updateData.slug = slug
      if (description !== undefined) updateData.description = description

      let updated
      try {
        if (showInHeader !== undefined) {
          updateData.showInHeader = Boolean(showInHeader)
        }
        updated = await prisma.category.update({
          where: { id: catId },
          data: updateData
        })
      } catch (prismaErr) {
        delete updateData.showInHeader
        if (Object.keys(updateData).length > 0) {
          updated = await prisma.category.update({
            where: { id: catId },
            data: updateData
          })
        } else {
          updated = await prisma.category.findUnique({ where: { id: catId } })
        }

        if (showInHeader !== undefined) {
          await prisma.$executeRawUnsafe(
            'UPDATE categories SET "showInHeader" = $1 WHERE id = $2',
            Boolean(showInHeader),
            catId
          )
          updated = { ...updated, showInHeader: Boolean(showInHeader) }
        }
      }

      return res.status(200).json({ success: true, category: updated })
    } catch (error) {
      console.error('Error updating category:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to update category' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.category.delete({
        where: { id: catId }
      })
      return res.status(200).json({ success: true, message: 'Category deleted successfully' })
    } catch (error) {
      console.error('Error deleting category:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to delete category' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
