import React from 'react';
import { TinyArea } from '@ant-design/plots';
import { Divider, Statistic } from "antd";
import { Typography } from "antd";
import { apiController } from "../../api";


const { Text } = Typography

const AverageCheckIndicator = () => {
    const [data, setData] = React.useState({})
    const [day, setDay] = React.useState("")
    const [average, setAverage] = React.useState([])


    React.useEffect(() => {
        apiController.getStatisticAverageSumMonth().then(res => setData(res.data))
        apiController.getStatisticAverageSumToday().then(res => setDay(res.data))
        apiController.getStatisticAverageGraph().then(res => setAverage(res.data))
    }, [])

    const averageAmounts = average.map(item => parseInt(item?.amount))


    return (

        <div>
            <Statistic title="Средний чек   " value={`${data?.amount?.toFixed(0)} ₽`} />
            <TinyArea
                height={69}
                width={230}
                smooth
                areaStyle={{ fill: "#1890ff" }}
                line={{ color: '#1884ff' }}
                autoFit={false}
                data={averageAmounts} />
            <Divider style={{ margin: '8px 0' }} />
            <div className="total-sales-ind__row">
                <Text>Средний чек за сегодня {day?.amount?.toFixed(0)}₽</Text>
            </div>
        </div>
    );
};

export { AverageCheckIndicator };
