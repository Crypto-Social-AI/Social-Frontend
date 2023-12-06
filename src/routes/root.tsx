import { ConnectWallet } from '@thirdweb-dev/react';
import Container from 'components/Container/Container';
import { FaWallet } from 'react-icons/fa6';
import { useNavigation } from 'react-router-dom';

export default function Root() {
  const navigation = useNavigation();

  return (
    <Container>
      {navigation.state === 'loading' ? (
        <span>Loading...</span>
      ) : (
        <div className='flex flex-col gap-6 justify-center items-center mt-12 mx-8 border border-yellow-400 rounded-xl py-6 px-4 bg-gradient-to-tr from-yellow-400 via-black to-black'>
          <>
            <div className='rounded-full w-16 h-16 bg-yellow-600 flex justify-center items-center'>
              <FaWallet size={24} />
            </div>
            <h2 className='text-3xl text-contrast'>Connect wallet</h2>
            <span className='text-text-primary'>Connect your wallet by clicking the button below to proceed</span>
            <div>
              <ConnectWallet />
            </div>
          </>
        </div>
      )}
    </Container>
  );
}
