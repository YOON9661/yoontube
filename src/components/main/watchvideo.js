import React, { useEffect, useCallback } from "react";
import { Avatar, Spin, Dropdown, Button, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LoadingOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";

import Template from "../template";
import VideoLike from "./videoLike";
import VideoComment from "./videoComment";

import { watchVideoRequestAction } from "../../redux/video/watchVideo";
import { watchVideoInitialize } from "../../redux/video/watchVideo";

import {
    videoDeleteRequestAction,
    videoDeleteInitializeAction
} from "../../redux/video/videoUd";

const WatchVideoForm = ({ match, history }) => {
    const dispatch = useDispatch();

    const { videoId } = match.params;
    const { videoDeleteData } = useSelector(state => state.videoUd);

    useEffect(() => {
        dispatch(watchVideoRequestAction(videoId));
        // 언마운트
        return () => {
            dispatch(watchVideoInitialize());
        }
    }, [dispatch]);

    useEffect(() => {
        if (videoDeleteData) {
            history.push("/");
        }
        return () => {
            if (videoDeleteData) {
                dispatch(videoDeleteInitializeAction());
            }
        }
    }, [videoDeleteData, dispatch]);


    //fucntion
    const onClickDeleteVideo = useCallback(() => {
        dispatch(videoDeleteRequestAction(videoId));
    }, [dispatch, videoId]);

    // data
    const { watchVideoData, isGettingVideo } = useSelector(state => state.watchVideo);

    const { loginData } = useSelector(state => state.login);
    const myId = loginData?.id || 'none';

    return (
        <>
            <Template>
                {isGettingVideo === false ? (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                ) : (
                    <>
                        <VideoWrapper>
                            <video
                                className="video-view"
                                style={{ innerWidth: 600 }}
                                controls
                                poster={watchVideoData?.imagepath}
                            >
                                <source src={watchVideoData?.videopath} type="video/mp4" />
                            </video>
                        </VideoWrapper>
                        <Info>
                            <div className="title">
                                <strong>{watchVideoData?.title}</strong>
                            </div>
                            <div style={{
                                borderBottom: '1px solid lightgray',
                                paddingBottom: '10px'
                            }}>
                                <VideoLike videoId={videoId} />
                            </div>
                            {/* userblock */}
                            <UserBlock style={{ display: 'flex' }}>
                                <div className="avatar" style={{ marginTop: '10px', margin: '20px', flex: '9' }} >
                                    <Avatar style={{ marginRight: '15px' }}>{watchVideoData?.User.nickname}</Avatar>
                                    <Link to={`/profile/${watchVideoData.User.id}`}>{watchVideoData?.User.nickname}</Link>
                                </div>
                                <div style={{ flex: '1', marginTop: '20px' }}>
                                    <Dropdown
                                        placement="topRight"
                                        overlay={
                                            <Menu>
                                                {myId === watchVideoData?.User.id ? (
                                                    <>
                                                        <Menu.Item>
                                                            <Button onClick={onClickDeleteVideo}>삭제</Button>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <Button>수정</Button>
                                                        </Menu.Item>
                                                    </>
                                                ) : (
                                                    <Menu.Item>
                                                        신고
                                                    </Menu.Item>
                                                )}
                                            </Menu>
                                        }
                                        arrow >
                                        <Button style={{ border: 'none' }}>
                                            <EllipsisOutlined />
                                        </Button>
                                    </Dropdown>
                                </div>
                            </UserBlock>

                            <div className="content" >
                                {watchVideoData?.content}
                            </div>
                            <div>
                                <VideoComment videoId={videoId} />
                            </div>
                        </Info>
                    </>
                )}
            </Template>
        </>
    );
}

export default withRouter(WatchVideoForm);

const Info = styled.div`
    width: 820px;
    padding: 5px;
    margin-left: auto;
    margin-right: auto;

    .title {
        margin-top: 5px;
        margin-left: 30px;
        margin-bottom: 15px;
    }

    .content {
        padding-left: 40px;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid lightgray;
    }
`;

const VideoWrapper = styled.div`
    width: 820px;
    height: 450px;
    background-color: black;
    text-align: center;
    display: block;
    border: 1px solid lightgray;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;

    .video-view {
        height: 100%
    }
`;

const UserBlock = styled.div`

`;