/* Journey chapter 22: S5E14 "Ozymandias". Content only (Opus pass). The call that decides what Skyler carries.
   Ungated on purpose: every branch arrives here, either with Walt on the run (atLarge) or with Walt in custody
   (surrendered, deal, or arrested in the desert after the standoff), and the choice is the same in all of them.
   The setup variants cover those five arrivals; variant 0 must stay above the others because hostages implies atLarge.
   Sets clearedSkyler / sharedBlame / signedConfession, used by the endings.
   No new art: sets house, kitchen, office, courtroom; cast walt "phone"/"stand"/"suit", skyler "stand"/"sit", hank "suspicious" all exist.
   Holly is referred to and never drawn. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 28, canon: "a", id: "skylername", code: "S5E14", episode: "Ozymandias", title: "What Skyler gets to keep",
  setup: {
    kicker: "A payphone, and a house with four police cars outside.",
    text: "Skyler's name is on the car wash, on the accounts, on the tax returns and in a filing cabinet at the DEA, and there is a version of the next two years in which she goes to prison as a partner rather than a witness. There are police in her kitchen right now. Walt has a payphone, a stolen minute and a daughter in the back of the car, and whatever he says next will be recorded, transcribed and read out loud by a prosecutor.",
    caption: "The call is being recorded. That is the entire idea.",
    scene: {set: "house", cast: {walt: "phone"}},
    variants: [
      {when: "hostages", text: "Nobody fired a shot in the desert, two federal agents spent six weeks in a shed and came out alive, and Walt is a free man with a very short future. Skyler's name is still on the car wash, the accounts, the tax returns and a DEA file, and there are police in her kitchen. He has a payphone, a stolen minute and a daughter in the back of the car, and whatever he says next will be recorded, transcribed and read out loud by a prosecutor.", scene: {set: "house", cast: {walt: "phone"}}},
      {when: "surrendered", text: "Walt walked out from behind that rock with his hands up, and has been in a federal building ever since. Skyler's name is on the car wash, the accounts, the tax returns and a filing cabinet two floors down, and there is a version of the next two years in which she is charged as a partner rather than believed as a witness. He is allowed one call. It will be recorded, transcribed and read out loud by a prosecutor.", scene: {set: "office", cast: {walt: "stand"}}},
      {when: "deal", text: "Walt gave them everything from behind a rock in the desert, forty pages of it, footnoted. What he did not do was say a single careful word about his wife, and forty pages with a hole in them is a hole a prosecutor will fill in herself. Skyler's name is on the car wash, the accounts and the returns. He is allowed one call, and it will be recorded, transcribed and read out loud.", scene: {set: "office", cast: {walt: "stand"}}},
      {when: "noShots && !atLarge", text: "Walt talked a shooting out of existence in the middle of the desert with his hands cuffed behind him, and was driven away forty miles later by his own brother-in-law without a word being said. Skyler's name is still on the car wash, the accounts, the tax returns and a filing cabinet, and there is a version of the next two years in which she is a partner rather than a witness. He is allowed one call, and it will be recorded.", scene: {set: "office", cast: {walt: "stand", hank: "suspicious"}}}
    ]
  },
  question: "Everything he says now is evidence, and he gets to choose who it is evidence against. What does Walt do?",
  choices: [
    {id: "a", label: "Make the call that clears her", tag: "What the show did.",
     effects: {darkness: 5, family: 20, hank: 5}, flags: ["clearedSkyler"], beats: [
      {scene: {set: "house", cast: {walt: "phone"}, say: {who: "walt", text: "You never had any idea who you were married to."}}, caption: "The worst thing he ever says, said on purpose.",
       text: "Walt performs a monster for eleven minutes, at volume, for an audience of one wife and four listening officers. Everything he says is designed to sound like a man who ran a household by terror, and the only part that is true is how well he does it."},
      {scene: {set: "kitchen", cast: {skyler: "sit"}}, caption: "She works out what he is doing about a minute in.",
       text: "Skyler understands what it is roughly a minute in, and keeps crying anyway, because both things are happening at once. She never tells anybody that she understood, and that omission is the closest thing to a gift he ever gave her."},
      {scene: {set: "courtroom", cast: {skyler: "stand"}}, caption: "The transcript does more work than any lawyer.",
       text: "The recording is played twice: once by a prosecutor who thinks it proves how dangerous he was, and once by Skyler's attorney, who agrees enthusiastically. She keeps the house, loses the car wash, and is never charged with anything heavier than a tax matter."}
    ]},
    {id: "b", label: "Say nothing about her at all", tag: "She knew what she signed.",
     effects: {darkness: 10, family: -25, hank: -5}, flags: ["sharedBlame"], beats: [
      {scene: {set: "house", cast: {walt: "stand"}}, caption: "He decides that silence is neutral. It is not.",
       text: "Walt decides that the lawyers will sort out who did what, and that anything he says will only be twisted. It is the first genuinely passive decision he has made in five years and it costs more than any of the loud ones."},
      {scene: {set: "office", cast: {skyler: "spreadsheet"}}, caption: "Her own competence, read back to her.",
       text: "The prosecution does not need him. It has her signature on forty-one sets of books, a bookkeeping qualification, a full ledger in her own handwriting and, worst of all, a woman who is clearly capable of understanding every page of it."},
      {scene: {set: "courtroom", cast: {skyler: "stand", judge: "sit"}}, caption: "Conspiracy, and a number of years.",
       text: "Skyler is charged as a partner, takes a plea to avoid a trial the children would have to read about, and serves a term that is short by federal standards and permanent by every other measure. Marie raises Holly for part of it."}
    ]},
    {id: "c", label: "Put it in writing and sign it", tag: "Notarized, and dated.",
     effects: {darkness: -10, family: 15, hank: 15, jesse: 5}, flags: ["signedConfession"], beats: [
      {scene: {set: "office", cast: {walt: "suit"}}, caption: "Nine pages, and a date on every one of them.",
       text: "Walt writes it out instead: nine pages, dated, each one naming what he did and the exact week he started doing it without her, with a notary's stamp from a shopping-centre office and a copy sent to three separate addresses in case somebody loses one."},
      {scene: {set: "office", cast: {hank: "read"}}, caption: "Useful, dull and completely unanswerable.",
       text: "A signed statement is worth less drama than a recording and a great deal more in a hearing, because it is boring, specific and cannot be replayed at the wrong volume. Two of the three copies arrive. That is two more than were needed."},
      {when: "family>=80", scene: {set: "house", cast: {skyler: "stand"}}, caption: "She reads it once and puts it in a drawer.",
       text: "Skyler reads all nine pages in a kitchen at two in the morning, and finds that the man who wrote them is admitting to things she had spent two years pretending she had not noticed. She keeps them. She does not forgive them."}
    ]}
  ]
});
