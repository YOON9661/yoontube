import React from "react";
import { Avatar, Card } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
    SettingOutlined,
    CommentOutlined,
    EllipsisOutlined,
    LikeOutlined
} from "@ant-design/icons";


// key={post.id}
// id={post.id}
// image={post.image}
// userId={post.User.id}
// userNick={post.User.id}

const MyPosts = ({ id, userId, userNick, content, image, createdAt }) => {
    return (
        <CardWrapper>
            <Card
                actions={[
                    <SettingOutlined key="setting" />,
                    <LikeOutlined />,
                    <CommentOutlined />,
                    <EllipsisOutlined key="ellipsis" />
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{userNick}</Avatar>}
                    title={<Link to={`/profile/${userId}`}>{userNick}</Link>}
                    description={
                        <>
                            <img
                                style={{
                                    maxWidth: '500px',
                                    maxHeight: '600px',
                                    marginTop: '20px',
                                    marginBottom: '20px'
                                }}
                                src={image}
                                alt={image}
                            />
                            <div>{content}</div>
                            <div style={{ padding: '10px' }}>{createdAt}</div>
                        </>
                    }
                />
            </Card>
        </CardWrapper>
    );
}

export default MyPosts;


const CardWrapper = styled.div`
    display: block;
    margin-right: auto;
    margin-top: 40px;
    width: 600px;
`;