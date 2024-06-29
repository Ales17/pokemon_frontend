"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Stack, Navbar } from "react-bootstrap";
export const UserPanel = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("auth")
    router.push("/login");
  };

  useEffect(() => {
    const cookieUserName = getCookie("u");
    if (cookieUserName) setUsername(cookieUserName)
  }, []);

  return (
    <Stack direction="horizontal" gap={3}>
      {username != "" && (
        <Navbar.Text>
          Přihlášený uživatel: <span className="text-white">{username}</span>
        </Navbar.Text>
      )}
      <Button onClick={(e) => handleLogout()}>Odhlásit</Button>
    </Stack>
  );
};
