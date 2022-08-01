import React from 'react';
import {Divider, Statistic} from "antd";
import {CaretUpOutlined} from "@ant-design/icons";
import {Typography} from "antd";
import {TinyArea} from '@ant-design/plots';
import {useSelector} from "react-redux";
import {selectVisitorCountIndicator} from "./selectors";

const {Text} = Typography

export const VisitorsCountIndicator = () => {
    const {day, month, visitors} = useSelector(selectVisitorCountIndicator)
    return (
        <div>
            <Statistic title="Транзакции за месяц" value={month?.amount}/>
            <TinyArea
                height={60}
                width={230}
                smooth
                areaStyle={{fill: "#975FE4"}}
                line={{color: '#975FE4'}}
                autoFit={false}
                data={visitors}/>
            <Divider style={{margin: '8px 0'}}/>
            <div className="total-sales-ind__row">
                <Text>Транзакции за сегодня {day?.amount} </Text>
                <CaretUpOutlined style={{color: '#52c41a'}}/>
            </div>
        </div>
    );
};

