import React from "react";

import Header from "../components/web/Header";

const Layout = ({ children }) => {
  return (
    <>
      {/* Render Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />
      </div>
      {/* Render Main Content (children) */}
      <main className="overflow-hidden ">{children}</main>

      {/* Render Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
