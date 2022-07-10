import React from 'react';
import { TotalSalesIndicator } from "../../components/TotalSalesIndicator/TotalSalesIndicator";
import { BlockModule } from "../../components/BlockModule/BlockModule";
import { Col, Row } from "antd";
import { VisitorsCountIndicator } from "../../components/VisitorsCountIndicator/VisitorsCountIndicator";
import { AverageCheckIndicator } from "../../components/AverageCheckIndicator/AverageCheckIndicator";
import { AdsDashboardModule } from "../../components/AdsDashboardModule/AdsDashboardModule";
import { VisitorsDashboardModule } from "../../components/VisitorsDashboardModule/VisitorsDashboardModule";
import { useDispatch, useSelector } from "react-redux";
import { getVisitorCountIndicator } from "../../store/slices";
import { AdsBannersPage } from "../AdsBannersPage/AdsBannersPage";

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
                        <TotalSalesIndicator />
                    </BlockModule>

                </Col>

                <Col>
                    <BlockModule>
                        <VisitorsCountIndicator />
                    </BlockModule>
                </Col>
                <Col>
                    <BlockModule>
                        <AverageCheckIndicator />
                    </BlockModule>
                </Col>
            </Row>
            <Row>
                <Col span={12} style={{ marginTop: 24 }} >
                    <BlockModule fullWidth >
                        <AdsDashboardModule />
                    </BlockModule>
                </Col>
                <Col span={12} style={{ marginTop: 24 }}>
                    <BlockModule fullWidth>
                        <VisitorsDashboardModule />
                    </BlockModule>
                </Col>
            </Row>



        </>
    );
};


