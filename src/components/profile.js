import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Spin, Menu } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import styled from "styled-components";

import Template from "./template";
import MySubscriberBlock from "./profile/mySubscribers";
import MySubscribingsBlock from "./profile/mySubscribings";
import MyVideos from "./profile/myVideo";
import MyLikeVideos from "./profile/myLikeVideos";

import MyPosts from "./profile/myPosts";


import { watchProfileRequestAction, profileInitializeAction } from "../redux/profile";

const ProfileForm = () => {
    const dispatch = useDispatch();
    const { loginData, isLoggedIn } = useSelector(state => state.login)
    const { profileData, isGettingProfile } = useSelector(state => state.profile);

    const [lookMenu, setLookMenu] = useState(0);

    useEffect(() => {
        if (loginData !== null) {
            dispatch(watchProfileRequestAction(loginData?.id));
        }
        return () => {
            setLookMenu(0);
            dispatch(profileInitializeAction());
        }
    }, [dispatch]);


    const nickname = profileData?.nickname;
    const subscriberList = profileData?.Subscribers || [];
    const subscribersNumber = profileData?.Subscribers.length || 0;
    const subscribingList = profileData?.Subscribings || [];
    const myVideos = profileData?.Videos || [];
    const myLikeVideos = profileData?.VideoLikings || [];
    const myPosts = profileData?.Posts || [];

    return (
        <>
            <Template>
                {isLoggedIn ? (
                    <ProfileWrapper>
                        {isGettingProfile === true ? (
                            <>
                                <SpinWrapper indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                            </>
                        ) : (
                            <>
                                <div style={{ display: "flex", padding: '10px', marginLeft: '30px' }}>
                                    <Avatar>{nickname}</Avatar>
                                    <div style={{ marginLeft: '20px' }}>{nickname}</div>
                                </div>
                                <div style={{ marginLeft: '50px' }}>
                                    구독자: {subscribersNumber} 명
                                </div>
                                <br />
                                <Menu
                                    mode="horizontal"
                                    style={{ display: 'flex', textAlign: 'center', marginTop: '40px' }}
                                >
                                    <MenuItem onClick={() => { setLookMenu(0) }} >나의 구독</MenuItem>
                                    <MenuItem onClick={() => { setLookMenu(1) }} >내 구독자</MenuItem>
                                    <MenuItem onClick={() => { setLookMenu(2) }} >내 동영상</MenuItem>
                                    <MenuItem onClick={() => { setLookMenu(3) }} >커뮤니티</MenuItem>
                                    <MenuItem onClick={() => { setLookMenu(4) }} >좋아요를 누른 동영상</MenuItem>
                                </Menu>
                                <br />
                                {lookMenu === 0 && (
                                    <>
                                        <div>내가 구독하는 사람들</div>
                                        {[...subscribingList].map(subscriber => (
                                            <MySubscribingsBlock
                                                key={subscriber.id}
                                                id={subscriber.id}
                                                nick={subscriber.nickname}
                                            />
                                        ))}
                                    </>
                                )}
                                {lookMenu === 1 && (
                                    <>
                                        <div>나를 구독하는 사람들</div>
                                        {[...subscriberList].map(subscribing => (
                                            <MySubscriberBlock
                                                key={subscribing.id}
                                                id={subscribing.id}
                                                nick={subscribing.nickname}
                                            />
                                        ))}
                                    </>
                                )}
                                {lookMenu === 2 && (
                                    <>
                                        <div>내 비디오</div>
                                        <VideoWrapper>
                                            {[...myVideos].map(video => (
                                                <MyVideos
                                                    key={video.id}
                                                    id={video.id}
                                                    nick={nickname}
                                                    title={video.title}
                                                    content={video.content}
                                                    imagepath={video.imagepath}
                                                />
                                            ))}
                                        </VideoWrapper>
                                    </>
                                )}
                                {lookMenu === 3 && (
                                    <>
                                        <div>커뮤니티</div>
                                        <PostWrapper>
                                            {[...myPosts].map(post => (
                                                <MyPosts
                                                    key={post.id}
                                                    id={post.id}
                                                    image={post.image}
                                                    content={post.content}
                                                    userNick={nickname}
                                                    createdAt={post.createdAt}
                                                />
                                            ))}
                                        </PostWrapper>
                                    </>
                                )}
                                {lookMenu === 4 && (
                                    <>
                                        <div>좋아요를 누른 영상</div>
                                        <VideoWrapper>
                                            {[...myLikeVideos].map(video => (
                                                <MyLikeVideos
                                                    key={video.id}
                                                    id={video.id}
                                                    nick={nickname}
                                                    title={video.title}
                                                    content={video.content}
                                                    imagepath={video.imagepath}
                                                />
                                            ))}
                                        </VideoWrapper>
                                    </>
                                )}
                            </>
                        )}
                    </ProfileWrapper>
                ) : (
                    <>
                        <div>로그인이 필요합니다!</div>
                    </>
                )}
            </Template>
        </>
    );
};

export default ProfileForm;

const ProfileWrapper = styled.div`
    display: block;
    width: 880px;
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
`;

const SpinWrapper = styled(Spin)`
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
`;

const MenuItem = styled(Menu.Item)`
    flex: 1;
    text-align: 'center';
    border: none;
`;

const VideoWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 15px;
    align-items: center;
`;

const PostWrapper = styled.div`
    margin-left: 10px;
    margin-right: auto;
    margin-top: 30px;
`;