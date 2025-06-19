import { Outlet } from "react-router-dom";

import "intro.js/introjs.css";
import "./index.css";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
