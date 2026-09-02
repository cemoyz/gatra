import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
export default function BlogFourColumn() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog Four Column">
                <div className="ta-blog-area pt-100 pb-100">
                    <div className="container">
                        <div className="row mt-none-30">
                            <BlogPost showItem={12} showStart={12} showEnd={31} style={2} formatIcon showPagination col="col-xl-3 col-lg-6 col-md-6 col-sm-6 mt-30" />
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}