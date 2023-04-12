import {
    DashboardOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './account.css';
import {Breadcrumb, ConfigProvider, Image, Layout, Menu, theme} from 'antd';
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";

import Company from "../Statistics/Company";
import Dashboard from "../Statistics/Dashboard";

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

class DynamicLayout {
    currentFrame: string[] = ['Company'];

    constructor() {
        makeAutoObservable(this);
    }

    change(val: string): void {
        this.currentFrame[0] = val;
    }

    getFC(): JSX.Element {
        if (this.currentFrame[0] == 'Company') {
            return (
                <Company/>
            )
        } else {
            return (
                <Dashboard/>
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