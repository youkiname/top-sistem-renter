import React from 'react';
import {HeaderPage} from "../../Components/HeaderPage/HeaderPage";
import styled from "styled-components";
import {Button, Col, Form, Input, Row, Select, message, DatePicker} from "antd";
import {authController} from "../../api";
import {apiController} from "../../api";

const {Option} = Select

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

const ProfilePage = () => {
    const [form] = Form.useForm()
    const [currentUser, setCurrentUser] = React.useState({})
    const [products, setProducts] = React.useState([])
    const [productsId, setProductsId] = React.useState()
    const setUserData = (value, field) => {
        setCurrentUser({
            ...currentUser,
            [field]: value
        })
    }

    React.useEffect(() => {
        apiController.getProducts().then(res => {
            setProducts(res.data)
        })
        authController.getMe().then(res => {
            form.setFieldsValue(res.data)
            setCurrentUser(res.data)
        })

    }, [form])
    console.log(currentUser.category_id)
    const onSubmit = () => {
        apiController.updateProfile({
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            mobile: currentUser.mobile,
            birth_date: currentUser.birth_date,
            category_id: currentUser.category_id,
        }).then(res => {
            localStorage.setItem('name', res.data.full_name)
            message.success('Данные успешно обновлены.');
        })
    }
    return (
        <>
            <div style={{backgroundColor: "#FFF", marginTop: -48, marginBottom: 24}}>
                <HeaderPage title="Настройки профиля"/>
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
                    form={form}
                    onFinish={onSubmit}

                >

                    <Form.Item
                        label="Имя"
                        name="first_name"
                        rules={[
                            {
                                required: true,
                                message: 'Введите имя',
                            },
                        ]}
                    >
                        <Input placeholder="Иван" value={currentUser?.first_name}
                               onChange={e => setCurrentUser({...currentUser, first_name: e.target.value})}/>
                    </Form.Item>
                    <Form.Item
                        label="Фамилия"
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: 'Введите фамилию',
                            },
                        ]}
                    >
                        <Input placeholder="Иванов" value={currentUser.last_name}
                               onChange={e => setCurrentUser({...currentUser, last_name: e.target.value})}/>
                    </Form.Item>

                    <Form.Item
                        label="Телефон для связи"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Введите номер телефона для связи',
                            },
                        ]}
                    >
                        <Input placeholder="+7 999 999 99 99" value={currentUser.phone}
                               onChange={e => setCurrentUser({...currentUser, phone: e.target.value})}/>
                    </Form.Item>
                    <Form.Item
                        label="Категория"
                        name="category_id"
                    >
                        <Select
                            style={{width: 250}}
                            onChange={(category_id) => setCurrentUser({...currentUser,category_id })}
                        >
                            {
                                products.map(product => (
                                    <Option value={product.id} key={product.id}>{product.name} </Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Дата рождения"
                        name="birthDate"
                        rules={[
                            {
                                required: true,
                                message: 'Введите дату рождения',
                            },
                        ]}
                    >
                        <DatePicker onChange={(moment) => setCurrentUser({...currentUser, birth_date: moment?.toISOString().split("T")[0]})} placeholder="Введите дату"
                        />
                    </Form.Item>

                    <Row justify="center">
                        <Col span={24}>
                            <Form.Item style={{margin: '0 auto'}}>
                                <Button type="primary"
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

export {ProfilePage};