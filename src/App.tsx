import React, { useState, useEffect } from "react";
import { useGetUsersQuery } from "./features/users/usersApiSlice";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

interface PersonData {
  image: string;
  phone: string;
  email: string;
  password: string;
  age: string;
  street: string;
  name: string;
}

function App() {
  const [person, setPerson] = useState<PersonData>();
  const [value, setValue] = useState("Random User");
  const [title, setTitle] = useState("name");

  const { data, isLoading, refetch } = useGetUsersQuery("api");

  useEffect(() => {
    if (data) {
      const randomPerson = data.results[0];
      const { phone, email } = randomPerson;
      const { large: image } = randomPerson.picture;
      const { password } = randomPerson.login;
      const { first, last } = randomPerson.name;
      const {
        dob: { age },
      } = randomPerson;
      const {
        street: { number, name },
      } = randomPerson.location;
      const newPerson: PersonData = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };
      setPerson(newPerson);
      setTitle("name");
      setValue(newPerson.name);
    }
  }, [data]);

  const handleValue = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.classList.contains("icon")) {
      const newValue = event.currentTarget.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={person?.image} alt={person?.name} className="user-img" />
          <p className="user-title">My {title}</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              data-labels="name"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaUser />
            </button>
            <button
              data-labels="email"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaEnvelopeOpen />
            </button>
            <button
              data-labels="age"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaCalendarTimes />
            </button>
            <button
              data-labels="street"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaMap />
            </button>
            <button
              data-labels="phone"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaPhone />
            </button>
            <button
              data-labels="password"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={() => refetch()}>
            {isLoading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
