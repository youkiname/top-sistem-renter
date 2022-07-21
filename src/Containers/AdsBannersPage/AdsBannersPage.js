import React from 'react';
import {HeaderPage} from "../../Components/HeaderPage/HeaderPage";
import { Button, Col, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {AdsBannersTable} from "../../Components/AdsBannersTable/AdsBannersTable";
import styled from "styled-components";
import { Link } from "react-router-dom";

const { Title } = Typography

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

export const AdsBannersPage = () => {
    return (
        <>
            <div style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24 }}>
                <HeaderPage title="Рекламные баннеры" />
            </div>
            <TableDiv>
                <Row style={{ width: '100%', marginBottom: 16 }} justify="space-between" align="middle">
                    <Col>
                        <Title level={5} style={{ margin: 0 }}>Баннеры</Title>
                    </Col>
                    <Col>
                        <Link to="/add-banner">
                            <Button type="primary" icon={<PlusOutlined />}>Создать</Button>
                        </Link>
                    </Col>
                </Row>
                <Row >
                    <Col span={24}>
                        <AdsBannersTable />
                    </Col>
                </Row>
            </TableDiv>
        </>
    );
};