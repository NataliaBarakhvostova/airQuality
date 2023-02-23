import React, { useState } from "react";
import theme from "./Navigation.module.scss";
import { CityProps } from "../../models/models";
import { locations } from "../../constants/constants";
import useFetchAirQuality from "../../hooks/useFetchAirQuality";
import AirQuality from "../AirQuality/AirQuality";

const Navigation: React.FC = () => {
  const [activeCity, setActiveCity] = useState<CityProps>(locations[0]);

  const res = useFetchAirQuality(activeCity.latitude, activeCity.longitude);

  const showInformation = (id: number) => {
    const chosenCity = locations.filter((city) => city.id === id);
    setActiveCity(chosenCity[0]);
  };

  return (
    <nav className={theme.navigation}>
      <div className={theme.navigationHeader}>
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => showInformation(location.id)}
            className={location.id === activeCity.id ? theme.active : ""}
          >
            {location.title}
          </button>
        ))}
      </div>
      <div className={theme.navigationContent}>
        <AirQuality title={activeCity.title} airData={res.data} />
      </div>
    </nav>
  );
};

export default Navigation;
