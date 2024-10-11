import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import appLogo from 'assets/images/social-logo.png';
import Container from 'components/Container/Container';
import { FaWallet } from 'react-icons/fa6';
import SocialCalls from './socialCalls';

export default function Root() {
  const address = useAddress();

  return (
      <Container className='px-12 flex flex-col justify-center items-center min-h-screen'>
        {address ? (
          <SocialCalls />
        ) : (
          <div className='max-w-[60rem] flex flex-col gap-6 justify-center items-center mx-8 border border-yellow-400 rounded-xl py-6 px-4 bg-gradient-to-tr from-yellow-400 via-black to-black'>
            <>
              <div className='rounded-full w-24 h-24 bg-yellow-600 flex justify-center items-center'>
                <FaWallet size={36} />
              </div>
              <h2 className='text-5xl md:text-6xl lg:text-7xl text-contrast mb-2'>Connect wallet</h2>
              <span className='text-xl md:text-2xl lg:text-2xl text-text-primary mb-6'>
                Connect your wallet by clicking the button below to proceed
              </span>
              <div>
                <ConnectWallet modalTitle='SocialAI' modalTitleIconUrl={appLogo} />
              </div>
            </>
          </div>
        )}
      </Container>
  );
}
