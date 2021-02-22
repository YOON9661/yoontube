import React from "react";
import { Card, Avatar } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

import PostComment from "./postComment";
import AddPostComment from "./addComment";

// key={postData.id}
// id={postData.id}
// userId={postData.User.id}
// userNick={postData.User.nickname}
// content={postData.content}
// image={postData.image}
// comments={postData.Comments}

const PostsData = ({ id, userId, userNick, content, image, comments }) => {
    return (
        <>
            <CardWrapper>
                <Card>
                    <Card.Meta
                        avatar={<Avatar>{userNick}</Avatar>}
                        title={<Link to={`/profile/${userId}`}>{userNick}</Link>}
                        description={
                            <>
                                <img
                                    style={{
                                        maxWidth: '500px',
                                        maxHeight: '600px',
                                        marginTop: '30px',
                                        marginBottom: '30px'
                                    }}
                                    src={image}
                                    alt={image}
                                />
                                <div>{content}</div>
                            </>
                        }
                    />
                </Card>
                <CommentWrapper>
                    <AddPostComment />
                    {comments.length > 0 && comments.map(comment => (
                        <PostComment key={comment.id} content={comment.content} />
                    ))}
                </CommentWrapper>

            </CardWrapper>
        </>
    );
}

export default PostsData;

const CommentWrapper = styled.div`
    display: block;
    border: 1px solid #F6F6F6;
`;

const CardWrapper = styled.div`
    display: block;
    margin-left: 300px;
    margin-right: auto;
    margin-top: 40px;
    width: 600px;
`;