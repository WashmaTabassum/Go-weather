

function SearchBar({ city, setCity, handleSearch }) {
  return (
    <form className="flex items-center gap-2 mt-2 mb-6" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-4 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-sky-400 shadow-md dark:bg-gray-800 dark:text-gray-100"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-semibold rounded-r-lg shadow-md hover:scale-105 transition dark:from-yellow-400 dark:to-yellow-600"
      >
        Search
      </button>
    </form>
  );
}
export default SearchBar;