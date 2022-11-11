import { compose } from 'ramda';
import { useEffect, useState } from 'react';

class OldMetronome {
    constructor(tempo = 100) {
        this.audioCtx = null;
        this.queuedNotes = [];     // {note, time}
        this.volume = 0.5;         // loudness of clicks
        this.noteLength = 0.25;    // how long the clicks are
        this.currentBarBeat = 0;   // index of current beat
        this.beatsPerBar = 4;      // number of beats in bar
        this.tempo = tempo;        // speed of metronome
        this.updateSpeed = 25;     // how fast it checks to schedule more notes
        this.scheduleWithin = 0.1; // window of time JS has to schedule a note
        this.nextNoteIn = 0.0;     // used to track timing of notes when scheduling
        this.active = false;       // metronome turned on?
        this.badBrowser = false;   // prevents metronome from working w/o webaudio
        this.intervalID = null;    // ID for setInterval
        this.connections = [];     // connects to other tools to trigger changes
    }

    connectTool(tool) {
        this.connections.includes(tool) ? null : this.connections.push(tool);
    }

    disconnectTool(tool) {
        const index = this.connections.indexOf(tool);
        index === -1 ? null : this.connections.splice(index, 1);
    }

    signalNewBeat() {
        this.connections.forEach((tool) => {
            try {
              tool.newBeat();
            } catch (err) {
              console.log(`Tool ${tool.name} does not contain a newBeat function.`); 
            }
        });
    }

    addToTempo(amt=1) {
        this.tempo += amt;
    }

    nextNote() {
        const secondsPerBeat = 60.0 / this.tempo;
        this.nextNoteIn += secondsPerBeat;
        this.currentBarBeat++;
        if (this.currentBarBeat === this.beatsPerBar) {
            this.currentBarBeat = 0;
        }
    }

    queueNote(beatNumber, time) {
        this.queuedNotes.push({note: beatNumber, time: time});
        const osc = this.audioCtx.createOscillator();
        const env = this.audioCtx.createGain();

        const isNewBeat = (beatNumber % this.beatsPerBar === 0);
        osc.frequency.value =  isNewBeat ? 750 : 550;
        env.gain.value = 0;
        env.gain.exponentialRampToValueAtTime(this.volume, time + 0.001);
        env.gain.exponentialRampToValueAtTime(0.001, time + this.noteLength);

        osc.connect(env);
        env.connect(this.audioCtx.destination);
        osc.start(time);
        osc.stop(time + this.noteLength);
        if (isNewBeat) this.signalNewBeat(); // trigger any connected tools
    }

    schedule() {
        while (this.nextNoteIn < this.audioCtx.currentTime + this.scheduleWithin) {
            this.queueNote(this.currentBarBeat, this.nextNoteIn);
            this.nextNote();
        }
    }

    start() {
        if (this.active || this.badBrowser) return;

        if (this.audioCtx === null) {
            if (!window.AudioContext) {
                if (!window.webkitAudioContext) {
                    alert('Please use a major browser to enable metronome functionality.');
                    this.badBrowser = true;
                    return;
                }
                window.AudioContext = window.webkitAudioContext;
            }
            this.audioCtx = new AudioContext();
        }

        this.active = true;
        this.currentBarBeat = 0;
        this.nextNoteIn = this.audioCtx.currentTime + 0.05;
        this.intervalID = setInterval(() => this.schedule(), this.updateSpeed);
    }

    stop() {
        this.active = false;
        clearInterval(this.intervalID);
    }

    toggleOn() {
        this.active ? this.stop() : this.start();
    }
}

const tempoButtonClass = 'm-2 px-3 rounded-full bg-gray-500 hover:bg-gray-700 text-white';
const powerButtonClassBase = 'm-2 p-2 text-white rounded-full';
const powerButtonColorOff = ' bg-red-500 hover:bg-red-700';
const  powerButtonColorOn = ' bg-emerald-500 hover:bg-emerald-700';
const metro = new OldMetronome();

export default function Metronome() {
    const [badBrowser, setBadBrowser] = useState(false);
    const [poweredOn, setPoweredOn] = useState(false);
    const [tempo, setTempo] = useState(metro.tempo);

    const togglePower = () => {
        metro.toggleOn();
        setPoweredOn(!poweredOn);
    }

    const   addToTempo = (amt) => metro.addToTempo(amt);
    const refreshTempo = () => setTempo(metro.tempo);
    const add1 = compose(refreshTempo, addToTempo.bind(null, 1));
    const add5 = compose(refreshTempo, addToTempo.bind(null, 5));
    const sub1 = compose(refreshTempo, addToTempo.bind(null, -1));
    const sub5 = compose(refreshTempo, addToTempo.bind(null, -5));

    return (
        <div>
            <h1 className='text-center text-2xl underline'>Metronome</h1>
            <div className='border p-2 flex flex-row justify-center'>
                <button className={powerButtonClassBase + (poweredOn ? powerButtonColorOn : powerButtonColorOff)}
                        onClick={togglePower}>{poweredOn ? 'On' : 'Off'}</button>
                <button className={tempoButtonClass}
                        onClick={sub5}>-5</button>
                <button className={tempoButtonClass}
                        onClick={sub1}>-1</button>
                <div    className="mx-4 pt-3 px-3 text-2xl text-blue-500 font-extrabold bg-white rounded-full">{tempo}</div>
                <button className={tempoButtonClass}
                        onClick={add1}>+1</button>
                <button className={tempoButtonClass}
                        onClick={add5}>+5</button>
            </div>
        </div>
    );
}