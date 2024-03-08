"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import instance from "../../config/axiosConfig";
export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    instance
      .post("auth/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log("Logged in");
        localStorage.setItem("usr", response.data.accessToken);
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Login</h1>

      <form action="" onSubmit={(e) => handleLoginFormSubmit(e)}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>{" "}
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <input type="submit" value="Přihlásit se" />
      </form>
    </>
  );
}
