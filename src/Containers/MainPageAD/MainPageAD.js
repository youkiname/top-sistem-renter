import React from 'react';
import {TotalSalesIndicator} from "../../Components/TotalSalesIndicator/TotalSalesIndicator";
import {BlockModule} from "../../Components/BlockModule/BlockModule";
import {Col, Row} from "antd";
import {VisitorsCountIndicator} from "../../Components/VisitorsCountIndicator/VisitorsCountIndicator";
import {AverageCheckIndicator} from "../../Components/AverageCheckIndicator/AverageCheckIndicator";
import {VisitorsDashboardModule} from "../../Components/VisitorsDashboardModule/VisitorsDashboardModule";
import {useDispatch, useSelector} from "react-redux";
import {getVisitorCountIndicator} from "../../store/slices";
import {AdsBannersPage} from "../AdsBannersPage/AdsBannersPage";
import {AdsDashboardModule} from "../../Components/AdsDashboardModule/AdsDashboardModule";

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
            <Row>
                <Col span={12}  style={{marginTop: 24}} >
                    <BlockModule fullWidth >
                        <AdsDashboardModule/>
                    </BlockModule>
                </Col>
                <Col span={12} style={{marginTop: 24}}>
                    <BlockModule fullWidth>
                        <VisitorsDashboardModule/>
                    </BlockModule>
                </Col>
            </Row>
        </>
    );
};


