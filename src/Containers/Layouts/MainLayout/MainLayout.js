import { Avatar, Layout, Menu, Space, Typography, Button } from 'antd';
import React from 'react';
import './MainLayout.css'
import { Logo } from "../../../Components/Logo/Logo";
import { menuData } from "../../../data/menu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authController } from "../../../api";

const { Header, Content, Sider } = Layout;
const { Text } = Typography


export const MainLayout = ({ children }) => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('auth');
        authController.logout();
        navigate('/auth');
    }

    const [currentUsername, setCurrentUsername] = React.useState('ShoppingCenter')
    React.useEffect(() => {
        if (localStorage.getItem('name')) {
            setCurrentUsername(localStorage.getItem('name'))
        }

    }, [])

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
                        mode="inline"
                        defaultSelectedKeys={['1']}
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