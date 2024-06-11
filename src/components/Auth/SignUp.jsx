import './Auth.css'
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as yup from "yup"
import axios from 'axios'
import NavBar from '../NavBar/NavBar'


const SignUpSchema = yup.object().shape({

    username: yup.string()
        .min(3, "Минимум 3 символа")
        .max(20, "Максимум 20 символов")
        .required("Обязательное поле"),

    email: yup.string()
        .email("Неверный формат электронной почты")
        .required("Обязательное поле"),

    password: yup.string()
        .min(6, "Минимум 6 символов")
        .max(20, "Максимум 20 символов")
        .required("Обязательное поле"),

    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
})

const SignUp = () => {

    let navigate = useNavigate()

    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const handleSignUp = (values) => {

        axios.post('http://127.0.0.1:8000/api/registration/', {
            username: values.username,
            email: values.email,
            password: values.password,
        })

        .then(response => {
            const data = response.data;
            if (data.access && data.refresh) {
                localStorage.setItem('accessToken', data.access)
                localStorage.setItem('refreshToken', data.refresh)
                navigate("/login")
            } else {
                console.error("Ошибка аутентификации")
            }
        })

        .catch(error => console.error(error))
    };

    return (
        <div>
            <NavBar />
            <div className="col-md-12 signup-form">
                <div className="card-auth card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignUpSchema}
                        onSubmit={handleSignUp}
                    >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="form-group">
                                <Field
                                    name="username"
                                    type="text"
                                    className={"field" + " form-control" + 
                                        (errors.username && touched.username ? " is-invalid" : "") + 
                                        (!errors.username && touched.username ? " is-valid" : "")}
                                    placeholder=""
                                />
                                <span>Имя пользователя</span>
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>

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
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className={"field" + " form-control" + 
                                        (errors.confirmPassword && touched.confirmPassword ? " is-invalid" : "") + 
                                        (!errors.confirmPassword && touched.confirmPassword ? " is-valid" : "")}
                                    placeholder=""
                                />
                                <span>Повторите пароль</span>
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Регистрация</button>
                            </div>

                            <div className="form-group">
                                <p>
                                    Уже есть аккаунт? <Link to="/login">Войти</Link>
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

export default SignUp