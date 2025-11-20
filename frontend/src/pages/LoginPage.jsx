import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
import { loginSchema } from "../utils/validationSchemas";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-bg px-4">
      <div className="w-[380px] bg-card p-8 rounded-xl border border-border-soft shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-text tracking-wide">
          Sign In
        </h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await login(values.email, values.password);
              toast.success("Logged in successfully!");
              navigate("/dashboard");
            } catch (err) {
              toast.error(err.response?.data?.message || "Login failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-text-muted"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="
                    w-full px-3 py-2 rounded-md
                    bg-bg text-text
                    border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary
                  "
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-destructive text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-text-muted"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="
                    w-full px-3 py-2 rounded-md
                    bg-bg text-text
                    border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary
                  "
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-destructive text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full py-2 rounded-full font-medium tracking-wide
                  bg-primary text-text
                  transition-all duration-300
                  hover:bg-primary-hover hover:text-text
                  hover:shadow-[inset_0_0_8px_var(--color-primary-muted)]
                  cursor-pointer
                  disabled:opacity-50
                "
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-5 text-center text-sm text-text-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary-hover transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
