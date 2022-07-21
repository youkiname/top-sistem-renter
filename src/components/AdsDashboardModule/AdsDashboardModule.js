import React from 'react';
import { Typography, Divider, Table } from "antd";
import { apiController } from "../../api";
import moment from 'moment';

const { Title } = Typography

const columns = [
    {
        title: 'Дата',
        dataIndex: 'created_at',
        key: 'created_at',
        width: '20%',
        render: (created_at) => (<span>{moment(created_at).utc().format('YYYY-MM-DD hh:mm')}</span>)
    },
    {
        title: 'Сумма чека',
        dataIndex: 'amount',
        key: 'amount',
        width: '25%',
    },
    {
        title: 'Баллы',
        dataIndex: 'bonuses_offset',
        key: 'bonuses_offset',
        width: '25%',
    },
    {
        title: 'Продавец',
        dataIndex: 'customer',
        key: 'customer',
        width: '25%',
        render: (customer) => (<span>{customer.name}</span>)
    },
];

const AdsDashboardModule = () => {
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        apiController.getBanners().then(res => setData(res.data))
    }, [])
    return (
        <div style={{ width: '100%' }}>
            <Title level={5}>Транзакции</Title>
            <Divider style={{ margin: '10px 0' }} />
            <Table
                rowKey="created_at"
                size='small'
                pagination={{ defaultPageSize: 5 }}
                dataSource={data}
                columns={columns} />
        </div>
    );
};

export { AdsDashboardModule };
