"use client";
import instance from "@/app/axiosConfig";
import { FormEvent, useState } from "react";
import { setCookie } from "cookies-next";

export default function Page() {
  const [inputs, setInputs] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    instance
      .post("/auth/login", {
        username: inputs.username,
        password: inputs.password,
      })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          setCookie("pika", response.data.accessToken);
          alert("Logged in sucessfully");
        }
      })
      .catch(function (error) {
        console.log(error);

        alert("Přihlášení se nepovedlo.");
      });
  };

  return (
    <div>
      <form
        onSubmit={(e: FormEvent) => {
          handleLogin(e);
        }}
      >
        <label htmlFor="username">Jméno:</label>
        <input
          type="text"
          onChange={(e: any) =>
            setInputs({ ...inputs, username: e.target.value })
          }
          name="username"
          value={inputs.username}
        />
        <label htmlFor="password">Heslo:</label>
        <input
          type="password"
          onChange={(e: any) =>
            setInputs({ ...inputs, password: e.target.value })
          }
          name="password"
          value={inputs.password}
        />
        <input type="submit" value="Přihlásit se" />
      </form>
    </div>
  );
}
