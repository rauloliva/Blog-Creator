import Head from "next/head";

const Metadata = ({ pageTitle, description, keywords }) => (
  <Head>
    <title>Blog Creator - {pageTitle}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content="Raul Oliva" />
  </Head>
);

export default Metadata;
