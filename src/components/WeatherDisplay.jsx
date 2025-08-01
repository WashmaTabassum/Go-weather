function WeatherDisplay({weather, loading, error}) {
  if (loading) return (
    <section className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md mx-auto dark:bg-gray-900/60 dark:text-gray-100">
        <p className="text-xl text-gray-700 dark:text-gray-200">Loading...</p>
      </section>
  );
  if(error){
    return(
      <section className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md mx-auto dark:bg-gray-900/60 dark:text-gray-100">
        <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
      </section>
    )
  }
  if(!weather){
      return (
        <section className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md mx-auto dark:bg-gray-900/60 dark:text-gray-100">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
            alt="Weather Icon"
            className="w-28 h-28 mb-4"
          />
          <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">Weather Info</h2>
          <p className="text-gray-700 dark:text-gray-200">Search for a city!</p>
        </section>
      );
  }

  return (
    <section className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md mx-auto  dark:bg-gray-900/60 dark:text-gray-100">
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt={weather.weather[0].description}
        className="w-28 h-28 mb-4"
      />
      <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">{weather.name}</h2>
      <p className="text-xl text-gray-700 capitalize  dark:text-gray-200">{weather.weather[0].description}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-2 dark:text-yellow-300">
        {Math.round(weather.main.temp)}°C
      </p>
      <div className="flex gap-6 mt-4">
        <div>
          <span className="font-semibold">Humidity:</span> {weather.main.humidity}%
        </div>
        <div>
          <span className="font-semibold">Wind:</span> {weather.wind.speed} m/s
        </div>
      </div>
    </section>
  );
}


export default WeatherDisplay;