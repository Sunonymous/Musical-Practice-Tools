import Head from 'next/head';
import Image from 'next/image';
import Metronome from '../components/metronome.js';
import Sequencer from '../components/sequencer';
import Settings from '../components/settings';
import Toggler from '../components/toggler';
import TwelveKeys from '../components/twelve-keys.js';



export default function Home() {
  return (
  <div className='h-screen v-screen flex flex-col justify-around bg-gray-200'>
    <div className='bg-blue-400'>
      <h1 className='p-6 text-center text-white text-6xl'>Musical Practice Tools</h1>
    </div>
    <Metronome />
    <Sequencer />
    <hr />
    <Toggler />
    <TwelveKeys />
  </div>);
}
