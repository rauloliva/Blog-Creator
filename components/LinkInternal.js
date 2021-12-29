import Head from "next/head";
import Link from "next/link";
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";
import { Fragment } from "react";

const LinkInternal = ({ href, text, className = "" }) => (
  <Fragment>
    <Head>{GoogleFonts()}</Head>

    <Link href={href} passHref>
      <span className="link-box">
        <a className={`link ${className}`}>{text}</a>
        <i className={`material-icons link-arrow ${className}`}>&#xe315;</i>
      </span>
    </Link>
  </Fragment>
);

export default LinkInternal;
