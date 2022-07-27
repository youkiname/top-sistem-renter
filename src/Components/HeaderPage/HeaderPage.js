import React from 'react';
import {PageHeader} from "antd";
import {useNavigate} from "react-router-dom";

export const HeaderPage = ({title, subTitle}) => {
    const navigate = useNavigate()
    return (
        <PageHeader
            className="site-page-header"
            onBack={() => navigate('/', {replace: true})}
            title={title}
            subTitle={subTitle}
        />
    );
};

