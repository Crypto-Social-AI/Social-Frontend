import { Link } from 'react-router-dom';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
import { ConnectButton } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';
import appLogo from 'assets/images/social-logo.png';

const wallets = [
  inAppWallet(),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
];

export default function ConnectWalletBox() {
  let client;
  if (process.env.REACT_APP_THIRDWEB_CLIENT_ID !== undefined) {
    client = createThirdwebClient({ clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID });
  }

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
      <div>{client !== undefined ? <ConnectButton client={client} wallets={wallets} /> : null}</div>
    </div>
  );
}
