import React from "react";
import { Avatar, Button } from 'antd';
import styled from "styled-components"

const MySubscribingsBlock = ({ nick }) => {
    return (
        <SubscribersWrapper>
            <Avatar>{nick[0]}</Avatar>
            <Nick>{nick}</Nick>
            <Button style={{
                backgroundColor: 'red',
                border: 'none',
                color: "white",
                width: '120px',
                marginLeft: '140px'
            }}>구독 취소하기</Button>
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