import React from "react";

import { Header } from "./components/header";
import { Navbar } from "./components/navbar";

import CreateBooking from "./containers/Booking";

const App = () => {
  console.log(process.env.REACT_APP_MODE);
  console.log(process.env.REACT_APP_BUILD_VERSION);
  // function redirectTo() {
  //   window.location.href = process.env.REACT_APP_WEBSITE_URL;
  // }
  return (
    <>
      <Header />
      <Navbar />
      {/* <button onClick={redirectTo}>Redirect</button> */}
      <CreateBooking />
    </>
  );
};

export default App;
