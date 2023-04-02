import React, {useCallback, useEffect, useState} from 'react';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DashboardOutlined,
    DesktopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './account.css';
import {Breadcrumb, Calendar, Card, ConfigProvider, Image, Layout, List, Menu, Space, Statistic, theme} from 'antd';
import {makeAutoObservable} from "mobx";
import dayjs from 'dayjs'

import {observer} from "mobx-react-lite";
import BarGraph from "../Frames/barGraph";
import LineGraph from "../Frames/lineGraph";
import PieGraph from "../Frames/pieGraph";

import {DatePicker} from 'antd';
import {stringifyKey} from "mobx/dist/utils/utils";

const {RangePicker} = DatePicker;

const {Content, Footer, Sider} = Layout;


class DynamicBreadCrumb {
    list: string[] = ['Company'];

    constructor() {
        makeAutoObservable(this);
    }

    addCategory(val: string) {
        this.list[0] = val;
    };
}

// class DynamicRangePicker {
//     from: string[] = ['0-0-0'];
//     to: string[] = ['1-1-1'];
//
//     constructor() {
//         makeAutoObservable(this);
//     }
//
//     sendData(from: string, to: string) {
//         useEffect(() => {
//             fetchStats('statistics',
//                 {
//                     id: "purch_9193548",
//                     from: from,
//                     to: to
//                 })
//                 .then((res) => {
//                     initDataEconomic(res)
//                 })
//                 .catch(() => {
//
//                 })
//         }, [])
//     }
//
// }

class DynamicLayout {
    currentFrame: string[] = ['Company'];

    constructor() {
        makeAutoObservable(this);
    }

    change(val: string): void {
        this.currentFrame[0] = val;
    }

    getFC(): JSX.Element {
        const [dataPie, initDataPie] = useState([]);
        const [dataBar, initDataBar] = useState([]);
        const [dataCompany, initDataCompany] = useState([]);
        const [dataEconomic, initDataEconomic] = useState({
            totalIncomeNow: 0,
            totalIncomePast: 1,
            regions: []
        })
        const [dataLine, initDataLine] = useState([]);

        let from = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');
        let to = new Date().getFullYear() + '-' + String(new Date().getMonth()).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');

        const fetchData = async (url: string) => {
            const response = await fetch(`http://127.0.0.1:5001/api/${url}`,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"id": "purch_9193548"})
                })
            if (!response.ok) {
                console.log(response)
                throw new Error('Data coud not be fetched!')
            } else {
                return response.json();
            }
        }

        const fetchStats = async (url: string, data: object) => {
            try {
                const response = await fetch(`http://127.0.0.1:5001/api/${url}`,
                    {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                return response.json();
            } catch {
                throw new Error('Data coud not be fetched!')
            }
        }


        useEffect(() => {
            fetchData('pieChart')
                .then((res) => {
                    initDataPie(res)
                })
                .catch((e) => {
                    console.log(e)
                })
        }, [])

        useEffect(() => {
            fetchData('barChart')
                .then((res) => {
                    initDataBar(res)
                })
                .catch((e) => {
                    console.log(e)
                })
        }, [])

        useEffect(() => {
            fetchData('curve')
                .then((res) => {
                    initDataLine(res)
                })
                .catch((e) => {
                    console.log(e)
                })
        }, [])

        useEffect(() => {
            fetchData('sth')
                .then((res) => {
                    initDataCompany(res)
                })
                .catch((e) => {
                    console.log(e)
                })
        }, [])

        useEffect(() => {
            fetchStats('statistics',
                {
                    id: "purch_9193548",
                    from: from,
                    to: to
                })
                .then((res) => {
                    initDataEconomic(res)
                })
                .catch((res) => {

                })
        }, [])

        console.log(dataLine)
        //7716221444

        const onInputChange = useCallback((dates: any, dateStrings: string[]) => {
            if (!dates[0] || !dates[1]) {
                return;
            }

            from = dateStrings[0];
            to = dateStrings[1];
            fetchStats('statistics',
                {
                    id: "purch_9193548",
                    from: from,
                    to: to
                })
                .then((res) => {
                    initDataEconomic(res)
                })
                .catch((res) => {

                })
        }, ['YYYY-MM-DD']);

        if (this.currentFrame[0] == 'Company') {
            return (<div>dv</div>)
        } else if (this.currentFrame[0] == 'Compare') {
            return (<span>None</span>)
        } else {
            return (
                <Layout style={{flexDirection: "row"}}>
                    <Card style={{height: '690px', marginRight: '30px'}}
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
                            <div style={{ marginLeft: '30px'}}>
                                {PieGraph(dataPie)}
                            </div>
                        </Layout>
                        {LineGraph(dataLine)}

                    </Layout>
                </Layout>
            );
        }
    };
}

const App: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const breadCrumbInstance = new DynamicBreadCrumb();
    const ltInstance: DynamicLayout = new DynamicLayout();
    const BreadCrumbElement = observer((brd: DynamicBreadCrumb) =>
        <Breadcrumb.Item>{brd.list}</Breadcrumb.Item>);
    const LayoutElement = observer((lt: DynamicLayout) =>
        lt.getFC()
    );

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#db2b21',
                    colorPrimaryBg: '#b4b1b1',
                },
            }}
        >
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['company']}
                    >
                        <Menu.Item key="company" onClick={() => {
                            breadCrumbInstance.addCategory('Company');
                            ltInstance.change("Company");
                            console.log(ltInstance);
                        }}>
                            <UserOutlined></UserOutlined>
                            <span>Company</span>
                        </Menu.Item>
                        <Menu.Item key="dashboard" onClick={(props) => {
                            breadCrumbInstance.addCategory('Dashboard');
                            ltInstance.change("Dashboard");
                            console.log(ltInstance);
                        }}>
                            <DashboardOutlined></DashboardOutlined>
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="compare" onClick={(props) => {
                            breadCrumbInstance.addCategory('Compare');
                            ltInstance.change("Compare");
                            console.log(ltInstance);
                        }}>
                            <DesktopOutlined></DesktopOutlined>
                            <span>Compare</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{margin: '24px 16px 0'}}>
                        <Breadcrumb style={{margin: '16px 0', height: '30px'}}>
                            <BreadCrumbElement {...breadCrumbInstance}
                                               addCategory={breadCrumbInstance.addCategory}></BreadCrumbElement>
                        </Breadcrumb>
                        <Layout style={{flexDirection: "row"}}>
                            <LayoutElement {...ltInstance}
                                           change={ltInstance.change}
                                           getFC={ltInstance.getFC}/>
                        </Layout>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        <Image width={20} src="../../../public/mainLogo.png"/>
                        <span style={{marginLeft: "7px"}}>Created by NSU Monster Academy</span>
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default App;