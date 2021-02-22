import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import {
    LikeOutlined,
    DislikeOutlined,
    LikeTwoTone,
    DislikeTwoTone
} from "@ant-design/icons";

import {
    videoLikeRequestAction,
    videoLikeDeleteRequestAction,
    videoDislikeRequestAction,
    videoDislikeDeleteRequestAction
} from "../../redux/video/videoLike";


const VideoLike = ({ videoId }) => {
    const dispatch = useDispatch();
    const { loginData, isLoggedIn } = useSelector(state => state.login);
    const { watchVideoData } = useSelector(state => state.watchVideo);

    const myId = loginData?.id || null;

    // 싫어요 기능 모아두기 
    // CREATE DISLIKE
    const DislikerIdList = watchVideoData?.VideoDislikers.map(disliker => disliker.id) || [];

    const [isDislikerIdList, setIsDislikerIdList] = useState([...DislikerIdList]);

    const onToggleDislike = useCallback(() => {
        if (isLoggedIn === false) {
            return alert("로그인 하셔야 합니다...");
        }
        setIsDislikerIdList([myId, ...isDislikerIdList]);
        dispatch(videoDislikeRequestAction(videoId));
    }, [dispatch, videoId, myId, isLoggedIn, isDislikerIdList]);

    // DELETE DISLIKE
    const onToggleDislikeDelete = useCallback(() => {
        dispatch(videoDislikeDeleteRequestAction(videoId));
        setIsDislikerIdList([...isDislikerIdList].filter(id => id !== myId));
    }, [dispatch, myId, videoId, isDislikerIdList]);


    // 좋아요 기능 모아두기
    // 좋아요 concat
    const likerIdList = watchVideoData?.VideoLikers.map(liker => liker.id) || [];

    const [isLikerIdList, setIsLikerIdList] = useState([...likerIdList]);

    const onToggleLike = useCallback(() => {
        if (isLoggedIn === false) {
            return alert("로그인 하셔야 합니다...");
        }
        setIsLikerIdList([...isLikerIdList, myId]);
        dispatch(videoLikeRequestAction(videoId));
    }, [dispatch, videoId, isLoggedIn, isLikerIdList, myId]);

    // 좋아요 취소
    const onToggleLikeDelete = useCallback(() => {
        dispatch(videoLikeDeleteRequestAction(videoId));
        setIsLikerIdList([...isLikerIdList].filter(id => id !== myId));
    }, [dispatch, videoId, isLikerIdList, myId]);


    return (
        <div style={{ display: 'flex', marginLeft: '550px' }}>
            <div style={{ display: 'flex' }}>
                <div>
                    {[...isLikerIdList].includes(myId) === true ? (
                        <Button style={{ border: 'none' }} onClick={onToggleLikeDelete}>
                            <LikeTwoTone />
                        </Button>
                    ) : (
                        <Button style={{ border: 'none' }} onClick={onToggleLike}>
                            <LikeOutlined />
                        </Button>
                    )}
                </div>
                <div style={{ marginLeft: '4px' }}>{[...isLikerIdList].length}</div>
            </div>
            <div style={{ display: 'flex' }}>
                <div>
                    {[...isDislikerIdList].includes(myId) === true ? (
                        <Button style={{ border: 'none' }} onClick={onToggleDislikeDelete}>
                            <DislikeTwoTone />
                        </Button>
                    ) : (
                        <Button style={{ border: 'none' }} onClick={onToggleDislike}>
                            < DislikeOutlined />
                        </Button>
                    )}
                </div>
                <div style={{ marginLeft: '4px' }}>{[...isDislikerIdList].length}</div>
            </div>
        </div>
    );
}

export default VideoLike;