"use client";
import instance from "@/app/axios";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { LoginInputs } from "@/types";
import ErrorMessage from "@/app/components/ErrorMessage";
export default function Page() {
  const [loginDto, setLoginDto] = useState({ username: "", password: "" });
  const [error, setError] = useState({ status: false, msg: "" });

  const router = useRouter();

  const handleForm = (e: React.FormEvent, formData: LoginInputs) => {
    e.preventDefault();
    const url = "/auth/login";
    instance
      .post(url, formData)
      .then((response) => {
        if (response.status == 200) {
          setCookie("session", response.data.accessToken);
          router.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
        setError({ status: true, msg: "Chyba při přihlášení" });
      });
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          Pokémon App
        </h1>
        {error.status && <ErrorMessage msg="Chyba při přihlásení"/>}
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Uživatelské jméno</span>
            </label>
            <input
              type="text"
              onChange={(e: any) =>
                setLoginDto({ ...loginDto, username: e.target.value })
              }
              value={loginDto.username}
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Heslo</span>
            </label>
            <input
              type="password"
              onChange={(e: any) =>
                setLoginDto({ ...loginDto, password: e.target.value })
              }
              value={loginDto.password}
              className="w-full input input-bordered input-primary"
            />
          </div>
          {/*  <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a> */}
          <div>
            <button
              onClick={(e) => {
                handleForm(e, loginDto);
              }}
              className="btn btn-primary"
            >
              Přihlásit se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
