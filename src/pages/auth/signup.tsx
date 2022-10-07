import { NextPage } from 'next';
import Head from "next/head";
import Image from "next/image";
import { trpc } from "../../utils/trpc";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import SocialButton from "../../components/SocialButton";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type SignUpFormData = {
  email: string;
  password: string;
};

const Signup: NextPage = () => {
  const { systemTheme } = useTheme();
  console.log(systemTheme);

  const router = useRouter();

  const [signUpError, setSignUpError] = useState('');

  const createUser = trpc.useMutation(['credentials.create'], {
    onSuccess: (data) => {
      if (data.status === 'error') {
        setSignUpError(data.message);
      } else {
        router.push(`/?signup=${data.status}&message=${data.message}`);
      }
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();

  const onSignUpSubmit = handleSubmit(data => {
    createUser.mutate(data);
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Head>
        <title>Authentication App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <div className="container flex flex-col items-center justify-between min-h-screen p-4 mx-auto md:justify-center font-noto-sans">
        <main className='max-w-sm md:max-w-lg md:p-14 md:border border-[#BDBDBD] md:rounded-3xl flex flex-col w-full items-start'>
          <Link href='/'>
            <a className='flex'>
              <Image
                src={systemTheme === 'dark' ? '/devchallenges-light.svg' : '/devchallenges.svg'}
                alt='devchallenges.io logo'
                width={132}
                height={19}
                objectFit='contain'
              />
            </a>
          </Link>
          <h1 className='text-lg font-semibold mt-7'>Join thousands of learners from around the world</h1>
          <p className='mt-4'>Master web development by making real-life projects. There are multiple paths for you to choose.</p>

          <form className='w-full mt-9 placeholder:text-[#828282]'
            onSubmit={onSignUpSubmit}>
            <label className='border border-[#BDBDBD] rounded-lg flex items-center py-3 px-3 gap-3'>
              <EnvelopeIcon className='w-5 h-5 fill-[#828282]' />
              <input
                className='outline-none grow bg-inherit'
                type="email"
                placeholder='Email'
                {...register('email', {
                  required: '* Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '* Invalid email address'
                  }
                })}
              />
            </label>
            {errors.email && <p className='text-red-500 text-sm mt-2'>{errors.email.message}</p>}

            <label className='border border-[#BDBDBD] rounded-lg flex items-center py-3 px-3 gap-3 mt-4'>
              <LockClosedIcon className='w-5 h-5 fill-[#828282]' />
              <input
                className='outline-none grow bg-inherit'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                {...register('password', {
                  required: '* Password is required',
                  minLength: {
                    value: 8,
                    message: '* Password must have at least 8 characters'
                  }
                })}
              />
              <button type='button' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeSlashIcon className='w-5 h-5 fill-[#828282]' />
                ) : (
                  <EyeIcon className='w-5 h-5 fill-[#828282]' />
                )}
              </button>
            </label>
            {errors.password && <p className='text-red-500 text-sm mt-2'>{errors.password.message}</p>}
            {signUpError && <p className='text-red-500 text-sm mt-2'>{signUpError}</p>}
            <button className='bg-[#2f7bed] hover:bg-[#2b74d2] active:bg-[#1e5296] text-white w-full mt-6 rounded-lg py-2 font-semibold' type="submit">Start coding now</button>
          </form>

          <p className='mt-8 self-center text-sm text-[#828282]'>or continue with these social profiles</p>

          <div className='flex items-center self-center gap-5 mt-6'>
            {['Google', 'Facebook', 'Twitter', 'Github'].map(provider => (
              <SocialButton
                key={provider}
                className='flex rounded-full hover:bg-gray-200 active:bg-gray-400' provider={provider}
                handleClick={() => {
                  signIn(provider.toLowerCase(), { callbackUrl: '/' });
                }}
              />
            ))}
            <SocialButton
              className='flex rounded-full hover:opacity-90 active:opacity-80 grayscale'
              provider='Discord'
              handleClick={() => {
                signIn('discord', { callbackUrl: '/' });
              }}
            />
          </div>

          <p className='mt-7 self-center text-sm text-[#828282]'>
            Already a member? <Link href='/'><a className='text-[#2D9CDB]'>Login</a></Link>
          </p>
        </main>

        <footer className='flex justify-between w-full max-w-sm md:max-w-lg md:mt-3'>
          <p className='text-[#BDBDBD] text-sm'>
            created by{' '}
            <a href='https://devchallenges.io/portfolio/oudajosefu' className='text-[#8f8f8f] underline underline-offset-2'>
              oudajosefu
            </a>
          </p>
          <p className='text-[#BDBDBD] text-sm'>devChallenges.io</p>
        </footer>
      </div>
    </>
  );
};

export default Signup;