import React, { useEffect, useRef, useState } from "react";
import { AirQualityProps } from "../../models/models";
import theme from "./AirQuality.module.scss";
import { BsFillInfoCircleFill } from "react-icons/bs";
import * as THREE from "three";
import Particles from "../Particles/Particles";
import { Canvas } from "@react-three/fiber";
import {
  fairLevelColor,
  goodLevelColor,
  moderateLevelColor,
  poorLevelColor,
  veryPoorLevelColor,
} from "../../constants/constants";

const AirQuality: React.FC<AirQualityProps> = (props) => {
  const [color, setColor] = useState<string>("transparent");
  const mouse = useRef([0, 0]);

  const hourNow = new Date(Date.now()).getHours();

  const { airData, title } = props;

  const currentPollutionLevel = airData?.hourly?.european_aqi
    ? +airData?.hourly?.european_aqi[hourNow]
    : "";

  const checkColor = (currentPollutionLevel: number) => {
    if (currentPollutionLevel > 80) {
      setColor(veryPoorLevelColor);
    }

    if (currentPollutionLevel > 60 && currentPollutionLevel < 80) {
      setColor(poorLevelColor);
    }

    if (currentPollutionLevel > 40 && currentPollutionLevel < 60) {
      setColor(moderateLevelColor);
    }

    if (currentPollutionLevel > 20 && currentPollutionLevel < 40) {
      setColor(fairLevelColor);
    }

    if (currentPollutionLevel > 0 && currentPollutionLevel < 20) {
      setColor(goodLevelColor);
    }
  };

  useEffect(() => {
    checkColor(+currentPollutionLevel);
  }, [currentPollutionLevel]);

  return (
    <>
      <div className={theme.card}>
        <h3 className={theme.title}>
          AirQuality in <span>{title}</span> for this hour is&nbsp;
          <span>{currentPollutionLevel}.</span>
        </h3>
        <div className={theme.information}>
          <BsFillInfoCircleFill />
          <span>
            The European Air Quality Index (AQI) ranges from 0-20 (good), 20-40
            (fair), 40-60 (moderate), 60-80 (poor), 80-100 (very poor) and
            exceeds 100 for extremely poor conditions.
          </span>
        </div>
      </div>
      <div className={theme.canvas} style={{ backgroundColor: color }}>
        <Canvas
          linear
          dpr={[1, 2]}
          camera={{ fov: 1000, position: [0, 0, 30] }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.LinearToneMapping;
          }}
        >
          <Particles count={+currentPollutionLevel * 20} mouse={mouse} />
        </Canvas>
      </div>
    </>
  );
};

export default AirQuality;
