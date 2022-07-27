import React from 'react';
import { HeaderPage } from "../../Components/HeaderPage/HeaderPage";
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Typography,
} from "antd";
import styled from "styled-components";
import { MinusCircleOutlined } from "@ant-design/icons";
import { apiController } from "../../api";
import { useParams } from "react-router-dom";

const { Title } = Typography

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

const EditPollPage = () => {
    const [form] = Form.useForm();
    const [shoppingCenterId] = React.useState()
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [choices, setChoices] = React.useState([])
    let { id } = useParams();
    React.useEffect(() => {
        apiController.getPolls(id).then(res => {
            setTitle(res.data.title)
            setDescription(res.data.description)
            setChoices(res.data.choices)

        })
    }, [id])

    const removeChoice = (index) => {
        setChoices(choices.filter((el, i) => i !== index))
    }

    const addChoice = (value) => {
        setChoices([...choices, value])
    }

    const onChangeChoice = (e, index) => {
        const value = e.target.value
        if (choices.length <= index) {
            return addChoice(value)
        }
        setChoices(choices.map((el, i) => {
            if (i !== index) {
                return el
            }
            return value
        }))

    }

    const onSubmit = async () => {
        await apiController.savePoll({
            title,
            description,
            shopping_center_id: shoppingCenterId,
            choices
        });
    }

    return (
        <>
            <div
                style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24, paddingBottom: 24, paddingLeft: 24 }}>
                <HeaderPage title="Редактировать опрос" />
            </div>

            <TableDiv style={{ marginTop: 24, paddingBottom: 24 }}>
                <Title level={5}>Опрос</Title>
                <Divider />
                <Form form={form} layout="vertical">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Заголовок опроса">
                                <Input placeholder="Заголовок опроса"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Описание">
                                <Input placeholder="Описание"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form name="dynamic_form_item">
                                <Form.List
                                    name="names"
                                    rules={[
                                        {
                                            validator: async (_, names) => {
                                                if (!names || names.length < 2) {
                                                    return Promise.reject(new Error('Должно быть минимум 2 варианта ответа'));
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    label={index === 0 ? 'Вариант ответа' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "Введите вариант ответа или удалите поле",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="Вариант ответа"
                                                            style={{
                                                                width: '60%',
                                                            }}
                                                            onChange={e => onChangeChoice(e, index)}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 1 ? (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => {
                                                                remove(field.name)
                                                            }}
                                                        />
                                                    ) : null}
                                                </Form.Item>
                                            ))}

                                        </>
                                    )}
                                </Form.List>
                            </Form>
                        </Col>
                    </Row>
                </Form>
            </TableDiv>

            <Row justify="center" style={{ marginTop: 24 }}>
                <Col>
                    <Button type="primary" onClick={onSubmit}>
                        Редактировать
                    </Button>
                </Col>
            </Row>
        </>
    )
        ;
};

export { EditPollPage };
