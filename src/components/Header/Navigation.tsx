import { useActiveAccount } from 'thirdweb/react';
import NavigationLinks from './NavigationLinks';

export default function Navigation() {
  const account = useActiveAccount();
  const address = account?.address;

  return (
    <>
      {address ? (
        <nav className='border-b border-b-slate-800 py-8'>
          <NavigationLinks />
        </nav>
      ) : null}
    </>
  );
}
