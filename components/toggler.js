// Helper Functions
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min); // max is exclusive

import * as R from 'ramda';
import { useEffect, useState } from 'react';
import Settings from './settings';
import { togglerBase, constrainMinMax } from './settingBases';

const DEBUG = false;

const defaultConfig = {
    lowest: 2,
    highest: 4,
    textOn:   'On',
    textOff:  'Off',
    beatSync: false,
};

// Because there should only ever be one instance of this component,
// I put some simple state variables outside of the component definition.
let ticks = 0;
let state = false;
// These were mostly because working with setInterval and useState was
// a nightmare (because the state updates are asynchronous).

export default function Toggler() {
    const [powerOn, setPowerOn] = useState(false);
    const   [config, setConfig] = useState({...defaultConfig});
    const [message, setMessage] = useState('Off');
    const [needsReset, setNeedsReset] = useState(false);
    const [intervalID, setIntervalID] = useState(null);

    function activate() {
        if (DEBUG) console.log('Toggler Activated.');
        setIntervalID(setInterval(tick, 1000));
        ticks = config.highest;
        if (needsReset) setNeedsReset(false);
    }

    const deactivate = () => {
        if (DEBUG) console.log('Toggler Deactivated.');
        if (intervalID) {
            setIntervalID(clearInterval(intervalID)); // clearInterval returns undefined
        }
    }

    const togglePower = () => {
        setPowerOn(!powerOn);
        powerOn ? deactivate() : activate(); // because it hasn't updated yet
    }

    const tick = () => {
        if (!config.beatSync) {
            ticks -= 1;
            if (ticks <= 0) toggle();
        }
    }

    const toggle = () => {
        ticks = randInt(config.lowest, config.highest + 1);
        if (DEBUG) console.log('Ticks reset to ', ticks);
        state = !state;
        updateMessage();
    }

    const updateMessage = () => setMessage(state ? config.textOn : config.textOff);
    const updateConfig = (newConfig) => {
        setConfig(newConfig);
        if (!needsReset && powerOn) setNeedsReset(true);
    }

    return (
        <div className='border text-center bg-gray-100'>
            <h1 className='text-2xl underline'>Toggler</h1>
            <button className='m-1 p-1 border-2 border-gray-500 rounded-md'
                    onClick={togglePower}>{powerOn ? 'Deactivate' : 'Activate'}</button>
            <h3 className='my-3 p-3 text-4xl font-extrabold bg-gray-200'>{message}</h3>
            {needsReset ? <p className='text-red-600'>Restart Toggler to apply settings.</p> : ''}
            <Settings existingConfig={config} configBase={togglerBase} syncFunc={updateConfig} constraints={constrainMinMax} />
        </div>
    );
}