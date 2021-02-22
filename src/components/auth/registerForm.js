import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Template from "../template";
import { registerRequestAction } from "../../redux/register";
import useInput from "../../hook/useInput";



const RegisterForm = ({ history }) => {
    const { isRegistered } = useSelector(state => state.register);
    useEffect(() => {
        if (isRegistered) {
            history.push("/login");
        }
    }, [isRegistered, history]);

    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput("");
    const [nickname, onChangeNickname] = useInput("");
    const [password, onChangePassword] = useInput("");

    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const onChangePasswordConfirm = useCallback((e) => {
        setPasswordConfirm(e.target.value);
        setPasswordConfirmError(e.target.value !== password);
    }, [password]);

    const [check, setCheck] = useState(false);
    const [checkError, setCheckError] = useState(false);
    const onCheckContract = useCallback(() => {
        setCheck(!check);
    }, [check]);

    const onSubmit = useCallback(() => {
        if (password !== passwordConfirm) {
            return setPasswordConfirmError(true);
        }
        if (check === false) {
            return setCheckError(true);
        }
        dispatch(registerRequestAction({ email, nickname, password }));

    }, [email, nickname, password,
        passwordConfirm, check, dispatch]);

    return (
        <>
            <Template>
                <FormWraaper>
                    <Form
                        onFinish={onSubmit}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email',
                                },
                            ]}
                        >
                            <Input
                                type="email"
                                onChange={onChangeEmail}
                                required
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nickname"
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Nickname',
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                onChange={onChangeNickname}
                                required
                            />
                        </Form.Item>
                        <Form.Item
                            label="password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password',
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                onChange={onChangePassword}
                                required
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password Confirm"
                            name="passwordConfirm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password Confirm',
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                onChange={onChangePasswordConfirm}
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox onClick={onCheckContract}>해당 약관에 동의합니다.</Checkbox>
                        </Form.Item>
                        {passwordConfirmError && <Error>비밀번호가 일치하지 않습니다...</Error>}
                        {checkError && <Error>약관에 동의하셔야합니다!</Error>}
                        <ButtonWrapper>
                            <SubmitButton type="primary" htmlType="submit">등록</SubmitButton>
                        </ButtonWrapper>
                    </Form>
                </FormWraaper>
            </Template>
        </>
    );
}

export default withRouter(RegisterForm);

const Error = styled.div`
    color: red;
`;


const FormWraaper = styled.div`
    width: 450px;
    margin-top: 120px;
    margin-left: auto;
    margin-right: auto;
`;

const SubmitButton = styled(Button)`
    width: 100%;
`;

const ButtonWrapper = styled(Form.Item)`
    text-align: 'center';
`;