import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg font-semibold">Page Not Found</p>
        <p className="text-text-muted text-sm">
          The page you're looking for doesn’t exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-primary text-text font-medium hover:bg-secondary transition"
          >
            Go to Home
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-text-muted text-text font-medium hover:bg-bg-muted transition"
          >
            Login Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
