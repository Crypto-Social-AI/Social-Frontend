import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';
import { FaWallet } from 'react-icons/fa6';
import Container from 'components/Container/Container';
import SocialCalls from './socialCalls';

export default function Root() {
  const account = useActiveAccount();
  const address = account?.address;

  let client;
  if (process.env.REACT_APP_THIRDWEB_CLIENT_ID !== undefined) {
    client = createThirdwebClient({ clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID });
  }

  return (
    <Container className='px-12'>
      {address ? (
        <SocialCalls />
      ) : (
        <div className='flex flex-col gap-6 justify-center items-center mx-8 border border-yellow-400 rounded-xl py-6 px-4 bg-gradient-to-tr from-yellow-400 via-black to-black'>
          <>
            <div className='rounded-full w-16 h-16 bg-yellow-600 flex justify-center items-center'>
              <FaWallet size={24} />
            </div>
            <h2 className='text-3xl text-contrast'>Connect wallet</h2>
            <span className='text-text-primary'>Connect your wallet by clicking the button below to proceed</span>
            {client !== undefined ? (
              <div>
                <ConnectButton client={client} />
              </div>
            ) : null}
          </>
        </div>
      )}
    </Container>
  );
}
