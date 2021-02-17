import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";
import { Form, Input, Button, Checkbox } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    validateInput(userPayload);
    if (Object.keys(errors).length === 0) {
      fetch("/api/v1/user-sessions", {
        method: "post",
        body: JSON.stringify(userPayload),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then(() => {
            setShouldRedirect(true);
          });
        } else {
          const errorMessage = `${resp.status} (${resp.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      });
    }
  };
  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="sign-in-container text-center" onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <form className="sign-in-form">
        <div>
          <label>Email
             <input type="text"
              name="email"
              value={userPayload.email}
              onChange={onInputChange}
              className="email-input" />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              className="password-input"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>

        <div>
          <input type="submit" className="button" value="Sign In" />
        </div>
      </form>



      {/* <div className="sign-in-form" >
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onSubmit={onSubmit}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
            onChange={onInputChange}
          >
            <Input style={{ width: 500 }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            onChange={onInputChange}
          >
            <Input.Password style={{ width: 500, height: 50 }} />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout} style={{ alignSelf: "text-center" }}>
            <Button onClick={onSubmit} type="primary" htmlType="submit" className="button">
              Sign In
        </Button>
          </Form.Item>
        </Form>
      </div > */}
    </div>
  )
};

export default SignInForm;
