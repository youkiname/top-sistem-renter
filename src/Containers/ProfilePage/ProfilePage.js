import React from 'react';
import { HeaderPage } from "../../components/HeaderPage/HeaderPage";
import styled from "styled-components";
import { Button, Col, Form, Input, Row, Select, message, DatePicker, Spin } from "antd";
import { authController } from "../../api";
import { apiController } from "../../api";
import moment from 'moment';

const { Option } = Select

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

const ProfilePage = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(true)
    const [currentUser, setCurrentUser] = React.useState({})
    const [categories, setCategories] = React.useState([])
    const [categoryId, setCategoryId] = React.useState()
    const [legalForm, setLegalForm] = React.useState()
    const setUserData = (value, field) => {
        setCurrentUser({
            ...currentUser,
            [field]: value
        })
    }

    React.useEffect(() => {
        apiController.getShopCategories().then(res => {
            setCategories(res.data)
        })
        authController.getMe().then(res => {
            res.data.birth_date = moment(res.data.birth_date)
            res.data.category_id = res.data.shop.category.id
            res.data.legal_form = res.data.shop.legal_form
            form.setFieldsValue(res.data)
            setCurrentUser(res.data)
            setCategoryId(res.data.shop.category.id)
            setLegalForm(res.data.shop.legal_form)
            setLoading(false)
        })

    }, [form])
    const onSubmit = () => {
        setLoading(true)
        apiController.updateProfile({
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            phone: currentUser.mobile,
            birth_date: currentUser.birth_date.toISOString().split("T")[0],
            category_id: categoryId,
            legal_form: legalForm
        }).then(res => {
            localStorage.setItem('name', res.data.full_name)
            message.success('Данные успешно обновлены.');
            setLoading(false)
        })
    }
    return (
        <>
            <div style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24 }}>
                <HeaderPage title="Настройки профиля" />
            </div>

            <Spin spinning={loading}>
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
                                onChange={e => setCurrentUser({ ...currentUser, first_name: e.target.value })} />
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
                                onChange={e => setCurrentUser({ ...currentUser, last_name: e.target.value })} />
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
                            <Input placeholder="+7 999 999 99 99" value={currentUser.mobile}
                                onChange={e => setCurrentUser({ ...currentUser, mobile: e.target.value })} />
                        </Form.Item>

                        <Form.Item
                            label="Дата рождения"
                            name="birth_date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите дату рождения',
                                },
                            ]}
                        >
                            <DatePicker
                                onChange={(moment) => setCurrentUser({ ...currentUser, birth_date: moment })}
                                placeholder="Введите дату"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Категория"
                            name="category_id"
                        >
                            <Select
                                style={{ width: 250 }}
                                onChange={(category_id) => setCategoryId(category_id)}
                            >
                                {
                                    categories.map(product => (
                                        <Option value={product.id} key={product.id}>{product.name} </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Правовая форма"
                            name="legal_form"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите правовую форму юр.лица',
                                },
                            ]}
                        >
                            <Input placeholder="ОАО"
                                onChange={e => setLegalForm(e.target.value)} />
                        </Form.Item>

                        <Row justify="center">
                            <Col span={24}>
                                <Form.Item style={{ margin: '0 auto' }}>
                                    <Button type="primary" htmlType="submit">
                                        Сохранить
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </TableDiv>
            </Spin>
        </>
    );
};

export { ProfilePage };