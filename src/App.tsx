import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToDoPage from './components/ToDoPage/ToDoPage'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import ButtonTheme from './components/ButtonTheme/ButtonTheme'
import Footer from './components/Footer/Footer'


const App = () => {

    return (
        <>
        <div className='main-content'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <ToDoPage /> } />
                    <Route path='/login' element={ <Login /> } />
                    <Route path='/register' element={ <SignUp /> } />
                </Routes>
            </BrowserRouter>
            <ButtonTheme />
        </div>
        <Footer />
        </>
    )
}

export default App