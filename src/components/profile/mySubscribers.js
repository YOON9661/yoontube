import React from "react";
import { Avatar } from 'antd';
import styled from "styled-components"

const MySubscriberBlock = ({ nick }) => {
    return (
        <SubscribersWrapper>
            <Avatar>{nick[0]}</Avatar>
            <Nick>{nick}</Nick>
        </SubscribersWrapper>
    );
}

export default MySubscriberBlock;

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