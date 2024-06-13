import Button from 'react-bootstrap/Button'
import 'react-datepicker/dist/react-datepicker.css'
import './InputField.css'
import { FC, useState } from "react"
import { FaCalendarAlt } from 'react-icons/fa'
import axios from 'axios'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale'


registerLocale('ru', ru)

interface Props {
    searchToDo: () => void;
}

const InputField: FC<Props> = ({ searchToDo }) => {

    const [inputValue, setInputValue] = useState<string>("")

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date)
    }

    const addToDo = async () => {

        const formattedDate = selectedDate?.toLocaleDateString('fr-CA').split('T')[0]

        console.log(selectedDate, formattedDate)

        await axios.post(`http://localhost:8000/api/todo/post/`, {
            text: inputValue,
            date: formattedDate
        }, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
        })
        searchToDo()
        setInputValue("")
        setSelectedDate(null)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addToDo()
        }
    }

    const CustomDateInput = ({ onClick }: { onClick?: () => void }) => (
        <button className="custom-date-input" onClick={onClick}>
            <FaCalendarAlt />
        </button>
    )

    return (
        <div className='inputfield'>
            <input
                className="form-control"
                placeholder="Введите задачу"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                locale="ru"
                customInput={<CustomDateInput />}
                dateFormat="dd/MM/yyyy"
                dayClassName={(date) =>
                    date.getDate() === (selectedDate?.getDate() || 0) &&
                    date.getMonth() === (selectedDate?.getMonth() || 0) &&
                    date.getFullYear() === (selectedDate?.getFullYear() || 0)
                        ? 'react-datepicker__day--highlighted'
                        : ''
                }
            />
            <Button className="save" variant='success' onClick={addToDo}>Сохранить</Button>
        </div>
    )
};

export default InputField