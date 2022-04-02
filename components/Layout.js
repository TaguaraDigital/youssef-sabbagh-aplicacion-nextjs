// components/layout.js

import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="content">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/td.ico" />
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
