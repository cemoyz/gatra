import BlogDetails, { getServerSideProps as blogGetServerSideProps } from "../blog/[id]"

export default BlogDetails

export async function getServerSideProps(context) {
    const { slug } = context.params
    // Extract the last segment (e.g. from /read/2026/11/09/123/judul-berita -> judul-berita)
    const targetIdentifier = Array.isArray(slug) ? slug[slug.length - 1] : slug
    context.params.id = targetIdentifier
    return blogGetServerSideProps(context)
}

