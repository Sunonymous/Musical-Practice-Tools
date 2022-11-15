# Musical Practice Tools

## What is it?
This web page contains a handful of open-ended tools intended to help you practice playing or exploring music in a more systematic, organized manner. The tools include:

### Toggler
In its current state, the Toggler will switch its display text at a random interval of your choosing. The default Toggler messages are a simple 'On' and 'Off', though both messages can be set to a custom string.
#### Example Uses
- Practice arpeggio runs, "toggling" between upward and downward on your instrument.
- Choose a dynamic to toggle between two variations, eg. legato and staccato.

### Sequencer
The Sequencer is designed to create short, numerical sequences. The tool contains the following settings:
- Highest and lowest values to appear in the sequence.
- Whether or not the full range of numbers should appear in the sequence. (This overrides the length setting.)
- To force the sequence to be ascending. (Rather useless when combined with full range.)
- The maximum number of duplicate values which can appear for any given number in the sequence.
#### Example Uses
- Practice intervals in a musical scale by jumping through the sequences generated.
- Practice chord progressions by playing the key intervals suggested by the sequence.
- Make bizzare arpeggios.

### Twelve Keys
The Twelve Keys tool helps the user keep track of which keys they have practiced a particular drill in. Keys can be marked complete, switched between at will using the various controls.
#### Example Uses
- Practice a piece or segment of music in all twelve keys.

### Expressionist
The Expressionist is designed to offer you an imaginative headstart towards creating a piece of music. It offers the user random generations between any and/or all of six musical dynamics:
- Tone (/Key)
- Volume
- Tempo
- Articulation
- Mood
- Motion

The volume, tempo, and articulation dynamics have musical terminology, though I decided against its inclusion so far, to keep the tool slightly more accessible to those who are not classically trained (such as the author of these tools!). The mood and motion dynamics are intentionally abstract and vague, to offer the user a greater chance of musical exploration.
#### Example Uses
- Assist improvisation with a creative headstart.
- Explore music outside your normal styles of playing.

## Why should I use this?
Music and composition are creative arts. These tools were primarily created to assist the rote practice of instrumentation that can bolster musical skill. It may be challenging to track which things we have practiced and how we have done it, and at times we may find our music stuck inside patterns we've never known to explore beyond. These tools are designed to help a musician navigate these sorts of challenges.

## What is left?
The original Musical Practice Tools was being written in pure JavaScript, and had a metronome which worked together with the tools to generate changes at timed intervals. The rewrite of the application in Next.JS/React changed the structure of the metronome, though it will likely make a glorious return at some point.

Other changes may include:
- Toggler will be expanded to allow multiples entries from which it will sample upon every "toggle".
- Toggler may play a soft sound upon every toggle.
- Twelve Keys could allow jumping between custom intervals/semitones upon completion.
- Twelve Keys will allow for periodic, automatic generations of one or more dynamics.
- A "Drone" tool was originally considered to add.

## Feedback
Use the feedback link on the page itself to submit any feedback you may have, or open an issue here on GitHub. I hope these tools may serve you in some way.
