import React from 'react';
import {HeaderPage} from "../../Components/HeaderPage/HeaderPage";
import {
    Select,
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Row,
    Typography,
    InputNumber,
    Upload,
    message,
} from "antd";
import styled from "styled-components";
import {InboxOutlined} from "@ant-design/icons";
import {apiController} from "../../api";
import {useFormik} from "formik";
import {validationSchema} from "./validationSchema";
import {ValidationStatus} from "../../common/validationErrors";

const {Dragger} = Upload;
const {Text, Title} = Typography
const {RangePicker} = DatePicker
const {Option} = Select

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

export const AddBannerPage = () => {
    const [shops, setShops] = React.useState([])
    const [selectedImage, setSelectedImage] = React.useState(null)
    const onSubmit = (values) => {
        const {name, dateRange, ageRange, minBalance, selectedShopId} = values
        const [startDate, endDate] = dateRange;
        let imageForm = new FormData();
        imageForm.append('image', selectedImage);

        apiController.saveNewBanner({
            name,
            shop_id: selectedShopId,
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            min_age: ageRange.split('-')[0],
            max_age: ageRange.split('-')[1],
            min_balance: minBalance,
        }, imageForm);
    }
    const {values, handleSubmit, setValues, errors} = useFormik({
        initialValues: {
            name: "",
            shopId: "",
            dateRange: [],
            gender: "male",
            ageRange: "18-24",
            minBalance: undefined,
            selectedImage: undefined,
        },
        onSubmit,
        validationSchema
    })
    React.useEffect(() => {
        apiController.getShops().then(res => {
            setShops(res.data)
        })
    }, [])

    const propsUpload = {
        name: 'image',
        multiple: false,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        async beforeUpload(file) {
            const isAllowed = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isAllowed) {
                await message.error('Вы можете загрузить только jpg или png файл.');
                return false;
            }
            setSelectedImage(file)
            return false;
        }
    };

    const onChangeEventValue = (key) => e => setValues({...values, [key]: e.target.value})
    const onChangeValue = (key) => (value) => setValues({...values, [key]: value})
    return (
        <>
            <div
                style={{backgroundColor: "#FFF", marginTop: -48, marginBottom: 24, paddingBottom: 24, paddingLeft: 24}}>
                <HeaderPage title="Создать рекламный баннер"/>
                <Text>Для того, чтобы создать рекламный баннер вам потребуется картинка формата .png и размером 205х108
                    пикселей</Text>
            </div>

            <TableDiv style={{marginTop: 24}}>
                <Title level={5}>Данные для системы</Title>
                <Divider/>
                <Form layout="vertical">
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item validateStatus={errors?.shopId && ValidationStatus.ERROR} help={errors?.shopId} label="Арендатор">
                                <Select value={values.shopId} onChange={onChangeValue("shopId")}>
                                    {
                                        shops.map(shop => (
                                            <Option value={shop.id} key={shop.id}>{shop.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item validateStatus={errors?.name && ValidationStatus.ERROR} help={errors?.name} label="Наименование рекламного баннера">
                                <Input placeholder="Наименование" value={values.name}
                                       onChange={onChangeEventValue("name")}/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Комментарий">
                                <Input placeholder="Комментарий"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item validateStatus={errors?.dateRange && ValidationStatus.ERROR} help={errors?.dateRange} label="Период публикации">
                                <RangePicker value={values.dateRange}
                                             onChange={dates => setValues({...values, dates})}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </TableDiv>
            <TableDiv style={{marginTop: 24}}>
                <Title level={5}>Аудитория</Title>
                <Divider/>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item validateStatus={errors?.gender && ValidationStatus.ERROR} help={errors?.gender} label="Пол">
                            <Select
                                defaultValue={values.gender}
                                value={values.gender} onChange={onChangeValue("gender")}
                            >
                                <Option value="male">Мужской</Option>
                                <Option value="female">Женский</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item validateStatus={errors?.ageRange && ValidationStatus.ERROR} help={errors?.ageRange} label="Возраст">
                            <Select value={values.ageRange}
                                    onChange={onChangeValue("ageRange")}>
                                <Option value="18-24">18-24</Option>
                                <Option value="25-30">25-30</Option>
                                <Option value="31-35">31-35</Option>
                                <Option value="36-40">36-40</Option>
                                <Option value="41-45">41-45</Option>
                                <Option value="46-50">46-50</Option>
                                <Option value="51-55">51-55</Option>
                                <Option value="56-60">56-60</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item validateStatus={errors?.minBalance && ValidationStatus.ERROR} help={errors?.minBalance} label="Баланс">
                            <InputNumber style={{width: '100%'}} min={0} addonBefore="от" placeholder="1000"
                                         value={values.minBalance}
                                         onChange={onChangeValue("minBalance")}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </TableDiv>
            <TableDiv style={{marginTop: 24, paddingBottom: 24}}>
                <Title level={5}>Рекламные материалы</Title>
                <Divider/>
                <Row gutter={24}>
                    <Col span={12}>
                        <Dragger {...propsUpload}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Нажмите или перетащите сюда файлы для загрузки</p>
                        </Dragger>
                    </Col>
                    <Col span={12}>
                        <Title level={5}>Требования к изображению</Title>
                        <ul>
                            <li>
                                <Text>Разрешение изображения не должен превышать 205х108 пикселей</Text>
                            </li>
                            <li>
                                <Text>Размер файла не должен быть больше 0.5Мб</Text>
                            </li>
                            <li>
                                <Text>Текст на изображении не должен занимать более 25%</Text>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </TableDiv>

            <Row justify="center" style={{marginTop: 24}}>
                <Col>
                    <Button type="primary" onClick={handleSubmit}>
                        Создать
                    </Button>
                </Col>
            </Row>
        </>
    );
};
