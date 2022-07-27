import React from 'react';
import { HeaderPage } from "../../Components/HeaderPage/HeaderPage";
import { Button, Col, Row, Typography, Table, Badge, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { apiController } from "../../api";

const { Title } = Typography

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

const AdsPollsPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [polls, setPolls] = React.useState([])
    React.useEffect(() => {
        apiController.getPolls().then(res => {
            setPolls(res.data)
            setLoading(false)
        })
    }, [])

    const handleActivateButton = (poll) => {
        setLoading(true)
        apiController.toggleActivePollState(poll.id, poll.is_active).then(res => {
            const updatedPolls = polls.map(item => {
                if (item.id == poll.id) {
                    item.is_active = !item.is_active
                }
                return item
            })
            setPolls(updatedPolls)
            setLoading(false)
        })
    }

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Имя',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Статус',
            dataIndex: 'is_active',
            key: 'is_active',
            width: '15%',

            render: is_active => {
                return (
                    <Badge status={is_active ? 'success' : 'error'}
                        text={is_active ? 'Активен' : 'Неактивен'}
                    />
                )
            }
        },
        {
            title: 'Дата создания',
            dataIndex: 'created_at',
            key: 'created_at',
            render: created_at => {
                return (
                    <div>{created_at.split('T')[0]}</div>
                )
            }
        },
        {
            title: 'Действия',
            dataIndex: 'is_active',
            key: 'is_active',
            width: '10%',

            render: (is_active, poll) => (
                <>
                    <Link to={`../edit-poll/${poll.id}`} type="link">Редактировать</Link>
                    <Button danger type="link"
                        onClick={() => handleActivateButton(poll)}
                    >{is_active ? 'Остановить' : 'Запустить'}</Button>
                </>
            )
        },
    ]

    return (
        <>
            <div style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24 }}>
                <HeaderPage title="Опросы" />
            </div>
            <TableDiv>
                <Row style={{ width: '100%', marginBottom: 16 }} justify="space-between" align="middle">
                    <Col>
                        <Title level={5} style={{ margin: 0 }}>Опросы</Title>
                    </Col>
                    <Col>
                        <Link to="/add-polls">

                            <Button type="primary" icon={<PlusOutlined />}>Создать</Button>
                        </Link>
                    </Col>
                </Row>
                <Row >
                    <Col span={24}>
                        <Spin spinning={loading}>
                            <Table columns={columns} dataSource={polls} />
                        </Spin>
                    </Col>
                </Row>
            </TableDiv>
        </>
    );
};

export { AdsPollsPage };
