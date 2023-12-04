import { NavLink } from 'react-router-dom';

type NavLinkProps = {
  isActive: boolean;
};

export default function Navigation() {
  return (
    <nav className='border-b border-b-slate-800 py-8'>
      <ul className='flex gap-12 justify-center items-center'>
        <li>
          <NavLink
            to='/'
            className={({ isActive }: NavLinkProps) =>
              isActive ? 'text-yellow-300 underline' : 'underline hover:text-yellow-400 transition-colors duration-150'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/socialCalls'
            className={({ isActive }: NavLinkProps) =>
              isActive ? 'text-yellow-300 underline' : 'underline hover:text-yellow-400 transition-colors duration-150'
            }
          >
            Telegram calls
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/socialAccounts'
            className={({ isActive }: NavLinkProps) =>
              isActive ? 'text-yellow-300 underline' : 'underline hover:text-yellow-400 transition-colors duration-150'
            }
          >
            Top accounts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
