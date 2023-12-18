import { NavLink } from 'react-router-dom';
import navLinks from './navLinks';

type NavLinkClassNameProps = {
  isActive: boolean;
};

export default function NavigationLinks() {
  return (
    <ul className='flex gap-12 justify-center items-center'>
      {navLinks.map(({ id, linkUrl, text }) => (
        <li key={id}>
          <NavLink
            to={linkUrl}
            className={({ isActive }: NavLinkClassNameProps) =>
              isActive ? 'text-yellow-300 underline' : 'underline hover:text-yellow-400 transition-colors duration-150'
            }
          >
            {text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
