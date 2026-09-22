/* Journey chapter 4: S1E6 "Crazy Handful of Nothin'". Content only (Opus pass). The afternoon Heisenberg is invented.
   Plays after Gray Matter (n:3) and before the Saul chapter (n:5). Every branch leaves Walt with a distributor,
   because the rest of season one needs one; what changes is the name he uses and who he had to send to get it.
   Sets heisenbergBorn / talkedToTuco / sentJesse.
   New art used here: cast tuco "stand" (loud shirt, gold chain, a grin with a gold tooth in it). Sets office and
   street already exist. The explosion is fulminate, drawn as nothing at all, and nobody is killed in this chapter. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 4, canon: "a", id: "tuco", code: "S1E6", episode: "Crazy Handful of Nothin'", title: "A handful of crystal",
  setup: {
    kicker: "An office over a junkyard, up a metal staircase.",
    text: "Jesse went to sell a pound to a distributor called Tuco Salamanca and came back without the pound, without the money and without the use of one eye for a fortnight. Walt now owns the best product in the state and no way at all to move it, and the only person who can fix that is a man whose mood is a weather system. There is a staircase. There is a door at the top of it.",
    caption: "The staircase is the last ordinary thing up there.",
    scene: {set: "office", cast: {tuco: "stand", walt: "stand"}},
    variants: [
      {when: "skylerKnows", text: "Jesse went to sell a pound to a distributor called Tuco Salamanca and came back without the pound, without the money and without the use of one eye for a fortnight. Skyler knows about the cancer and has started asking where the treatment money is coming from, which is a second clock running. Walt owns the best product in the state and no way at all to move it. There is a staircase, and a door at the top of it."},
      {when: "firstKill", text: "Jesse went to sell a pound to a distributor called Tuco Salamanca and came back without the pound, without the money and without the use of one eye for a fortnight. Six weeks ago Walt did something in a basement that he has told nobody about, and he has noticed that it has made him harder to frighten, which he is treating as good news. There is a staircase, and a door at the top of it."},
      {when: "krazyAlive", text: "Jesse went to sell a pound to a distributor called Tuco Salamanca and came back without the pound, without the money and without the use of one eye for a fortnight. Somewhere in Albuquerque there is also a man who was chained to a pole in a basement and let go, who has said nothing so far, which is the kind of debt that only ever comes due at a bad moment. There is a staircase, and a door at the top of it."}
    ]
  },
  question: "Walt goes up the stairs. What does he go up as?",
  choices: [
    {id: "a", label: "Go up as somebody else", tag: "What the show did.",
     effects: {darkness: 25, jesse: 10, hank: 5}, flags: ["heisenbergBorn"], beats: [
      {scene: {set: "office", cast: {walt: "point", tuco: "stand"}, say: {who: "walt", text: "Fifty thousand. And you say my name."}}, caption: "He buys a hat on the way. That part is not a joke.",
       text: "Walt shaves his head, buys a hat, walks in with a bag of something that looks exactly like his own product, and introduces himself with a name he made up in the car. Then he throws a piece of it at the floor and takes out most of a window."},
      {scene: {set: "office", cast: {tuco: "stand"}, fx: ["flash"]}, caption: "Fulminate of mercury. Chemistry, used as a threat.",
       text: "Tuco loses a window, a coffee table and about four seconds of hearing, and gains an enormous amount of respect for a man he cannot categorize. He pays the fifty thousand on the spot and asks for a standing order, and he keeps saying the invented name out loud as though testing it."},
      {scene: {set: "rv", cast: {walt: "stand", jesse: "stand"}}, caption: "Jesse cannot decide whether to be delighted or afraid.",
       text: "Jesse hears about it the same evening and laughs for about a minute, then stops. Something happened up those stairs that he was not present for and cannot get back, and he spends the next five years trying to work out what it was."}
    ]},
    {id: "b", label: "Go up as himself and negotiate", tag: "A chemist with a term sheet.",
     effects: {darkness: 5, hank: 10, jesse: -5, family: 5}, flags: ["talkedToTuco"], beats: [
      {scene: {set: "office", cast: {walt: "lecture", tuco: "stand"}}, caption: "Forty minutes of purity, yield and margin.",
       text: "Walt goes up in his own face with a folder and explains, slowly and rather well, why ninety-nine percent is worth four times seventy, and what a reliable supplier is worth to a man whose current one is a garage in Rio Rancho. Tuco listens for forty minutes, which nobody has ever managed before."},
      {scene: {set: "office", cast: {tuco: "stand", walt: "stand"}}, caption: "A handshake, and no reason to be frightened of him.",
       text: "It works, and it works badly. Tuco pays, and Tuco also files Walt under supplier rather than under do not touch, and suppliers are people you visit at home when a shipment is late. Walt spends the rest of the year giving out a home address he does not have."},
      {scene: {set: "house", cast: {walt: "stand", skyler: "stand"}}, caption: "Nobody at home notices anything at all.",
       text: "He comes back the same man he went up as, which at the time feels like a victory and later feels like the year he could have stopped. There is no hat. Nobody ever asks him to say his name."}
    ]},
    {id: "c", label: "Send Jesse back in with the terms", tag: "He is the salesman.",
     effects: {darkness: 15, jesse: -25, hank: -5}, flags: ["sentJesse"], beats: [
      {scene: {set: "street", cast: {walt: "stand", jesse: "stand"}, say: {who: "walt", text: "You know him. I will write down what to say."}}, caption: "A script, written out in a parked car.",
       text: "Walt writes Jesse a script, makes him read it back twice, and stays in the car three streets away with the engine running, which he describes to himself as support. Jesse goes back up the staircase he was carried down."},
      {scene: {set: "office", cast: {tuco: "stand", jesse: "stand"}}, caption: "It works. It works because Jesse is brave.",
       text: "Jesse comes out with the fifty thousand and a standing order, a split lip and an entirely new understanding of his business partner, who did not come up the stairs with him and is not going to next time either."},
      {when: "jesse<=25", scene: {set: "rv", cast: {jesse: "sit"}}, caption: "He does not mention it, which is worse.",
       text: "He never brings it up. He just stops asking Walt to come along to things, and starts describing him to other people as a guy I cook with, which is a demotion Walt does not notice for about two years."}
    ]}
  ]
});
