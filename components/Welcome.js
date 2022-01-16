import { useState } from "react";
import { useRouter } from "next/router";
import Alert from "./Alert";
import { request } from "../utils";
import { Logger } from "react-logger-lib";
import LinkInternal from "./LinkInternal";

const Welcome = () => {
  Logger.of("Home.Welcome").info("init welcome component");

  const router = useRouter();

  const [btnStyle, setBtnStyle] = useState("btn__locked");
  const [serverResCode, setServerResCode] = useState(200);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInHandler = async (event) => {
    event.preventDefault();
    if (btnStyle === "btn__locked") {
      event.preventDefault();
      return;
    }

    const access_token = localStorage.getItem("access_token");

    const data = await request(
      "/api/user",
      "POST",
      {
        email: email,
        password: password,
      },
      "login",
      access_token
    );

    if (data.status === 200) {
      localStorage.setItem("access_token", data.access_token);

      router.replace(`${router.route}admin`);
    } else {
      setPassword("");
      setServerResCode(data.status);
    }
  };

  const verifyFields = () => {
    if (email !== "" && password !== "") {
      setBtnStyle("btn__active");
    } else {
      setBtnStyle("btn__locked");
    }
  };

  return (
    <div className="welcome__container">
      <form className="welcome__form" onSubmit={logInHandler}>
        <h2>Log in to your account</h2>

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          onKeyUp={verifyFields}
          onChange={e => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onKeyUp={verifyFields}
          onChange={e => setPassword(e.target.value)}
          value={password}
          required
        />

        <button className={btnStyle} onClick={logInHandler}>
          Log In
        </button>

        <p className="welcome__sign-up">
          Do not have an account yet?&nbsp;
          <LinkInternal href="/sign-up" text="Sign Up" className="link-dark" />
        </p>

        {serverResCode !== 200 && <Alert />}
      </form>
      <div className="welcome__image">
        <object type="image/svg+xml" data="/image.svg"></object>
      </div>
    </div>
  );
};

export default Welcome;
