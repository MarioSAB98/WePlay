import React from "react";
import ItemList from "./components/ItemList";
import backgroundImage from "./assets/background.png";

function App() {
  return (
    <div
      className="relative bg-cover h-screen p-12"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay to blur the background */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      {/* Main content */}
      <div className="relative z-10">
        <ItemList />
      </div>
    </div>
  );
}

export default App;
