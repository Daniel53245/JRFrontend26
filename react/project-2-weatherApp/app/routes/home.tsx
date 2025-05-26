import type { Route } from "./+types/home";
import WeatherHome from "../components/WeatherHome/WeatherHome";


function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <WeatherHome />;
}
