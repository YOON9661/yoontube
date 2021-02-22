import React, { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom"
import { Form, Button, Input, Radio } from "antd";
import { PlusOutlined, DiffOutlined } from "@ant-design/icons";
import styled from "styled-components";

import Template from "../template";
import useInput from "../../hook/useInput";
import {
    videoUploadReqeustAction,
    videoUploadInitializeAction,
    videoPreviewRequestAction,
    videoPreviewInitializeAction,
    thumbnailPreviewRequestAction,
    thumbnailPreviewInitializeAction

} from "../../redux/video/video";

// thumbnail == 썸네일 

const UploadForm = ({ history }) => {
    const dispatch = useDispatch();
    const { previewVideoData, previewThumbnailData } = useSelector(state => state.video);
    const { isLoggedIn } = useSelector(state => state.login);

    const thumbnailurl = `http://localhost:3001${previewThumbnailData?.thumbnailurl}`;
    const videourl = `http://localhost:3001${previewVideoData?.videourl}`;

    const [title, onChangeTitle] = useInput("");
    const [description, onChangeDescription] = useInput("");

    const onSubmit = useCallback(() => {
        dispatch(videoUploadReqeustAction({ thumbnailurl, videourl, title, description }));
    }, [thumbnailurl, videourl, title, description, dispatch]);

    // video
    const videoInput = useRef();
    const onClickVideoUpload = useCallback(() => {
        videoInput.current.click();
    }, []);
    const onChangeVideo = useCallback((e) => {
        const videoFormData = new FormData();
        videoFormData.append("video", e.target.files[0]);
        dispatch(videoPreviewRequestAction(videoFormData));
    }, [dispatch]);

    // image
    const imageInput = useRef();
    const onClickImageInput = useCallback(() => {
        imageInput.current.click();
    }, []);
    const onChangeThumbnail = useCallback((e) => {
        const ThumbnailFormData = new FormData();
        ThumbnailFormData.append("thumbnail", e.target.files[0]);
        dispatch(thumbnailPreviewRequestAction(ThumbnailFormData));
    }, [dispatch]);

    const { videoData } = useSelector(state => state.video);

    // preview delete
    const onDeletePreviewVideo = useCallback(() => {
        dispatch(videoPreviewInitializeAction());
        setTimeout(history.push("/upload"), 2);
    }, [dispatch, history]);

    const onDeletePreviewImage = useCallback(() => {
        dispatch(thumbnailPreviewInitializeAction());
        setTimeout(history.push("/upload"), 2);
    }, [dispatch, history]);

    // useEffect
    useEffect(() => {
        if (videoData) {
            history.push("/");
        }
        return () => {
            if (videoData) {
                dispatch(videoUploadInitializeAction());
            }
        }
    }, [dispatch, videoData, history]);

    return (
        <>
            <Template>
                <h3
                    style={{
                        width: '140px',
                        marginTop: '50px',
                        marginRight: 'auto',
                        marginLeft: 'auto'
                    }}
                >
                    동영상 업로드 <DiffOutlined />
                </h3>
                {isLoggedIn === false ? (
                    <div style={{ margin: '30px' }}>로그인이 필요합니다...</div>
                ) : (
                    <FormWrapper>
                        <Form encType="multipart/form-data" onFinish={onSubmit}>
                            <Form.Item>
                                <VideoUpload>
                                    <input type="file" name="video" onChange={onChangeVideo} multiple hidden ref={videoInput} />
                                    <FileUploadForm>
                                        {previewVideoData === null ?
                                            (
                                                <ImageButton onClick={onClickVideoUpload}>
                                                    <PlusOutlined />
                                                    <br />
                                            비디오 업로드
                                                </ImageButton>
                                            ) : (
                                                <>
                                                    <video style={{ width: "300px" }} controls>
                                                        <source src={videourl} type="video/mp4" />
                                                    </video>
                                                    <div style={{ marginTop: '20px' }}>
                                                        <Button type="primary" onClick={onDeletePreviewVideo}>비디오 초기화</Button>
                                                    </div>
                                                    <h6 style={{ color: 'red', margin: '5px' }}>초기화 할 시엔 다른 파일을 넣으세요!</h6>
                                                </>
                                            )
                                        }
                                    </FileUploadForm>
                                </VideoUpload>
                            </Form.Item>
                            <Form.Item>
                                <ImageUpload>
                                    <input type="file" name="thumbnail" onChange={onChangeThumbnail} multiple hidden ref={imageInput} />
                                    <FileUploadForm>
                                        {previewThumbnailData === null ?
                                            (
                                                <ImageButton onClick={onClickImageInput}>
                                                    <PlusOutlined />
                                                    <br />
                                            썸네일 업로드
                                                </ImageButton>
                                            ) : (
                                                <>
                                                    <img
                                                        style={{ width: "50%" }}
                                                        src={thumbnailurl}
                                                        alt={thumbnailurl}
                                                    />
                                                    <div style={{ marginTop: '20px' }}>
                                                        <Button type="primary" onClick={onDeletePreviewImage}>초기화</Button>
                                                    </div>
                                                    <h6 style={{ color: 'red', margin: '5px' }}>초기화 후엔 반드시 다른 파일을 넣으세요!</h6>
                                                </>
                                            )}
                                    </FileUploadForm>
                                </ImageUpload>
                            </Form.Item>
                            <Form.Item>
                                <Radio.Group>
                                    <Radio.Button value="private">Private</Radio.Button>
                                    <Radio.Button value="public">Public</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item>
                                <Form.Item label="title" required tooltip="This is a required field">
                                    <Input
                                        placeholder="input your title"
                                        onChange={onChangeTitle}
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <Form.Item label="description" required tooltip="This is a required field">
                                    <Input
                                        placeholder="input your description"
                                        onChange={onChangeDescription}
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </FormWrapper>
                )}
            </Template>
        </>
    );
};

export default withRouter(UploadForm);

const ImageButton = styled(Button)`
    text-align: center;
    border: none;
`;

const FormWrapper = styled.div`
    display: block;
    margin-top: 50px;
    margin-right: auto; 
    margin-left: auto;
    width: 700px;
`;

const FileUploadForm = styled.div`
    text-align: center;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
`;

const VideoUpload = styled.div`
    padding: 60px;
    border: lightgray solid 1px;
    text-align: center;
`;

const ImageUpload = styled.div`
    padding: 60px;
    border: lightgray solid 1px;
    text-align: center;
`;