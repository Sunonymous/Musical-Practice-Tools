'use strict';

import { range } from 'ramda';

// All constraint functions are passed the generated config object from the settings module.
const constrainMinMax = [
    (c) => c.lowest  < c.highest,
    (c) => c.highest > c.lowest,
];

const minOverZero = (c) => c.lowest > 0;

export const togglerConstraints = [
    ...constrainMinMax,
    minOverZero,
    (c) =>  c.textOn.length > 0,
    (c) => c.textOff.length > 0,
];

export const sequencerBase = [
    {
        key: 'lowest',
        name: 'Lowest Value',
        value: 1,
        min: 1,
        max: 20,
    },
    {
        key: 'highest',
        name: 'Highest Value',
        value: 8,
        min: 1,
        max: 20,
    },
    {
        key: 'useAllNumbers',
        name: 'Use Full Range',
        value: false,
    },
    {
        key: 'length',
        name: 'Sequence Length',
        value: 4,
        min: 2,
        max: 20,
    },
    {
        key: 'ascending',
        name: 'Force Ascending',
        value: false,
    },
    {
        key: 'duplicateLimit',
        name: 'Max Duplicates',
        value: 2,
        min: 1,
    }
    // {
    //     key: 'synced',
    //     name: 'Sync to Metronome',
    //     value: false,
    // },
];
export const sequencerConstraints = [
    ...constrainMinMax,
    (c) => c.length <= c.duplicateLimit * range(c.lowest, c.highest + 1).length, // length of sequence longer than possible values
];

export const togglerBase = [
    {
        key: 'lowest',
        name: 'Min Seconds to Change',
        value: 2,
        min: 1,
    },
    {
        key: 'highest',
        name: 'Max Seconds to Change',
        value: 4,
        min: 2,
    },
    {
        key: 'textOn',
        name: 'Text When On',
        value: 'On',
    },
    {
        key: 'textOff',
        name: 'Text When Off',
        value: 'Off',
    },
    // {
    //     key: 'beatSync',
    //     name: 'Synced to Metronome',
    //     value: false,
    // },
];