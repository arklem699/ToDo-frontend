import "./ToDoPage.css"
import { useState, useEffect } from "react"
import axios from "axios"
import NavBar from "../NavBar/NavBar"
import InputField from "./InputField/InputField"
import ToDo from "./ToDo/ToDo"


const ToDoPage = () => {

    const [todos, setTodos] = useState([])

    const searchToDo = async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/todo/get/`, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
            })
            setTodos(result.data)
        } catch(error) {
            console.log(error)
            setTodos([])
        }
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