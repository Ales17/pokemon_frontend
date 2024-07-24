import { Alert } from "react-bootstrap";
const ErrorMessage = ({ msg }: { msg?: string }) => {
  return <Alert variant="danger">{msg || "Chyba..."}</Alert>;
};
export default ErrorMessage;
