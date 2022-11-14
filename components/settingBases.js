'use strict';

import { range } from 'ramda';

// All constraint functions are passed the generated config object from the settings module.
export const constrainMinMax = [
    (c) => c.lowest  < c.highest,
    (c) => c.highest > c.lowest,
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
        name: 'Use All Numbers',
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
        name: 'Force Ascending Sequence',
        value: false,
    },
    {
        key: 'duplicateLimit',
        name: 'Limit Duplicates to',
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
        name: 'Minimum Seconds Before Change',
        value: 2,
        min: 1,
    },
    {
        key: 'highest',
        name: 'Maximum Seconds Before Change',
        value: 4,
        min: 2,
    },
    {
        key: 'textOn',
        name: 'Text to Display When On',
        value: 'On',
    },
    {
        key: 'textOff',
        name: 'Text to Display When Off',
        value: 'Off',
    },
    // {
    //     key: 'beatSync',
    //     name: 'Synced to Metronome',
    //     value: false,
    // },
];