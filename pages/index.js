import Head from 'next/head';
import Image from 'next/image';
import Sequencer from '../components/sequencer';
import { sequencerBase } from '../components/sequencer';
import Settings from '../components/settings';


export default function Home() {
  return (
  <div className='h-screen v-screen flex flex-col content-center'>
    <div className='bg-blue-400'>
      <h1 className='p-6 text-center text-white text-6xl'>Musical Practice Tools</h1>
    </div>
    <Sequencer className='self-center'></Sequencer>
  </div>);
}
