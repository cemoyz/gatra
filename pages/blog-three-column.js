import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
export default function BlogThreeColumn() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog Three Column">
                <div className="ta-blog-area pt-100 pb-100">
                    <div className="container">
                        <div className="row ta-column-gap-30 mt-none-30">
                            <BlogPost showItem={9} showStart={0} showEnd={12} style={1} formatIcon showPagination col="col-xl-4 col-lg-6 mt-30" />
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}