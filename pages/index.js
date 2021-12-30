import Welcome from "../components/Welcome";
import Head from "next/head";

console.log(
  "%cAll logs from Blog-Creator start with the keyword: BLOG-CREATOR",
  "background: #444941; color: #d5eebb; font-size: 14px; padding: 3px"
);

const Home = () => (
  <main key="main">
    <Head>
      <title>Blog Creator</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Web page to create and publish blogs" />
      <meta name="keywords" content="blogs, publish blogs, creation of blogs" />
      <meta name="author" content="Raul Oliva" />
    </Head>
    <Welcome />
  </main>
);

export default Home;
