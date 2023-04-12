import {Card, DatePicker, Layout, List, Space, Statistic} from "antd";
import dayjs from "dayjs";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import BarGraph from "../Frames/barGraph";
import PieGraph from "../Frames/pieGraph";
import LineGraph from "../Frames/lineGraph";
import React, {useCallback, useEffect, useState} from "react";
import {fetchData, fetchStats} from "../../Api";

const {RangePicker} = DatePicker;

export default () => {
    const inn = "7716789300";

    const [dataEconomic, initDataEconomic] = useState({
        totalIncomeNow: 0,
        totalIncomePast: 1,
        regions: []
    })
    const [dataPie, initDataPie] = useState([]);
    const [dataBar, initDataBar] = useState([]);
    const [dataLine, initDataLine] = useState([[], []]);

    let from = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') +
        '-' + String(new Date().getDate()).padStart(2, '0');
    let to = new Date().getFullYear() + '-' + String(new Date().getMonth()).padStart(2, '0') + '-' +
        String(new Date().getDate()).padStart(2, '0');

    const onInputChange = useCallback((dates: any, dateStrings: string[]) => {
        if (!dates[0] || !dates[1]) {
            return;
        }

        from = dateStrings[0];
        to = dateStrings[1];
        fetchStats('statistics',
            {
                customer_inn: "7716789300",
                from: from,
                to: to
            })
            .then((res) => {
                initDataEconomic(res)
            })
            .catch((res) => {

            })
    }, ['YYYY-MM-DD']);

    useEffect(() => {
        fetchData('pieChart', inn)
            .then((res) => {
                initDataPie(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    useEffect(() => {
        fetchData('barChart', inn)
            .then((res) => {
                initDataBar(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    useEffect(() => {
        fetchData('curve', inn
        )
            .then((res) => {
                initDataLine(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    useEffect(() => {
        fetchStats('statistics',
            {
                customer_inn: inn,
                from: from,
                to: to
            })
            .then((res) => {
                initDataEconomic(res)
            })
            .catch((res) => {

            })
    }, [])

    return (
        <Layout style={{flexDirection: "row"}}>
            <Card style={{height: '690px', marginRight: '30px', marginLeft: '75px'}}
                  title="Сводные данные за период"
                  hoverable>
                <Space direction="vertical" size={12} style={{marginBottom: "10px"}}>
                    <RangePicker
                        defaultValue={
                            [dayjs(from, 'YYYY-MM-DD'),
                                dayjs(to, 'YYYY-MM-DD')]}
                        onChange={onInputChange}
                    />
                </Space>
                <Card
                    style={{
                        marginTop: "auto",
                        marginBottom: "auto"
                    }}
                    type="inner"
                    title="Прибыль за текущий период"
                >
                    <Statistic
                        value={(() => {
                            if (dataEconomic.totalIncomePast == 0) {
                                return dataEconomic.totalIncomeNow
                            }
                            return 0
                        })()}
                        precision={2}
                        valueStyle={(() => {
                            if (dataEconomic.totalIncomePast > 1 || dataEconomic.totalIncomePast === 0) {
                                return {color: '#3f8600'}
                            }
                            return {color: '#cf1322'}
                        })()}
                        prefix={(() => {
                            if (dataEconomic.totalIncomePast > 1 || dataEconomic.totalIncomePast === 0) {
                                return <ArrowUpOutlined/>
                            }
                            return <ArrowDownOutlined/>
                        })()}
                        suffix="%"
                    />
                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="Прибыль за прошлый период"
                >
                    <Statistic value={`${(() => {
                        if (dataEconomic.totalIncomePast > 1) {
                            return dataEconomic.totalIncomePast
                        }
                        return 1
                    })()}₽`}/>
                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="Топ регионов по прибыли"
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={dataEconomic.regions}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`${index + 1}. ${item['delivery_region'] ? item['delivery_region'] : 0}`}
                                    description={item['price_y'] + '₽'}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Card>
            <Layout style={{flexDirection: "column", marginBottom: 0, height: '690px'}}>
                <Layout style={{flexDirection: "row", marginBottom: '30px'}}>
                    <div style={{marginBottom: "30px"}}>
                        {BarGraph(dataBar)}
                    </div>
                    <div style={{marginLeft: '30px'}}>
                        {PieGraph(dataPie)}
                    </div>
                </Layout>
                {LineGraph((() => {
                    return dataLine[0].concat(dataLine[1])
                })())}
            </Layout>
        </Layout>
    );
}