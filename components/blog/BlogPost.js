import { useEffect, useState, Fragment } from "react"
import allData from "../../util/blog.json"
import BlogCard1 from "./BlogCard1"
import BlogCard2 from "./BlogCard2"
import BlogCard3 from "./BlogCard3"
import BlogCard4 from "./BlogCard4"
import BlogCard5 from "./BlogCard5"
import BlogCard6 from "./BlogCard6"
import BlogCard7 from "./BlogCard7"
import BlogCard8 from "./BlogCard8"
import BlogCard9 from "./BlogCard9"
import BlogCard10 from "./BlogCard10"
import BlogCard11 from "./BlogCard11"
import BlogCard12 from "./BlogCard12"
import Pagination from "./Pagination"

export default function BlogPost({
    style,
    showPagination,
    desc,
    col,
    showItem = 6,
    video,
    formatIcon,
    latest,
    showStart = 0,
    showEnd = 12,
    postsData,
    category,
    search,
    postType,
    sortBy,
    featured,
    tag,
    ids
}) {
    // Initial fallback data
    const initialFallback = allData.slice(showStart, showEnd)
    const [data, setData] = useState(postsData || initialFallback)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState([])
    const limit = showItem || 6
    const paginationItem = 4
    const [pages, setPages] = useState(Math.ceil(data.length / limit) || 1)

    // Fetch dynamic posts from API if no explicit postsData passed
    useEffect(() => {
        if (postsData) {
            setData(postsData)
            return
        }

        const params = new URLSearchParams()
        params.append('status', 'PUBLISHED')
        params.append('limit', '50')
        if (ids) params.append('ids', String(ids))
        if (category && category !== 'all') params.append('category', category)
        if (search) params.append('search', search)
        if (postType && postType !== 'all') params.append('postType', postType)
        if (sortBy) params.append('sortBy', sortBy)
        if (featured) params.append('featured', String(featured))
        if (tag) params.append('tag', tag)

        fetch(`/api/posts?${params.toString()}`)
            .then(res => res.json())
            .then(resData => {
                if (resData.success && resData.posts && resData.posts.length > 0) {
                    // If showStart/showEnd specified and not filtering, slice
                    let finalPosts = resData.posts
                    if (!category && !search && !postType && !sortBy && !tag && (showStart > 0 || showEnd < 50)) {
                        finalPosts = resData.posts.slice(showStart, showEnd)
                        if (finalPosts.length === 0) finalPosts = resData.posts
                    }
                    setData(finalPosts)
                }
            })
            .catch(() => {
                // Fallback to static json data on error
                setData(initialFallback)
            })
    }, [postsData, category, search, postType, sortBy, featured, tag, showStart, showEnd])

    useEffect(() => {
        const totalPages = Math.ceil(data.length / limit) || 1
        setPages(totalPages)
        const arr = new Array(totalPages).fill().map((_, idx) => idx + 1)
        setPagination(arr)
    }, [data, limit])

    const startIndex = (currentPage - 1) * limit
    const endIndex = startIndex + limit
    const getPaginatedProducts = data.slice(startIndex, endIndex)

    const start = Math.floor((currentPage - 1) / paginationItem) * paginationItem
    const end = start + paginationItem
    const getPaginationGroup = pagination.slice(start, end)

    const next = () => {
        if (currentPage < pages) setCurrentPage((page) => page + 1)
    }

    const prev = () => {
        if (currentPage > 1) setCurrentPage((page) => page - 1)
    }

    const handleActive = (item) => {
        setCurrentPage(item)
    }

    return (
        <>
            {getPaginatedProducts.length === 0 && (
                <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b', width: '100%' }}>
                    <h4>No Articles Found</h4>
                    <p>No posts match the current filter criteria.</p>
                </div>
            )}

            {getPaginatedProducts.map((item, i) => (
                <Fragment key={item.id || i}>
                    {!style && <BlogCard1 desc={desc} col={col} item={item} video={video} />}
                    {style === 1 && <BlogCard1 desc={desc} col={col} item={item} video={video} formatIcon={formatIcon} />}
                    {style === 2 && <BlogCard2 desc={desc} col={col} item={item} />}
                    {style === 3 && <BlogCard3 desc={desc} col={col} item={item} />}
                    {style === 4 && <BlogCard4 desc={desc} col={col} item={item} video={video} formatIcon={formatIcon} />}
                    {style === 5 && <BlogCard5 desc={desc} col={col} item={item} />}
                    {style === 6 && <BlogCard6 desc={desc} col={col} item={item} latest={latest} />}
                    {style === 7 && <BlogCard7 desc={desc} col={col} item={item} />}
                    {style === 8 && <BlogCard8 desc={desc} col={col} item={item} />}
                    {style === 9 && <BlogCard9 desc={desc} col={col} item={item} />}
                    {style === 10 && <BlogCard10 desc={desc} col={col} item={item} />}
                    {style === 11 && <BlogCard11 desc={desc} col={col} item={item} />}
                    {style === 12 && <BlogCard12 desc={desc} col={col} item={item} />}
                </Fragment>
            ))}

            {showPagination && pages > 1 && (
                <Pagination
                    getPaginationGroup={getPaginationGroup}
                    currentPage={currentPage}
                    pages={pages}
                    next={next}
                    prev={prev}
                    handleActive={handleActive}
                />
            )}
        </>
    )
}