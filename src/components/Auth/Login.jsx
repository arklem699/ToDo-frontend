import './Auth.css'
import React from "react"
import { Link } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as yup from "yup"
import NavBar from '../NavBar/NavBar'


const SignUpSchema = yup.object().shape({

    email: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
})

const Login = () => {

    const initialValues = {
        email: "",
        password: "",
    }

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
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2))
                                setSubmitting(false)
                            }, 400)
                        }}
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