/* Journey chapter 14: S5E8 "Gliding Over All". Content only (Opus pass). The nine men in prison.
   Plays after Say My Name (n:13), so it reads off mikeDead / mikeLives / ninePaid, and before the cash pile (n:15),
   because in the show the killings are what finally lets Walt stand in front of that pile and feel finished.
   Sets tenInTwo / silentNine / lawyerOnly, used by the endings.
   No new art: set prison, dinner, house, storage; cast walt "stand"/"point"/"suit", jack "stand", lydia "stand"/"panic" all exist.
   Ten deaths, stated once in a single line, never drawn and never played for a laugh. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 18, canon: "a", id: "ninemen", code: "S5E8", episode: "Gliding Over All", title: "Ten men, two minutes",
  setup: {
    kicker: "A diner booth. Three prisons, two states, one list.",
    text: "Nine of Mike's men are in custody in three different prisons, and their lawyer is the one who carries the money to their families, which makes him the tenth name and the only one who can actually trade. Lydia slides the list across the table without looking at it. Jack Welker reads it, counts, and starts explaining why three prisons at once is not how any of this normally works.",
    caption: "Ten names, written on a napkin, read twice.",
    scene: {set: "dinner", cast: {walt: "stand", lydia: "stand"}},
    variants: [
      {when: "ninePaid", text: "Nine of Mike's men are in custody in three different prisons, and Walt has been quietly paying every one of their families since the spring. Nobody has said a word, which is exactly what he paid for. It is also, his accountant would point out, nine standing reasons for somebody to eventually wonder who is being so reliable. Jack Welker has heard about the arrangement and has an opinion about permanent solutions.", scene: {set: "dinner", cast: {walt: "stand", jack: "stand"}}},
      {when: "mikeLives", text: "Nine of Mike's men are in custody in three different prisons, and Mike is in a motel somewhere south with a bag and a new name, which means the one man who knew how to keep nine people quiet is no longer taking calls. Their lawyer carries the money and is therefore the tenth name and the only one who can actually trade. Lydia has the list. Jack Welker reads it and starts explaining why three prisons at once is not how any of this normally works.", scene: {set: "dinner", cast: {walt: "stand", lydia: "stand"}}},
      {when: "gusArrested", text: "Nine of Mike's men are in custody in three different prisons, in the same federal system that is still slowly taking Gus Fring apart, which means every one of them is being asked the same questions by people who already know most of the answers. Their lawyer carries the money to their families and is the tenth name. Lydia has the list. Jack Welker reads it, counts, and starts explaining why three prisons at once is not how any of this normally works."}
    ]
  },
  question: "Jack says that with enough men he can reach all of them inside two minutes. What does Walt say?",
  choices: [
    {id: "a", label: "Give Jack the list", tag: "What the show did.",
     effects: {darkness: 25, hank: 10, jesse: -10}, flags: ["tenInTwo"], beats: [
      {scene: {set: "dinner", cast: {walt: "point", jack: "stand"}, say: {who: "walt", text: "Two minutes. All ten. Figure it out."}}, caption: "He does not negotiate the number down.",
       text: "Jack says three prisons is a problem. Walt tells him to solve it, in the voice he uses for people who have brought him an excuse instead of a result, and Jack, who has never taken that tone from a chemistry teacher before, finds that he is agreeing."},
      {scene: {set: "prison", fx: ["alarm"]}, caption: "Inside two minutes, in three buildings at once.",
       text: "It takes less than two minutes and it is done in three buildings at the same time. Ten men die, including the lawyer, and for a few weeks the newspapers carry it as a prison-gang story because nobody can think of a reason it would be anything else."},
      {scene: {set: "house", cast: {walt: "suit"}}, caption: "Then he goes home and has lunch by the pool.",
       text: "Walt drives home, puts on something comfortable, and organizes a family barbecue. Somewhere in that afternoon he stops being a man who has done terrible things and becomes a man who arranges them, and the difference is not visible from the outside."}
    ]},
    {id: "b", label: "Nobody. Put them on the payroll", tag: "Buy the silence instead.",
     effects: {darkness: -10, family: -10, hank: -5}, flags: ["silentNine"], beats: [
      {scene: {set: "dinner", cast: {walt: "stand", jack: "stand"}, say: {who: "walt", text: "I am not buying that. I am buying quiet."}}, caption: "Jack is disappointed, and says so.",
       text: "Walt tells Jack that ten funerals in one afternoon is not a solution, it is a headline, and that he would rather pay nine families forever than explain one Tuesday to a grand jury. Jack thinks this is soft. Jack is also, for once, not being asked."},
      {when: "ninePaid", scene: {set: "storage", cast: {walt: "dig"}}, caption: "The arrangement he already had, doubled.",
       text: "The payments that were already going out quietly double, and a second envelope starts arriving for the lawyer, who now has a very good reason to keep being a lawyer. Nobody has to be told what the money means. That is the entire point of it."},
      {scene: {set: "prison"}, caption: "Nine men who develop very poor memories.",
       text: "Nine men discover that they remember almost nothing about their old employer, and remember it consistently, for years. It costs a fortune every quarter, it works perfectly, and it leaves a paper trail with nine separate ends and a beginning in a storage unit in Albuquerque."}
    ]},
    {id: "c", label: "Only the lawyer", tag: "One instead of ten.",
     effects: {darkness: 15, hank: 5, family: -5}, flags: ["lawyerOnly"], beats: [
      {scene: {set: "dinner", cast: {walt: "stand", jack: "stand"}}, caption: "The arithmetic of it takes four seconds.",
       text: "Walt works it out in front of them: the nine have nothing to sell that the lawyer cannot sell better and sooner, so nine of the names come off the napkin. He is pleased with the efficiency of it for about as long as it takes to say."},
      {scene: {set: "prison"}, caption: "One man, in a building with cameras.",
       text: "It happens in a visiting room in the second week, and it is one death instead of ten, which is a sentence Walt will say to himself many times and never once out loud to another human being."},
      {scene: {set: "office", cast: {hank: "suspicious"}}, caption: "Nine men, suddenly extremely talkative.",
       text: "The nine men watch their lawyer stop existing and reach nine identical conclusions about their own futures. Four of them ask for a meeting with a federal prosecutor before the month is out, which is four more than would have asked if nothing had happened at all."}
    ]}
  ]
});
