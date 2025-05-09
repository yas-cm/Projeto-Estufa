const apiBaseUrl = "http://localhost:8080";

async function fetchData(endpoint) {
    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function postData(endpoint, data) {
    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
    }
}

// New function to fetch sensor data
async function getSensorData() {
    try {
        const data = await fetchData("sensores");
        return {
            umidade: data.umidade || 0,
            temperatura_externa: data.temperatura_externa || 0,
            temperatura_interna: data.temperatura_interna || 0,
            nivel_agua: data.nivel_agua || 0,
        };
    } catch (error) {
        console.error("Error fetching sensor data:", error);
    }
}

export { fetchData, postData, getSensorData };