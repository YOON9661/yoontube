import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Tabs } from "antd";
import { withRouter } from "react-router-dom"
import { LoadingOutlined } from '@ant-design/icons';
import styled from "styled-components";

import Template from "./template";
import MyVideo from "./profile/myVideo";
import OtherSubscribe from "./profile/otherSubscribe";
import { watchProfileRequestAction, profileInitializeAction } from "../redux/profile";


const OtherProfile = ({ match, history }) => {
    const { userId } = match.params;

    const dispatch = useDispatch();

    const { loginData } = useSelector(state => state.login);
    const myId = loginData?.id;

    const { profileData, isGettingProfile } = useSelector(state => state.profile);

    const otherId = profileData?.id
    const otherNickname = profileData?.nickname;
    const otherSubscriberIdList = profileData?.Subscribers.map(subscriber => subscriber.id) || [];
    const otherSubscribersNumber = profileData?.Subscribers.length || 0;
    const otherVideos = profileData?.Videos || [];
    const otherPosts = profileData?.Posts || [];

    useEffect(() => {
        if (userId) {
            if (userId === myId) {
                history.push("/profile");
            }
            dispatch(watchProfileRequestAction(userId));
        }
        return () => {
            dispatch(profileInitializeAction());
        }
    }, [dispatch, userId, myId, history]);

    return (
        <Template>
            {isGettingProfile === true ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            ) : (
                <>
                    <Content>
                        <OtherSubscribe
                            nick={otherNickname}
                            listNum={otherSubscribersNumber}
                            idList={[...otherSubscriberIdList]}
                            myId={myId}
                            otherId={otherId}
                        />
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="영상" key="1">
                                <VideoWrapper>
                                    {otherVideos.map(video => (
                                        <MyVideo
                                            key={video.id}
                                            id={video.id}
                                            nick={otherNickname}
                                            title={video.title}
                                            content={video.content}
                                            imagepath={video.imagepath}
                                        />
                                    ))}
                                </VideoWrapper>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="포스트" key="2">
                                <PostWrapper>
                                    {otherPosts.map(post => (
                                        <div key={post.id}>안녕</div>
                                    ))}
                                </PostWrapper>
                            </Tabs.TabPane>
                        </Tabs>
                    </Content>
                </>
            )}
        </Template>
    );
}

export default withRouter(OtherProfile);


const Content = styled.div`
    width: 850px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 70px;
`;

const VideoWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 15px;
`;

const PostWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 15px;
`;