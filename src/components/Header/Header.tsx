import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
import ConnectWalletBox from 'components/ConnectWalletBox/ConnectWalletBox';
import Navigation from './Navigation';

export default function Header() {
  const address = useAddress();
  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      navigate('/socialCalls');
    }
  }, [address]);

  return (
    <header className='flex flex-col'>
      <ConnectWalletBox />
      <Navigation />
    </header>
  );
}
