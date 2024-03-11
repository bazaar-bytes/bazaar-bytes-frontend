import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Thank you for your order!</div>
      <button onClick={() => navigate("/")}>Ok</button>
    </>
  );
};
