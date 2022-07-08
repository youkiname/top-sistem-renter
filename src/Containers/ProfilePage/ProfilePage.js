import React from 'react';
import { HeaderPage } from "../../Components/HeaderPage/HeaderPage";
import styled from "styled-components";
import { Button, Col, Form, Input, Row, Select, Upload, message } from "antd";
import { authController } from "../../api";
import { apiController } from "../../api";

const { Option } = Select

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

const ProfilePage = () => {
    const [currentUser, setCurrentUser] = React.useState({})
    const [cities, setCities] = React.useState([])
    const [shoppingCenterName, setShoppingCenterName] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        apiController.getCities().then(res => {
            setCities(res.data)
        })
        authController.getMe().then(res => {
            setCurrentUser(res.data)
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
                        label="Название организации"
                        name="organizationName"
                        rules={[
                            {
                                required: true,
                                message: 'Введите название организации',
                            },
                        ]}
                    >
                        <Input placeholder="ООО “Иванов”" value={shoppingCenterName} onChange={e => setShoppingCenterName(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Руководитель"
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

                    {/* <Form.Item
                        label="Логотип"
                        name="logo"
                        rules={[
                            {
                                required: true,
                                message: 'Добавьте ваш логотип',
                            },
                        ]}
                    >
                        <Upload {...propsForLogo}>
                            <Button icon={<UploadOutlined />}>Добавить логотип</Button>
                        </Upload>
                    </Form.Item> */}

                    <Form.Item
                        label="Город"
                        name="city"
                    >
                        <Select
                            style={{ width: 250 }}
                        >
                            {
                                cities.map(city => (
                                    <Option value={city.id} key={city.id}>{city.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Адрес"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Введите адрес',
                            },
                        ]}
                    >
                        <Input placeholder="г. Москва, ул. Ленина, 123, корп. 2"
                            value={address}
                            onChange={e => setAddress(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Описание"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Введите описание торгового центра',
                            },
                        ]}
                    >
                        <Input.TextArea rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
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
