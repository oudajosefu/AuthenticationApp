import { FC } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

type Props = {
  className?: string;
  provider: string;
};

const SocialButton: FC<Props> = ({ className, provider }) => {
  return (
    <button className={className} onClick={() => signIn(provider.toLowerCase(), { callbackUrl: '/' })}>
      <Image
        src={`/${provider}.svg`}
        alt={`${provider} logo`}
        width={43}
        height={43}
        objectFit='contain'
      />
    </button>
  );
};

export default SocialButton;