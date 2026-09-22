/* Journey chapter 11a (aftertaste, shootout runs only): S5E16 "Felina". Content only (Opus pass).
   Plays only when ch10 ended in the shootout; ch11b covers surrender and deal runs. Every choice sets one of
   gunTrunk / jackDeal / jesseKeys. Beats are shown after the choice's effects apply, so beat `when` uses the new scores.
   Canon note: in the aired episode Jack only brings up the money after the gun has fired, and Walt shoots him
   before he finishes the sentence. Here Jack gets to make the offer first; choice a keeps the aired order.
   Violence handled plainly, never as a joke.
   New art used here: set "compound" (Jack's clubhouse: pool table, bar, a window onto parked cars);
   walt "keys" (holding a car key fob, thumb on the button), walt "floor" (lying on the floor, hand over Jesse);
   jesse "chained" (in chains, beard, prison-shop overalls), jesse "drive" (at the wheel of a car);
   cast todd: "stand"; fx "flash" (a white flash in the window, no visible gun or bodies), fx "sunrise" (low sun on the horizon). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 26, canon: "a", when: "atLarge && !gaveUp", id: "felina", code: "S5E16", episode: "Felina", title: "Jack's compound",
  setup: {
    kicker: "Aftertaste. A compound outside Albuquerque.",
    text: "Months in a New Hampshire cabin did not agree with Walt. He has driven back with a car bought for cash and something heavy bolted into the trunk. Jack's crew agreed to meet him, mostly so they could kill him. Jesse is here too, in chains. Then Jack does something the show never let him finish: he offers Walt a deal.",
    caption: "One last visit, with a trunk.",
    scene: {set: "compound", cast: {walt: "keys", jack: "stand", jesse: "chained"}},
    variants: [
      {when: "soldJesse", text: "Months in a New Hampshire cabin did not agree with Walt, and the federal indictment reads strangely when your brother-in-law is the chief witness and still alive. He has driven back with a car bought for cash and something heavy bolted into the trunk. Jesse is here, in the chains Walt sold him into. Then Jack does something the show never let him finish: he offers Walt a deal."},
      {when: "hankLives", text: "Months in a New Hampshire cabin did not agree with Walt, and neither did the news bulletins, in which a federal agent who should be dead keeps giving statements about him. He has driven back with a car bought for cash and something heavy bolted into the trunk. Jesse is at Jack's compound, in chains. Then Jack does something the show never let him finish: he offers Walt a deal."},
      {when: "jesse>=70", text: "Months in a New Hampshire cabin did not agree with Walt. He has driven back with a car bought for cash and something heavy bolted into the trunk. Jesse came looking for him after the desert, and Jack's crew has kept him in chains ever since. Then Jack does something the show never let him finish: he offers Walt a deal."},
      {when: "carwash", text: "Months in a New Hampshire cabin did not agree with Walt, and the car wash chain is now evidence in forty-one counties. He has driven back with a car bought for cash and something heavy bolted into the trunk. Jesse is at Jack's compound, in chains. Then Jack does something the show never let him finish: he offers Walt a deal."}
    ]
  },
  question: "Jack wants to deal, and the car keys are in Walt's hand. What does he do?",
  choices: [
    {id: "a", label: "Press the button on the keys", tag: "What the show did.",
     effects: {darkness: -5, jesse: 20}, flags: ["gunTrunk"], beats: [
      {scene: {set: "compound", cast: {walt: "floor", jesse: "chained"}, fx: ["flash"]}, caption: "The trunk had one job.",
       text: "Walt knocks Jesse to the floor and presses the button. The thing in the trunk fires through the wall until there is nothing left standing to hit. It lasts a very long time."},
      {scene: {set: "compound", cast: {walt: "keys", jesse: "chained"}}, caption: "Nobody finishes a sentence here.",
       text: "Jack, on the floor, starts to explain where the rest of the money is. Walt does not let him finish. Jesse deals with Todd himself, then refuses to do Walt the favor of shooting him."},
      {when: "jesse>=80", scene: {set: "desert", cast: {jesse: "drive", walt: "stand"}}, caption: "Shotgun, for once.",
       text: "Jesse looks at the wound in Walt's side, swears, and helps him into the passenger seat. Neither of them says where they are going."},
      {when: "janeAlive && jesse<80", scene: {set: "desert", cast: {jesse: "drive"}, fx: ["sunrise"]}, caption: "Someone kept the engine running.",
       text: "Jesse takes Todd's car and smashes through the gate. Half a mile down the road, a second car is waiting with the engine running."},
      {when: "!janeAlive && jesse<80", scene: {set: "compound", cast: {walt: "floor"}}, caption: "Among the equipment.",
       text: "Jesse smashes through the gate in Todd's car, laughing and crying at once. Walt walks into the lab, touches the equipment like an old friend, and lies down. The police find him there."}
    ]},
    {id: "b", label: "Take Jack's deal", tag: "Let the man finish a sentence.",
     effects: {darkness: 10, jesse: -20}, flags: ["jackDeal"], beats: [
      {scene: {set: "compound", cast: {walt: "keys", jack: "stand", todd: "stand"}, say: {who: "jack", text: "See? Civilized."}}, caption: "The keys go back in his pocket.",
       text: "Walt puts the keys away and shakes Jack's hand. One batch of the old blue, and he gets some of his own barrels back. Todd, delighted, makes everyone tea."},
      {when: "jesse>=40", scene: {set: "compound", cast: {walt: "stand", jesse: "stand"}}, caption: "A package deal.",
       text: "Walt adds one condition: Jesse walks out with him. Jack shrugs. He has Todd, and Todd has the notes, spelled almost correctly."},
      {when: "jesse<40", scene: {set: "compound", cast: {walt: "lecture", jesse: "chained"}}, caption: "He never looks down the chain.",
       text: "Walt cooks the batch in the compound lab with Jesse at the other end of the chain. He does not look at him once."},
      {scene: {set: "desert", cast: {walt: "stand"}}, caption: "Saving it for something.",
       text: "Walt drives off with the barrels. The thing in the trunk never fires. He is saving it, he tells himself, for something."}
    ]},
    {id: "c", label: "Slide the keys to Jesse", tag: "His call, for once.",
     effects: {darkness: -10, jesse: 25}, flags: ["jesseKeys"], beats: [
      {scene: {set: "compound", cast: {walt: "stand", jesse: "chained", jack: "stand"}}, caption: "Two buttons. One of them matters.",
       text: "While Jack talks, Walt drops the keys and kicks them across the floor to Jesse. He mouths which button. Jesse looks at him for a long second, then at the keys."},
      {scene: {set: "compound", cast: {jesse: "chained"}, fx: ["flash"]}, caption: "His turn to decide.",
       text: "Jesse presses it and gets down. When it is quiet, Walt is on the floor with a wound in his side, and for the first time in five seasons, what happens to Walt is Jesse's decision."},
      {when: "jesse>=70", scene: {set: "compound", cast: {walt: "floor", jesse: "stand"}}, caption: "Hold the pressure.",
       text: "Jesse calls an ambulance, then sits on the floor with his hands pressed to Walt's side until it arrives. He says nothing nice. He does not leave."},
      {when: "jesse<70", scene: {set: "desert", cast: {jesse: "drive"}}, caption: "He leaves the phone.",
       text: "Jesse takes Todd's car and leaves Walt the phone. Who Walt calls with it is not Jesse's problem anymore."}
    ]}
  ]
});
