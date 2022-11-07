// Helper Functions
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min); // max is exclusive

import * as R from 'ramda';
import { useState } from 'react';
import Settings from './settings';
import { sequencerBase } from './settingBases';

const defaultConfig = {
    lowest: 1,
    highest: 8,
    length: 4,
    useAllNumbers: false,
    beatSync: false,
    ascending: false,
};

// This randomness function lovingly "borrowed" from:
// https://github.com/ramda/ramda/issues/168 

const shuffler = R.curry(function(random, list) {
    var idx = -1;
    var len = list.length;
    var position;
    var result = [];
    while (++idx < len) {
        position = Math.floor((idx + 1) * random());
        result[idx] = result[position];
        result[position] = list[idx];
    }
    return result;
}),
shuffle = shuffler(Math.random);

// CONFIG
/*
Sample Configuration with Details about Usage
{
    lowest: 1,           // lowest number possible in sequence
    highest: 8,          // highest number possible in sequence
    allNumbers: false,   // use every possible number in sequence
    length: 4,           // length of sequences generated
    synced: false,       // generates at every new beat from metronome
    ascending: false,    // forces sequence to ascending order
}
*/

export default function Sequencer({ startingConfig, settings }) {
    const [config, setConfig] = useState(R.defaultTo(defaultConfig, startingConfig));
    const [sequence, setSequence] = useState([]);

    function buildSequence() {
        console.log('build ran');
        const numericalSort = (a, b) => a - b;
        const    nextNumber = () => randInt(config.lowest, config.highest + 1);
        const       numbers = R.times(nextNumber, config.length);
        setSequence(config.ascending ? numbers.sort(numericalSort) : numbers);
    }
    
    const shuffleSequence = () => setSequence(shuffle(R.range(config.lowest, config.highest + 1)));
    const    updateConfig = (newConfig) => setConfig(newConfig);

    const constrainConfig = (rawConfig) => {
        // this failed
    }
    
    function run() {
        console.log('useAllNumbers:', config.useAllNumbers);
        !!config.useAllNumbers ? shuffleSequence() : buildSequence()
    }

    return (
        <div className='h-screen border text-center bg-gray-100'>
            <h1 className='text-2xl underline'>Sequencer</h1>
            <h3 className='my-3 p-3 bg-gray-200'>
                {R.isEmpty(sequence) ? 'Press Generate' : sequence.join(' - ')}
            </h3>
            <button className='p-3 m-2 bg-gray-400 border-2 border-double border-black rounded-xl text-lg font-semibold text-white'
                    onClick={run}>Generate</button>
            <Settings configBase={sequencerBase} syncFunc={updateConfig} />
        </div>
    );
}