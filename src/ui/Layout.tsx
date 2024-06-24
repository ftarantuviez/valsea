import { Link, Outlet } from "react-router-dom";

/**
 * A `Layout` component that displays the header and the main content.
 *
 * @returns A layout component.
 **/
export const Layout = (): JSX.Element => {
  return (
    <>
      <div className="w-full bg-neutral-950 border-b border-neutral-700 py-5 flex items-center justify-center">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Star_Wars_Logo..png"
            alt="Star Wars Logo"
            className="h-32"
          />
        </Link>
      </div>
      <Outlet />
    </>
  );
};
