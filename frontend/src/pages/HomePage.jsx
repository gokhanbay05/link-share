import { Link, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-bg px-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-text">
          LinkHub
        </h1>

        <div className="mx-auto w-20 h-0.5 bg-accent/40 mt-6 rounded-full"></div>

        <p className="text-text-muted text-lg mt-6 leading-relaxed max-w-md mx-auto">
          Your personal link portfolio — minimal, elegant and crafted with
          clarity.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link
            to="/register"
            className="
              px-8 py-3 rounded-full font-medium
              bg-primary text-text
              transition-all duration-300
              hover:bg-primary-hover
            "
          >
            Create an Account
          </Link>

          <Link
            to="/login"
            className="
              px-8 py-3 rounded-full font-medium
              border border-border text-text
              bg-bg-muted
              transition-all duration-300
              hover:border-primary
              hover:bg-bg-soft
              hover:shadow-[0_0_14px_var(--color-primary-hover)]
            "
          >
            Login
          </Link>
        </div>

        <p className="text-sm text-text-muted mt-10 tracking-wide">
          A refined place for the links that define you.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
