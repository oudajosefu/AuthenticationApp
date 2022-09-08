import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import SocialButton from "../components/SocialButton";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>Authentication App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <div className="container mx-auto flex flex-col items-center md:justify-center min-h-screen p-4 font-noto-sans justify-between">
        <main className='max-w-sm md:max-w-lg md:p-14 md:border md:rounded-3xl flex flex-col w-full items-start'>
          <div>
            <Image
              src='/devchallenges.svg'
              alt='devchallenges.io logo'
              width={132}
              height={19}
              objectFit='contain'
            />
          </div>
          <h1 className='font-semibold text-lg mt-7'>Join thousands of learners from around the world</h1>
          <p className='mt-4'>Master web development by making real-life projects. There are multiple paths for you to choose.</p>

          <form className='w-full mt-9'
            onSubmit={(e) => e.preventDefault()}>
            <label className='border border-[#BDBDBD] rounded-lg flex items-center py-3 px-3 gap-3'>
              <EnvelopeIcon className='w-5 h-5 fill-[#828282]' />
              <input className='outline-none grow' type="email" name="registration" id="email" placeholder='Email' />
            </label>

            <label className='border border-[#BDBDBD] rounded-lg flex items-center py-3 px-3 gap-3 mt-4'>
              <LockClosedIcon className='w-5 h-5 fill-[#828282]' />
              <input className='outline-none grow' type="password" name="registration" id="password" placeholder='Password' />
            </label>
            <button className='bg-[#2f7bed] hover:bg-[#2b74d2] active:bg-[#1e5296] text-white w-full mt-6 rounded-lg py-2 font-semibold' type="submit">Start coding now</button>
          </form>

          <p className='mt-8 self-center text-sm text-[#828282]'>or continue with these social profiles</p>

          <div className='flex gap-5 mt-6 self-center'>
            {['Google', 'Facebook', 'Twitter', 'Github'].map(provider => (
              <SocialButton
                key={provider}
                className='flex hover:bg-gray-200 active:bg-gray-400 rounded-full' provider={provider}
              />
            ))}
          </div>

          <p className='mt-7 self-center text-sm text-[#828282]'>
            Already a member? <a href='#' className='text-[#2F80ED]'>Login</a>
          </p>
        </main>

        <footer className='flex justify-between w-full max-w-sm md:max-w-lg md:mt-3'>
          <p className='text-[#BDBDBD] text-sm'>
            created by <a href='https://devchallenges.io/portfolio/oudajosefu' className='text-[#8f8f8f] underline underline-offset-2'>oudajosefu</a>
          </p>
          <p className='text-[#BDBDBD] text-sm'>devChallenges.io</p>
        </footer>
      </div>
    </>
  );
};

export default Home;