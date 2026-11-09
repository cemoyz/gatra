import PostyLayout from "@/components/posty/layout/Layout"
import PageHead from "./PageHead"

export default function Layout({
    headerStyle = 1,
    footerStyle = 1,
    headTitle,
    breadcrumbTitle,
    children,
    settings = {}
}) {
    return (
        <>
            {headTitle && <PageHead headTitle={headTitle} settings={settings} />}
            <PostyLayout
                headerStyle={headerStyle}
                footerStyle={footerStyle}
                breadcrumbTitle={breadcrumbTitle}
                settings={settings}
            >
                {children}
            </PostyLayout>
        </>
    )
}
