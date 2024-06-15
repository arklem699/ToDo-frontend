import './ToDoCard.css'
import 'react-datepicker/dist/react-datepicker.css'
import React, { FC, useState, useEffect } from 'react'
import { FaTrash, FaCheck, FaCalendarAlt } from 'react-icons/fa'
import axios from 'axios'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale'


registerLocale('ru', ru)

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

    const [isOverdue, setIsOverdue] = useState(false)

    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        const overdue = new Date(new Date(todo.date_completion).toDateString()) < new Date(new Date().toDateString())
        setIsOverdue(overdue)
    }, [todo.date_completion])

    useEffect(() => {
        todo.status_id === 2 ? setIsCompleted(true) : setIsCompleted(false)
    }, [])

    const deleteToDo = async () => {
        await axios.delete(`http://localhost:8000/api/todo/delete/${todo.id}/`, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
        })
        searchToDo()
    }

    const putToDo = async () => {
        await axios.put(`http://localhost:8000/api/todo/put/status/${todo.id}/`, {}, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
        })
        searchToDo()
    }

    const editTextToDo = async () => {
        await axios.put(`http://localhost:8000/api/todo/put/text/${todo.id}/`, {
            text: editedText 
        }, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
        })
        searchToDo()
        setIsEditing(false)
    }

    const editDateToDo = async (editedDate: Date | null) => {

        const formattedDate = editedDate?.toLocaleDateString('fr-CA').split('T')[0]

        await axios.put(`http://localhost:8000/api/todo/put/date/${todo.id}/`, {
            date: formattedDate
        }, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
        })
        searchToDo()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editTextToDo()
        }
    }

    const handleDateChange = (editedDate: Date | null) => {
        editDateToDo(editedDate)
    }

    const CustomDateInput = ({ onClick }: { onClick?: () => void }) => (
        <button className="custom-date-input" onClick={onClick}>
            <FaCalendarAlt title="Изменить дату" />
        </button>
    )

    return (
        <>
            {isEditing ? (
                <input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={editTextToDo}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <div className='todo-span'>
                    <span 
                        className={`span ${isCompleted ? "completed" : ""}`}
                        onClick={isCompleted ? () => setIsEditing(false) : () => setIsEditing(true)}
                    >
                        {todo.text}
                    </span>
                    <div className={`todo-date ${isOverdue ? "overdue" : ""}`}>
                        <FaCalendarAlt /> {new Date(todo.date_completion).toLocaleDateString()}
                    </div>
                    {!isCompleted && (
                        <>
                            <DatePicker
                                selected={new Date(todo.date_completion)}
                                onChange={handleDateChange}
                                locale="ru"
                                customInput={<CustomDateInput />}
                                dateFormat="dd/MM/yyyy"
                                dayClassName={(date) =>
                                    date.getDate() === (new Date(todo.date_completion)?.getDate() || 0) &&
                                    date.getMonth() === (new Date(todo.date_completion)?.getMonth() || 0) &&
                                    date.getFullYear() === (new Date(todo.date_completion)?.getFullYear() || 0)
                                        ? 'react-datepicker__day--highlighted'
                                        : ''
                                }
                                wrapperClassName="custom-calendar"
                            />
                            <FaCheck className="check" title="Отметить выполненным" onClick={putToDo} />
                            <FaTrash className="bin" title="Удалить" onClick={deleteToDo} />
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default ToDoCard
