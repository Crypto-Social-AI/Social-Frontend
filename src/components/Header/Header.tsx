import { ConnectWallet } from '@thirdweb-dev/react';
import appLogo from '../../assets/images/super-saiyan-bot-logo.png';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className='flex flex-col'>
      <div className='flex justify-between items-center border-b border-b-slate-800 py-4 px-8'>
        <div className='w-20 h-20'>
          <img className='rounded-full' src={appLogo} alt='Super Saiyan Bot' />
        </div>
        <ConnectWallet />
      </div>
      <Navigation />
    </header>
  );
}
