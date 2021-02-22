import React, { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { PlusOutlined, HighlightOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";


import Template from "../template";
import useInput from "../../hook/useInput";

import {
    postPreviewReqeustAction,
    postPreviewInitializeAction,
    postUploadReqeustAction,
    postUploadInitializeAction
} from "../../redux/post";

// insta처럼 만들자.
const PostForm = ({ history }) => {
    const dispatch = useDispatch();

    const { previewImageData, postedData } = useSelector(state => state.post);
    const { isLoggedIn } = useSelector(state => state.login);
    const url = previewImageData?.url || null;

    const [description, onChangeDescription] = useInput("");

    // image preview upload
    const onClickImageInput = useCallback(() => {
        imageInput.current.click();
    }, []);
    const imageInput = useRef();
    const onChangeImage = useCallback((e) => {
        const imagePreviewFormData = new FormData();
        imagePreviewFormData.append("img", e.target.files[0])
        dispatch(postPreviewReqeustAction(imagePreviewFormData));
    }, [dispatch]);

    // submit
    const onSubmit = useCallback(() => {
        dispatch(postUploadReqeustAction({ description, url }));
        history.push("/post");
    }, [description, url, history, dispatch]);

    const onDeletePreviewImage = useCallback(() => {
        dispatch(postPreviewInitializeAction());
        history.push("/post");
    }, [dispatch, history]);

    // useEffect
    useEffect(() => {
        if (postedData) {
            history.push("/profile");
        }
        return () => {
            if (postedData) {
                dispatch(postUploadInitializeAction());
            }
        }
    }, [dispatch, postedData, history]);

    return (
        <>
            <Template>
                <h3 style={{
                    width: '200px',
                    marginTop: '50px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center'
                }}>
                    커뮤니티 업로드 <HighlightOutlined />
                </h3>
                {isLoggedIn === false ? (
                    <div style={{ margin: '30px' }}>로그인이 필요합니다...</div>
                ) : (
                    <FormWrapper encType="multipart/form-data" onFinish={onSubmit}>
                        <Form.Item>
                            <ImageUpload>
                                <input
                                    name="img"
                                    type="file"
                                    onChange={onChangeImage}
                                    multiple
                                    hidden
                                    ref={imageInput}
                                />

                                {previewImageData === null ?
                                    (
                                        <div style={{ textAlign: 'center' }}>
                                            <Button
                                                style={{ border: 'none', padding: '30px', marginBottom: '20px' }}
                                                onClick={onClickImageInput}
                                            >
                                                <PlusOutlined />
                                                <br />
                                                <div>파일을 업로드 해보세요!</div>
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ textAlign: 'center' }}>
                                                <ImgWrapper
                                                    name="image-preview"
                                                    src={url}
                                                    alt={url}
                                                />
                                            </div>
                                            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                                <Button type='primary' onClick={onDeletePreviewImage}>초기화</Button>
                                                <h6 style={{ color: 'red', margin: '5px' }}>초기화 할 시엔 다른 파일을 넣으세요!</h6>
                                            </div>
                                        </>
                                    )}

                            </ImageUpload>
                        </Form.Item>
                        <Form.Item>
                            <Input.TextArea
                                name="description"
                                onChange={onChangeDescription}
                                placeholder="text를 입력하세요!"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">업로드</Button>
                        </Form.Item>
                    </FormWrapper>
                )}
            </Template>
        </>
    );
}

export default withRouter(PostForm);

const FormWrapper = styled(Form)`
    width: 600px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid lightgray;
    padding: 30px;
`;

const ImageUpload = styled.div`

`;

const ImgWrapper = styled.img`
    display: inline-block;
    max-width: 530px;
    max-height: 600px;
`;
