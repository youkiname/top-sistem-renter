import React from 'react';
import { Typography, Col, Row, Button, Table, Spin , Radio} from "antd";
import Search from "antd/es/input/Search";
import { FileExcelOutlined } from "@ant-design/icons";
import { apiController } from "../../api";

const { Title } = Typography

const columns = [

    {
        title: 'Продавец',
        dataIndex: 'full_name',
        key: 'full_name',
        width: '10%',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        width: '25%',
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        width: '25%',
    },
    {
        title: 'Кэшбек',
        dataIndex: 'cashback',
        key: 'cashback',
        width: '25%',
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
        width: '25%',
    }
]


export const SellersTable = () => {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const [searched, setSearched] = React.useState([])

    React.useEffect(() => {
        apiController.getSellers().then(res => {
            setData(res.data)
            setSearched(res.data)
            setLoading(false)
        })
    }, [])
    const onSearch = (e) => {
        const query = e
        function isIncludes(customer) {
            return customer.full_name.includes(query)
        }
        setSearched(data.filter(isIncludes))
        setLoading(false)
    }
    return (
        <>

            <Row justify="space-between">
                <Col>
                    <Title level={5}>Продавцы</Title>
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
                </Col>
            </Row>
            <Spin spinning={loading}>
                <Table columns={columns} dataSource={searched} style={{ marginTop: 30 }} />
            </Spin>
        </>
    );
};

