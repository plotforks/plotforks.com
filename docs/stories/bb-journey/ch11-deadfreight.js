/* Journey chapter 11: S5E5 "Dead Freight". Content only (Opus pass). The train heist and the boy on the ridge.
   Plays after End Times (n:10) and before Buyout (n:12), so the methylamine is already in the ground when
   Declan makes his offer. Sets drewDead / boySafe, used by the endings and by the Ozymandias chapter (n:22).
   No new art: set desert, fx "train", cast walt "stand"/"point"/"kneel", jesse "stand", todd "stand", mike "stand" all exist.
   The killing is stated once, plainly, and is never drawn or joked about. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 13, canon: "a", id: "deadfreight", code: "S5E5", episode: "Dead Freight", title: "The boy on the ridge",
  setup: {
    kicker: "A dry wash under a railway bridge, mid-morning.",
    text: "The train is stopped, the hoses are running, and a thousand gallons of methylamine are moving out of a tanker car into a buried tank without a single person in the world knowing it happened. It is the cleanest thing Walt has ever planned. Then Jesse looks up at the ridge, and there is a boy on a dirt bike, fourteen at most, who has been sitting there for some time, and who raises one hand and waves.",
    caption: "He waves. That is the whole problem.",
    scene: {set: "desert", cast: {walt: "stand", jesse: "stand", todd: "stand"}, fx: ["train"]},
    variants: [
      {when: "mikeRespect", text: "Mike planned it, which is why it worked: the train stops, the hoses run, and a thousand gallons of methylamine leave a tanker car without a single person in the world knowing it happened. Mike is already looking at his watch and thinking about the drive home. Then Jesse looks up at the ridge, and there is a boy on a dirt bike, fourteen at most, who has been sitting there for some time, and who raises one hand and waves.", scene: {set: "desert", cast: {walt: "stand", mike: "stand", todd: "stand"}, fx: ["train"]}},
      {when: "janeAlive", text: "The train is stopped, the hoses are running, and a thousand gallons of methylamine are leaving a tanker car without a single person in the world knowing it happened. Jesse is steady this year, sober, on time, and has spent the whole drive out talking about a girl who thinks he works in logistics. Then he looks up at the ridge, and there is a boy on a dirt bike, fourteen at most, who has been sitting there for some time, and who raises one hand and waves."}
    ]
  },
  question: "There is a witness on the ridge, and he has seen all of it. What does Walt do?",
  choices: [
    {id: "a", label: "Let Todd deal with it", tag: "What the show did.",
     effects: {darkness: 20, jesse: -25, hank: 5}, flags: ["drewDead"], beats: [
      {scene: {set: "desert", cast: {todd: "stand", walt: "stand"}, fx: ["dust"]}, caption: "Nobody says a word, so Todd decides that means yes.",
       text: "Nobody tells Todd to do anything. Nobody tells him not to, either, and he has been waiting all morning for a chance to show that he understands the job. He does it the way a man closes a gate behind him, and then turns around with an expression that is plainly asking whether that was helpful."},
      {scene: {set: "desert", cast: {jesse: "stand", walt: "point"}}, caption: "Jesse hits him. It changes nothing at all.",
       text: "Jesse gets three good punches in before anybody pulls him off, which is three more than the situation will ever be improved by. Walt says the word accident twice, the second time to himself, and notices that it is getting easier to say."},
      {when: "jesse>=60", scene: {set: "rv", cast: {jesse: "sit"}}, caption: "He does not come back to work.",
       text: "Jesse does not come to the lab the next week, or the week after. When he finally does, he cooks a perfect batch, says nothing to anybody, and leaves his gloves on the bench when he goes."}
    ]},
    {id: "b", label: "Get to the boy first", tag: "Buy a silence that lasts.",
     effects: {darkness: 5, jesse: 10, hank: 15}, flags: ["boySafe", "boyPaid"], beats: [
      {scene: {set: "desert", cast: {walt: "stand"}, fx: ["dust"]}, caption: "He walks up the ridge on his own, out of breath.",
       text: "Walt walks up the slope with both hands visible, gets to the top badly out of breath, and talks to the boy for eleven minutes about tarantulas, dirt bikes and a survey job that has to stay confidential because of a contract. The boy is fourteen and does most of the talking."},
      {scene: {set: "house", cast: {walt: "suit"}}, caption: "A scholarship fund, opened on a Tuesday.",
       text: "Two weeks later a fund is opened in the boy's name by a lawyer he will never meet, and his parents are told it is from a company that noticed his science grades. It pays out every September. It is generosity with a receipt attached, and Walt sleeps well."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "A fourteen-year-old with a very good memory.",
       text: "The boy keeps the secret for years, which is longer than anybody has any right to expect. He also keeps the date, the place, and a photograph of a train he took because it looked cool, and one day a federal agent will ask him a very ordinary question."}
    ]},
    {id: "c", label: "Let him ride away", tag: "Accept that the clock is running.",
     effects: {darkness: -10, jesse: 15, hank: 10}, flags: ["boySafe", "clockRunning"], beats: [
      {scene: {set: "desert", cast: {walt: "stand", jesse: "stand"}, say: {who: "walt", text: "He is a kid. Everybody get in the cars."}}, caption: "The only time Walt is first to say stop.",
       text: "Walt says it loudly, once, before anybody else has finished having the thought, and everybody gets in the cars. Todd looks genuinely confused for a moment, and files the moment away as information about his employer."},
      {scene: {set: "desert", cast: {walt: "stand"}}, caption: "A thousand gallons and a countdown.",
       text: "They drive out with the methylamine and a witness. It is a very good day and a very bad asset, and for the rest of the year every unexplained phone call will arrive with a small cold feeling attached."},
      {when: "jesse>=60", scene: {set: "rv", cast: {jesse: "stand", walt: "stand"}}, caption: "Jesse never forgets it either.",
       text: "Jesse brings it up once, months later, in the middle of an argument about something else, as the one thing Walt did that he cannot fit into the story he tells himself about the man."}
    ]}
  ]
});
