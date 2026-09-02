import { useState } from 'react'
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.css'

export default function VideoPopup({ style }) {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            {style === 1 &&
                <a onClick={() => setOpen(true)} className="ta-round-btn ta-video-btn ta-video-btn__mid position-absolute top-50 start-50 translate-middle mt-none-15">
                    <i className="fas fa-play" />
                </a>
            }
            {style === 2 &&
                <a onClick={() => setOpen(true)} className="ta-round-btn ta-video-btn mx-auto"><i className="fas fa-play" /></a>
            }

            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="4xe72U7mXNg" onClose={() => setOpen(false)} className="abc"/>
        </>
    )
}