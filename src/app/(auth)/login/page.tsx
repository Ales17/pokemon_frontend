"use client";
import instance from "@/config/axios";
import { FormEvent, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function Page() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const router = useRouter();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    instance
      .post("/auth/login", {
        username: inputs.username,
        password: inputs.password,
      })
      .then(function (response) {
        if (response.status == 200) {
          setCookie("pika", response.data.accessToken);
          router.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);

        alert("Přihlášení se nepovedlo.");
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Přihlášení
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e: FormEvent) => {
            handleLogin(e);
          }}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Uživatelské jméno
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full border-0 border-b border-blue-500 w-full py-2 px-3 text-gray-700"
                onChange={(e: any) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                value={inputs.username}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Heslo
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full border-0 border-b border-blue-500 w-full py-2 px-3 text-gray-700"
                onChange={(e: any) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                value={inputs.password}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Přihlásit se{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
