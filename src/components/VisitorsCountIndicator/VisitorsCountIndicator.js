import React from 'react';
import {Divider, Statistic} from "antd";
import {CaretUpOutlined} from "@ant-design/icons";
import {Typography} from "antd";
import {TinyArea} from '@ant-design/plots';
import {useDispatch,useSelector} from "react-redux";
import {getVisitorCountIndicator} from "../../store/slices";
import {selectVisitorCountIndicator} from "./selectors";

const {Text} = Typography

export const VisitorsCountIndicator = () => {
    const {day, month, visitors} = useSelector(selectVisitorCountIndicator)


    return (
        <div>
            <Statistic title="Посетители за месяц" value={month?.amount}/>
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
                <Text>Посетители сегодня {day?.amount} </Text>
                <CaretUpOutlined style={{color: '#52c41a'}}/>
            </div>
        </div>
    );
};

