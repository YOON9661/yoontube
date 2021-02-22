import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Avatar } from 'antd';
import styled from "styled-components";
import { YoutubeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import Template from "../template";
import PageList from "./pagelist";

import { getPageRequestAction } from "../../redux/video/getVideo";
import {
    watchProfileRequestAction,
    profileInitializeAction
} from "../../redux/profile";

const PageForm = () => {
    const dispatch = useDispatch();

    const { pageData } = useSelector(state => state.getVideo);
    const { isLoggedIn, loginData } = useSelector(state => state.login);
    const userId = loginData?.id;

    useEffect(() => {
        dispatch(getPageRequestAction());
        if (isLoggedIn) {
            dispatch(watchProfileRequestAction(userId));
        }
        return () => {
            if (isLoggedIn) {
                dispatch(profileInitializeAction());
            }
        }
    }, [isLoggedIn, userId, dispatch]);

    const { profileData } = useSelector(state => state.profile);

    return (
        <>
            <Template>
                <Fuck>
                    <MenuTemplate
                        mode="inline"
                    >
                        <Menu.SubMenu icon={<YoutubeOutlined />} title="구독">
                            {profileData?.Subscribings.map(subscribing => (
                                <Menu.Item key={subscribing.id}>
                                    <AvatarWrapper>{subscribing.nickname[0]}</AvatarWrapper>
                                    <Link to={`/profile/${subscribing.id}`}>{subscribing.nickname}</Link>
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                        <Menu.Item>좋아요</Menu.Item>
                        <Menu.Item>설정</Menu.Item>
                    </MenuTemplate>
                    <PageTemplate>
                        {pageData.length > 0 && pageData.map(v => (
                            <PageList
                                key={v.id}
                                id={v.id}
                                title={v.title}
                                content={v.content}
                                imagePath={v.imagepath}
                                videoPath={v.videopath}
                            />
                        ))}
                    </PageTemplate>
                </Fuck>
            </Template>
        </>
    );
}

export default PageForm;

const PageTemplate = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 10px;
`;

const MenuTemplate = styled(Menu)`
    height: 100%;
    width: 200px;
`;

const AvatarWrapper = styled(Avatar)`
    margin-right: 15px;
`;

const Fuck = styled.div`
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 200px 1fr;
`;

