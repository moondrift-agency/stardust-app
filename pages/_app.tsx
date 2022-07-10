import Head from "next/head"

import type { AppProps } from 'next/app'

//theme
import { Layout } from "../layouts/Layout"
import { Global } from '@emotion/react'
import { globalStyles } from "../styles/global"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Head>
        <title>Stardust</title>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
