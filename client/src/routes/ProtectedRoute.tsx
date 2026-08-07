import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";

interface Props {
  children: React.ReactNode;
}

// Protects routes by verifying there is an auth token available and valid.
// First checks context/localStorage for a token, then validates it by
// calling a lightweight profile endpoint. If invalid, clears storage
// and redirects to login.
export default function ProtectedRoute({ children }: Props) {
  const { token, logout } = useAuth();
  const [checking, setChecking] = useState(true);

  const effectiveToken = token ?? localStorage.getItem("token");
  const hasToken = Boolean(
    effectiveToken && effectiveToken !== "null" && effectiveToken !== "undefined"
  );

  useEffect(() => {
    let mounted = true;

    const validate = async () => {
      if (!hasToken) {
        if (mounted) setChecking(false);
        return;
      }

      try {
        // validate token by fetching the current user's profile
        await getProfile();
        // still valid
      } catch (err) {
        // token invalid or expired: clear and logout
        logout();
      } finally {
        if (mounted) setChecking(false);
      }
    };

    validate();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveToken]);

  if (checking) {
    return null; // or a lightweight loading indicator
  }

  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}