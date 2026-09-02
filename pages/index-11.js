import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
export default function Home11() {

    return (
        <>
            <Layout headerStyle={4} footerStyle={11}>
                <div className="ta-blog-area pt-70 pb-70">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className="ta-blog-wrapper mt-none-60">
                                    <BlogPost showItem={4} showStart={57} showEnd={61} style={10} formatIcon showPagination />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}