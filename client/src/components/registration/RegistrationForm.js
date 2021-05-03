import React, { useState } from "react"
import { message } from "antd"
import FormError from "../layout/FormError"
import config from "../../config"

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  })

  const [errors, setErrors] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const validateInput = (payload) => {
    setErrors({})
    const { email, password, passwordConfirmation } = payload
    const emailRegexp = config.validation.email.regexp
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
      message.warning("Email is invalid")
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
      message.warning("Password is required")
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      }
      message.warning("Password Confirmation is required")
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        }
        message.warning("Password Confirmation does not match Password")
      }
    }
    setErrors(newErrors)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    validateInput(userPayload)
    if (Object.keys(errors).length === 0) {
      fetch("/api/v1/users", {
        method: "post",
        body: JSON.stringify(userPayload),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            setShouldRedirect(true)
          })
        } else {
          const errorMessage = `${resp.status} (${resp.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      })
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/"
  }

  return (
    <div className="registration-container text-center" onSubmit={onSubmit}>
      <h1>Register</h1>
      <div className="registration-form">
        <form autoComplete="off">
          <div>
            <label>
              Email
            <input
                type="text"
                name="email"
                value={userPayload.email}
                onChange={onInputChange}
                className="email-input"
              />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              Password
            <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
                className="password-input"
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <label>
              Password Confirmation
            <input
                type="password"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
                className="password-input"
              />
              <FormError error={errors.passwordConfirmation} />
            </label>
          </div>
          <div>
            <input type="submit" className="button" value="Register" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
