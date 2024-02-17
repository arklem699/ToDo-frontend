import '../ButtonTheme/ButtonTheme.css'
import { useState, useEffect } from'react'
 

const ButtonTheme = () => {

    const [theme, settheme] = useState("dark")
 
    const handleToggle = () => {  // Обработчик переключения темы

        const newTheme = theme === "light" ? "dark" : "light"
        settheme(newTheme)
        setUserTheme(newTheme)
        document.body.dataset.theme = theme
    }

    const setUserTheme = (pref) => {  // Сохранение темы в хранилище

        localStorage.setItem("theme", pref)
    }

    const getUserTheme = () => {  // Получение темы из хранилища

        return localStorage.getItem("theme")
    }

    const getMediaTheme = () => {  // Получение темы по умолчанию из настроек браузера 

        const mediaTheme = "(prefers-color-scheme: dark)"
        const mql = window.matchMedia(mediaTheme)
        const hasTheme = typeof mql.matches === "boolean"
        
        if (hasTheme) {
            return mql.matches ? "dark" : "light"
        }
    }

    useEffect(() => {

        const userSetTheme = getUserTheme()
        const mediaTheme = getMediaTheme()
     
        if (userSetTheme) {

            settheme(userSetTheme)

        } else {

            settheme(mediaTheme)
        }
     
        document.body.dataset.theme = theme

    }, [theme])

    return (
        <div className="theme" onClick={handleToggle}>
            {theme === "light" ? <img src="/src/assets/dark-theme.png" /> : <img src="/src/assets/light-theme.png" />}
        </div>
    )
}

export default ButtonTheme