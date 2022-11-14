// Helper Functions
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min); // max is exclusive
const  randEm =      (arr) => arr[randInt(0, arr.length)];

import * as R from 'ramda';
import { useState } from 'react';
import Settings from './settings';
import { sequencerConstraints, sequencerBase } from './settingBases';
// import next from 'next'; // I don't know where this appeared from. Commenting to ensure nothing breaks. Delete if found later.

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
        <div>
            <h3 className='my-3 py-3 border-t-2 border-b-2 border-t-gray-500 border-b-gray-500 text-4xl font-extrabold bg-gray-200'>
                {R.isEmpty(sequence) ? 'Press Generate' : sequence.join(' - ')}
            </h3>
            <button className='py-1 px-2 m-1 bg-gray-100 border-2 border-double border-black rounded-xl text-lg font-semibold text-black'
                    onClick={run}>Generate</button>
            <Settings existingConfig={config} configBase={sequencerBase} constraints={sequencerConstraints} syncFunc={updateConfig} />
        </div>
    );
}