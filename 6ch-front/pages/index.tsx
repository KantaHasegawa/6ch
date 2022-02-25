import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Threads from '../components/Threads';

const Home: NextPage = () => {
  return (
    <Layout title='スレッド一覧'>
      <div style={{ fontSize: "8rem", fontFamily: 'Rampart One, cursive', textAlign: "center" }}>6ちゃんねる</div>
      <Threads></Threads>
    </Layout>
  );
};

export default Home;
