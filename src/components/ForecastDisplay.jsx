function ForecastDisplay({ forecast, activeTab, setActiveTab }) {
    if (!forecast) return null;
  
    // Helper function to format date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    };
  
    // Helper function to format time
    const formatTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        hour12: true 
      });
    };
  
    // Group forecast data by day for daily view
    const groupByDay = () => {
      const dailyData = {};
      forecast.list.forEach(item => {
        const date = new Date(item.dt_txt).toDateString();
        if (!dailyData[date]) {
          dailyData[date] = [];
        }
        dailyData[date].push(item);
      });
      return dailyData;
    };
  
    // Calculate daily averages
    const getDailyAverage = (dayData) => {
      const avgTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;
      const avgHumidity = dayData.reduce((sum, item) => sum + item.main.humidity, 0) / dayData.length;
      const avgWind = dayData.reduce((sum, item) => sum + item.wind.speed, 0) / dayData.length;
      
      // Get most common weather condition for the day
      const weatherCounts = {};
      dayData.forEach(item => {
        const desc = item.weather[0].description;
        weatherCounts[desc] = (weatherCounts[desc] || 0) + 1;
      });
      const mostCommonWeather = Object.keys(weatherCounts).reduce((a, b) => 
        weatherCounts[a] > weatherCounts[b] ? a : b
      );
      
      return {
        temp: Math.round(avgTemp),
        humidity: Math.round(avgHumidity),
        wind: Math.round(avgWind * 10) / 10,
        weather: mostCommonWeather
      };
    };
  
    return (
      <div className="mt-8 w-full max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-white mb-4 text-center dark:text-yellow-300">
          5-Day Forecast
        </h3>
        
        {/* Tab Buttons */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-1 dark:bg-gray-800/60">
            <button
              onClick={() => setActiveTab('hourly')}
              className={`px-6 py-2 rounded-md transition ${
                activeTab === 'hourly'
                  ? 'bg-white text-gray-800 dark:bg-yellow-400 dark:text-gray-900'
                  : 'text-white dark:text-gray-200 hover:bg-white/20'
              }`}
            >
              Hourly
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-6 py-2 rounded-md transition ${
                activeTab === 'daily'
                  ? 'bg-white text-gray-800 dark:bg-yellow-400 dark:text-gray-900'
                  : 'text-white dark:text-gray-200 hover:bg-white/20'
              }`}
            >
              Daily
            </button>
          </div>
        </div>
  
        {/* Forecast Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeTab === 'hourly' ? (
            // Hourly Forecast
            forecast.list.map((item, index) => (
              <div 
                key={index}
                className="bg-white/30 backdrop-blur-md rounded-lg p-4 shadow-lg dark:bg-gray-900/60 dark:text-gray-100"
              >
                <div className="text-center">
                  <p className="font-semibold text-sm">
                    {formatDate(item.dt_txt)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    {formatTime(item.dt_txt)}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    className="w-12 h-12 mx-auto mb-2"
                  />
                  <p className="text-lg font-bold">
                    {Math.round(item.main.temp)}°C
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                    {item.weather[0].description}
                  </p>
                  <div className="mt-2 text-xs">
                    <p>Humidity: {item.main.humidity}%</p>
                    <p>Wind: {item.wind.speed} m/s</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Daily Forecast
            Object.entries(groupByDay()).map(([date, dayData], index) => {
              const daily = getDailyAverage(dayData);
              return (
                <div 
                  key={index}
                  className="bg-white/30 backdrop-blur-md rounded-lg p-4 shadow-lg dark:bg-gray-900/60 dark:text-gray-100"
                >
                  <div className="text-center">
                    <p className="font-semibold text-lg">
                      {formatDate(date)}
                    </p>
                    <p className="text-2xl font-bold my-2">
                      {daily.temp}°C
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 capitalize mb-3">
                      {daily.weather}
                    </p>
                    <div className="text-xs space-y-1">
                      <p>Humidity: {daily.humidity}%</p>
                      <p>Wind: {daily.wind} m/s</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
  
  export default ForecastDisplay;