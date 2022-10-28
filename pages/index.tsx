import type { NextPage } from "next";
import Head from "next/head";
import Navigation from "../Components/header";
import UserSection from "../Components/userSection";

const Home: NextPage = () => {
  return (
    <div style={{ height: "100vh !important" }}>
      <Head>
        <title>CRUD app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      <div className="p-3">
        <UserSection />
      </div>
    </div>
  );
};

export default Home;
