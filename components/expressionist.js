import * as R from 'ramda';
import { useState } from 'react';
import expressions from '../lib/expressions';

const    randInt = (min, max) => Math.floor(Math.random() * (max - min) + min); // max is exclusive
const     randEm =      (arr) => arr[randInt(0, arr.length)];
const capitalize =        (s) => s && s[0].toUpperCase() + s.slice(1);

const              empty = '--';
const           dynamics = ['tone', 'volume', 'tempo', 'articulation', 'mood', 'motion'];
const dualCaseCategories = ['volume', 'tempo', 'articulation'];
const    blankExpression = Object.fromEntries(dynamics.map((d) => [d, empty]));

export default function Expressionist() {
    const    [expression, setExpression] = useState(blankExpression); // =_=
    const [useMusicTerms, setMusicTerms] = useState(false);

    const randomDynamic = (dynamic) => randEm(expressions[expressionKey(dynamic)]);
    const clearDynamic = (e) => console.log('Clear', e.target.dataset.dynamic);
    const expressionKey = (dynamic) => dualCaseCategories.includes(dynamic) && useMusicTerms ? dynamic + 'Fancy' : dynamic;

    const formatDynamic = (dynamic) => {
        return (
            <div className='m-2 p-3 px-5 border'>
                <h2>{capitalize(dynamic)}</h2>
                <hr />
                <h2>{capitalize(expression[dynamic])}</h2>
                <input  className='mx-1 p-1' type='checkbox' data-dynamic={dynamic} />
                <button className='mx-1 px-2 border rounded-full font-bold text-white bg-red-500' data-dynamic={dynamic} onClick={clearDynamic}>X</button>
            </div>
        )
    }

    const formatExpression = () => {
        return (
            <div className='flex flex-row flex-wrap justify-center'>
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
        <div className='border text-center bg-gray-100'>
            <h1 className='text-2xl underline'>Expressionist</h1>
            {formatExpression()}
            <button className='m-1 p-1 border-2 border-gray-500 rounded-md' onClick={generateExpression}>Generate</button>
            {/* <h3 className='my-3 p-3 text-4xl font-extrabold bg-gray-200'>Something</h3> */}
        </div>
    );
}