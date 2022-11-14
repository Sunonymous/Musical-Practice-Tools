import Head          from 'next/head';
import Tool          from '../components/tool.js';
import Image         from 'next/image';
import Toggler       from '../components/toggler';
import Settings      from '../components/settings';
import Metronome     from '../components/metronome.js';
import Sequencer     from '../components/sequencer';
import TwelveKeys    from '../components/twelve-keys.js';
import Expressionist from '../components/expressionist.js';

export default function Home() {
  return (
  <div className='bg-white'>
    <div className='bg-blue-400'>
      <h1 className='p-4 font-bold tracking-wider text-right text-white text-3xl'>Musical Practice Tools</h1>
    </div>
    {/* <Metronome /> */}
    <Tool toolName="Toggler"><Toggler/></Tool>
    <Tool toolName="Sequencer"><Sequencer/></Tool>
    <Tool toolName="Twelve Keys"><TwelveKeys/></Tool>
    <Tool toolName="Expressionist"><Expressionist /></Tool>
    <footer className='relative bottom-5 mt-10 mx-auto p-1 border-t-2 border-t-gray-500 border-dotted text-center'>
      Made with ❤️ by <a className='text-lg hover:underline' href="https://thesunny.one/">🌞</a>
    </footer>
  </div>);
}
