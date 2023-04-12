import React from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {Card} from "antd";


export default function LineGraph(graphData: Array<any>) {
    const sch1Data = graphData.filter((d) => {
        return d.schedule === 'Cредняя стоимость контракта по рынку';
    });
    const sch2Data = graphData.filter((d) => {
        return d.schedule === "Стоимость контракта поставщика";
    });

    const finalGrapData = sch1Data.map((d, index) => {
        const sch2CurrentData = sch2Data.find((d2) => d.contract_conclusion_date === d2.contract_conclusion_date);

        const finalData = {
            ...d,
            "Средняя стоимость контракта по рынку": d.price,
            "Стоимость контракта поставщика": sch2CurrentData?.price
        };
        return finalData;
    });
    return (
        <Card
            title="Стоимость контракта в категории и регионе поставщика"
            style={{width: "780px", marginTop: '30px', height: '300px'}}>
            <LineChart
                width={730}
                height={200}
                data={finalGrapData}
                style={{marginRight: "auto", marginLeft: "auto"}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="contract_conclusion_date"/>
                <YAxis dataKey="price"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey='Средняя стоимость контракта по рынку' stroke="#b4b1b1" />
                <Line type="monotone" dataKey="Стоимость контракта поставщика" stroke="#db2b21"/>
            </LineChart>
        </Card>
    );
}
