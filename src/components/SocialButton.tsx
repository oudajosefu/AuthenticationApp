import { FC } from "react";
import Image from "next/image";

type Props = {
  className?: string;
  provider: string;
  handleClick: () => void;
};

const SocialButton: FC<Props> = ({ className, provider, handleClick }) => {
  return (
    <button className={className} onClick={handleClick}>
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