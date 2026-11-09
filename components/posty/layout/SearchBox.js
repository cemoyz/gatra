import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchBox({ isSearch, handleSearch }) {
	const router = useRouter()
	const [query, setQuery] = useState('')

	const onSubmit = (e) => {
		e.preventDefault()
		if (query.trim()) {
			handleSearch()
			router.push(`/blog-filter-search?search=${encodeURIComponent(query.trim())}`)
		}
	}

	return (
		<>
			<div id="popup-search-box">
				<div className="box-inner-wrap d-flex align-items-center">
					<form id="form" onSubmit={onSubmit} role="search">
						<input
							id="popup-search"
							type="text"
							name="s"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Ketik kata kunci pencarian berita..."
						/>
						<button id="popup-search-button" type="submit" name="submit" aria-label="Search">
							<i className="las la-search" />
						</button>
					</form>
					<div className="search-close" onClick={handleSearch}><i className="las la-times" /></div>
				</div>
			</div>
		</>
	)
}
