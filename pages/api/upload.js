import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '32mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    const { image, name } = req.body

    if (!image) {
      return res.status(400).json({ success: false, message: 'Image data is required (base64 or URL)' })
    }

    // Determine extension and clean base64 data
    let mimeType = 'image/jpeg'
    let extension = 'jpg'
    let base64Payload = image

    if (image.startsWith('data:')) {
      const match = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
      if (match) {
        mimeType = match[1]
        extension = mimeType.split('/')[1] || 'jpg'
        if (extension === 'jpeg') extension = 'jpg'
        base64Payload = match[2]
      } else {
        base64Payload = image.split(',')[1] || image
      }
    }

    // Save directly to /public/uploads/ so ISP Internet Positif cannot block it
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const cleanName = (name || 'image')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .substring(0, 40)
    const fileName = `${cleanName}-${Date.now()}.${extension}`
    const filePath = path.join(uploadsDir, fileName)

    const buffer = Buffer.from(base64Payload, 'base64')
    fs.writeFileSync(filePath, buffer)

    const publicUrl = `/uploads/${fileName}`

    return res.status(200).json({
      success: true,
      url: publicUrl,
      display_url: publicUrl,
      fileName: fileName,
      message: 'Gambar berhasil diupload dan disimpan ke server'
    })

  } catch (error) {
    console.error('Upload Error:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while uploading image'
    })
  }
}
