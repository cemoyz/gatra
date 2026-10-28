const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Sedang mengosongkan seluruh artikel...')
  
  try {
    // 1. Hapus semua komentar terlebih dahulu agar tidak ada orphaned relations
    const commentsDeleted = await prisma.comment.deleteMany({})
    console.log(`💬 Berhasil menghapus ${commentsDeleted.count} komentar.`)

    // 2. Hapus seluruh data artikel di tabel posts
    const postsDeleted = await prisma.post.deleteMany({})
    console.log(`📰 Berhasil menghapus ${postsDeleted.count} artikel.`)

    console.log('✅ Semua artikel berhasil dikosongkan! Database sekarang bersih.')
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat mengosongkan artikel:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
