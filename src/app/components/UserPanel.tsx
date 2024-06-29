"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
export const UserPanel = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("pika");
    router.push("/login");
  };

  return <Button onClick={(e) => handleLogout()}>Odhlásit</Button>;
};
