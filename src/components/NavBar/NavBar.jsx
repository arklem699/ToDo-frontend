import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


const NavBar = () => {

    let navigate = useNavigate()

    const [storedUser, setStoredUser] = useState(JSON.parse(localStorage.getItem("user")))

    const handleLogout = () => {

        axios.post('http://127.0.0.1:8000/api/logout/', {
            refresh_token: localStorage.getItem('refreshToken'),
        })

        .then(response => {
            if (response.status == 200) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                setStoredUser(null)
                navigate('/login')
            } else {
                console.error("Ошибка при выходе")
            }
        })

        .catch(error => console.error(error))

    }

    useEffect(() => {
        setStoredUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand  ">
                <Link to={"/"} className="navbar-brand">
                    Главная
                </Link>
                {storedUser ? (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                {storedUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button type="submit" onClick={handleLogout} className="nav-link">
                                Выйти
                            </button>
                        </li>
                    </div>   
                ) : (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Войти
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Регистрация
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default NavBar