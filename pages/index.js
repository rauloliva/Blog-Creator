import Welcome from "../components/Welcome";

console.log('%cAll logs from Blog-Creator start with the keyword: BLOG-CREATOR', 
  'background: #444941; color: #d5eebb; font-size: 14px; padding: 3px');

const Home = () => (
  <main key="main">
    <Welcome />
  </main>
);

export default Home;
