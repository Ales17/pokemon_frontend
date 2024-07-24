"use client";
import instance from "@/config/axios";
import { FormEvent, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
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
    <div>
      <div>
        <h2>Přihlášení</h2>
      </div>
      {error.status && <ErrorMessage msg={error.msg} />}
      <div>
        <Form
          onSubmit={(e: FormEvent) => {
            handleForm(e);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Uživatelské jméno</Form.Label>
            <Form.Control
              autoFocus
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
