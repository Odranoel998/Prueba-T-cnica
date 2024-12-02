import { useState, useEffect } from "react";
import { FormScripts } from "./Components/pages/FormScripts";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse">
            <img
              src="https://lujancorre.ar/wp-content/uploads/2023/04/wiber.png.webp"
              alt="Weber Logo"
              className="w-100 h-50 mx-auto"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full mx-auto m-5 p-6 border-2 rounded-2xl ">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Bienvenido a la gestión de Scripts
      </h1>
      <FormScripts />
    </div>
  );
};

export default App;
