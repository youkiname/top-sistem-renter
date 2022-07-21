import React from 'react';
import { HeaderPage } from "../../components/HeaderPage/HeaderPage";
import styled from "styled-components";
import { Tabs } from "antd";
import { ClientBaseTable } from "../../components/ClientBaseTable/ClientBaseTable";

const { TabPane } = Tabs

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

const BaseTCPage = () => {
    return (
        <>
            <div style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24 }}>
                <HeaderPage title="Клиентская база" />
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
                        <ClientBaseTable />
                    </TabPane>

                </Tabs>
            </TableDiv>
        </>
    );
};

export { BaseTCPage };
