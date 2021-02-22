import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import "antd/dist/antd.css";
import { Menu, Input } from "antd";
import { YoutubeOutlined } from "@ant-design/icons";

import { logoutRequestAction } from "../redux/login";

const Template = ({ children, history }) => {
    const { loginData } = useSelector(state => state.login);

    const dispatch = useDispatch();

    const onClickLogout = useCallback(() => {
        dispatch(logoutRequestAction());
        history.push("/");
    }, [dispatch, history]);

    return (
        <>
            <MenuWrapper mode="horizontal">
                <Menu.Item>
                    <Link to="/"><YoutubeOutlined style={{ color: 'red' }} />YoonTube</Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search style={{ marginTop: '7px' }} />
                </Menu.Item>
                <Menu.Item>
                    <Link to="/profile">profile</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/register">register</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/upload">upload</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/post">community upload</Link>
                </Menu.Item>
                <Menu.Item>
                    {loginData === null ? (
                        <Link to="/login">login</Link>
                    ) : (
                        <div onClick={onClickLogout}>logout</div>
                    )}
                </Menu.Item>
            </MenuWrapper>
            <div>
                {children}
            </div>
        </>
    );
}

export default withRouter(Template);

const MenuWrapper = styled(Menu)`
    width: 100%;
    height: 50px;
`;