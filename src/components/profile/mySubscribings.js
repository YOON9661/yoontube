import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button } from 'antd';
import styled from "styled-components"

import {
    unSubscribeRequestAction,
    subscribeRequestAction
} from "../../redux/subscribe"

const MySubscribingsBlock = ({ nick, id }) => {
    const dispatch = useDispatch();

    const [subscribingOk, setSubscribingOk] = useState(true);

    const onDeleteSubscribing = useCallback(() => {
        dispatch(unSubscribeRequestAction(id));
        setSubscribingOk(false);
    }, [dispatch, id]);

    const onCreateSubscribing = useCallback(() => {
        dispatch(subscribeRequestAction(id));
        setSubscribingOk(true);
    }, [dispatch, id]);

    return (
        <SubscribersWrapper>
            <Avatar>{nick[0]}</Avatar>
            <Nick>{nick}</Nick>
            {subscribingOk === true ? (
                <Button
                    onClick={onDeleteSubscribing}
                    style={{
                        backgroundColor: 'red',
                        border: 'none',
                        color: "white",
                        width: '120px',
                        marginLeft: '140px'
                    }}>구독 취소하기</Button>
            ) : (
                <Button
                    onClick={onCreateSubscribing}
                    style={{
                        backgroundColor: 'red',
                        border: 'none',
                        color: "white",
                        width: '120px',
                        marginLeft: '140px'
                    }}>구독하기</Button>
            )}
        </SubscribersWrapper>
    );
}

export default MySubscribingsBlock;

const SubscribersWrapper = styled.div`
    display: flex;
    width: 400px;
    margin: 20px;
    padding: 20px;
    border: 1px solid lightgray;
`;

const Nick = styled.div`
    margin-left: 30px;
`;