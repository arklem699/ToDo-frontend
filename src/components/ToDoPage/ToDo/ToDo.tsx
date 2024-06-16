import './ToDo.css'
import { FC } from "react"
import ToDoCard from './ToDoCard/ToDoCard'


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
                    {todos
                        .filter((item: any) => item.status_id === 1)
                        .sort((a: any, b: any) => 
                            new Date(a.date_completion).getTime() - new Date(b.date_completion).getTime() || 
                            a.text.localeCompare(b.text))
                        .map((item: any) => (
                            <div key={item.id} className="todo-item">
                                <ToDoCard todo={item} searchToDo={searchToDo} />
                            </div>
                        ))
                    }
                    <div className='todo-item'>
                        <details>
                            <summary>Выполнено ({completedTodos.length})</summary>
                            <div>
                                {todos
                                    .filter((item: any) => item.status_id === 2)
                                    .sort((a: any, b: any) => 
                                        new Date(a.date_completion).getTime() - new Date(b.date_completion).getTime() || 
                                        a.text.localeCompare(b.text))
                                    .map((item: any) => (
                                        <div key={item.id}>
                                            <ToDoCard todo={item} searchToDo={searchToDo} />
                                        </div>
                                    ))
                                }
                            </div>
                        </details>
                    </div>
                </>
            )}
        </div>
    )
}

export default ToDo