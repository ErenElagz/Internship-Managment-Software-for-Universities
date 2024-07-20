import React, {useState, useEffect} from "react";
import {MapContainer, TileLayer, CircleMarker, Tooltip} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {cities} from "../../constants/cities";

export default function MapComponent({title}) {
    const [mapCities, setMapCities] = useState([]); // Boş bir dizi ile başlayın

    useEffect(() => {
        window.electron.getCitiesForMap().then((data) => {
            const enrichedData = data.map(cityData => {
                const localCity = cities.find(city => city.value === cityData.name);
                if (localCity) { // localCity kontrolü
                    return {
                        name: cityData.name,
                        value: cityData.value,
                        lat: localCity.lat,
                        lon: localCity.lon
                    };
                }
                return null; // Eğer bulunamazsa null döndür
            }).filter(city => city); // null olanları filtrele
            setMapCities(enrichedData);
        });
    }, []);

    // Minimum ve maksimum kayıt sayılarına göre ölçekleme
    const minCount = mapCities.length > 0 ? Math.min(...mapCities.map(city => city.value)) : 0;
    const maxCount = mapCities.length > 0 ? Math.max(...mapCities.map(city => city.value)) : 0;

    // Min ve max yarıçap
    const minRadius = 8;
    const maxRadius = 28;

    function getRadius(count) {
        if (maxCount === minCount) return minRadius; // Tüm değerler aynıysa, minRadius dön
        return ((count - minCount) / (maxCount - minCount)) * (maxRadius - minRadius) + minRadius;
    }

    return (
        <div className="w-full p-4 rounded-3xl bg-gray-100 m-auto">
            <h2 className="text-2xl font-bold text-left mb-4">{title}</h2>
            <MapContainer
                center={[39.9334, 32.8597]}
                zoom={6}
                style={{
                    height: "500px",
                    width: "100%",
                    borderRadius: "16px",
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {mapCities.map((city, index) => (
                    <CircleMarker
                        key={index}
                        center={[city.lat, city.lon]}
                        radius={getRadius(city.value)}
                        fillColor="green"
                        color="green"
                        fillOpacity={0.5}
                    >
                        <Tooltip
                            direction="top"
                            offset={[0, -10]}
                            opacity={1}
                            permanent
                        >
                            {city.name}: {city.value} Record
                        </Tooltip>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
}
