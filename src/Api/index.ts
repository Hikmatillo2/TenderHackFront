import {useEffect, useState} from "react";

export default async (endpoint: string, data: object) => {
    let requestUrl = `http://${endpoint}`;
    const [countryItems, initCountry] = useState([])

    try {
        const fetchData = async () => {
            const response = await fetch(requestUrl,
            {
                mode: "no-cors",
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            return response.json();
        }


        useEffect(() => {
            fetchData()
                .then((res) => {
                    initCountry(res)
                })
                .catch((e) => {
                    console.log(e.message)
                })
        }, [])
    } catch (e) {
        return 1;
    }

    if (countryItems) {
        return countryItems;
    }
    return 1;
};