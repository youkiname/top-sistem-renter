import {
    AreaChartOutlined,
    DashboardOutlined,
    LaptopOutlined,
    NotificationOutlined, TableOutlined, TeamOutlined, UsergroupAddOutlined, ProfileOutlined,
    UserOutlined
} from "@ant-design/icons";
import React from "react";

export const menuListData = [
12,12
]

export const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
export const menuData = [
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