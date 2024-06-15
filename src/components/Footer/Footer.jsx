import React from 'react'
import './Footer.css'
import { FaVk, FaTelegramPlane, FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://vk.com/arklem" target="_blank" rel="noopener noreferrer" title="ВКонтакте">
                    <FaVk />
                </a>
                <a href="https://t.me/arklem" target="_blank" rel="noopener noreferrer" title="Telegram">
                    <FaTelegramPlane />
                </a>
                <a href="https://github.com/arklem699" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <FaGithub />
                </a>
            </div>
            <p>© 2024 arklem | Все права защищены</p>
        </footer>
    )
}

export default Footer