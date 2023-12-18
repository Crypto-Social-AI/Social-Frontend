import { useAddress } from '@thirdweb-dev/react';
import NavigationLinks from './NavigationLinks';

export default function Navigation() {
  const address = useAddress();

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
