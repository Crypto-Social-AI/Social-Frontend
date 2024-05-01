import { Link } from 'react-router-dom';
import { ConnectWallet } from '@thirdweb-dev/react';
import appLogo from 'assets/images/hype-hunter.png';

export default function ConnectWalletBox() {
  return (
    <div className='flex justify-between items-center border-b border-b-slate-800 py-4 px-8'>
      <Link to='/'>
        <div className='w-20 h-20'>
          <img className='rounded-full' src={appLogo} alt='SocialAi' />
        </div>
      </Link>
      <ConnectWallet />
    </div>
  );
}
