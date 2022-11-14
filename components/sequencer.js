// Helper Functions
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min); // max is exclusive
const  randEm =      (arr) => arr[randInt(0, arr.length)];

import * as R from 'ramda';
import { useState } from 'react';
import Settings from './settings';
import { sequencerConstraints, sequencerBase } from './settingBases';
import next from 'next';

const defaultConfig = {
    lowest: 1,
    highest: 8,
    length: 4,
    useAllNumbers: false,
    ascending: false,
    duplicateLimit: 2,
    // beatSync: false,
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

export default function Sequencer({ startingConfig, settings }) {
    const [config, setConfig] = useState(R.defaultTo(defaultConfig, startingConfig));
    const [sequence, setSequence] = useState([]);

    const numericalSort = (a, b) => a - b;
    const randomInRange =     () => randInt(config.lowest, config.highest + 1);

    function buildSequence(seq=[]) {
        if (seq.length === config.length) {
            setSequence(config.ascending ? seq.sort(numericalSort) : seq);
            return;
        } else {
            let numberToAdd = randomInRange();
            while (R.count(R.identical(numberToAdd), seq) >= config.duplicateLimit) numberToAdd = randomInRange();
            return buildSequence(seq.concat(numberToAdd));
        }
    }
    
    const shuffleSequence = () => setSequence(shuffle(R.range(config.lowest, config.highest + 1)));
    const    updateConfig = (newConfig) => setConfig(newConfig);
    
    const run = () => !!config.useAllNumbers ? shuffleSequence() : buildSequence();

    return (
        <div className='border text-center bg-gray-100'>
            <h1 className='text-2xl underline'>Sequencer</h1>
            <h3 className='my-3 p-3 bg-gray-200'>
                {R.isEmpty(sequence) ? 'Press Generate' : sequence.join(' - ')}
            </h3>
            <button className='p-3 m-2 bg-gray-400 border-2 border-double border-black rounded-xl text-lg font-semibold text-white'
                    onClick={run}>Generate</button>
            <Settings existingConfig={config} configBase={sequencerBase} constraints={sequencerConstraints} syncFunc={updateConfig} />
        </div>
    );
}