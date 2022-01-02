import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { request } from "../utils";
import { modalActions } from "../store/actions";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brithday, setBrithday] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  const saveHandler = async () => {
    const pwd = password.length > 0 ? password : user.user_password;

    try {
      const response = await request(
        "/api/user/signup",
        "POST",
        {
          user_first_name: firstName,
          user_last_name: lastName,
          user_email: email,
          user_phone: phone,
          user_birthday: brithday,
          user_description: userDescription,
          user_password: pwd,
          user_title: title,
        },
        "signup"
      );

      if (response.status === 201) {
        dispatch(
          modalActions.setModal(true, {
            header: "profile updated",
            body: "Your profile was created successfully",
            error: false,
          })
        );
      } else {
        dispatch(
          modalActions.setModal(true, {
            header: "update failed",
            body: "Your profile was not created",
            error: true,
          })
        );
      }
    } catch (error) {
      dispatch(
        modalActions.setModal(true, {
          header: "update failed",
          body: "Your profile was not created",
          error: true,
        })
      );
    }
  };

  return (
    <Fragment>
      <div className="form__sign-up">
        <div className="form__container">
          <div className="form__item">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>

          <div className="form__item">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <div className="form__item">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="form__item">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
          </div>

          <div className="form__item">
            <label htmlFor="brithday">Birthday</label>
            <input
              type="date"
              id="brithday"
              value={brithday}
              onChange={(e) => setBrithday(e.target.value)}
              placeholder="Birthday"
            />
          </div>
        </div>
        <div className="form__container">
          <div className="form__item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="form__item">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
            />
          </div>

          <div className="form__item flex flex-direction-col">
            <label htmlFor="password">User Description</label>
            <textarea
              id="description"
              value={userDescription}
              onChange={(e) => setUserDescription(e.target.value)}
              placeholder="User Description"
            ></textarea>
          </div>

          <button className="btn__active mauto" onClick={saveHandler}>
            Sign Up
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUpForm;
