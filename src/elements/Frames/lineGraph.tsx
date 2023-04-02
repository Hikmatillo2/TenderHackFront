import React from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {Card} from "antd";

// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ];

let data = [
    {
        "SumofDays": 97372.8,
        "schedule": "sch_1",
        "time": "2021-12-16"
    },
    {
        "SumofDays": 97372.8,
        "schedule": "sch_2",
        "time": "2021-12-16"
    },
    {
        "SumofDays": 49987,
        "schedule": "sch_2",
        "time": "2021-09-13"
    },
    {
        "SumofDays": 10344.02,
        "schedule": "sch_2",
        "time": "2021-09-15"
    },
    {
        "SumofDays": 27800,
        "schedule": "sch_2",
        "time": "2021-05-05"
    },
    {
        "SumofDays": 62406.4,
        "schedule": "sch_2",
        "time": "2020-12-25"
    },
    {
        "SumofDays": 2490.38,
        "schedule": "sch_2",
        "time": "2021-09-20"
    },
    {
        "SumofDays": 51023,
        "schedule": "sch_2",
        "time": "2021-09-22"
    },
    {
        "SumofDays": 3841.2,
        "schedule": "sch_2",
        "time": "2022-01-18"
    },
    {
        "SumofDays": 2487.5,
        "schedule": "sch_2",
        "time": "2022-01-20"
    },
    {
        "SumofDays": 49807.6,
        "schedule": "sch_2",
        "time": "2021-09-29"
    },
    {
        "SumofDays": 17520,
        "schedule": "sch_2",
        "time": "2021-05-28"
    },
    {
        "SumofDays": 5878.2,
        "schedule": "sch_2",
        "time": "2020-08-17"
    },
    {
        "SumofDays": 8945.05,
        "schedule": "sch_2",
        "time": "2021-10-15"
    },
    {
        "SumofDays": 3680,
        "schedule": "sch_2",
        "time": "2021-10-19"
    },
    {
        "SumofDays": 111997.2,
        "schedule": "sch_2",
        "time": "2020-08-26"
    },
    {
        "SumofDays": 9910.2,
        "schedule": "sch_2",
        "time": "2021-02-17"
    },
    {
        "SumofDays": 8891.32,
        "schedule": "sch_2",
        "time": "2021-10-28"
    },
    {
        "SumofDays": 3582,
        "schedule": "sch_2",
        "time": "2021-10-28"
    },
    {
        "SumofDays": 5074.5,
        "schedule": "sch_2",
        "time": "2021-11-09"
    },
    {
        "SumofDays": 221236,
        "schedule": "sch_2",
        "time": "2021-07-07"
    },
    {
        "SumofDays": 49250,
        "schedule": "sch_2",
        "time": "2021-06-30"
    },
    {
        "SumofDays": 21293,
        "schedule": "sch_2",
        "time": "2021-11-19"
    },
    {
        "SumofDays": 18596.8,
        "schedule": "sch_2",
        "time": "2021-03-16"
    },
    {
        "SumofDays": 7826.82,
        "schedule": "sch_2",
        "time": "2021-11-29"
    },
    {
        "SumofDays": 7471.14,
        "schedule": "sch_2",
        "time": "2021-07-22"
    },
    {
        "SumofDays": 16337.9,
        "schedule": "sch_2",
        "time": "2021-12-01"
    },
    {
        "SumofDays": 1759.16,
        "schedule": "sch_2",
        "time": "2022-04-05"
    },
    {
        "SumofDays": 2596.95,
        "schedule": "sch_2",
        "time": "2022-04-01"
    },
    {
        "SumofDays": 112942.45,
        "schedule": "sch_2",
        "time": "2022-04-04"
    },
    {
        "SumofDays": 18643,
        "schedule": "sch_2",
        "time": "2022-04-07"
    },
    {
        "SumofDays": 22686,
        "schedule": "sch_2",
        "time": "2021-04-13"
    },
    {
        "SumofDays": 92684.25,
        "schedule": "sch_2",
        "time": "2020-11-23"
    },
    {
        "SumofDays": 44790,
        "schedule": "sch_2",
        "time": "2021-08-18"
    },
    {
        "SumofDays": 8557,
        "schedule": "sch_2",
        "time": "2021-08-31"
    },
    {
        "SumofDays": 15920,
        "schedule": "sch_2",
        "time": "2022-04-12"
    },
    {
        "SumofDays": 18785.6,
        "schedule": "sch_2",
        "time": "2021-04-14"
    },
    {
        "SumofDays": 518760,
        "schedule": "sch_2",
        "time": "2020-12-14"
    },
    {
        "SumofDays": 539668.8,
        "schedule": "sch_2",
        "time": "2020-12-14"
    },
    {
        "SumofDays": 455518.34,
        "schedule": "sch_2",
        "time": "2020-12-11"
    },
    {
        "SumofDays": 50105.88,
        "schedule": "sch_2",
        "time": "2021-08-31"
    },
    {
        "SumofDays": 42217,
        "schedule": "sch_2",
        "time": "2021-09-07"
    },
    {
        "SumofDays": 49650.5,
        "schedule": "sch_2",
        "time": "2022-05-04"
    },
    {
        "SumofDays": 8176,
        "schedule": "sch_2",
        "time": "2022-05-19"
    },
    {
        "SumofDays": 83997.9,
        "schedule": "sch_2",
        "time": "2022-05-27"
    },
    {
        "SumofDays": 5940,
        "schedule": "sch_2",
        "time": "2022-05-27"
    },
    {
        "SumofDays": 977.5,
        "schedule": "sch_1",
        "time": "2022-05-04"
    },
    {
        "SumofDays": 5656,
        "schedule": "sch_1",
        "time": "2022-05-19"
    },
    {
        "SumofDays": 839897.9,
        "schedule": "sch_1",
        "time": "2022-05-27"
    },
    {
        "SumofDays": 11110,
        "schedule": "sch_1",
        "time": "2022-05-27"
    }
]

export default function LineGraph(graphData: Array<any>) {
    const sch1Data = graphData.filter((d) => {
        return d.schedule === "sch_1";
    });
    const sch2Data = graphData.filter((d) => {
        return d.schedule === "sch_2";
    });

    const finalGrapData = data.map((d, index) => {
        // const sch2CurrentData = sch2Data.find((d2) => d.time === d2.time);
        if (Object.keys(d).includes('sch_1')) {
            return {
                ...d,
                sch_1: d.SumofDays,
                sch_2: d.SumofDays
            }
        } else {return {
            ...d,
            sch_2: d.SumofDays,
            sch_1: d.SumofDays
        }}


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
                <XAxis dataKey="time"/>
                <YAxis dataKey="SumofDays"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey='sch_1' stroke="#b4b1b1" activeDot={{ r: 8 }}/>
                <Line type="monotone" dataKey="sch_2" stroke="#db2b21"/>
            </LineChart>
        </Card>
    );
}

