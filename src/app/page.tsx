"use client";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import DehazeIcon from "@mui/icons-material/Dehaze";
import VapingRoomsIcon from "@mui/icons-material/VapingRooms";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import GitHubIcon from "@mui/icons-material/GitHub";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

interface WeatherData {
  name: string;
  weather: { main: string }[];
  main: { temp: number };
  timezone: number;
}

export default function Home() {
  const [place, setPlace] = useState("Mumbai");
  const [placeData, setPlaceData] = useState<WeatherData | null>(null);

  const getWeatherData = async () => {
    if (place && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}&units=metric`;
        let res = await fetch(url);
        let data = await res.json();
        console.log("GET WEATHER DATA RESPONSE", data);
        setPlaceData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getLocationTime = (timezoneOffset: number) => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const locationTime = new Date(utc + 1000 * timezoneOffset);
    return locationTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-[500px] w-[370px] flex flex-col rounded-lg bg-gradient-to-t from-custom-blue-start to-custom-blue-end p-10 justify-center">
        <h1 className="text-center mb-8 text-3xl font-semibold text-[#66DFFF]">
          WeatherMan
        </h1>
        <div
          id="search"
          className="bg-white self-center h-[10%] mb-8 flex items-center justify-between w-[280px] pr-5 pl-5 rounded-full"
        >
          <input
            className="outline-none w-[200px]"
            placeholder="Search for city weather"
            onChange={(e) => setPlace(e.target.value)}
          />
          <button onClick={getWeatherData} className="">
            <SearchIcon style={{ color: "" }} />
          </button>
        </div>
        <div className="flex flex-row items-center justify-between">
          {placeData && (
            <div>
              <p id="cityName" className="font-normal text-[40px] text-white">
                {placeData?.name}
              </p>
            </div>
          )}
          {placeData && (
            <div id="section11" className="flex flex-row">
              {placeData.weather[0].main === "Clouds" && (
                <FilterDramaIcon
                  style={{ height: "55px", width: "auto", color: "white" }}
                />
              )}
              {placeData.weather[0].main === "Haze" && (
                <DehazeIcon
                  style={{ height: "55px", width: "auto", color: "white" }}
                />
              )}
              {placeData.weather[0].main === "Smoke" && (
                <VapingRoomsIcon
                  style={{ height: "55px", width: "auto", color: "white" }}
                />
              )}
              {placeData.weather[0].main === "Clear" && (
                <WbSunnyIcon
                  style={{ height: "55px", width: "auto", color: "white" }}
                />
              )}
              {placeData.weather[0].main === "Thunderstorm" && (
                <ThunderstormIcon
                  style={{ height: "55px", width: "auto", color: "white" }}
                />
              )}
              {placeData.weather[0].main === "Snow" && (
                <AcUnitIcon
                  style={{ height: "55px", width: "auto", color: "white" }}
                />
              )}
              {placeData.weather[0].main === "Rain" && (
                <WaterDropIcon
                  style={{ height: "55px", width: "auto", color: "white" }}
                />
              )}
            </div>
          )}
        </div>
        <div className="text-end mr-0.5 mt-[-8px]">
          {placeData && (
            <div>
              <p id="weatherType" className="font-normal text-white">
                {placeData?.weather[0].main}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-row-reverse justify-between mt-7 mb-[53px]">
          <div>
            {placeData && (
              <div className="text-right text-white">
                <p className="text-xl">Temp</p>
                <p className="text-[27px] font-medium">
                  {placeData?.main.temp.toFixed(1)}
                  <span>°C</span>
                </p>
              </div>
            )}
          </div>
          <div>
            {placeData && (
              <div id="timediv" className="text-white">
                <p className="text-xl">Time</p>
                <p id="time" className="text-[27px] font-medium">
                  {getLocationTime(placeData.timezone)}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center scale-90 text-white">
          <a target="_blank" href="https://github.com/ParshvLimbad/weather-app">
            <GitHubIcon style={{ height: "25px", width: "auto" }} />
          </a>
          <p>By Parshv Limbad</p>
        </div>
      </div>
    </div>
  );
}
