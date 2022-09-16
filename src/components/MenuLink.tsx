import { forwardRef } from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
};

const MenuLink = forwardRef(({ href, children, ...rest }: Props, ref: React.Ref<HTMLAnchorElement>) => {
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

MenuLink.displayName = 'MenuLink';

export default MenuLink;