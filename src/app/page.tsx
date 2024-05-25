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

let WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function Home() {
  const [place, setPlace] = useState("Mexico");
  const [placeData, setPlaceData] = useState<any>(null);
  const currenTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getWeatherData = async () => {
    // https://api.openweathermap.org/data/2.5/weather?q=mexico&appid=WEATHER_API_KEY

    if (place && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        console.log("GET WEATHER DATA RESPONSE", data);
        setPlaceData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <div className="h-[500px] w-[370px] flex justify-center bg-red-400 rounded-lg bg-gradient-to-t from-custom-blue-start to-custom-blue-end p-10">
          <div
            id="search"
            className="bg-white h-[10%] flex items-center justify-between w-[280px] pr-5 pl-5 rounded-full"
          >
            <input
              className="outline-none w-[200px]"
              placeholder="Search for city weather"
              onChange={(e) => setPlace(e.target.value)}
            />
            <button onClick={getWeatherData} className="">
              <SearchIcon />
            </button>
          </div>
        </div>
        {placeData && (
          <div>
            <div>
              <div id="section1"></div>
              <div id="section2">
                {placeData.weather[0].main === "Clouds" && <FilterDramaIcon />}
                {placeData.weather[0].main === "Haze" && <DehazeIcon />}
                {placeData.weather[0].main === "Smoke" && <VapingRoomsIcon />}
                {placeData.weather[0].main === "Clear" && <WbSunnyIcon />}
                {placeData.weather[0].main === "Thunderstorm" && (
                  <ThunderstormIcon />
                )}
                {placeData.weather[0].main === "Snow" && <AcUnitIcon />}
                {placeData.weather[0].main === "Rain" && <WaterDropIcon />}
              </div>
            </div>
            <div id="timediv">
              <p id="time">{currenTime}</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
