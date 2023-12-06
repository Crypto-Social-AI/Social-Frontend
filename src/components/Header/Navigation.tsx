import { useAddress } from '@thirdweb-dev/react';
import { NavLink } from 'react-router-dom';

type NavLinkProps = {
  isActive: boolean;
};

export default function Navigation() {
  const address = useAddress();

  return (
    <>
      {address ? (
        <nav className='border-b border-b-slate-800 py-8'>
          <ul className='flex gap-12 justify-center items-center'>
            <li>
              <NavLink
                to='/socialCalls'
                className={({ isActive }: NavLinkProps) =>
                  isActive
                    ? 'text-yellow-300 underline'
                    : 'underline hover:text-yellow-400 transition-colors duration-150'
                }
              >
                Telegram calls
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/socialAccounts'
                className={({ isActive }: NavLinkProps) =>
                  isActive
                    ? 'text-yellow-300 underline'
                    : 'underline hover:text-yellow-400 transition-colors duration-150'
                }
              >
                Top accounts
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
}
