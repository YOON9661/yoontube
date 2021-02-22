import React, { useCallback, useState } from "react";
import { Button, Avatar } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import {
    subscribeRequestAction,
    unSubscribeRequestAction
} from "../../redux/subscribe";

const OtherSubscribe = ({ nick, idList, myId, otherId }) => {
    const dispatch = useDispatch();

    const [isIdList, setIsIdList] = useState(idList);

    // 팔로우 생성
    const onClickSubscribing = useCallback(() => {
        setIsIdList([myId, ...isIdList]);
        dispatch(subscribeRequestAction(otherId));
    }, [dispatch, myId, isIdList, otherId]);

    // 팔로우 취소
    const onClickUnSubscribing = useCallback(() => {
        setIsIdList([...isIdList].filter(id => id !== myId));
        dispatch(unSubscribeRequestAction(otherId));
    }, [dispatch, myId, isIdList, otherId])

    return (
        <ProfileWrapper>
            <div style={{ flex: '3' }}>
                <Avatar style={{ margin: '5px' }}>{nick}</Avatar> {nick}
                <div style={{ marginLeft: '15px', marginTop: '10px' }}>구독자 {[...isIdList].length}명</div>
            </div>
            <div style={{ flex: '1', marginRight: '10px' }}>
                {[...isIdList].includes(myId) ? (
                    <Button
                        type="primary"
                        onClick={onClickUnSubscribing}
                        style={{ marginTop: '30px' }}
                    >
                        구독 취소하기
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        onClick={onClickSubscribing}
                        style={{ marginTop: '30px' }}
                    >
                        구독하기
                    </Button>
                )}
            </div>
        </ProfileWrapper>
    );
}

export default OtherSubscribe;

const ProfileWrapper = styled.div`
    display: flex;
    margin-bottom: 60px;
`;


