"use client";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

let WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function Home() {
  const [place, setPlace] = useState("Mexico");
  const getWeatherData = async () => {
    // https://api.openweathermap.org/data/2.5/weather?q=mexico&appid=WEATHER_API_KEY

    if (place && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        console.log("GET WEATHER DATA RESPONSE", data.name);
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
        <div className="h-[500px] w-[20%] flex justify-center items-center bg-red-400 rounded-lg bg-gradient-to-t from-custom-blue-start to-custom-blue-end p-10">
          <div id="search">
            <input
              className="outline-none rounded-full h-[35px] p-4"
              placeholder="Search for city weather"
              onChange={(e) => setPlace(e.target.value)}
            />
            <button onClick={getWeatherData}>
              <SearchIcon style={{ color: "black", marginRight: "10px" }} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
