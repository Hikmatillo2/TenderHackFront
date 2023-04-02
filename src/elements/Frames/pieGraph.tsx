import React, {PureComponent} from 'react';
import {PieChart, Pie, Legend, Tooltip, ResponsiveContainer} from 'recharts';
import {Card} from "antd";

const data01 = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200},
    {name: 'Group E', value: 278},
    {name: 'Group F', value: 189},
];

export default function PieGraph(data: any) {
    return (
        <Card
            title="Круговая диаграмма распределения по регионам"
            style={{marginBottom: '0px'}}
        >
            <PieChart width={300} height={270} margin={{bottom: 0}} style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                <Pie
                    dataKey="value"
                    stroke="#b4b1b1"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#db2b21"
                    label
                />
                <Tooltip/>
            </PieChart>
        </Card>
    );
}
