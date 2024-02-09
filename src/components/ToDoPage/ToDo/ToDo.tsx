import './ToDo.css'
import { FC } from "react"
import ToDoCard from './ToDoCard/ToDoCard';


interface Props {
    todos: [] | null;
    searchToDo: () => void;
}

const ToDo: FC<Props> = ({ todos, searchToDo }) => {

    const completedTodos = todos ? todos.filter((item: any) => item.status_id === 2) : []

    return (
        <div className="todo">
            {todos && (
                <>
                    {todos.map((item: any) => (
                        item.status_id === 1 && (
                            <div key={item.id} className="todo-item">
                                <ToDoCard todo={item} searchToDo={searchToDo} />
                            </div>
                        )
                    ))}
                    <div className="todo-item">
                        <details>
                            <summary>Выполнено ({completedTodos.length})</summary>
                            <div>
                                {todos.map((item: any) => (
                                    item.status_id === 2 && (
                                        <div key={item.id}>
                                            <input className='completed' value={item.text} readOnly />
                                        </div>
                                    )
                                ))}
                            </div>
                        </details>
                    </div>
                </>
            )}
        </div>
    )
}

export default ToDo