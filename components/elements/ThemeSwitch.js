import { useEffect, useState } from "react"

export default function ThemeSwitch() {
    const [togglETHeme, setTogglETHeme] = useState(
        () => JSON.parse(localStorage.getItem("togglETHeme")) || "light"
    )
    useEffect(() => {
        localStorage.setItem("togglETHeme", JSON.stringify(togglETHeme))
        document.body.classList.add(togglETHeme)
        return () => {
            document.body.classList.remove(togglETHeme)
        }
    }, [togglETHeme])

    return (
        <>

            <div className="ta-theme-switcher-wrapper">
                <nav className="ta-theme-switcher"
                    onClick={() => togglETHeme === "light" ? setTogglETHeme("dark") : setTogglETHeme("light")
                    }
                >
                    <span className="ta-theme-switcher__btn light-mode"><i className="fa fa-sun" /></span>
                    <span className="ta-theme-switcher__mode"  />
                    <span className="ta-theme-switcher__btn dark-mode"><i className="fa fa-moon" /></span>
                </nav>
            </div>

        </>
    )
}
