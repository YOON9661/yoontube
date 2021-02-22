import React from "react";
import { Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";



const PageList = ({ id, title, content, imagePath, videoPath }) => {

    return (
        <>
            <CardWrapper>
                <Card
                    hoverable
                    style={{ widht: 230, height: 220 }}
                    cover={<img
                        style={{ width: '100%', height: '140px' }}
                        src={imagePath}
                        alt={imagePath} />}
                >
                    <Info
                        avatar={<Avatar>J</Avatar>}
                        description={<Link to={`/video/${id}`}>{title}</Link>}
                    />
                </Card>
            </CardWrapper>
        </>
    );
}

export default PageList;

const Info = styled(Card.Meta)`
    margin-left: 0px;
    margin-right: auto;
    padding: 10px;
`;

const CardWrapper = styled.div`
    margin: 8px;
    display: block;
    padding: 10px;
`;