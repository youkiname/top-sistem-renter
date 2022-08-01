import { Avatar, Layout, Menu, Space, Typography, Button } from 'antd';
import React from 'react';
import './MainLayout.css'
import { menuData } from "../../../data/menu";
import { Logo } from "../../../Components/Logo/Logo";
import {Link, useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authController } from "../../../api";
import {DashboardOutlined, ProfileOutlined, TableOutlined, TeamOutlined, UsergroupAddOutlined} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Text } = Typography


export const MainLayout = ({ children }) => {
    const selectedKey = useLocation().pathname
    const menuData = [
        {
            icon: React.createElement(DashboardOutlined),
            key: 'main',
            label: 'Главная',
            path: '/',
        },
        {
            icon: React.createElement(TableOutlined),
            key: 'baza',
            label: 'Клиентская база',
            path: 'base-tc'
        },
        {
            icon: React.createElement(ProfileOutlined),
            key: 'revenue',
            label: 'Выручка',
            path: 'revenue'
        },

        {
            icon: React.createElement(UsergroupAddOutlined),
            key: 'arendator',
            label: 'Продавцы',
            path: 'add-arendator'
        },
        {
            icon: React.createElement(TeamOutlined),
            key: 'sellers',
            label: 'Таблица продавцов',
            path: 'sellers'
        },
    ]
    const highlight = () => {
        if (selectedKey === '/'){
            return ['main']
        } else if (selectedKey === '/base-tc'){
            return ['baza']
        } else if (selectedKey === '/sellers'){
            return ['sellers']
        } else if (selectedKey === '/revenue'){
            return ['revenue']
        } else if (selectedKey === '/add-arendator'){
            return ['arendator']
        }


    }
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token-renter');
        authController.logout();
        navigate('/auth');
    }

    const [currentUsername, setCurrentUsername] = React.useState('ShoppingCenter')
    React.useEffect(() => {
        if (localStorage.getItem('name')) {
            setCurrentUsername(localStorage.getItem('name'))
        }

    }, [])
console.log(selectedKey)
    return (
        <Layout>
            {/*<Navigate to="/LoginPage" />*/}
            <Header className="header mainLayout__header">
                <div className="logo"><Logo /></div>
                <div className='mainLayout__profile-wrap'>
                    <Link to="/profile">
                        <Space direction="horizontal">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <Text style={{ color: '#fff' }}>{currentUsername}</Text>
                        </Space>
                    </Link>
                    <Button onClick={logout} type="primary" style={{ marginLeft: '10px' }}>
                        Выйти
                    </Button>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        d
                        selectedKeys={highlight()}
                        mode="inline"
                        defaultSelectedKeys={['main']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={menuData}
                        onSelect={(item) => {
                            navigate(item.item.props.path, { replace: true })
                        }}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '24px 24px 24px',
                    }}
                >
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: 'transparent'

                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
};