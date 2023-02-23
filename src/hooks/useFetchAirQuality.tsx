import { useEffect, useState } from "react";

const useFetchAirQuality = (latitude: number, longitude: number) => {
  const [data, setData] = useState();
  const now = new Date(Date.now());

  const formatDate = (date: Date) => {
    const prepend = (num: number) => (num < 10 ? `0${num}` : num);

    return `${date.getFullYear()}-${prepend(date.getMonth())}-${prepend(
      date.getDate()
    )}`;
  };

  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=european_aqi&domains=cams_europe&timezone=Europe%2FBerlin&start_date=${formatDate(
    now
  )}&end_date=${formatDate(now)}`;

  useEffect(() => {
    const request = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [latitude, longitude]);

  return { data };
};

export default useFetchAirQuality;
