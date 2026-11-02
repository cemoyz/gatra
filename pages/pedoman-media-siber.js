import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"
import prisma from "@/lib/prisma"

export default function PedomanMediaSiber({ initialSettings = {} }) {
    const [settings, setSettings] = useState(initialSettings)

    useEffect(() => {
        if (!initialSettings || Object.keys(initialSettings).length === 0) {
            fetch('/api/settings')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.settings) {
                        setSettings(data.settings)
                    }
                })
                .catch(console.error)
        }
    }, [initialSettings])

    const siteName = settings.site_title || "Dua Narasi"
    const contactEmail = settings.contact_email_1 || "redaksi@duanarasi.com"

    return (
        <Layout
            headerStyle={1}
            footerStyle={1}
            breadcrumbTitle="Pedoman Pemberitaan Media Siber"
            settings={settings}
        >
            <div className="ta-pedoman-area pt-80 pb-100" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11">
                            {/* Header Card */}
                            <div
                                style={{
                                    background: '#ffffff',
                                    borderRadius: '16px',
                                    padding: '40px 35px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                    marginBottom: '35px'
                                }}
                            >
                                <div className="text-center mb-30">
                                    <span style={{
                                        fontSize: '13px',
                                        color: '#da0105',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        display: 'inline-block',
                                        marginBottom: '10px'
                                    }}>
                                        # Standar Etika & Regulasi Dewan Pers
                                    </span>
                                    <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', lineHeight: 1.3, marginBottom: '14px' }}>
                                        Pedoman Pemberitaan Media Siber
                                    </h1>
                                    <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
                                        Pedoman operasional dan etika jurnalistik siber yang dipatuhi oleh <strong>{siteName}</strong> sesuai Surat Keputusan Dewan Pers Nomor: 1/Peraturan-DP/III/2012.
                                    </p>
                                </div>

                                <div style={{
                                    background: '#f1f5f9',
                                    borderRadius: '12px',
                                    padding: '20px 24px',
                                    borderLeft: '4px solid #da0105',
                                    fontSize: '14.5px',
                                    lineHeight: '1.7',
                                    color: '#334155'
                                }}>
                                    <p style={{ marginBottom: '12px' }}>
                                        Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB. Keberadaan media siber di Indonesia juga merupakan bagian dari kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers.
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        Media siber memiliki karakter khusus sehingga memerlukan pedoman agar pengelolaannya dapat dilaksanakan secara profesional, memenuhi fungsi, hak, dan kewajibannya sesuai Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik. Untuk itu Dewan Pers bersama organisasi pers, pengelola media siber, dan masyarakat menyusun <strong>Pedoman Pemberitaan Media Siber</strong> sebagai berikut:
                                    </p>
                                </div>
                            </div>

                            {/* Main Content Articles */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                                {/* Pasal 1 */}
                                <div className="ta-pedoman-item" style={{ background: '#ffffff', borderRadius: '14px', padding: '32px 30px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#fee2e2', color: '#da0105', width: '32px', height: '32px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>1</span>
                                        Ruang Lingkup
                                    </h3>
                                    <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#475569' }}>
                                        <ol style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <li>
                                                <strong>Media Siber</strong> adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan kegiatan jurnalistik, serta memenuhi persyaratan Undang-Undang Pers dan Standar Perusahaan Pers yang ditetapkan Dewan Pers.
                                            </li>
                                            <li>
                                                <strong>Isi Buatan Pengguna (User Generated Content)</strong> adalah segala isi yang dibuat dan/atau dipublikasikan oleh pengguna media siber, antara lain artikel, gambar, komentar, suara, video dan berbagai bentuk unggahan yang melekat pada media siber, seperti blog, forum, komentar pembaca atau pemirsa, dan bentuk lain.
                                            </li>
                                        </ol>
                                    </div>
                                </div>

                                {/* Pasal 2 */}
                                <div className="ta-pedoman-item" style={{ background: '#ffffff', borderRadius: '14px', padding: '32px 30px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#fee2e2', color: '#da0105', width: '32px', height: '32px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>2</span>
                                        Verifikasi dan Keberimbangan Berita
                                    </h3>
                                    <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#475569' }}>
                                        <ol type="a" style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <li>
                                                Pada prinsipnya setiap berita harus melalui verifikasi.
                                            </li>
                                            <li>
                                                Berita yang dapat merugikan pihak lain memerlukan verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan.
                                            </li>
                                            <li>
                                                Ketentuan pada butir (a) di atas dapat dikecualikan, dengan syarat:
                                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                    <li>Berita benar-benar mengandung kepentingan publik yang bersifat mendesak;</li>
                                                    <li>Sumber berita pertama adalah sumber yang jelas disebutkan identitasnya, kredibel, dan kompeten;</li>
                                                    <li>Subjek berita yang harus dikonfirmasi tidak diketahui keberadaannya dan/atau tidak dapat diwawancarai;</li>
                                                    <li>Media memberikan penjelasan kepada pembaca bahwa berita tersebut masih memerlukan verifikasi lebih lanjut yang diupayakan dalam waktu secepatnya. Penjelasan dimuat pada bagian akhir berita yang sama, di dalam kurung dan menggunakan huruf miring.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                Setelah memuat berita sesuai dengan butir (c), media wajib meneruskan upaya verifikasi, dan setelah verifikasi didapatkan, hasil verifikasi dicantumkan pada berita pemutakhiran (update) dengan tautan pada berita yang belum terverifikasi.
                                            </li>
                                        </ol>
                                    </div>
                                </div>

                                {/* Pasal 3 */}
                                <div className="ta-pedoman-item" style={{ background: '#ffffff', borderRadius: '14px', padding: '32px 30px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#fee2e2', color: '#da0105', width: '32px', height: '32px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>3</span>
                                        Isi Buatan Pengguna (User Generated Content)
                                    </h3>
                                    <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#475569' }}>
                                        <ol type="a" style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <li>
                                                Media siber wajib mencantumkan syarat dan ketentuan mengenai Isi Buatan Pengguna yang tidak bertentangan dengan Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik, yang ditempatkan secara terang dan jelas.
                                            </li>
                                            <li>
                                                Media siber mewajibkan setiap pengguna untuk melakukan registrasi keanggotaan dan melakukan proses log-in terlebih dahulu untuk dapat mempublikasikan semua bentuk Isi Buatan Pengguna.
                                            </li>
                                            <li>
                                                Media siber berhak mengedit atau menghapus Isi Buatan Pengguna yang mengandung unsur kebohongan, fitnah, sadis, cabul, prasangka dan kebencian terhadap SARA, serta diskriminasi gender atau kelompok rentan.
                                            </li>
                                            <li>
                                                Media siber wajib meralat, mengoreksi, dan/atau menghapus Isi Buatan Pengguna yang dilaporkan dan melanggar ketentuan butir (c), sesegera mungkin secara proporsional selambat-lambatnya 2 x 24 jam setelah pengaduan diterima.
                                            </li>
                                        </ol>
                                    </div>
                                </div>

                                {/* Pasal 4 */}
                                <div className="ta-pedoman-item" style={{ background: '#ffffff', borderRadius: '14px', padding: '32px 30px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#fee2e2', color: '#da0105', width: '32px', height: '32px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>4</span>
                                        Ralat, Koreksi, dan Hak Jawab
                                    </h3>
                                    <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#475569' }}>
                                        <ol type="a" style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <li>
                                                Ralat, koreksi, dan hak jawab mengacu pada Undang-Undang Pers, Kode Etik Jurnalistik, dan Pedoman Hak Jawab yang ditetapkan Dewan Pers.
                                            </li>
                                            <li>
                                                Ralat, koreksi dan/atau hak jawab wajib ditautkan pada berita yang diralat, dikoreksi atau yang diberi hak jawab.
                                            </li>
                                            <li>
                                                Pada setiap berita ralat, koreksi, dan hak jawab wajib dicantumkan waktu pemuatan ralat, koreksi, dan/atau hak jawab tersebut.
                                            </li>
                                            <li>
                                                Bila suatu berita media siber tertentu disebarluaskan media siber lain, maka:
                                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '6px' }}>
                                                    <li>Tanggung jawab media siber pembuat berita terbatas pada berita yang dipublikasikan di media siber tersebut atau media siber yang berada di bawah otoritas teknisnya;</li>
                                                    <li>Koreksi berita yang dilakukan oleh sebuah media siber, juga harus dilakukan oleh media siber lain yang mengutip berita dari media siber yang dikoreksi itu.</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </div>
                                </div>

                                {/* Pasal 5 */}
                                <div className="ta-pedoman-item" style={{ background: '#ffffff', borderRadius: '14px', padding: '32px 30px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#fee2e2', color: '#da0105', width: '32px', height: '32px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>5</span>
                                        Pencabutan Berita
                                    </h3>
                                    <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#475569' }}>
                                        <ol type="a" style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <li>
                                                Berita yang sudah dipublikasikan tidak dapat dicabut karena alasan penyensoran dari pihak luar redaksi, kecuali terkait masalah SARA, kesusilaan, masa depan anak, pengalaman traumatik korban atau berdasarkan pertimbangan khusus lain yang ditetapkan Dewan Pers.
                                            </li>
                                            <li>
                                                Media siber lain wajib mengikuti pencabutan kutipan berita dari media asal yang telah dicabut.
                                            </li>
                                            <li>
                                                Pencabutan berita wajib disertai dengan alasan pencabutan dan diumumkan kepada publik.
                                            </li>
                                        </ol>
                                    </div>
                                </div>

                                {/* Pasal 6 */}
                                <div className="ta-pedoman-item" style={{ background: '#ffffff', borderRadius: '14px', padding: '32px 30px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#fee2e2', color: '#da0105', width: '32px', height: '32px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>6</span>
                                        Praktik Hak Cipta
                                    </h3>
                                    <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#475569' }}>
                                        <p style={{ margin: 0 }}>
                                            Media siber wajib menghormati hak cipta sebagaimana diatur dalam peraturan perundang-undangan yang berlaku. Pemuatan kembali materi berupa tulisan, foto, infografis, dan video wajib menyertakan kredit sumber asal secara jelas dan proporsional.
                                        </p>
                                    </div>
                                </div>

                                {/* Pasal 7 */}
                                <div className="ta-pedoman-item" style={{ background: '#ffffff', borderRadius: '14px', padding: '32px 30px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#fee2e2', color: '#da0105', width: '32px', height: '32px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>7</span>
                                        Pencantuman Pedoman
                                    </h3>
                                    <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#475569' }}>
                                        <p style={{ margin: 0 }}>
                                            Media siber wajib mencantumkan <strong>Pedoman Pemberitaan Media Siber</strong> ini di medianya secara terang dan jelas, serta mudah diakses oleh seluruh pembaca melalui tautan navigasi portal.
                                        </p>
                                    </div>
                                </div>

                                {/* Pasal 8 */}
                                <div className="ta-pedoman-item" style={{ background: '#ffffff', borderRadius: '14px', padding: '32px 30px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#fee2e2', color: '#da0105', width: '32px', height: '32px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>8</span>
                                        Sengketa
                                    </h3>
                                    <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#475569' }}>
                                        <p style={{ margin: 0 }}>
                                            Penilaian akhir atas sengketa mengenai pelaksanaan Pedoman Pemberitaan Media Siber ini diselesaikan oleh <strong>Dewan Pers</strong>.
                                        </p>
                                    </div>
                                </div>

                                {/* Contact & Hak Jawab Callout */}
                                <div
                                    style={{
                                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                        borderRadius: '16px',
                                        padding: '35px 30px',
                                        color: '#ffffff',
                                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)'
                                    }}
                                >
                                    <div className="row align-items-center">
                                        <div className="col-lg-8 mb-3 mb-lg-0">
                                            <span style={{ fontSize: '12px', color: '#f87171', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Layanan Pengaduan & Hak Jawab
                                            </span>
                                            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '8px 0 10px' }}>
                                                Punya Tanggapan, Koreksi, atau Hak Jawab?
                                            </h3>
                                            <p style={{ fontSize: '14.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
                                                Redaksi <strong>{siteName}</strong> terbuka menerima klarifikasi, koreksi, dan hak jawab atas setiap karya jurnalistik kami melalui email <a href={`mailto:${contactEmail}`} style={{ color: '#38bdf8', textDecoration: 'underline' }}>{contactEmail}</a>.
                                            </p>
                                        </div>
                                        <div className="col-lg-4 text-lg-end">
                                            <Link
                                                href="/contact"
                                                className="ta-button"
                                                style={{
                                                    background: '#da0105',
                                                    color: '#ffffff',
                                                    padding: '12px 24px',
                                                    borderRadius: '8px',
                                                    fontWeight: 700,
                                                    fontSize: '14px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                <span>Kirim Koreksi / Hak Jawab</span>
                                                <i className="fa fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Signing Note */}
                                <div className="text-center mt-20" style={{ fontSize: '13px', color: '#94a3b8' }}>
                                    <em>Pedoman Pemberitaan Media Siber ditetapkan di Jakarta pada tanggal 3 Februari 2012 oleh Dewan Pers bersama organisasi pers dan pengelola media siber di Indonesia.</em>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        const records = await prisma.setting.findMany()
        const settingsObj = {}
        records.forEach(item => {
            settingsObj[item.key] = item.value
        })
        return {
            props: {
                initialSettings: JSON.parse(JSON.stringify(settingsObj))
            }
        }
    } catch (err) {
        return {
            props: {
                initialSettings: {}
            }
        }
    }
}

