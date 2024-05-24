"use client";
import { useEffect, useState } from "react";

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
      <main className="flex justify-center items-center">
        <div className="h-[500px] w-[20%] flex justify-center items-center bg-red-400">
          <h1>Hello</h1>
        </div>
      </main>
    </>
  );
}
