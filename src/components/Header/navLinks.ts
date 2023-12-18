type NavLinkProps = {
  id: number;
  linkUrl: string;
  text: string;
};

const navLinks: NavLinkProps[] = [
  {
    id: 1,
    linkUrl: '/',
    text: 'Telegram calls',
  },
  {
    id: 2,
    linkUrl: '/socialAccounts',
    text: 'Top accounts',
  },
];

export default navLinks;
