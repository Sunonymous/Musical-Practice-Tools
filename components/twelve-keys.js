import { invertObj, identical, complement, nth, findIndex, keys, values, not, reject } from 'ramda';
import { useState } from "react"

// Helper Functions
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min); // max is exclusive

const emptySharpKeys = {
    'A':  false,
    'A♯': false,
    'B':  false,
    'C':  false,
    'C♯': false,
    'D':  false,
    'D♯': false,
    'E':  false,
    'F':  false,
    'F♯': false,
    'G':  false,
    'G♯': false,
};

const emptyFlatKeys = {
    'A':  false,
    'B♭': false,
    'B':  false,
    'C':  false,
    'D♭': false,
    'D':  false,
    'E♭': false,
    'E':  false,
    'F':  false,
    'G♭': false,
    'G':  false,
    'A♭': false,
};

const flatsToSharps = {
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G',
    'B♭': 'A♯',
    'D♭': 'C♯',
    'E♭': 'D♯',
    'G♭': 'F♯',
    'A♭': 'G♯',
}
const sharpsToFlats = invertObj(flatsToSharps);

export default function TwelveKeys() {
    const [allKeys, setAllKeys] = useState(emptyFlatKeys);
    const [activeKey, setActiveKey] = useState('C');
    const [useFlats, setUseFlats] = useState(true);
    const [afterComplete, setAfterComplete] = useState('next');

    const     keyButtonClass = 'm-2 px-3 py-2 rounded-full bg-gray-500 hover:bg-gray-700 text-white disabled:bg-gray-700 disabled:text-gray-500';
    const           keyClass = 'inline-block m-1 mx-2 p-2 h-10 w-10 rounded-md drop-shadow-lg font-bold select-none ';
    const          keyBorder = 'underline decoration-black decoration-2 decoration-solid underline-offset-[18px] ';
    const     activeComplete = keyClass + keyBorder + 'bg-cyan-600 text-white line-through decoration-white ';
    const   inactiveComplete = keyClass + 'bg-emerald-400 text-gray-100 line-through';
    const   activeIncomplete = keyClass + keyBorder + 'bg-gray-600 text-white';
    const inactiveIncomplete = keyClass + 'bg-gray-400 text-gray-300';
    const        allComplete = keyClass + 'bg-amber-400 text-white';

    const   keyIsActive = identical(activeKey);
    const keyIsInactive = complement(keyIsActive);

    const getKeyClass = (k) => {
        switch(true) {
            case allKeysComplete(): // all complete
                return keyIsActive(k) ? allComplete + keyBorder : allComplete;
            case allKeys[k]:           // complete key
                return keyIsActive(k) ? activeComplete : inactiveComplete
            default:                // incomplete key
                return keyIsActive(k) ? activeIncomplete : inactiveIncomplete
        }
    }

    const reset = () => useFlats ? setAllKeys(emptyFlatKeys) : setAllKeys(emptySharpKeys);

    const wrapIndex = (array, index, addAmt) => (index + addAmt) % array.length;
    const emAtAddedIndex = (array, currentEm, delta) => nth(wrapIndex(array, findIndex(identical(currentEm), array), delta), array);

    const   nextKey = () => setActiveKey(emAtAddedIndex(keys(allKeys), activeKey,  1));
    const nextFifth = () => setActiveKey(emAtAddedIndex(keys(allKeys), activeKey,  5));
    const   prevKey = () => setActiveKey(emAtAddedIndex(keys(allKeys), activeKey, -1));
    const prevFifth = () => setActiveKey(emAtAddedIndex(keys(allKeys), activeKey, -5));

    const  allKeysComplete = () => values(allKeys).every((k) => !!k)
    const toggleCompletion = () => {
        setAllKeys({...allKeys, [activeKey]: not(allKeys[activeKey])})
        console.log('afterComplete:', afterComplete);
        if (!allKeysComplete()) callNextFunc(afterComplete);
    };

    const     incompleteKeys = (includeActive=false) => reject((k) => allKeys[k] || (keyIsActive(k) && includeActive), keys(allKeys));
    const previousIncomplete = () => setActiveKey(emAtAddedIndex(incompleteKeys(), activeKey, -1));
    const     nextIncomplete = () => setActiveKey(emAtAddedIndex(incompleteKeys(), activeKey, 1));

    const randomElement = (arr) => arr[randInt(0, arr.length)];
    const     randomKey = () => setActiveKey(randomElement(reject(keyIsActive, incompleteKeys())) || activeKey);

    const callNextFunc = (name) => {
        switch (name) {
            case          'next':     nextIncomplete(); break;
            case     'nextFifth':          nextFifth(); break;
            case      'previous': previousIncomplete(); break;
            case 'previousFifth':      previousFifth(); break;
            case        'random':          randomKey(); break;
        }
    }

    return (
        <div>
            <div className='flex flex-row flex-wrap justify-center p-4 bg-white'>
                {keys(allKeys).map((k) => {
                    return <div onClick={() => setActiveKey(k)} key={k} className={getKeyClass(k)}>{k}</div>
                })}
            </div>
            <button className={keyButtonClass}
                    disabled={allKeysComplete()}
                    onClick={previousIncomplete}>Prev</button>
            <button className={keyButtonClass}
                    onClick={toggleCompletion}>{keys[activeKey] ? 'Uncomplete' : 'Complete'}</button>
            <button className={keyButtonClass}
                    disabled={allKeysComplete()}
                    onClick={nextIncomplete}>Next</button>
            <button className={keyButtonClass}
                    disabled={allKeysComplete()}
                    onClick={randomKey}>Random</button>
            <p>On complete:</p>
            <select className='border-2 border-gray-700' onChange={(e) => setAfterComplete(e.target.value)}>
                <option value='next'    >Next Key</option>
                <option value='previous'>Previous Key</option>
                <option value='nextFifth'    >Next Fifth</option>
                <option value='previousFifth'>Previous Fifth</option>
                <option value='random'  >Random Key</option>
            </select>
            <br />
            {/* <h3>Change Key by Semitones</h3>
            <div className='border p-2 flex flex-row justify-center'>
                <button className={keyButtonClass}
                        onClick={prevFifth}>-5</button>
                <button className={keyButtonClass}
                        onClick={prevKey}>-1</button>
                <button className={keyButtonClass}
                        onClick={nextKey}>+1</button>
                <button className={keyButtonClass}
                        onClick={nextFifth}>+5</button>
            </div> */}
            <button className='px-2 py-1 m-2 bg-red-500 hover:bg-red-700 border-2 border-double border-black rounded-xl text-lg font-semibold text-white'
                    onClick={reset}>Reset</button>
        </div>
    )
}