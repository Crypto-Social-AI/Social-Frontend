import { Link } from 'react-router-dom';
import { ConnectWallet } from '@thirdweb-dev/react';
import appLogo from 'assets/images/super-saiyan-bot-logo.png';

export default function ConnectWalletBox() {
  return (
    <div className='flex justify-between items-center border-b border-b-slate-800 py-4 px-8'>
      <Link to='/'>
        <div className='w-20 h-20'>
          <img className='rounded-full' src={appLogo} alt='Super Saiyan Bot' />
        </div>
      </Link>
      <ConnectWallet />
    </div>
  );
}
