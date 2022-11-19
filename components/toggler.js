// Helper Functions
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min); // max is exclusive

import { useEffect, useState } from 'react';
import Settings from './settings';
import { togglerBase, togglerConstraints } from './settingBases';

const DEBUG = false;

const defaultConfig = {
    lowest: 2,
    highest: 4,
    textOn:   'On',
    textOff:  'Off',
    // beatSync: false,
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
        updateMessage();
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
        <div>
            <h3 className='my-3 py-3 border-t-2 border-b-2 border-t-gray-500 border-b-gray-500 text-2xl lg:text-4xl font-extrabold bg-gray-200'>{message}</h3>
            <button className='py-1 px-2 m-1 bg-white border-2 border-double border-black rounded-xl text-lg font-semibold text-black'
                    onClick={togglePower}>{powerOn ? 'Deactivate' : 'Activate'}</button>
            {needsReset ? <p className='text-red-600'>Restart Toggler to apply settings.</p> : ''}
            <Settings existingConfig={config} configBase={togglerBase} syncFunc={updateConfig} constraints={togglerConstraints} />
        </div>
    );
}