import React from 'react';
import { Typography, Divider, Table, Badge } from "antd";
import { apiController } from "../../api";

const { Title } = Typography

const columns = [
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Арендатор',
        dataIndex: 'shop',
        key: 'shop',
        render: shop => {
            return (
                <div>{shop.name}</div>
            )
        }
    },
    {
        title: 'Комментарий',
        dataIndex: 'comment',
        key: 'comment',
    },
    {
        title: 'Статус',
        dataIndex: 'is_active',
        key: 'is_active',
        render: is_active => {
            return (
                <Badge status={is_active ? 'success' : 'error'} text={' '} />
            )
        }
    },
];

const AdsDashboardModule = () => {
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        apiController.getBanners().then(res => setData(res.data))
    }, [])
    return (
        <div style={{ width: '100%' }}>
            <Title level={5}>Реклама</Title>
            <Divider style={{ margin: '10px 0' }} />
            <Table size='small' pagination={{ defaultPageSize: 5 }} dataSource={data} columns={columns} />
        </div>
    );
};

export { AdsDashboardModule };
