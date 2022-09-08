import { FC } from "react";
import Image from "next/image";

type Props = {
    className?: string;
    provider: string;
};

const SocialButton: FC<Props> = ({ className, provider }) => {
    return (
        <button className={className} type="submit">
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