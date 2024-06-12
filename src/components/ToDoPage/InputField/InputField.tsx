import Button from 'react-bootstrap/Button'
import './InputField.css'
import { FC, useState } from "react"
import axios from 'axios'


interface Props {
    searchToDo: () => void;
}

const InputField: FC<Props> = ({ searchToDo }) => {

    const [inputValue, setInputValue] = useState<string>("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const addToDo = async () => {
        await axios.post(`http://localhost:8000/api/todo/post/`, {
            text: inputValue
        }, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
        })
        searchToDo()
        setInputValue("")
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addToDo()
        }
    }

    return (
        <div className='inputfield'>
            <input
                className="form-control"
                placeholder="Введите задачу"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <Button variant='success' onClick={addToDo}>Сохранить</Button>
        </div>
    )
};

export default InputField