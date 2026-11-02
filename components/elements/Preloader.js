import { useSettings } from "@/context/SettingsContext"
import { getImageUrl } from "@/lib/imageUtils"

export default function Preloader() {
    const { settings = {} } = useSettings()
    const logoLight = getImageUrl(settings.logo_header || settings.site_logo, "/assets/img/logo/logo.webp")

    return (
        <>
            <div className="ta-page-animation-overlay">
                <div className="ta-logo">
                    <a href="/">
                        <img
                            src={logoLight}
                            alt={settings.site_title || "logo"}
                            style={{ height: '42px', width: 'auto', maxWidth: '240px', objectFit: 'contain' }}
                            onError={(e) => { e.currentTarget.src = "/assets/img/logo/logo.webp" }}
                        />
                    </a>
                </div>
            </div>

        </>
    )
}
