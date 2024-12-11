import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700 dark:bg-slate-700">
      <h1 className="text-6xl font-bold mb-4 text-gray-800 ">404</h1>
      <p className="text-xl mb-8 dark:text-slate-300">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition dark:bg-slate-500 dark:hover:bg-black dark:hover:text-white"
      >
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;
