import React from 'react';
import { HeaderPage } from "../../Components/HeaderPage/HeaderPage";
import styled from "styled-components";
import { Button, Col, Form, Input, Row, Select,DatePicker, message } from "antd";
import { authController } from "../../api";
import { apiController } from "../../api";

const { Option } = Select

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

const ProfilePage = () => {
    const [currentUser, setCurrentUser] = React.useState({})
    const [products, setProducts] = React.useState([])
    const [shoppingCenterName, setShoppingCenterName] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [management, setManagement] = React.useState('')

    React.useEffect(() => {
        apiController.getProducts().then(res => {
            setProducts(res.data)
        })
        authController.getMe().then(res => {
            setCurrentUser(res.data)

        })
        apiController.getManagement().then(res =>{
            setManagement(res.data)
        })
    }, [])

    const onSubmit = () => {
        apiController.updateProfile({
            first_name: currentUser.first_name,
            phone: currentUser.phone,
            shopping_center_name: shoppingCenterName,
            address: address,
            description: description,
        }).then(res => {
            message.success('Данные успешно обновлены.');
        })
    }

    return (
        <>
            <div style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24 }}>
                <HeaderPage title="Настройки профиля" />
            </div>

            <TableDiv>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    onFinish={() => {
                    }}
                    onFinishFailed={() => {
                    }}
                >
                    <Form.Item
                        label="Арендадатор"
                        name="director"
                        rules={[
                            {
                                required: true,
                                message: 'Введите ФИО руководителя',
                            },
                        ]}
                    >
                        <Input placeholder="Иванов Иван Иванович" value={currentUser.first_name} onChange={e => setCurrentUser({ ...currentUser, first_name: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        label="Телефон для связи"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Введите номер телефона для связи',
                            },
                        ]}
                    >
                        <Input placeholder="+7 999 999 99 99" value={currentUser.phone} onChange={e => setCurrentUser({ ...currentUser, phone: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        label="Категория"
                        name="products"
                    >
                        <Select
                            style={{ width: 250 }}
                        >
                            {
                                products.map(product => (
                                    <Option value={product.id} key={product.id}>{product.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Оформление"
                        name="products"
                    >
                        <Select
                            placeholder="Самозанятый, ИП, ООО"
                            style={{ width: 250 }}
                        >
                            {
                                products.map(product => (
                                    <Option value={product.id} key={product.id}>{product.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label = "Дата рождения"
                        name = "birthDate"
                        rules = {[
                        {
                            required: true,
                            message: 'Введите дату рождения',
                        },
                    ]}
                        >
                            <DatePicker placeholder ="Введите дату"
                            />
                    </Form.Item>

                    <Row justify="center">
                        <Col span={24}>
                            <Form.Item style={{ margin: '0 auto' }}>
                                <Button type="primary" htmlType="submit"
                                    onClick={onSubmit}
                                >
                                    Сохранить
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </TableDiv>
        </>
    );
};

export { ProfilePage };
