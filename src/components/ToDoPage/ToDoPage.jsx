import "./ToDoPage.css"
import { useState, useEffect } from "react"
import axios from "axios"
import NavBar from "../NavBar/NavBar"
import InputField from "./InputField/InputField"
import ToDo from "./ToDo/ToDo"


const ToDoPage = () => {

    const [storedUser, setStoredUser] = useState(JSON.parse(localStorage.getItem("user")))

    const [todos, setTodos] = useState([])

    useEffect(() => {
        setStoredUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    const searchToDo = async () => {

        if (storedUser) {

            try {
                const result = await axios.get(`http://localhost:8000/api/todo/get/`, {
                    headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
                })
                setTodos(result.data)

            } catch(error) {
                console.log(error)
                setTodos([])
                if (error.response.status == 401) {
                    updateTokens()
                }
            }
            
        } else {
            setTodos([])
        }
    }

    const updateTokens = () => {

        axios.post('http://localhost:8000/api/token/refresh/', { refresh: localStorage.getItem('refreshToken')})
      
        .then(response => {   
            const newAccessToken = response.data.access;     
            const newRefreshToken = response.data.refresh;     
            localStorage.setItem('accessToken', newAccessToken)     
            localStorage.setItem('refreshToken', newRefreshToken)
        })

        .catch(error => {      
            console.error('Ошибка при обновлении токена:', error);    
        })      
    } 

    useEffect(() => {
        searchToDo()  // Вызываем функцию при загрузке компонента
    }, [])

    return (
        <div className="block">
            <NavBar />
            <InputField searchToDo={searchToDo}/>
            <ToDo todos={todos} searchToDo={searchToDo}/>
        </div>
    )
}

export default ToDoPage