import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToDoPage from './components/ToDoPage/ToDoPage'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <ToDoPage /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/register' element={ <SignUp /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App