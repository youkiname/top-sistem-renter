import React from 'react';
import { HeaderPage } from "../../components/HeaderPage/HeaderPage";
import {
    Select,
    Button,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Typography,
} from "antd";
import styled from "styled-components";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { apiController } from "../../api";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema"
import { ValidationStatus } from "../../common/validationErrors";

const { Title } = Typography
const { Option } = Select

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

export const AddPollPage = () => {
    const [centers, setCenters] = React.useState([])
    const onSubmit = async (values) => {
        const { title, description, shoppingCenterId, choices } = values
        await apiController.savePoll({
            title,
            description,
            shopping_center_id: shoppingCenterId,
            choices
        });
    }
    React.useEffect(() => {
        apiController.getShoppingCenters().then(res => {
            setCenters(res.data)
        })
    }, [])
    const { values, handleSubmit, setValues, errors } = useFormik({
        initialValues: {
            title: "",
            shoppingCenterId: "",
            description: "",
            choices: [],
        },
        isInitialValid: false,
        onSubmit,
        validationSchema
    })
    const removeChoice = (index) => {
        setValues({ ...values, choices: values.choices.filter((el, i) => i !== index) })
    }

    const addChoice = () => {
        setValues({ ...values, choices: [...values.choices, ""] })
    }
    const onChangeChoice = (e, index) => {
        const value = e.target.value
        setValues({
            ...values, choices: values.choices.map((el, i) => {
                if (index === i) {
                    el = value;
                    return el;
                }
                return el;
            })
        })

    }
    const onChangeEventValue = (key) => e => setValues({ ...values, [key]: e.target.value })
    const onChangeValue = (key) => (value) => setValues({ ...values, [key]: value })
    return (
        <>
            <div
                style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24, paddingBottom: 24, paddingLeft: 24 }}>
                <HeaderPage title="?????????????? ??????????" />
            </div>

            <TableDiv style={{ marginTop: 24, paddingBottom: 24 }}>
                <Title level={5}>??????????</Title>
                <Divider />
                <Form layout="vertical">
                    <Row gutter={24}>

                        <Col span={12}>
                            <Form.Item validateStatus={errors.shoppingCenterId && ValidationStatus.ERROR} help={errors?.shoppingCenterId} label="????">
                                <Select value={values.shoppingCenterId} onChange={onChangeValue("shoppingCenterId")}>
                                    {
                                        centers.map(center => (
                                            <Option value={center.id} key={center.id}>???? {center.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item validateStatus={errors.title && ValidationStatus.ERROR} help={errors?.title} label="?????????????????? ????????????">
                                <Input placeholder="?????????????????? ????????????"
                                    value={values.title}
                                    onChange={onChangeEventValue("title")}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item validateStatus={errors.description && ValidationStatus.ERROR} help={errors?.description} label="????????????????">
                                <Input placeholder="????????????????"
                                    value={values.description}
                                    onChange={onChangeEventValue("description")}
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
                                                    return Promise.reject(new Error('???????????? ???????? ?????????????? 2 ???????????????? ????????????'));
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    label={index === 0 ? '?????????????? ????????????' : ''}
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
                                                                message: "?????????????? ?????????????? ???????????? ?????? ?????????????? ????????",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="?????????????? ????????????"
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
                                                                removeChoice(index)
                                                            }}
                                                        />
                                                    ) : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => {
                                                        add()
                                                        addChoice()
                                                    }}
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    ???????????????? ?????????????? ????????????
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
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
                    <Button type="primary" onClick={handleSubmit}>
                        ??????????????
                    </Button>
                </Col>
            </Row>
        </>
    )
        ;
};

