import { createContext, useContext, useEffect, useState } from 'react'

const SettingsContext = createContext({
    settings: {
        show_post_views: 'true',
        show_post_comments: 'true'
    }
})

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        show_post_views: 'true',
        show_post_comments: 'true'
    })

    useEffect(() => {
        const loadSettings = () => {
            fetch('/api/settings')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.settings) {
                        setSettings(data.settings)
                    }
                })
                .catch(console.error)
        }

        loadSettings()

        window.addEventListener('settingsUpdated', loadSettings)
        return () => window.removeEventListener('settingsUpdated', loadSettings)
    }, [])

    return (
        <SettingsContext.Provider value={{ settings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(SettingsContext)
}

export default SettingsContext
