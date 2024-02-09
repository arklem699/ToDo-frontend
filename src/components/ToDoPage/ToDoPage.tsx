import "./ToDoPage.css";
import { useState, useEffect } from "react"
import axios from "axios"
import InputField from "./InputField/InputField"
import ToDo from "./ToDo/ToDo"


const ToDoPage = () => {

    const [todos, setTodos] = useState<[] | null>(null)

    const searchToDo = async () => {

        const result = await axios.get(`http://localhost:8000/api/todo/get/`)
        setTodos(result.data)
    }

    useEffect(() => {
        searchToDo(); // Вызываем функцию при загрузке компонента
    }, []);

    return (
        <div className="block">
            <InputField searchToDo={searchToDo}/>
            <ToDo todos={todos} searchToDo={searchToDo}/>
        </div>
    )
}

export default ToDoPage