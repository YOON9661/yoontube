import React from "react";
import { Avatar, Card } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MyVideos = ({ id, nick, title, imagepath }) => {
    return (
        <VideoConstruct
            hoverable
            cover={<img
                src={imagepath}
                alt={imagepath}
                style={{ width: '100%', height: '130px' }}
            />}
        >
            <Info>
                <Avatar>{nick}</Avatar>
                <Link to={`/video/${id}`}><div style={{ marginLeft: '30px' }}>{title}</div></Link>
            </Info>
        </VideoConstruct>
    );
}

export default MyVideos;


const VideoConstruct = styled(Card)`
    display: block;
    margin: 10px;
    width: 210px;
    height: 200px;
`;

const Info = styled.div`
    display: flex;
`;