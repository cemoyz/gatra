import { useState } from 'react'
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.css'

function extractYouTubeId(urlOrId) {
    if (!urlOrId) return '4xe72U7mXNg'
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = urlOrId.match(regExp)
    if (match && match[2].length === 11) {
        return match[2]
    }
    return urlOrId.trim()
}

export default function VideoPopup({ style, videoId = "4xe72U7mXNg" }) {
    const [isOpen, setOpen] = useState(false)
    const cleanId = extractYouTubeId(videoId)

    return (
        <>
            {style === 1 &&
                <a onClick={() => setOpen(true)} className="ta-round-btn ta-video-btn ta-video-btn__mid position-absolute top-50 start-50 translate-middle mt-none-15" style={{ cursor: 'pointer' }}>
                    <i className="fas fa-play" />
                </a>
            }
            {style === 2 &&
                <a onClick={() => setOpen(true)} className="ta-round-btn ta-video-btn mx-auto" style={{ cursor: 'pointer' }}><i className="fas fa-play" /></a>
            }

            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={cleanId} onClose={() => setOpen(false)} className="abc"/>
        </>
    )
}
