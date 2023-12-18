import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error | null;
  const isNotFound = !error;

  return (
    <div className='flex flex-col items-center justify-center gap-4 h-error-page-height text-4xl'>
      <h1>Oops!</h1>
      {isNotFound ? (
        <p>Sorry, the page you&apos;re looking for cannot be found.</p>
      ) : (
        <>
          <p>Sorry, an unexpected error has occurred.</p>
          {isRouteErrorResponse(error) ? (
            <p>
              <i>
                {error.status} {error.statusText}
              </i>
            </p>
          ) : (
            <p>
              <i>{error?.message ?? 'Unknown Error'}</i>
            </p>
          )}
        </>
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
