import { forwardRef } from 'react';
import Link from 'next/link';

type Props = {
  className: string;
  href: string;
  children: React.ReactNode;
};

const MenuLinkButton = forwardRef(
  ({ href, children, ...rest }: Props, ref: React.Ref<HTMLAnchorElement>) => {
    return (
      <button {...rest}>
        <Link href={href}>
          <a className='flex items-center gap-2' ref={ref}>
            {children}
          </a>
        </Link>
      </button>
    );
  });

MenuLinkButton.displayName = 'MenuLink';

export default MenuLinkButton;