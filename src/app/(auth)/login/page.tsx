"use client";
import instance from "@/config/axios";
import { FormEvent, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button, Form, Alert } from "react-bootstrap";
export default function Page() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    instance
      .post("/auth/login", {
        username: formData.username,
        password: formData.password,
      })
      .then(function (response) {
        if (response.status == 200) {
          const usr = {u: response.data.username, t: response.data.accessToken}
          setCookie("auth", JSON.stringify(usr))
          router.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
      });
  };

  const ErrorMessage = ({ msg }: { msg?: string }) => {
    return <Alert variant="danger">{ msg || "Chyba..."}</Alert>;
  };

  return (
    <div>
      <div>
        <h2>Přihlášení</h2>
      </div>
      {error && <ErrorMessage msg="Přihlášení se nezdařilo. Zkontroluje zadané údaje."/>}
      <div>
        <Form
          onSubmit={(e: FormEvent) => {
            handleLogin(e);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Uživatelské jméno</Form.Label>
            <Form.Control
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              onChange={(e: any) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value={formData.username}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Heslo</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={(e: any) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              required
            ></Form.Control>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Přihlásit se
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
