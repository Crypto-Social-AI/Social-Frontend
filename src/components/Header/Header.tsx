import ConnectWalletBox from 'components/ConnectWalletBox/ConnectWalletBox';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className='flex flex-col'>
      <ConnectWalletBox />
      <Navigation />
    </header>
  );
}
