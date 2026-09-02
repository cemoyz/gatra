import prisma from '@/lib/prisma'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { headerOnly } = req.query

      // Fetch with Prisma include post count
      let categories = []
      try {
        categories = await prisma.category.findMany({
          include: {
            _count: {
              select: { posts: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        })
      } catch (err) {
        console.error('Standard findMany error, fallback to raw:', err)
      }

      // Also get showInHeader mapping directly from db if needed
      let rawHeaderMap = {}
      try {
        const rawRows = await prisma.$queryRawUnsafe('SELECT id, "showInHeader" FROM categories')
        if (Array.isArray(rawRows)) {
          rawRows.forEach(r => {
            rawHeaderMap[r.id] = r.showInHeader !== false
          })
        }
      } catch (e) {
        console.error('Raw query error:', e)
      }

      let formatted = categories.map(cat => ({
        ...cat,
        showInHeader: cat.showInHeader !== undefined ? cat.showInHeader : (rawHeaderMap[cat.id] !== undefined ? rawHeaderMap[cat.id] : true),
        postsCount: cat._count?.posts || 0
      }))

      if (headerOnly === 'true') {
        formatted = formatted.filter(c => c.showInHeader !== false)
      }

      return res.status(200).json({ success: true, categories: formatted })
    } catch (error) {
      console.error('Error fetching categories:', error)
      return res.status(500).json({ success: false, message: error.message, categories: [] })
    }
  }

  if (req.method === 'POST') {
    const authUser = await requireApiAuth(req, res, [ROLES.ADMIN, ROLES.EDITOR])
    if (!authUser) return

    try {
      const { name, slug, description, showInHeader } = req.body

      if (!name) {
        return res.status(400).json({ success: false, message: 'Nama kategori wajib diisi' })
      }

      const generatedSlug = slug || name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const isShowInHeader = showInHeader !== undefined ? Boolean(showInHeader) : true

      let category
      try {
        category = await prisma.category.create({
          data: {
            name,
            slug: generatedSlug,
            description: description || '',
            showInHeader: isShowInHeader
          }
        })
      } catch (prismaErr) {
        // Fallback in case generated client doesn't yet recognize showInHeader field
        category = await prisma.category.create({
          data: {
            name,
            slug: generatedSlug,
            description: description || ''
          }
        })
        await prisma.$executeRawUnsafe(
          'UPDATE categories SET "showInHeader" = $1 WHERE id = $2',
          isShowInHeader,
          category.id
        )
        category.showInHeader = isShowInHeader
      }

      return res.status(201).json({ success: true, category })
    } catch (error) {
      console.error('Error creating category:', error)
      return res.status(500).json({ success: false, message: error.message || 'Gagal membuat kategori' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
