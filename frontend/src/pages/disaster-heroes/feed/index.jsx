import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DisasterHeroesFeedRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/disaster-heroes", { replace: true });
  }, [navigate]);
  return null;
}
