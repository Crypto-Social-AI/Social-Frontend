import { Link } from 'react-router-dom';
import { ConnectWallet } from '@thirdweb-dev/react';
import appLogo from 'assets/images/social-logo.png';

export default function ConnectWalletBox() {
  return (
    <div className='flex justify-between items-center border-b border-b-slate-800 py-4 px-8'>
      <Link to='/'>
        <div className='flex items-center gap-2'>
          <div className='w-16 h-16'>
            <img className='rounded-full' src={appLogo} alt='SocialAi' />
          </div>
          <span className='text-3xl'>SocialAi</span>
        </div>
      </Link>
      <ConnectWallet modalTitle='SocialAI' modalTitleIconUrl={appLogo} />
    </div>
  );
}
