import React from 'react';
import { HeaderPage } from "../../Components/HeaderPage/HeaderPage";
import styled from "styled-components";
import { Button, Col, Form, Input, Row, DatePicker, message } from "antd";
import { apiController } from "../../api";
import { useNavigate } from "react-router-dom";

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;


export const AddArendatorPage = () => {
    const navigate = useNavigate()

    const [firstName, setFirstName] = React.useState()
    const [secondName, setSecondName] = React.useState()
    const [Phone, setPhone] = React.useState()
    const [Email, setEmail] = React.useState()
    const [Password, setPassword] = React.useState()
    const [birthDate, setBirthDate] = React.useState()

    const onSubmit = () => {
        apiController.addSeller({
            first_name: firstName,
            last_name: secondName,
            mobile: Phone,
            email: Email,
            password: Password,
            birth_date: birthDate,
        }).then(() => {
            navigate("../sellers")
        }).catch((error) => {
            if (error.response.status === 409) {
                message.error("Email уже занят")
            }
        })
    }
    return (
        <>
            <div style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24 }}>
                <HeaderPage title="Добавить продавца" />
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
                    onFinish={onSubmit}
                >

                    <Form.Item
                        label="Имя"
                        name="first_name"
                        rules={[
                            {
                                required: true,
                                message: 'Введите название организации',
                            },
                        ]}
                    >
                        <Input placeholder="Иван"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Фамилия"
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: 'Введите ФИО руководителя',
                            },
                        ]}
                    >
                        <Input placeholder="Иванов"
                            value={secondName}
                            onChange={e => setSecondName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Номер телефона"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp("^[\+]?[1-9]{1}[0-9]{10,10}$"),
                                message: "Неверный номер телефона"
                            },
                        ]}
                    >
                        <Input placeholder="+7 999 999 99 99"
                            value={Phone}
                            maxLength={12}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Введите e-mail',
                            },
                        ]}
                    >
                        <Input placeholder="mail@mail.ru"
                            value={Email}
                            onChange={e => setEmail(e.target.value)}
                        />
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
                        <DatePicker placeholder="Дата рождения"
                            value={birthDate}
                            onChange={moment => setBirthDate(moment?.toISOString().split('T')[0])}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Введите пароль',
                            },
                        ]}
                    >
                        <Input.Password value={Password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Item>


                    <Row justify="center">
                        <Col span={24}>
                            <Form.Item style={{ margin: '0 auto' }}>
                                <Button type="primary" htmlType="submit">
                                    Создать продавца
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </TableDiv>
        </>
    );
};


