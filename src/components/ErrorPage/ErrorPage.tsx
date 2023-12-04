import { Link, useRouteError } from 'react-router-dom';

type Error = {
  message: string;
  stack: string;
};

type RouteError = {
  status: number;
  statusText?: string;
  internal: boolean;
  data: string;
  error: Error;
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className='flex flex-col items-center justify-center gap-4 h-screen text-4xl'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText ?? error.error.message}</i>
      </p>
      <Link
        className='bg-yellow-400 rounded-xl text-slate-900 px-4 py-2 hover:bg-yellow-200 border border-yellow-700 transition-colors duration-150'
        to='/'
      >
        Home
      </Link>
    </div>
  );
}
