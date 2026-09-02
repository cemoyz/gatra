import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
export default function BlogFiveColumn() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog Five Column ">
                <div className="ta-blog-area pt-100 pb-100">
                    <div className="container-fluid">
                        <div className="row ta-column-5 mt-none-30">
                            <BlogPost showItem={15} showStart={12} showEnd={31} style={2} showPagination col="col-xl-2 col-lg-4 col-md-6 col-sm-6 mt-30" />
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}