import React from 'react';

interface SensorValues {
    _id: string
    temp: number
    air_humidity: number
    soil_moisture: number
    timestamp: string
}

const PlantsPage = async () => {
    const res = await fetch("http://localhost:8000/plants/recent", {cache: "no-store"})
    const value:SensorValues = await res.json();
    const timestampDate = new Date(value.timestamp);

    return (
        <div className="flex flex-col mx-5">
            <div className="stats shadow my-2.5">
                <div className="stat place-items-center">
                    <div className="stat-title">Temperature</div>
                    <div className="stat-value"> {value.temp} °C</div>
                    <div className="stat-desc"> {timestampDate.toDateString()} {timestampDate.getHours() + ":" + ("00" + timestampDate.getMinutes()).slice(-2) + "Uhr"} </div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">Humidity</div>
                    <div className="stat-value">{value.air_humidity} %</div>
                    <div className="stat-desc">{timestampDate.toDateString()} {timestampDate.getHours() + ":" + ("00" + timestampDate.getMinutes()).slice(-2) + "Uhr" }</div>
                </div>

            </div>
            <div className="stats shadow my-2.5">
                <div className="stat place-items-center">
                    <div className="stat-title">Soil Moisture</div>
                    <div className="stat-value"> {value.soil_moisture} %</div>
                    <div className="stat-desc"> {timestampDate.toDateString()} {timestampDate.getHours() + ":" + ("00" + timestampDate.getMinutes()).slice(-2) + "Uhr"} </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="btn btn-primary"> Water plants now </div>
            <p>Last time of watering: </p>
        </div>
    );
};

export default PlantsPage;