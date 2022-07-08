import React from 'react';
import {TotalSalesIndicator} from "../../Components/TotalSalesIndicator/TotalSalesIndicator";
import {BlockModule} from "../../Components/BlockModule/BlockModule";
import {Col, Row} from "antd";
import {VisitorsCountIndicator} from "../../Components/VisitorsCountIndicator/VisitorsCountIndicator";
import {AverageCheckIndicator} from "../../Components/AverageCheckIndicator/AverageCheckIndicator";
import {AdsDashboardModule} from "../../Components/AdsDashboardModule/AdsDashboardModule";
import {VisitorsDashboardModule} from "../../Components/VisitorsDashboardModule/VisitorsDashboardModule";
import {useDispatch, useSelector} from "react-redux";
import {getVisitorCountIndicator} from "../../store/slices";
import {AdsBannersPage} from "../AdsBannersPage/AdsBannersPage";

export const MainPageAD = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getVisitorCountIndicator())
    }, [dispatch])
    return (
        <>
            <Row justify="start" gutter={[24, 16]}>
                <Col>
                    <BlockModule>
                        <TotalSalesIndicator/>
                    </BlockModule>
                </Col>
                <Col>
                    <BlockModule>
                        <VisitorsCountIndicator/>
                    </BlockModule>
                </Col>
                <Col>
                    <BlockModule>
                        <AverageCheckIndicator/>
                    </BlockModule>
                </Col>
            </Row>
            <Row style={{marginTop: 24}} gutter={[24, 60]}>
                <Col span={12}>
                    <BlockModule fullWidth style={{marginTop: 24}}>
                        <VisitorsDashboardModule/>
                    </BlockModule>
                </Col>
            </Row>


        </>
    );
};


