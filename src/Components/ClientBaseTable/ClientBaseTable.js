import React from 'react';
import { Typography, Col, Row, Button, Table, Spin } from "antd";
import Search from "antd/es/input/Search";
import { FileExcelOutlined } from "@ant-design/icons";
import { apiController } from "../../api";
import { CSV } from "../../csv/csv";
import { CSVLink } from "react-csv";


const { Title } = Typography

const columns = [
    {
        title: 'Фамилия Имя Отчество',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'День рождения',
        dataIndex: 'birth_date',
        key: 'birth_date'
    },
    {
        title: 'Кол-во покупок',
        dataIndex: 'purchases_amount',
        key: 'purchases_amount'
    },
    {
        title: 'Сумма покупок',
        dataIndex: 'purchases_sum',
        key: 'purchases_sum'
    }
]


const ClientBaseTable = () => {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const [searched, setSearched] = React.useState([])

    React.useEffect(() => {
        apiController.getCustomerStatistics().then(res => {
            setData(res.data)
            setLoading(false)
            setSearched(res.data)
        })
    }, [])

    const onSearch = (e) => {
        const query = e
        function isIncludes(customer) {
            return customer.name.toLowerCase().includes(query.toLowerCase())
        }
        setSearched(data.filter(isIncludes))
        setLoading(false)
    }

    const downloadCsv = () => {
        <CSVLink data={searched} target="_blank"/>
    }

    return (
        <>

            <Row justify="space-between">

                <Col>
                    <Title level={5}>Клиентская база</Title>
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
                    <Button icon={<FileExcelOutlined />} onClick={downloadCsv}>Выгрузить в Excel</Button>
                </Col>
            </Row>
            <Spin spinning={loading}>
                <Table
                    rowKey="card_number"
                    locale={{ emptyText: 'Ничего не найдено' }}
                    columns={columns}
                    dataSource={searched}
                    style={{ marginTop: 30 }}
                />
            </Spin>
        </>
    );
};

export { ClientBaseTable };
