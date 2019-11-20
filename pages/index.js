import React from 'react'
import Head from 'next/head'
import Layout from '../components/common/Layout';
import UserInfoForm from '../components/UserInfoForm';

const Home = () => (
  <div>
    <Head>
      <title>Lalit's App Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Layout>
      <UserInfoForm />
    </Layout>
  </div>
)

export default Home
