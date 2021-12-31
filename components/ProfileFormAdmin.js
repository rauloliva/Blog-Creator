import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/actions";
import { request } from "../utils";
import { modalActions } from "../store/actions";
import moment from "moment";

const ProfileForm = ({ user }) => {
  const dispatch = useDispatch();

  const creation_date = new Date(user.user_creation_date).toLocaleDateString();

  const [firstName, setFirstName] = useState(user.user_first_name);
  const [lastName, setLastName] = useState(user.user_last_name);
  const [email, setEmail] = useState(user.user_email);
  const [phone, setPhone] = useState(user.user_phone);
  const [brithday, setBrithday] = useState(user.user_birthday);
  const [userDescription, setUserDescription] = useState(user.user_description);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState(user.user_title);

  useEffect(() => {
    if (user.user_id) {
      setFirstName(user.user_first_name);
      setLastName(user.user_last_name);
      setEmail(user.user_email);
      setPhone(user.user_phone);
      setBrithday(user.user_birthday);
      setUserDescription(user.user_description);
      setTitle(user.user_title);
    }
  }, [user]);

  const saveHandler = async () => {
    const pwd = password.length > 0 ? password : user.user_password;

    const response = await request("/api/user/" + user.user_id, "PATCH", {
      user_first_name: firstName,
      user_last_name: lastName,
      user_email: email,
      user_phone: phone,
      user_birthday: brithday,
      user_description: userDescription,
      user_password: pwd,
      user_creation_date: creation_date,
      user_id: user.user_id,
      user_title: title,
    }, "update");

    if (response.status === 200) {
      dispatch(
        modalActions.setModal(true, {
          header: "profile updated",
          body: "Your profile was updated successfully",
          error: false,
        })
      );
      dispatch(userActions.setUser(response.user));
    } else {
      dispatch(
        modalActions.setModal(true, {
          header: "update failed",
          body: "Your profile was not updated",
          error: true,
        })
      );
    }
  };

  return (
    <div className="form">
      <div className="form__container">
        <h2 className="title">my profile</h2>
        <h3 >
          Profile created <span className='color-grey'>{moment(creation_date).startOf("day").fromNow()}</span>
        </h3>
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

        <div className="form__item">
          <label htmlFor="password">User Description</label>
          <textarea
            id="description"
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            placeholder="User Description"
          ></textarea>
        </div>

        <button className="btn__active mauto" onClick={saveHandler}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
