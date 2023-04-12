import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Card} from "antd";

export default function BarGraph(data: any) {
    return (
        <Card
            style={{width: "auto"}}
            title="Тип контракта"
        >
            <BarChart
                width={250}
                height={270}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="Котировочная сессия" fill="#db2b21"/>
                <Bar dataKey="Потребность" fill="#b4b1b1"/>
            </BarChart>
        </Card>
    );
}
