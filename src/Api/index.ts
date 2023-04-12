async function fetchData (endpoint: string, inn: string) {
    const response = await fetch(`http://127.0.0.1:5001/api/${endpoint}`,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"customer_inn": inn})
        })
    if (!response.ok) {
        throw new Error('Data coud not be fetched!')
    } else {
        return response.json();
    }
}

async function fetchStats (url: string, data: object){
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

export {fetchData, fetchStats};