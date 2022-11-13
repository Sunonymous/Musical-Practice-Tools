// Takes a config-base object from a separate tool
// Generates a box which can open and close a settings panel to adjust tool parameters
// Returns a new config object upon changes

import { useState } from "react";
import { allPass } from "ramda";

const castTo = (value, inputType) => {
    const functions = {
        number: Number,
        text: String,
        checkbox: Boolean,
    }
    return functions[inputType](value);
}

// Constraints prop is an array containing functions used to verify that an altered constraint is valid.

export default function Settings({ existingConfig, configBase, syncFunc, constraints }) {
    const               [isOpen, setIsOpen] = useState(false);
    const   [generatedConfig, setGenConfig] = useState({});
    const [badValWarning, setBadValWarning] = useState(false);

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
            e.target.value = generatedConfig[e.target.name];
            setBadValWarning(true);
        }
    }

    const settingToInput = (setting) => {
        const minOrNull = setting.min || '';
        const maxOrNull = setting.max || '';

        return (<div key={setting.key}>
                    <dt><label htmlFor={setting.name}>{setting.name}:</label></dt>
                    <dd><input name={setting.key}
                               type={valueToInputType(setting.value)}
                               min={minOrNull}
                               max={maxOrNull}
                               onChange={syncWithParent}
                               defaultValue={existingConfig[setting.key] || setting.value}></input></dd>
                </div>
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
        <dl className="border-4 border-emerald-400">
            {configBase.map(settingToInput)}
        </dl>
    )
    return (
        <div className='m-4 border text-center bg-gray-100'>
            <h1 className='text-2xl underline'>Settings</h1>
            {isOpen ? settingsBox : ''}
            <p className={badValWarning ? warningClass : warningClass + ' hidden'}>The value you entered is invalid!</p>
            <button className='p-3 m-2 bg-gray-400 border-2 border-double border-black rounded-xl text-lg font-semibold text-white'
                    onClick={toggleSettings}>{isOpen ? 'Close Settings' : 'Open Settings'}</button>
        </div>
    );
}