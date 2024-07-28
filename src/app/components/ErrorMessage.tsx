import { Alert } from "react-bootstrap";
const ErrorMessage = ({ msg }: { msg?: string }) => {
  return <div>{msg || "Chyba..."}</div>;
};
export default ErrorMessage;
