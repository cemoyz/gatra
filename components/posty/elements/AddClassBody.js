'use client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function AddClassBody() {
	const router = useRouter()
	const pathname = router?.pathname || '/'

	useEffect(() => {
		const bodyElement = document.querySelector('body')

		if (bodyElement) {
			// Remove all header classes
			bodyElement.classList.remove('header-1', 'header-2', 'header-3')

			// Mapping of pathnames to classes
			const classMapping = {
				'/': 'header-1',
				'/index-2': 'header-2',
				'/index-3': 'header-2',
				'/index-4': 'header-2',
				'/index-5': 'header-3',
				'/author-details': 'header-1',
				'/video-playlist-1': 'header-1',
				'/video-playlist-2': 'header-1',
				'/video-playlist-3': 'header-1',
				'/blog-default': 'header-1',
				'/blog-layout-1': 'header-1',
				'/blog-layout-2': 'header-1',
				'/blog-layout-3': 'header-1',
				'/blog-layout-4': 'header-1',
				'/single-post-1': 'header-1',
				'/single-post-2': 'header-1',
				'/single-post-3': 'header-1',
				'/about': 'header-1',
				'/team': 'header-1',
				'/team-single': 'header-1',
				'/error-page': 'header-1',
				'/contact': 'header-1'
			}

			// Add class based on pathname if exists in mapping
			const headerClass = classMapping[pathname]
			if (headerClass) {
				bodyElement.classList.add(headerClass)
			}
		}
	}, [pathname])

	return null
}
