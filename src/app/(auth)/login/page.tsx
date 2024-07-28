"use client";
import instance from "@/config/axios";
import { FormEvent, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/app/components/ErrorMessage";
export default function Page() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState({ status: false, msg: "" });

  const router = useRouter();

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    const url = "/auth/login";
    instance
      .post(url, formData)
      .then(function (response) {
        if (response.status == 200) {
          setCookie("session", response.data.accessToken);
          router.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
        setError({ ...error, status: true, msg: "Chyba při přihlášení" });
      });
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          DaisyUI
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              onChange={(e: any) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value={formData.username}
              placeholder="Username"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              onChange={(e: any) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              placeholder="Enter Password"
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
            <button onClick={handleForm} className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
