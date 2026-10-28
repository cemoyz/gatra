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

    // Clean base64 data if it contains the data:image/...;base64, prefix
    let base64Payload = image
    if (typeof image === 'string' && image.startsWith('data:')) {
      const commaIndex = image.indexOf(',')
      if (commaIndex !== -1) {
        base64Payload = image.slice(commaIndex + 1)
      }
    }

    const apiKey =
      process.env.IMGBB_API_KEY ||
      process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
      '6f594898aecb2c268834c7aaf299548f'

    const formData = new FormData()
    formData.append('image', base64Payload)

    if (name) {
      const cleanName = (name || 'image')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .substring(0, 40)
      formData.append('name', cleanName)
    }

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data && data.success && data.data) {
      return res.status(200).json({
        success: true,
        url: data.data.url,
        display_url: data.data.display_url || data.data.url,
        thumb_url: data.data.thumb?.url || data.data.url,
        delete_url: data.data.delete_url,
        fileName: data.data.image?.filename || name || 'image',
        message: 'Gambar berhasil diunggah ke ImgBB'
      })
    } else {
      const errorMsg = data?.error?.message || 'Gagal mengunggah gambar ke ImgBB'
      console.error('ImgBB API Error:', data)
      return res.status(data?.status_code || 400).json({
        success: false,
        message: errorMsg
      })
    }
  } catch (error) {
    console.error('Upload Error:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while uploading image to ImgBB'
    })
  }
}

