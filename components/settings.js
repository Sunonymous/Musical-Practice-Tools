// Takes a config-base object from a separate tool
// Generates a box which can open and close a settings panel to adjust tool parameters
// Returns a new config object upon changes

import React, { useState } from "react";
import { allPass } from "ramda";
import useDeviceDetect from '../lib/deviceDetect.js';

const castTo = (value, inputType) => {
    const functions = { number: Number, text: String, checkbox: Boolean };
    return functions[inputType](value);
}

// Constraints prop is an array containing functions used to verify that an altered constraint is valid.
export default function Settings({ existingConfig, configBase, syncFunc, constraints }) {
    const               [isOpen, setIsOpen] = useState(false);
    const   [generatedConfig, setGenConfig] = useState({});
    const [badValWarning, setBadValWarning] = useState(false);
    const     [cachedValue, setCachedValue] = useState(null);
    const mobileUser = useDeviceDetect(); // shouldn't change... right?

    const gearIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>);

    const toggleSettings = () => {
        setIsOpen(!isOpen);
        setBadValWarning(false);
    }

    const valueToInputType = (val) => {
        const types = {
            number: 'number',
            string: 'text',
            boolean: 'checkbox',
        }
        return types[typeof val];
    }

    const generateConfig =       () => Object.fromEntries(configBase.map((setting) => [setting.key, valueOfInput(setting.key)]));
    const    validConfig = (config) => constraints ? allPass(constraints)(config) : true;
    const   warningClass = "m-1 p-1 border border-red-700 text-red-500 italic tracking-tighter underline";

    const syncWithParent = (e) => {
        const newConfig = generateConfig();
        if (validConfig(newConfig)) {
            syncFunc(newConfig);
            setGenConfig(newConfig);
            setBadValWarning(false);
        } else {
            e.target.value = mobileUser ? cachedValue : generatedConfig[e.target.name];
            setBadValWarning(true);
        }
    }

    // for saving initial values on mobile before a change is made
    // because onChange event works differently for the mobile inputs
    const cacheValue = (e) => setCachedValue(valueOfInput(e.target.name));

    const settingToInput = (setting) => {
        const minOrNull = setting.min || '';
        const maxOrNull = setting.max || '';

        return (<li key={setting.key}>
                    <div className="m-1 h-full flex flex-row content-start">
                        <label className="m-1 flex-grow" htmlFor={setting.key}>{setting.name}:</label>
                        <input className="m-1 flex-shrink text-right"
                                name={setting.key}
                                type={valueToInputType(setting.value)}
                                min={minOrNull}
                                max={maxOrNull}
                                onChange={mobileUser ? null : syncWithParent}
                                onFocus={cacheValue}
                                onBlur={mobileUser ? syncWithParent : null}
                                defaultValue={existingConfig[setting.key] || setting.value}></input>
                    </div>
                </li>
        );
    }

    const valueOfInput = (inputName) => {
        const element = document.querySelector(`input[name=${inputName}]`);
        if (!element) return null; // no go...

        const value = element.type === 'checkbox' ? element.checked : element.value;
        const result = castTo(value, element.type)
        return castTo(value, element.type);
    }

    const settingsBox = (
        <ul className="flex flex-col border border-gray-500 bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl">
            {configBase.map(settingToInput)}
        </ul>
    )
    return (
        <div className='m-1 p-1 text-center bg-gray-100'>
            <button className={(isOpen ? 'bg-gray-800 text-white rotate-45' : 'bg-white text-gray-900') + ' p-3 m-2 border-2 border-double border-black rounded-full text-lg font-semibold text-white'}
                    onClick={toggleSettings}>{gearIcon}</button>
            {isOpen ? settingsBox : ''}
            <p className={badValWarning ? warningClass : warningClass + ' hidden'}>The value you entered is invalid!</p>
        </div>
    );
}