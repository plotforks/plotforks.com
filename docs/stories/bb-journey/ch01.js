/* Journey chapter 1: S1E1 "Pilot". Content only (Opus pass).
   New art used here: set "house" (house exterior; with fx siren it is the DEA raid), jesse "run". */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 1, canon: "a", id: "ridealong", code: "S1E1", episode: "Pilot", title: "The ride-along",
  setup: {
    kicker: "A DEA raid, Albuquerque.",
    text: "Walt has just learned he has terminal lung cancer, and he hasn't told anyone. Riding along with Hank on a DEA raid, he waits in the car and watches a former student climb out of a bedroom window and run. It's Jesse Pinkman.",
    caption: "A ride-along, a window, a very bad idea.",
    scene: {set: "house", cast: {walt: "stand", jesse: "run"}, fx: ["siren"]}
  },
  question: "What does Walt do?",
  choices: [
    {id: "a", label: "Track Jesse down and make him an offer", tag: "Blackmail, but make it chemistry.",
     effects: {darkness: 10, jesse: -10}, beats: [
      {scene: {set: "house", cast: {walt: "stand", jesse: "stand"}, say: {who: "walt", text: "I know it was you."}}, caption: "The worst job interview in Albuquerque.",
       text: "Walt finds Jesse's house and gives him a choice: go into business with his old chemistry teacher, or explain himself to the DEA. Jesse picks business, reluctantly."},
      {scene: {set: "rv", cast: {walt: "lecture", jesse: "stand"}}, caption: "Class is in session.",
       text: "They buy an old RV with Walt's savings and drive into the desert. Walt lectures, Jesse sulks, and the product is the purest anyone in town has ever seen."}
    ]},
    {id: "b", label: "Tell Hank what he saw", tag: "The honest citizen.",
     exit: "shortest", beats: [
      {scene: {set: "house", cast: {walt: "point", hank: "suspicious"}, fx: ["siren"], say: {who: "walt", text: "Hank, that's my student!"}}, caption: "Civic duty 1, television 0.",
       text: "Walt points at the window and tells Hank everything. Jesse is picked up two blocks away, still pulling on his trousers."},
      {scene: {set: "dinner", cast: {walt: "stand", hank: "laugh", skyler: "stand"}}, caption: "Roll credits.",
       text: "That night Walt tells the family about the cancer too. Hank toasts him as the hero of the raid, everyone cries, and the treatment starts on Monday."}
    ]},
    {id: "c", label: "Tell Skyler about the cancer first", tag: "One honest conversation.",
     effects: {darkness: 5, family: 15, jesse: 5}, flags: ["skylerKnows"], beats: [
      {scene: {set: "dinner", cast: {walt: "stand", skyler: "stand"}, say: {who: "skyler", text: "Why didn't you tell me?"}}, caption: "The conversation the show skipped.",
       text: "Walt goes home and tells Skyler about the cancer before he does anything else. She holds him for a long time, then quietly asks about the bills."},
      {scene: {set: "house", cast: {walt: "stand", jesse: "stand"}}, caption: "A partnership, with manners.",
       text: "The bills are the problem. A week later Walt finds Jesse anyway, but he asks instead of threatening. Jesse, thrown by the politeness, says yes."}
    ]}
  ]
});
