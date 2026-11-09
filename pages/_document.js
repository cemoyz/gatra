import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="id" data-scroll-behavior="smooth">
            <Head>
                <meta charSet="utf-8" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <meta name="google-site-verification" content="jb6CVX7m65ir5XZstdFUQNsvXI3dcHOa7UFcYPMNeF8" />
                {/* Favicon & Web App Manifest for Google Indexing & Browsers */}
                <link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png" />
                <link rel="icon" href="/favicon-512.png" sizes="512x512" type="image/png" />
                <link rel="apple-touch-icon" href="/favicon-192.png" sizes="192x192" />
                <link rel="shortcut icon" href="/favicon-192.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#da0105" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=catamaran:300,400,500,600,700,800,900" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
