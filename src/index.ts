import * as Tone from 'tone';

import "./style.css"

function playIt() {
  const synth = new Tone.FMSynth().toDestination();

  const majorChord = ["C4", "E4", "G4"];
  const minorChord = ["C4", "Eb4", "G4"];

  const progression = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, "4n", time);
  }, [majorChord, minorChord], "1m");

  const filter = new Tone.AutoFilter({
    frequency: 0.5,
    depth: 1,
    type: "sine",
    baseFrequency: 440,
    octaves: 8.6,
    filter: {
      type: "lowpass",
      rolloff: -12,
      Q: 1
    }
  }).toDestination();

  synth.connect(filter);

  progression.start();
}
const buttonOrNull = document.querySelector("button")
if (buttonOrNull) buttonOrNull.addEventListener("click", async () => {
  if (Tone.Transport.state !== 'started') {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
	playIt();
	console.log("transport state: ", Tone.Transport.state);
});
