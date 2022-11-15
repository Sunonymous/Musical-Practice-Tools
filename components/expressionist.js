import * as R from 'ramda';
import { useState, useEffect } from 'react';
import expressions from '../lib/expressions';

const    randInt = (min, max) => Math.floor(Math.random() * (max - min) + min); // max is exclusive
const     randEm =      (arr) => arr[randInt(0, arr.length)];
const capitalize =        (s) => s && s[0].toUpperCase() + s.slice(1);

const              empty = '—';
const           dynamics = ['tone', 'volume', 'tempo', 'articulation', 'mood', 'motion'];
const dualCaseCategories = ['volume', 'tempo', 'articulation'];
const    blankExpression = Object.fromEntries(dynamics.map((d) => [d, empty]));

export default function Expressionist() {
    const    [expression, setExpression] = useState(blankExpression); // =_=
    const [useMusicTerms, setMusicTerms] = useState(false);

    const  clearDynamic =       (e) => setExpression(R.evolve({[e.target.dataset.dynamic]: R.always(empty)}, expression));
    const  clearAllDyns =        () => setExpression(blankExpression);
    const randomDynamic = (dynamic) => {
        const newDynamic = randEm(expressions[expressionKey(dynamic)]);
        return newDynamic === expression[dynamic] ? randomDynamic(dynamic) : newDynamic;
    }

    const expressionKey = (dynamic) => dualCaseCategories.includes(dynamic) && useMusicTerms ? dynamic + 'Fancy' : dynamic;
    const     isChecked = (checkbox) => checkbox.checked;
    const    allChecked = (checkboxes) => checkboxes.every(isChecked);
    // state
    const dynamicCBoxes = () => Array.from(document.querySelectorAll("input[data-dynamic][type='checkbox']"));
    const setCheckedAll = () => {
        const      boxes = dynamicCBoxes();
        const checkState = !allChecked(boxes);
        R.map((b) => b.checked = checkState, boxes);
    }

    const formatDynamic = (dynamic) => {
        return (
            <div key={dynamic} className='flex flex-col justify-around content-center w-2/6 m-2 p-3 px-2 bg-white border rounded-xl drop-shadow-md'>
                <h2 className='text-sm text-left text-gray-400'>{capitalize(dynamic)}</h2>
                <hr className='' />
                <h2 className='font-semibold text-sm md:text-lg text-center'>{capitalize(expression[dynamic])}</h2>
                <hr className='' />
                <div>
                    <input  className='relative top-[1px] m-1 p-1' type='checkbox' data-dynamic={dynamic} />
                    {expression[dynamic] === empty ? '' : (<button className='w-5 h-5 m-1 px-1 border rounded-full font-bold text-sm text-white bg-red-500' data-dynamic={dynamic} onClick={clearDynamic}>X</button>)}
                </div>
            </div>
        )
    }

    const formatExpression = () => {
        return (
            <div className='w-full flex flex-row flex-wrap justify-center'>
              {dynamics.map(formatDynamic)}   
            </div>
        );
    }

    const generateExpression = () => {
        const inputToDynamic = (i) => i.dataset.dynamic;
        const dynamicsToChange = R.map(inputToDynamic, document.querySelectorAll("input[data-dynamic]:checked"));
        const newDynamics = Object.fromEntries(dynamicsToChange.map((d) => [d, randomDynamic(d)]));
        setExpression(R.mergeRight(expression, newDynamics));
    }
    
    return (
        <div>
            <button className='m-1 p-1 border-2 border-gray-500 rounded-md' onClick={setCheckedAll}>De/Select All</button>
            <button className='m-1 p-1 border-2 border-gray-500 rounded-md' onClick={clearAllDyns}>Clear All</button>
            {formatExpression()}
            <button className='m-1 p-1 border-2 border-gray-500 rounded-md' onClick={generateExpression}>Generate</button>
        </div>
    );
}