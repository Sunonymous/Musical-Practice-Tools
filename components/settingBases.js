'use strict';

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
    },
    {
        key: 'synced',
        name: 'Sync to Metronome',
        value: false,
    },
    {
        key: 'ascending',
        name: 'Force Ascending Sequence',
        value: false,
    },
];

export const togglerBase = [
    {
        key: 'min',
        name: 'Minimum Seconds Before Change',
        value: 2,
    },
    {
        key: 'max',
        name: 'Maximum Seconds Before Change',
        value: 4,
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
    {
        key: 'beatSync',
        name: 'Synced to Metronome',
        value: false,
    },
];
