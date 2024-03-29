import React from 'react';
import styled from "styled-components";
import { Tabs } from "antd";
import {HeaderPage} from "../../Components/HeaderPage/HeaderPage";
import {RevenueTable} from "../../Components/RevenueTable/RevenueTable";

const { TabPane } = Tabs

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

export const Revenue = () => {
    return (
        <>
            <div style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24 }}>
                <HeaderPage title="Выручка" />
            </div>

            <TableDiv>
                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    centered
                    style={{
                        marginBottom: 32,
                    }}
                >
                    <TabPane key="1">
                        <RevenueTable />
                    </TabPane>

                </Tabs>
            </TableDiv>
        </>
    );
};

