import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body className='dark:bg-[#333333] dark:text-[#E0E0E0]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;