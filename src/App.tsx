import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToDoPage from './components/ToDoPage/ToDoPage';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <ToDoPage /> } />
            </Routes>
        </BrowserRouter>
    )
};

export default App