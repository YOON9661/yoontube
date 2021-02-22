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
    videoPreviewRequestAction,
    thumbnailPreviewRequestAction,
    videoUploadInitializeAction
} from "../../redux/video/video";

// thumbnail == 썸네일 

const UploadForm = ({ history }) => {
    const dispatch = useDispatch();
    const { previewVideoData, previewThumbnailData } = useSelector(state => state.video);
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
    }, [videoData]);

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
                                            <video style={{ width: "300px" }} controls>
                                                <source src={videourl} type="video/mp4" />
                                            </video>
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
                                            <img style={{ width: "50%" }} src={thumbnailurl} alt={thumbnailurl} />
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