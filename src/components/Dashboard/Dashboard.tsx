import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import theme from "./Dashboard.module.scss";
import { updatesInterval } from "../../constants/constants";

const Dashboard: React.FC = () => {
  const [now, setNow] = useState(new Date(Date.now()));

  const beautifyDate = (date: Date) => {
    const prepend = (num: number) => (num < 10 ? `0${num}` : num);

    return `${prepend(date.getDate())}.${prepend(
      date.getMonth() + 1
    )}.${date.getFullYear()}, ${prepend(date.getHours())}.${prepend(
      date.getMinutes()
    )}`;
  };

  const dateTime = beautifyDate(now);

  useEffect(() => {
    const time = setInterval(() => {
      setNow(new Date(Date.now()));
    }, updatesInterval);
    return () => clearInterval(time);
  }, []);

  return (
    <section className={theme.container}>
      <h1 className={theme.title}>Air Quality</h1>
      <h2 className={theme.date}>{dateTime}</h2>
      <Navigation />
    </section>
  );
};

export default Dashboard;
