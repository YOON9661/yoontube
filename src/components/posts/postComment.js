import React from "react";
import { Comment, Avatar } from 'antd';

const PostComment = ({ content }) => {
    return (
        <>
            <Comment
                actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                author="jiwon"
                avatar={
                    <Avatar>J</Avatar>
                }
                content={
                    <p>
                        {content}
                    </p>
                }
            >
            </Comment>
        </>
    );
}

export default PostComment;