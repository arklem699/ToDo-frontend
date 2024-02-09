import './ToDoCard.css'
import React, { FC, useState } from 'react';
import { FaTrash, FaCheck, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

interface TodoItem {
    id: string;
    text: string;
    date_completion: string;
    status_id: number;
}

interface Props {
    todo: TodoItem;
    searchToDo: () => void;
}

const ToDoCard: FC<Props> = ({ todo, searchToDo }) => {

    const [editedText, setEditedText] = useState(todo.text)

    const [isEditing, setIsEditing] = useState(false)

    const deleteToDo = async () => {
        await axios.delete(`http://localhost:8000/api/todo/delete/${todo.id}/`)
        searchToDo()
    }

    const putToDo = async () => {
        await axios.put(`http://localhost:8000/api/todo/put/status/${todo.id}/`)
        searchToDo()
    }

    const editToDo = async () => {
        await axios.put(`http://localhost:8000/api/todo/put/text/${todo.id}/`, { text: editedText })
        searchToDo()
        setIsEditing(false)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editToDo()
        }
    }

    return (
        <>
            {isEditing ? (
                <input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={editToDo}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <div className='todo-span'>
                    <span onClick={() => setIsEditing(true)}>{todo.text}</span>
                    <div className="todo-date">
                        <FaCalendarAlt /> {new Date(todo.date_completion).toLocaleDateString()}
                    </div>
                    <FaCheck className="check" title="Отметить выполненным" onClick={putToDo} />
                    <FaTrash className="bin" title="Удалить" onClick={deleteToDo} />
                </div>
            )}
        </>
    )
}

export default ToDoCard
