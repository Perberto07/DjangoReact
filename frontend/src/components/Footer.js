// components/Footer.js
const Footer = ({ theme = "light" }) => {
  const isDark = theme === "dark";

  return (
    <footer
      className={`w-full p-4 text-center text-sm ${
        isDark
          ? "bg-gray-800 text-gray-200"
          : "bg-gray-300 text-gray-900"
      }`}
    >
      © {new Date().getFullYear()} John Patrick R. Boleche
    </footer>
  );
};

export default Footer;
