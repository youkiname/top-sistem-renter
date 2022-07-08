import React from 'react';
import { Typography, Col, Row, Button, Table, Spin , Radio} from "antd";
import Search from "antd/es/input/Search";
import { FileExcelOutlined } from "@ant-design/icons";
import { apiController } from "../../api";

const { Title } = Typography

const columns = [
    {
        title: 'Количество сделок за неделю',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
    },
    {
        title: 'За месяц',
        dataIndex: 'birth_date',
        key: 'birth_date',
        width: '25%',
    },
    {
        title: 'Выручка за неделю',
        dataIndex: 'purchases_amount',
        key: 'purchases_amount',
        width: '25%',
    },
    {
        title: 'За месяц',
        dataIndex: 'purchases_sum',
        key: 'purchases_sum',
        width: '25%',
    }
]
const radioButtons = [
    {
        type: "week",
        text: "Неделя",
    },
    {
        type: "month",
        text: "Месяц"
    },
    {
        type: "year",
        text: "Год"
    }
]

export const SellersTable = () => {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        apiController.getCustomerStatistics().then(res => {
            setData(res.data)
            setLoading(false)
        })
    }, [])
    return (
        <>

            <Row justify="space-between">
                <Radio.Group defaultValue="week" style={{ margin: 15 }}>
                    {
                        radioButtons.map(radio => (
                            <Radio.Button
                                key={radio.type}
                                // onClick={handleVisitorRadioButton}
                                value={radio.type}>
                                {radio.text}

                            </Radio.Button>
                        ))
                    }
                </Radio.Group>
                <Col>
                    <Title level={5}>давцы</Title>
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
                </Col>
            </Row>
            <Spin spinning={loading}>
                <Table columns={columns} dataSource={data} style={{ marginTop: 30 }} />
            </Spin>
        </>
    );
};

