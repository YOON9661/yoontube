import React, { useCallback } from "react";
import { Comment, Avatar, Form, Button, Input } from 'antd';
import styled from "styled-components";

import useInput from "../../hook/useInput";

const AddPostComment = () => {
    const [comment, onChangeComment] = useInput("");

    const onSubmit = useCallback(() => {

    }, []);

    return (
        <>
            <Comment
                avatar={
                    <Avatar>J</Avatar>
                }
                content={
                    <>
                        <FormWrapper onFinish={onSubmit}>
                            <Form.Item>
                                <Input.TextArea
                                    name="post-comment"
                                    placeholder="댓글을 입력하세요"
                                    onChange={onChangeComment}
                                    value={comment}
                                />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">댓글 업로드</Button>
                        </FormWrapper>
                    </>
                }
            />
        </>
    );
}

export default AddPostComment;

const FormWrapper = styled(Form)`
    margin: 0;
    padding: 0;
`;