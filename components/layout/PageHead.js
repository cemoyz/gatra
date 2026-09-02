import Head from 'next/head'

const PageHead = ({ headTitle }) => {
    return (
        <>
        
            <Head>
                <title>
                    {headTitle ? headTitle : "Hoom - News & Magazine Nextjs Template"}
                </title>
            </Head>
        </>
    )
}

export default PageHead