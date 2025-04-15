
import { Link } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="flex-1 flex flex-col sm:flex-row">
        <div className="sm:w-1/2 bg-primary p-10 text-white flex items-center justify-center">
          <div className="max-w-md">
            <Link to="/" className="text-2xl font-bold mb-8 block">
              EduPortal
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              Welcome Back to EduPortal
            </h1>
            <p className="mb-6 text-white/80">
              Your comprehensive education management platform that connects students and teachers.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Track your academic progress
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                View your schedule and attendance
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Communicate directly with teachers
              </li>
            </ul>
          </div>
        </div>
        
        <div className="sm:w-1/2 p-10 flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
