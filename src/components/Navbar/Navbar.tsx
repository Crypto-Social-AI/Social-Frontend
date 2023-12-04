import { ConnectWallet } from '@thirdweb-dev/react';
import appLogo from '../../assets/images/super-saiyan-bot-logo.png';

export default function Navbar() {
  return (
    <header className='py-4 px-8 border-b border-b-orange-600'>
      <div className='flex justify-between items-center'>
        <div className='w-20 h-20'>
          <img className='rounded-full' src={appLogo} alt='Super Saiyan Bot' />
        </div>
        <ConnectWallet />
      </div>
    </header>
  );
}
