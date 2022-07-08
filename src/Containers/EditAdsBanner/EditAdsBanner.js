import React from 'react';
import { HeaderPage } from "../../Components/HeaderPage/HeaderPage";
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
    Checkbox,
    Spin,
    Image
} from "antd";
import styled from "styled-components";
import { InboxOutlined } from "@ant-design/icons";
import { apiController } from "../../api";
import { useParams } from "react-router-dom";
import moment from "moment";

const { Dragger } = Upload;
const { Text, Title } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const TableDiv = styled.div`
  padding: 24px;
  backgroun1d-color: #fff;
`;

const EditAdsBanner = () => {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [form] = Form.useForm();
    const [name, setName] = React.useState('')
    const [dateRange, setDateRange] = React.useState()
    const [gender, setGender] = React.useState(null)
    const [ageRange, setAgeRange] = React.useState("18-24")
    const [minBalance, setMinBalance] = React.useState()
    const [bannerImageLink, setBannerImageLink] = React.useState('')
    const [selectedImage, setSelectedImage] = React.useState(null)
    const [active, setActive] = React.useState()

    const ageRanges = [
        "18-24",
        "25-30",
        "31-35",
        "36-40",
        "41-45",
        "46-50",
        "51-55",
        "56-60",
    ];

    React.useEffect(() => {
        apiController.getBanner(id).then(res => {
            setName(res.data.name)
            setGender(res.data.gender)
            setAgeRange(res.data.age_range)
            setMinBalance(res.data.min_balance)
            setDateRange([moment(res.data.start_date), moment(res.data.end_date)])
            setActive(res.data.is_active)
            setBannerImageLink(res.data.image_link)
            setLoading(false)
            console.log(res.data)
        })
    }, [id])

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

    const onSubmit = () => {
        setLoading(true);
        const [startDate, endDate] = dateRange;
        let imageForm = new FormData();
        imageForm.append('image', selectedImage);
        apiController.editBanner(id, {
            is_active: Number(active),
            name: name,
            gender: gender,
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            min_age: ageRange.split('-')[0],
            max_age: ageRange.split('-')[1],
            min_balance: minBalance
        }, imageForm).then(res => {
            setLoading(false)
            message.success("Баннер успешно изменён")
        });
    }

    return (
        <>
            <div
                style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24, paddingBottom: 24, paddingLeft: 24 }}>
                <HeaderPage title="Редактировать рекламный баннер" />
            </div>
            <Spin spinning={loading}>
                <TableDiv style={{ marginTop: 24 }}>
                    <Title level={5}>Данные для системы</Title>
                    <Divider />
                    <Form layout="vertical" form={form}>
                        <Row gutter={24}>

                            <Col span={8}>
                                <Form.Item label="Наименование рекламного баннера">
                                    <Input placeholder="Наименование" value={name} onChange={e => setName(e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Комментарий">
                                    <Input placeholder="Комментарий" />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item label="Период публикации">
                                    <RangePicker value={dateRange}
                                        onChange={dates => setDateRange(dates)} />
                                </Form.Item>
                                <Col span={16}>
                                    <Checkbox checked={active} onChange={e => setActive(e.target.checked)}>Активен</Checkbox>
                                </Col>
                            </Col>

                        </Row>
                    </Form>
                </TableDiv>


                <TableDiv style={{ marginTop: 24 }}>
                    <Title level={5}>Аудитория</Title>
                    <Divider />
                    <Form layout="vertical" form={form}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item label="Пол">
                                    <Select
                                        defaultValue={gender}
                                        value={gender}
                                        onChange={e => setGender(e)}
                                    >
                                        <Option value={null}>Любой</Option>
                                        <Option value="male">Мужской</Option>
                                        <Option value="female">Женский</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Возраст">
                                    <Select defaultValue={ageRange}
                                        value={ageRange}
                                        onChange={e => setAgeRange(e)}
                                    >
                                        <Option value={ageRange} key={ageRange}>{ageRange}</Option>
                                        {
                                            ageRanges.map((age, idx) => (
                                                <Option value={age} key={idx}>{age}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Баланс">
                                    <InputNumber style={{ width: '100%' }} min={0} addonBefore="от" placeholder="1000"
                                        defaultValue={minBalance}
                                        value={minBalance}
                                        onInput={e => setMinBalance(e)}
                                    />
                                </Form.Item>
                            </Col>

                        </Row>
                    </Form>
                </TableDiv>
                <TableDiv style={{ marginTop: 24, paddingBottom: 24 }}>
                    <Title level={5}>Текущее изображение</Title>
                    <Divider />
                    <Row gutter={24}>
                        <Image src={bannerImageLink}></Image>
                    </Row>
                </TableDiv>
                <TableDiv style={{ marginTop: 24, paddingBottom: 24 }}>
                    <Title level={5}>Заменить изображение</Title>
                    <Divider />
                    <Row gutter={24}>
                        <Col span={12}>
                            <Dragger {...propsUpload}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
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

                <Row justify="center" style={{ marginTop: 24 }}>
                    <Col>
                        <Button type="primary" onClick={onSubmit}>
                            Редактировать
                        </Button>
                    </Col>
                </Row>
            </Spin>
        </>
    );
};

export { EditAdsBanner };
