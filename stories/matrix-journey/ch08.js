/* Matrix journey chapter 8: The Matrix Revolutions, "The last fight with Smith". Content only (Opus pass).
   Canon: in the rain, the Smith who has absorbed the Oracle fights Neo; asked why he keeps getting up, Neo says, in
   effect, because he chooses to; he then lets Smith copy him, the machines flow through him, every Smith is destroyed,
   Neo dies and his body is carried away; the Sentinels withdraw from Zion. Every branch ends with Smith gone and the
   Sentinels leaving, so the aftertaste (the park at sunrise) holds. Flags: sacrifice (Neo dies, canon), brawl and
   smithTalked (Neo lives, blind in the real world).
   New art used here: set "crater" (a rain-filled crater in a city street, every window lit, a face at each one);
   cast smith: "oracle" (Smith wearing the Oracle's long coat), "many" (rows of
   identical Smiths); neo: "rain" (soaked, coat torn); fx "rain", "light" (white light pouring out through cracks). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 16, canon: "a", id: "lastfight", code: "M3", episode: "The Matrix Revolutions", title: "The last fight with Smith",
  setup: {
    kicker: "The Matrix, in the rain.",
    text: "The machines have plugged Neo in from the Machine City. Every face at every window is Smith's, and the one waiting in the street wears the Oracle's coat. He tells Neo, pleasantly, that this ends with Neo's death. He has seen it. The rest of the Smiths settle in to watch.",
    caption: "Standing room only, all Smiths.",
    scene: {set: "crater", cast: {neo: "rain", smith: "oracle"}, fx: ["rain"]},
    variants: [
      {when: "smithTalk", text: "The machines have plugged Neo in. Every face at every window is Smith's, and the one waiting in the street wears the Oracle's coat. He remembers the subway: Neo is the only one who ever asked him how he felt. He intends to kill him anyway, and he has seen how. The rest of the Smiths settle in to watch."},
      {when: "defendZion", text: "The machines have plugged Neo in from a chair on Zion's dock, which is as close to trust as they get. Every face at every window is Smith's, and the one waiting in the street wears the Oracle's coat. He tells Neo, pleasantly, that this ends with Neo's death. He has seen it. The rest of the Smiths settle in to watch."}
    ]
  },
  question: "Smith has seen how this ends. What does Neo do?",
  choices: [
    {id: "a", label: "Let Smith copy him", tag: "What the film did.",
     effects: {belief: 15}, flags: ["sacrifice"], beats: [
      {scene: {set: "crater", cast: {neo: "rain", smith: "oracle"}, fx: ["rain"], say: {who: "smith", text: "Why get up?"}}, caption: "Because he chooses to.",
       text: "They fight through the sky and into the street until neither can stand. Smith asks why Neo keeps getting up. Neo says, more or less, that it is his choice."},
      {scene: {set: "crater", cast: {neo: "rain", smith: "many"}, fx: ["light"]}, caption: "Everything that begins, ends.",
       text: "Then Neo stops fighting and lets Smith copy him. Through him, the machines reach every Smith at once, and every Smith comes apart in light. Neo does not get up this time."},
      {when: "!defendZion", scene: {set: "dock", fx: ["sentinels"]}, caption: "They just leave.",
       text: "In the Machine City, the machines carry Neo's body away. In Zion, the Sentinels stop drilling, turn around and leave."},
      {when: "defendZion", scene: {set: "dock", fx: ["sentinels"]}, caption: "They just leave.",
       text: "On Zion's dock, the chair Neo is plugged into goes quiet. Above it, the Sentinels stop drilling, turn around and leave."}
    ]},
    {id: "b", label: "Keep fighting", tag: "Rewrite the prophecy with fists.",
     effects: {belief: 20, zion: 5}, flags: ["brawl"], beats: [
      {scene: {set: "crater", cast: {neo: "rain", smith: "oracle"}, fx: ["rain"]}, caption: "Nine hours, no referee.",
       text: "Neo refuses the ending Smith has seen. They fight for nine hours, until the rain stops and several buildings are no longer there."},
      {when: "belief>=90", scene: {set: "crater", cast: {neo: "rain"}, fx: ["light"]}, caption: "He believed it. That was the trick.",
       text: "Somewhere in the ninth hour Neo stops doubting that he can win, and then he does. The last Smith comes apart. The machines unplug Neo alive, blind and extremely sore."},
      {when: "belief<90", scene: {set: "crater", cast: {neo: "rain"}, fx: ["light"]}, caption: "Assisted, heavily.",
       text: "Neo wins, barely, because the machines route everything they have through him with every punch. The last Smith comes apart. They unplug Neo alive, blind and extremely sore."},
      {scene: {set: "dock", fx: ["sentinels"]}, caption: "They just leave.",
       text: "In Zion, the Sentinels stop drilling, turn around and leave. Nobody tells them who won. They seem to know."}
    ]},
    {id: "c", label: "Ask Smith what he actually wants", tag: "Therapy, round two.",
     effects: {belief: 5}, flags: ["smithTalked"], beats: [
      {scene: {set: "crater", cast: {neo: "rain", smith: "many"}, fx: ["rain"], say: {who: "neo", text: "What do you want?"}}, caption: "A million Smiths go quiet.",
       text: "Neo sits down in the rain and asks. Every Smith in the city goes quiet at once. In all his copies, nobody has asked him that."},
      {when: "smithTalk", scene: {set: "crater", cast: {neo: "rain", smith: "oracle"}}, caption: "Second session.",
       text: "It is the second time Neo has asked, and Smith remembers the first. The answer is the same as it was on the platform, only sadder: out. Out of the Matrix, out of the job, out of himself."},
      {when: "!smithTalk", scene: {set: "crater", cast: {neo: "rain", smith: "oracle"}}, caption: "First session.",
       text: "The answer takes a while, and it is sadder than Neo expected: out. Out of the Matrix, out of the job, out of himself. Being everyone, it turns out, is lonely."},
      {scene: {set: "crater", cast: {neo: "rain"}, fx: ["light"]}, caption: "The only exit there is.",
       text: "Neo shows him the only exit there is, and Smith takes it, all million of him at once. The machines unplug Neo alive and blind. In Zion, the Sentinels leave."}
    ]}
  ]
});
