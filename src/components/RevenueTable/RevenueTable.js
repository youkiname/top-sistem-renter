import React from 'react';
import { Typography, Col, Row, Button, Table, Spin , Radio} from "antd";
import Search from "antd/es/input/Search";
import { FileExcelOutlined } from "@ant-design/icons";
import { apiController } from "../../api";

const { Title } = Typography

const columns = [
    {
        title: 'Продавец',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
    },
    {
        title: 'Количество сделок за неделю',
        dataIndex: 'transactions_per_week',
        key: 'transactions_per_week',
        width: '25%',
    },
    {
        title: 'За месяц',
        dataIndex: 'transactions_per_month',
        key: 'transactions_per_month',
        width: '25%',
    },
    {
        title: 'Выручка за неделю',
        dataIndex: 'income_per_week',
        key: 'income_per_week',
        width: '25%',
    },
    {
        title: 'За месяц',
        dataIndex: 'income_per_month',
        key: 'income_per_month',
        width: '25%',
    }
]


export const RevenueTable = () => {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const [searched, setSearched] = React.useState([])


    React.useEffect(() => {
        apiController.getStatisticsSellers().then(res => {
            setData(res.data)
            setLoading(false)
            setSearched(res.data)

        })
    }, [])
    const onSearch = (e) => {
        const query = e
        function isIncludes(customer) {
            return customer.name.includes(query)
        }
        setSearched(data.filter(isIncludes))
        setLoading(false)
    }
    return (
        <>

            <Row justify="space-between">

                <Col>
                    <Title level={5}>Выручка</Title>
                </Col>
                <Col style={{
                    display: 'flex',
                    gap: '16px'
                }}>
                    <Search
                        placeholder="Найти"
                        onSearch={onSearch}
                        style={{
                            width: 300,
                        }}
                    />
                    <Button icon={<FileExcelOutlined />}>Выгрузить в Excel</Button>
                    {/*<Button type="primary" icon={<PlusOutlined />}>Добавить арендатора</Button>*/}
                </Col>
            </Row>
            <Spin spinning={loading}>
                <Table
                    columns={columns}

                    dataSource={searched}
                    style={{ marginTop: 30 }} />
            </Spin>
        </>
    );
};

