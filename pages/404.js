import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="not-found">
      <h1>404 Page not Found</h1>
      <p>Sorry but we could not find the page you requested.</p>
      <p>Page requested: {router.asPath}</p>
    </div>
  );
};

export default NotFound;
