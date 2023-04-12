import {Card, Layout, Statistic} from "antd";
import {Pie, PieChart, Tooltip} from "recharts";
import React, {useEffect, useState} from "react";
import {fetchData} from "../../Api";

export default () => {
    const inn = "7716789300";

    const [dataCompany, initDataCompany] = useState({
        most_frequent_category: [{Count: '', Lot: ''}],
        number_of_companies_on_region: [{region: '', companies: 0}],
        lots_count_in_region: [{category: '', value: ''}]
    });

    useEffect(() => {
        fetchData('region_statistics', inn)
            .then((res) => {
                initDataCompany(res)
            })
            .catch((res) => {
                initDataCompany(res)
            })
    }, [])

    return (
        <Layout style={{flexDirection: "row"}}>
            <Card style={{height: '400px', marginRight: '30px', marginLeft: '75px'}}
                  title="Информация о регионе поставщика"
                  hoverable>
                <Card
                    style={{
                        marginTop: "auto",
                        marginBottom: "30px"
                    }}
                    type="inner"
                    title={'Количество компаний в регионе '}>
                    <Statistic
                        value={`${dataCompany["number_of_companies_on_region"][0].region}, 
                        ${dataCompany["number_of_companies_on_region"][0].companies}`}/>
                </Card>
                <Card
                    style={{
                        marginTop: "auto",
                        marginBottom: "30px"
                    }}
                    type="inner"
                    title={`Самая популярная категория в регионе:`}>
                    <Statistic value={`${dataCompany["most_frequent_category"][0].Lot},
                            ${dataCompany["most_frequent_category"][0].Count}`}/>
                </Card>
            </Card>
            <div style={{marginTop: "0px", height: "400px"}}>
                <Card
                    title="Круговая диаграмма топ 5 товаров в регионе"
                    style={{marginBottom: '0px', height: '400px'}}
                >
                    <PieChart width={300} height={250} style={{
                        display: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "0px"
                    }}>
                        <Pie
                            style={{marginTop: '0px'}}
                            dataKey="value"
                            stroke="#b4b1b1"
                            isAnimationActive={false}
                            data={dataCompany['lots_count_in_region'].map((each) => {
                                return {
                                    value: parseInt(each['value']),
                                    name: each['category']
                                }
                            })}
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            fill="#db2b21"
                            label
                        />
                        <Tooltip/>
                    </PieChart>
                </Card>
            </div>
        </Layout>
    )
}