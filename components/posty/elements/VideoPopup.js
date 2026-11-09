'use client'
import { useState } from 'react'
import ModalVideo from 'react-modal-video'

export default function VideoPopup({ videoId, style }) {
	const [isOpen, setOpen] = useState(false)
	return (
		<>
			{style === 1 &&
				<div className="video-btn">
					<a className="video-popup" onClick={() => setOpen(true)}><i className="las la-play" />
					</a>
				</div>
			}
			{style === 2 &&
				<a className="video-popup thumb-video" onClick={() => setOpen(true)}><i className="las la-play" />
				</a>
			}
			<ModalVideo
				channel='youtube'
				autoplay
				isOpen={isOpen}
				videoId={"QiqQoqtnHrk"}
				onClose={() => setOpen(false)}
				allowFullScreen={true}
			/>
		</>
	)
}