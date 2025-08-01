
function Footer() {
  return (
    <footer className="py-6 text-center bg-white/30 dark:bg-gray-900/60 text-gray-800 dark:text-gray-200 shadow-inner mt-8">
      <p>
        Made with <span className="text-blue-500 dark:text-yellow-300">♥</span> by <span className="font-italic">Washma</span>
        <br />
        <a
          href="https://openweathermap.org/"
          className="underline hover:text-blue-600 dark:hover:text-yellow-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by OpenWeatherMap
        </a>
      </p>
    </footer>
  );
}
export default Footer;