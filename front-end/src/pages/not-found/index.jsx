import { Link } from "react-router-dom";

export default function IndexNotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold">404 Not Found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <p className="text-muted-foreground">
        Please check the URL or go back to the homepage.
      </p>

      <Link to="/">Back to previous page</Link>
    </div>
  );
}
