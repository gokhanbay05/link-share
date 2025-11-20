import React, { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { LuPalette } from "react-icons/lu";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  const themes = [
    { id: "dark", label: "Default" },
    { id: "aurora", label: "Aurora" },
    { id: "latte", label: "Latte" },
    { id: "midnight", label: "Midnight" },
    { id: "forest", label: "Forest" },
  ];

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "aurora";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  const handleThemeChange = (value) => {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
    setThemeMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-10 bg-bg px-6 py-3 border-b border-border-soft flex items-center justify-between backdrop-blur-sm">
      <Link to="/" className="text-2xl font-semibold tracking-wide text-text">
        LinkHub
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden sm:block text-text-muted text-sm">
              @{user.username}
            </span>

            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen((prev) => !prev)}
                className="
              px-3 py-1.5 rounded-full text-sm font-medium
              bg-bg-soft text-text
              hover:bg-bg-muted transition cursor-pointer
              "
              >
                <LuPalette className="text-lg" />{" "}
              </button>

              {themeMenuOpen && (
                <div
                  className="
                absolute right-0 mt-2 w-40 rounded-lg
                bg-card border border-border-soft shadow-lg
              "
                >
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id)}
                      className={`
                    w-full text-left px-4 py-2 text-sm
                    ${
                      t.id === theme
                        ? "text-primary font-semibold"
                        : "text-text"
                    }
                    hover:bg-bg-muted transition cursor-pointer
                  `}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="
                px-4 py-1.5 text-sm font-medium rounded-full
                border border-border text-text
                hover:bg-bg-soft transition cursor-pointer
              "
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen((prev) => !prev)}
                className="
              px-3 py-1.5 rounded-full text-sm font-medium
              bg-bg-soft text-text
              hover:bg-bg-muted transition cursor-pointer
              "
              >
                <LuPalette className="text-lg" />{" "}
              </button>

              {themeMenuOpen && (
                <div
                  className="
                absolute right-0 mt-2 w-40 rounded-lg
                bg-card border border-border-soft shadow-lg
              "
                >
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id)}
                      className={`
                    w-full text-left px-4 py-2 text-sm
                    ${
                      t.id === theme
                        ? "text-primary font-semibold"
                        : "text-text"
                    }
                    hover:bg-bg-muted transition cursor-pointer
                  `}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/login"
              className="
                text-sm font-medium text-text
                hover:text-primary-hover transition cursor-pointer
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                px-5 py-2 text-sm font-medium rounded-full
                bg-primary text-text
                hover:bg-primary-hover transition cursor-pointer
              "
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
