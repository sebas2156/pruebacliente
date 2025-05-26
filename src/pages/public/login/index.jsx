import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../../constants/routes";
import Input from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import {
  LoginSection,
  ButtonContainer,
  FooterText,
  ForgotPassword,
  FormTitle,
  InputGroup,
  LoginBackground,
  LoginBubble,
  LoginCard,
  LoginFooter,
  LoginForm,
  LoginHeader,
  LoginSubtitle,
  LoginTitle,
  SubmitButton,
} from "./style/styledLogin";

const Login = () => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [form, setForm] = useState({
    usuario: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", form.usuario);
      params.append("password", form.password);
      params.append("scope", "");
      params.append("client_id", "string");
      params.append("client_secret", "string");

      const response = await fetch("http://127.0.0.1:8000/api/usuario/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const result = await response.json();

      // Guardamos token y tipo
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("token_type", result.token_type || "bearer");

      setLogged(true);
      navigate(ROUTES.HOME);
    } catch (error) {
      alert("Error en login: " + error.message);
      console.error("Error en login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginSection logged={logged}>
      <LoginBackground>
        <LoginBubble top="10%" left="15%" size="120px" delay="0s" />
        <LoginBubble top="25%" left="80%" size="180px" delay="0.2s" />
        <LoginBubble top="70%" left="10%" size="150px" delay="0.4s" />
        <LoginBubble top="75%" left="75%" size="100px" delay="0.6s" />
      </LoginBackground>

      <LoginCard>
        <LoginHeader>
          <LoginTitle>Bienvenido</LoginTitle>
          <LoginSubtitle>Sistema de Gestión de Cobros Residenciales</LoginSubtitle>
        </LoginHeader>

        <LoginForm onSubmit={handleSend}>
          <FormTitle>Iniciar sesión</FormTitle>

          <InputGroup>
            <Input
              value={form.usuario}
              onChange={(v) => setForm((prev) => ({ ...prev, usuario: v }))}
              title="Usuario"
              placeholder="Ingrese su nombre de usuario"
              dark
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              type="password"
              value={form.password}
              onChange={(v) => setForm((prev) => ({ ...prev, password: v }))}
              title="Contraseña"
              placeholder="Ingrese su contraseña"
              dark
              required
            />
          </InputGroup>

          <ForgotPassword>
            <Link to={ROUTES.RECOVER_PASSWORD}>¿Olvidó su contraseña?</Link>
          </ForgotPassword>

          <Button
            type="submit"
            disabled={loading}
            text={loading ? "Procesando..." : "Iniciar sesión"}
          />
        </LoginForm>

        <LoginFooter>
          <FooterText>© {new Date().getFullYear()} ResidPay. Todos los derechos reservados.</FooterText>
        </LoginFooter>
      </LoginCard>
    </LoginSection>
  );
};

export default Login;
