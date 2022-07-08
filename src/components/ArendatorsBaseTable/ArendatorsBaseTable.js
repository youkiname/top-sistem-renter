import React from 'react';
import { Button, Col, Row, Table, Typography, Spin } from "antd";
import Search from "antd/es/input/Search";
import { FileExcelOutlined, PlusOutlined } from "@ant-design/icons";
import { apiController } from "../../api";

const { Title } = Typography

const columns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Фамилия Имя Отчество',
        dataIndex: 'renter_name',
        key: 'renter_name'
    },
    {
        title: 'Кол-во сделок (неделя)',
        dataIndex: 'transactions_per_week',
        key: 'transactions_per_week'
    },
    {
        title: 'Кол-во сделок (месяц)',
        dataIndex: 'transactions_per_month',
        key: 'transactions_per_month'
    },
    {
        title: 'Выручка (неделя)',
        dataIndex: 'income_per_week',
        key: 'income_per_week'
    },
    {
        title: 'Выручка (месяц)',
        dataIndex: 'income_per_month',
        key: 'income_per_month'
    }
]

const ArendatorsBaseTable = () => {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        apiController.getShopsIncomeStatistics().then(res => {
            setData(res.data)
            setLoading(false)
        })
    }, [])
    return (
        <>
            <Row justify="space-between">
                <Col>
                    <Title level={5}>База арендаторов</Title>
                </Col>
                <Col style={{
                    display: 'flex',
                    gap: '16px'
                }}>
                    <Search
                        placeholder="Найти"
                        onSearch={() => { }}
                        style={{
                            width: 300,
                        }}
                    />
                    <Button icon={<FileExcelOutlined />}>Выгрузить в Excel</Button>
                    <Button type="primary" icon={<PlusOutlined />}>Добавить арендатора</Button>
                </Col>
            </Row>
            <Spin spinning={loading}>
                <Table columns={columns} dataSource={data} style={{ marginTop: 30 }} />
            </Spin>
        </>
    );
};

export { ArendatorsBaseTable };
