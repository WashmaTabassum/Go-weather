
function Header({ darkMode, setDarkMode }) {
  return (
    <header className="py-8 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg text-center mb-4 dark:text-yellow-300">
        Weather App
      </h1>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="px-4 py-2 rounded-full bg-gray-500 text-white shadow hover:bg-gray-700 transition dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
export default Header;




