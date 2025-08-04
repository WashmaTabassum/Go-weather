import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import { useState } from 'react';

function App() {

  //adding state for the city, weather, loading, error
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [activeTab, setActiveTab] = useState("hourly"); // 'hourly' or 'daily'
  
  //search handler fucntion
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);
    try{
      const apiKey = "34d77829096b52505ccb1bdbc0ba23cb"
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );

      if (!response.ok){
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      await fetchForecast(city);
    }
    catch(err)
    {
      setError(err.message);
    }
    finally{
      setLoading(false);
    }
  };

  const fetchForecast = async (cityName) => {
    try {
      const apiKey = "34d77829096b52505ccb1bdbc0ba23cb";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          cityName
        )}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Forecast not available");
      }
      const data = await response.json();
      setForecast(data);
    } catch (err) {
      console.error("Forecast error:", err.message);
    }
  };
  // const lightBg = "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1500&q=80')";
  const lightBg = "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1500&q=80')";
  // const lightBg = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')";
  const darkBg = "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80')";

  return (
    <div
      className={`min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 bg-cover bg-center ${darkMode ? 'dark' : ''}`}
      style={{
        backgroundImage: darkMode ? darkBg : lightBg
      }}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 flex flex-col items-center justify-center">
        <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
        
        <WeatherDisplay
          weather={weather}
          loading={loading}
          error={error}
          forecast={forecast}
         
        />
        <ForecastDisplay forecast={forecast} activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
      <Footer />
    </div>
  );
}

export default App;