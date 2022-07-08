import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="К сожалению, такой страницы не существует"
            extra={<Link to="/"><Button type="primary">На главную</Button></Link>}
        />
    );
};

export {NotFoundPage};
