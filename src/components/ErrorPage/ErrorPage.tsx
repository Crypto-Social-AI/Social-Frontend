import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className='flex flex-col items-center justify-center gap-4 h-screen text-4xl'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {isRouteErrorResponse(error) ? (
        <p>
          <i>
            {error.status} {error.statusText}
          </i>
        </p>
      ) : (
        <p>
          <i>{error.message ?? error}</i>
        </p>
      )}
      <Link
        className='bg-yellow-400 rounded-xl text-slate-900 px-4 py-2 hover:bg-yellow-200 border border-yellow-700 transition-colors duration-150'
        to='/'
      >
        Home
      </Link>
    </div>
  );
}
