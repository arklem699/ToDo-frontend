import './Auth.css'
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as yup from "yup"
import axios from 'axios'
import NavBar from '../NavBar/NavBar'


const SignUpSchema = yup.object().shape({

    email: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
})

const Login = () => {

    let navigate = useNavigate()

    const initialValues = {
        email: "",
        password: "",
    }

    const handleLogin = (values) => {

        axios.post('http://127.0.0.1:8000/api/login/', {
            email: values.email,
            password: values.password,
        })

        .then(response => {
            const data = response.data
            localStorage.setItem("user", JSON.stringify(data))

            if (data.access && data.refresh) {
                localStorage.setItem('accessToken', data.access)
                localStorage.setItem('refreshToken', data.refresh)
                navigate("/")
            } else {
                console.error("Ошибка аутентификации")
            }
        })

        .catch(error => console.error(error))
    };

    return (
        <div>
            <NavBar />
            <div className="col-md-12 login-form">
                <div className="card-auth card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignUpSchema}
                        onSubmit={handleLogin}
                    >
                    {({ errors, touched }) => (
                        <Form>

                            <div className="form-group">
                                <Field
                                    name="email"
                                    type="email"
                                    className={"field" + " form-control" + 
                                        (errors.email && touched.email ? " is-invalid" : "") + 
                                        (!errors.email && touched.email ? " is-valid" : "")}
                                    placeholder=""
                                />
                                <span>Почта</span>
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group">
                                <Field
                                    name="password"
                                    type="password"
                                    className={"field" + " form-control" + 
                                        (errors.password && touched.password? " is-invalid" : "") + 
                                        (!errors.password && touched.password ? " is-valid" : "")}
                                    placeholder=""
                                />
                                <span>Пароль</span>
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Войти</button>
                            </div>

                            <div className="form-group">
                                <p>
                                    Ещё нет аккаунта? <Link to="/register">Создать</Link>
                                </p>
                            </div>
                        </Form>
                    )}
                  </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login