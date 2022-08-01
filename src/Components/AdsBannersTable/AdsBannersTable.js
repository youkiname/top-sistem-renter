import React from 'react';
import { Button, Table, Badge, Spin } from "antd";
import { apiController } from "../../api";
import { Link } from "react-router-dom";



const AdsBannersTable = () => {
    const [loading, setLoading] = React.useState(true);
    const [banners, setBanners] = React.useState([])
    React.useEffect(() => {
        apiController.getBanners().then(res => {
            setBanners(res.data)
            setLoading(false);
        })
    }, [])

    const handleActivateButton = (banner) => {
        setLoading(true)
        apiController.toggleActiveBannerState(banner.id, banner.is_active).then(res => {
            const updatedBanners = banners.map(item => {
                if (item.id == banner.id) {
                    item.is_active = !item.is_active
                }
                return item
            })
            setBanners(updatedBanners)
            setLoading(false)
        })
    }

    const columns = [
        {
            title: 'Арендатор',
            dataIndex: 'shop',
            key: 'shop',
            render: shop => {
                return (
                    <div>{shop.name}</div>
                )
            }
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Статус',
            dataIndex: 'is_active',
            key: 'is_active',
            width: '15%',
            render: is_active => {
                return (
                    <Badge status={is_active ? 'success' : 'error'}
                        text={is_active ? 'Активен' : 'Неактивен'}
                    />
                )
            }
        },
        {
            title: 'Дата создания',
            dataIndex: 'created_at',
            key: 'created_at',
            render: created_at => {
                return (
                    <div>{created_at.split('T')[0]}</div>
                )
            }
        },
        {
            title: 'Действия',
            dataIndex: 'is_active',
            key: 'is_active',
            width: '10%',
            render: (is_active, banner) => {
                return (<>
                    <Link to={`../edit-banner/${banner.id}`} type="link">Редактировать</Link>
                    <Button danger type="link"
                        onClick={() => handleActivateButton(banner)}
                    >{is_active ? 'Остановить' : 'Запустить'}</Button>
                </>)
            }
        },
    ]

    return (
        <>
            <Spin spinning={loading}>
                <Table columns={columns} dataSource={banners} />
            </Spin>
        </>
    );
};

export { AdsBannersTable };
