import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Food Organizer</title>
        <meta
          name='description'
          content='Aministra tus comidas eficientemente'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main role='main'></main>
    </div>
  );
};

export default Home;
