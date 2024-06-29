"use client";
import instance from "@/config/axios";
import { FormEvent, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
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
    <div>
      <div>
        <h2>Přihlášení</h2>
      </div>

      <div>
        <Form
          className="space-y-6"
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
                setInputs({ ...inputs, username: e.target.value })
              }
              value={inputs.username}
            ></Form.Control>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Heslo</Form.Label>
            <Form.Control type="password" name="password" onChange={(e: any) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                value={inputs.password}  required></Form.Control>
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
