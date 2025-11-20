import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
import { registerSchema } from "../utils/validationSchemas";

const RegisterPage = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-bg px-4">
      <div className="w-[380px] bg-card p-8 rounded-xl border border-border-soft shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-text tracking-wide">
          Sign Up
        </h1>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={registerSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await register(values);
              toast.success("Account created successfully!");
              navigate("/dashboard");
            } catch (err) {
              const errorData = err.response?.data;
              if (errorData?.message) {
                toast.error(errorData.message);
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-1 text-sm font-medium text-text-muted"
                >
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className="
                    w-full px-3 py-2 rounded-md
                    bg-bg text-text
                    border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary
                  "
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-destructive text-sm mt-1"
                />
              </div>

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
                  w-full py-2 rounded-full mt-2
                  bg-primary text-text font-medium tracking-wide
                  transition-all duration-300
                  hover:bg-primary-hover
                  hover:shadow-[inset_0_0_8px_var(--color-primary-muted)]
                  cursor-pointer
                  disabled:opacity-50
                "
              >
                {isSubmitting ? "Creating account..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-5 text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-primary hover:text-primary-hover
              transition cursor-pointer
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
