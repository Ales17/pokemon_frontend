"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

/* export async function login(inputs:LoginInputs) {
  instance
    .post("/auth/login", {
      inputs,
    })
    .then(function (response) {
      if (response.status == 200) {
        cookies().set("session", response.data.accessToken);
        redirect("/");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
} */

export async function handleLogout() {
  cookies().delete("session");
  redirect("/login");
}

function getDecodedJwt() {
  const cookie = cookies().get("session")?.value;
  if (cookie) {
    const decodedJwt = jwtDecode(cookie);
    console.log(decodedJwt)
    return decodedJwt;
  }
  return {};
}

export async function getSessionUsername() {
  return getDecodedJwt().sub;
}

export async function getSessionRoles() {
  //@ts-ignore
  return getDecodedJwt().roles;
}


export async function isUserAdmin() {
  const roles = await getSessionRoles() 
  return roles.includes("ROLE_ADMIN")
}