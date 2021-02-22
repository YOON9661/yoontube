import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import styled from "styled-components";

import useInput from "../../hook/useInput"
import { loginRequestAction } from "../../redux/login";
import Template from "../template";

const LoginForm = ({ history }) => {
    const { isLoggedIn } = useSelector(state => state.login);

    useEffect(() => {
        if (isLoggedIn) {
            history.push("/");
        }
    }, [history, isLoggedIn]);

    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput("");
    const [password, onChangePassword] = useInput("");

    const onSubmit = useCallback(() => {
        dispatch(loginRequestAction({ email, password }));
    }, [dispatch, email, password]);
    return (
        <Template>
            <FormWrapper>
                <Form onFinish={onSubmit}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            name="user-email"
                            onChange={onChangeEmail}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            name="user-password"
                            onChange={onChangePassword}
                            required
                        />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <LoginButton type="primary" htmlType="submit">로그인</LoginButton>
                        <br />
                        <br />
                        <Link to="/register">회원가입</Link>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </Template>
    );
};

export default withRouter(LoginForm);


const FormWrapper = styled.div`
    width: 400px;
    margin-top: 170px;
    margin-left: auto;
    margin-right: auto;
`;

const LoginButton = styled(Button)`
    width: 100%
`;