"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Stack, Navbar } from "react-bootstrap";
export const UserPanel = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("auth");
    router.push("/login");
  };

  useEffect(() => {
    const cookie = getCookie("auth");
    if (cookie) var u = JSON.parse(cookie).u;
    setUsername(u);
  }, []);

  return (
    <Stack direction="horizontal" gap={3} className="d-flex justify-content-center">
      {username != "" && (
        <Navbar.Text>
          <span className="text-white">{username}</span>
        </Navbar.Text>
      )}
      <Button onClick={(e) => handleLogout()}>Odhlásit</Button>
    </Stack>
  );
};
