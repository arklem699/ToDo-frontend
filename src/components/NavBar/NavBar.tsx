import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'
import { Link } from "react-router-dom"


const NavBar = () => {

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand  ">
                <Link to={"/"} className="navbar-brand">
                    Главная
                </Link>
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
            </nav>
        </div>
    )
}

export default NavBar