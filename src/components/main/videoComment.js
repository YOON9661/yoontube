import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Comment, Avatar, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { videoCommentRequestAction } from "../../redux/video/videoComment";

const VideoComment = ({ videoId }) => {
    const dispatch = useDispatch();

    const { isLoggedIn, loginData } = useSelector(state => state.login);
    const { watchVideoData } = useSelector(state => state.watchVideo);

    // 댓글 실시간
    const [isComment, setIsComment] = useState([...watchVideoData.Comments]);
    const videoCommentsNum = isComment.length; // 댓글 개수

    const [text, setText] = useState("");
    const onChangeText = useCallback((e) => {
        setText(e.target.value)
    }, []);

    const onSubmit = useCallback(() => {
        setIsComment([{
            id: 10000 + 1,
            content: text,
            User: {
                email: loginData?.email,
                nickname: loginData?.nickname
            }
        }, ...isComment]);
        setText("");
        dispatch(videoCommentRequestAction({ videoId, text }));
        // data: { videoId: 2, text: "hello world" }
    }, [dispatch, videoId, text, isComment,
        loginData?.email, loginData?.nickname]);

    return (
        <>
            {isLoggedIn === true ? (
                <Form onFinish={onSubmit}>
                    <Form.Item>
                        <Input.TextArea
                            rows={4}
                            onChange={onChangeText}
                            value={text}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                        >
                            Add Comment
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <div style={{ padding: '20px' }}>로그인해서 댓글을 입력해 보세요!</div>
            )}
            <div>댓글 수 : {videoCommentsNum}</div>
            {[...isComment]?.map((comment, idx) => (
                <Comment
                    key={idx}
                    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                    author={
                        <Link to={`/profile/${comment.User.id}`}>
                            {comment.User.nickname}
                        </Link>
                    }
                    avatar={
                        <Avatar>{comment.User.nickname[0]}</Avatar>
                    }
                    content={
                        <p>
                            {comment.content}
                        </p>
                    }
                >
                </Comment>
            ))}
        </>
    );
}

export default VideoComment;