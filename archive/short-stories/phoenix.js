/* Moment: S2E12 "Phoenix". Content only (Opus pass); engine and art live in index.html (Sonnet pass).
   Scene spec: {set, cast:{name:pose}, fx:[...], say:{who, text}}. Schema: see the uncertainty-principle skill. */
(window.MOMENTS = window.MOMENTS || []).push({
  id: "phoenix", code: "S2E12", episode: "Phoenix", title: "Jane's bedside", season: 2, ep: 12,
  setup: {
    kicker: "Jesse's apartment, 3:00 a.m.",
    text: "Walt came to talk Jesse out of leaving town with Jane and the $480,000. He finds them both passed out. He shakes Jesse, hard. Jesse doesn't wake, but Jane rolls onto her back and starts to choke.",
    caption: "Jesse's apartment, 3:00 a.m. The last quiet moment of Season 2.",
    scene: {set: "bedroom", cast: {jesse: "lie", jane: "back", walt: "near"}, fx: ["zz", "cough"]}
  },
  question: "What does Walt do?",
  aired: {
    beats: [
      {scene: {set: "bedroom", cast: {jesse: "lie", jane: "back", walt: "reach"}, fx: ["zz"]}, caption: "The moment the show turns.",
       text: "In the episode, Walt reaches toward her, stops, and watches. He does nothing. Jane dies."},
      {scene: {set: "sky-canon"}, caption: "The Season 2 cold opens finally make sense.",
       text: "Her grieving father goes back to work in the control tower. His error causes a mid-air collision over Albuquerque, and a pink teddy bear falls into the Whites' pool."}
    ],
    ending: {name: "As Aired", meter: 90,
      summary: "Walt keeps his partner by letting someone die, and two planes collide over the city two days later. From here the show only gets darker.",
      share: "I watched it as aired: Walt stood there and did nothing. Heisenberg meter 90/100."}
  },
  choices: [
    {id: "a", label: "Roll her onto her side", tag: "The decent thing.", beats: [
      {scene: {set: "bedroom", cast: {jesse: "lie", jane: "side", walt: "kneel"}, fx: ["zz", "halo"]}, caption: "Walter White, briefly a good person.",
       text: "Walt kneels and turns Jane onto her side. She coughs, breathes, and keeps breathing. He is quietly annoyed at how good that felt."},
      {scene: {set: "bedroom", cast: {jesse: "sit", jane: "sit-scream", walt: "near"}, fx: ["sweat"]}, caption: "Explaining this will take years.",
       text: "Jane opens her eyes to find her boyfriend's chemistry teacher in the bedroom at 3 a.m. She screams. Jesse finally wakes up. Nobody believes Walt's explanation, including Walt."},
      {scene: {set: "sky-clear"}, caption: "The sky over Albuquerque, two days later.",
       text: "Jane's father goes to work rested and focused in the control tower. Two planes that were never going to meet don't. No pink teddy bear ever lands in the White family pool."}
    ],
    checkpoint: {name: "Clear Skies", summary: "Jane lives, the planes never meet, and Jesse and Jane leave town with the money. Walt has product, cancer and no partner."},
    next: {question: "Walt needs a partner. What does he do?", choices: [
      {id: "a1", label: "Cook alone", tag: "How hard can selling be?", beats: [
        {scene: {set: "rv", cast: {walt: "lecture"}, say: {who: "walt", text: "Ninety-nine point one percent!"}}, caption: "Customer service, Heisenberg style.",
         text: "Walt cooks alone in the RV and makes his best batch yet. Then he tries to sell it himself, and gives his first customer a twenty-minute lecture on purity."},
        {scene: {set: "rv", cast: {walt: "stand"}, fx: ["sweat"]}, caption: "Hired, on one condition.",
         text: "Word reaches Gus Fring that a bald chemistry teacher is scaring customers away with quality. Gus hires him on one condition: Walt must never speak to a customer again."}
      ], ending: {name: "One-Man Cartel", meter: 70, pct: 41,
        summary: "The story rejoins the show a season early, just without Jesse. Walt cooks for Gus alone and unsupervised, which everyone agrees is worse.",
        share: "My timeline: One-Man Cartel. Walt cooked alone and Gus hired him anyway. Heisenberg meter 70/100."}},
      {id: "a2", label: "Take the Gray Matter job after all", tag: "The road not cooked.", beats: [
        {scene: {set: "office", cast: {walt: "suit", elliott: "stand"}, say: {who: "elliott", text: "Welcome aboard, Walt!"}}, caption: "Health insurance, at last.",
         text: "Still shaking from his good deed, Walt calls Elliott and takes the job. Gray Matter pays for his treatment, and Walt never touches the RV again."},
        {scene: {set: "office", cast: {walt: "suit"}, say: {who: "walt", text: "I could have been somebody."}}, caption: "Twenty years of very nice views.",
         text: "The treatment works. Walt spends twenty years in a corner office, telling the interns he could have been a kingpin. Nobody believes him."}
      ], ending: {name: "Corner Office", meter: 10, pct: 34,
        summary: "Walt lives to eighty, rich, bored and legal. It is the happiest ending in any timeline, and he considers it a tragedy.",
        share: "My timeline: Corner Office. Walt took the Gray Matter job and lived to eighty. Heisenberg meter 10/100."}},
      {id: "a3", label: "Track down Jesse and Jane", tag: "Partners, plural.", beats: [
        {scene: {set: "bedroom", cast: {walt: "far", jesse: "sit", jane: "sit-glare"}}, caption: "A motel room two states away.",
         text: "Walt finds them at a motel two states away and pitches a three-way partnership. Jane, sober and sharp, reads the numbers faster than he does."},
        {scene: {set: "rv", cast: {walt: "stand", jesse: "stand", jane: "stand"}, fx: ["sweat"]}, caption: "The org chart has changed.",
         text: "Jane takes over distribution and gets Gus to pay twice the price. Walt cooks, Jesse sells, and Jane signs every contract. Walt hates how well it works."}
      ], ending: {name: "Under New Management", meter: 75, pct: 25,
        summary: "The empire gets built, but it has a new boss, and she is twenty-seven. Walt spends the rest of the story trying to prove he is the one in charge.",
        share: "My timeline: Under New Management. Jane took over the business and Walt just cooks. Heisenberg meter 75/100."}}
    ]}},
    {id: "b", label: "Call 911", tag: "The anonymous caller.", beats: [
      {scene: {set: "bedroom", cast: {jesse: "lie", jane: "back", walt: "phone"}, fx: ["zz", "cough"]}, caption: "A concerned citizen, allegedly.",
       text: "Walt steps into the hallway and calls 911 in a disguised voice that is somehow more suspicious than his real one. Then he leaves before anyone can ask his name."},
      {scene: {set: "bedroom", cast: {jesse: "sit", jane: "side"}, fx: ["siren"]}, caption: "Jesse's worst morning, and he has had some bad ones.",
       text: "Paramedics save Jane. The police also find heroin, a duffel bag holding $480,000, and a very groggy Jesse Pinkman, who is arrested on the spot."},
      {scene: {set: "bedroom", cast: {walt: "phone"}, fx: ["sweat"]}, caption: "Walt, discovering the downside of doing the right thing.",
       text: "Hank takes a keen interest in how a small-time dealer came by half a million dollars. Walt calls Saul, who bills him for an emergency house call plus a surcharge for the word emergency."}
    ],
    checkpoint: {name: "Sirens", summary: "Jane lives, Jesse is in custody, and Hank wants to know where half a million dollars came from."},
    next: {question: "Jesse is in custody and Hank is circling. What does Walt do?", choices: [
      {id: "b1", label: "Pay Saul to fix it", tag: "Legal fees apply.", beats: [
        {scene: {set: "office", cast: {saul: "pitch", walt: "stand"}, say: {who: "saul", text: "Inadmissible, baby!"}}, caption: "A legal theory, loosely speaking.",
         text: "Saul argues that a 911 call made in a fake voice taints the whole search. The judge is confused enough to agree, and Jesse walks."},
        {scene: {set: "office", cast: {saul: "stand", walt: "stand"}, fx: ["sweat"], say: {who: "walt", text: "Exactly $480,000?"}}, caption: "Billed in six-minute increments.",
         text: "Saul's invoice arrives the next morning. His fee comes to exactly $480,000, which he says is a coincidence."}
      ], ending: {name: "Legal Fees", meter: 65, pct: 44,
        summary: "Jesse is free and loyal, the money is gone, and Saul has a new favorite client. Walt and Jesse start again from zero, which Walt takes as a personal insult.",
        share: "My timeline: Legal Fees. Saul got Jesse off and kept every dollar. Heisenberg meter 65/100."}},
      {id: "b2", label: "Confess to Hank", tag: "Family dinner.", beats: [
        {scene: {set: "dinner", cast: {walt: "stand", hank: "laugh", skyler: "stand"}}, caption: "Sunday dinner at the Whites'.",
         text: "At Sunday dinner, Walt tells Hank everything. Hank laughs so hard he has to sit down, blames the chemo, and asks for more potato salad."},
        {scene: {set: "dinner", cast: {hank: "suspicious", walt: "stand"}}, caption: "Two weeks later, Hank checked.",
         text: "Two weeks later, Hank checks. Walt becomes the DEA's star witness against Gus Fring, and his whole family goes into protection with him."}
      ], ending: {name: "Witness Protection", meter: 30, pct: 23,
        summary: "Walt ends up in a cabin in New Hampshire anyway, but with his family, cable and a clear conscience. He finds all three extremely boring.",
        share: "My timeline: Witness Protection. Walt confessed at dinner and Hank laughed. Then he checked. Heisenberg meter 30/100."}},
      {id: "b3", label: "Let Jesse take the fall", tag: "Loyalty test.", beats: [
        {scene: {set: "prison", cast: {jesse: "stand", walt: "phone"}}, caption: "Visiting hours.",
         text: "Walt stays silent. Jesse refuses to name his partner and takes a plea deal: five years. Walt visits once, and brings a card."},
        {scene: {set: "rv", cast: {walt: "stand"}, fx: ["sweat"]}, caption: "Five years is a long time to think.",
         text: "Walt cooks for Gus with a polite new assistant who hums opera. Five years later Jesse gets out, and he has had a lot of time to think."}
      ], ending: {name: "Five to Ten", meter: 85, pct: 33,
        summary: "Walt builds the empire without Jesse and never thinks about him once. Then Jesse's release date arrives, and so does Jesse.",
        share: "My timeline: Five to Ten. Jesse took the fall and Walt sent a card. Heisenberg meter 85/100."}}
    ]}},
    {id: "c", label: "Wake Jesse, whatever it takes", tag: "The glass of water.", beats: [
      {scene: {set: "bedroom", cast: {jesse: "sit", jane: "back", walt: "splash"}, fx: ["wet"], say: {who: "jesse", text: "YO! MR. WHITE?!"}}, caption: "Chemistry teacher, applying water.",
       text: "Walt empties a glass of water over Jesse's face. Jesse sits bolt upright, soaked and furious. “Yo! What the hell, Mr. White?” Then he sees Jane."},
      {scene: {set: "bedroom", cast: {jesse: "sit", jane: "side", walt: "far"}, fx: ["wet"]}, caption: "Jesse Pinkman, first responder.",
       text: "Jesse turns Jane onto her side and holds her until her breathing settles. He will tell this story for years, and in every version he saved her on his own."},
      {scene: {set: "bedroom", cast: {jesse: "sit", jane: "sit-glare", walt: "near"}, fx: ["sweat"]}, caption: "She remembers everything.",
       text: "Jesse stays in Albuquerque, grateful and more loyal to Mr. White than ever. Jane, who still knows Walt's secret, is now the most dangerous person in his life."}
    ],
    checkpoint: {name: "Wet Pillow", summary: "Everyone lives and nobody leaves. Jesse is more loyal than ever, and Jane still knows Walt's secret."},
    next: {question: "Jane knows too much. How does Walt handle her?", choices: [
      {id: "c1", label: "Win her over", tag: "Charm offensive.", beats: [
        {scene: {set: "office", cast: {jane: "stand", walt: "stand"}, say: {who: "jane", text: "Denied."}}, caption: "Expense report number four.",
         text: "Walt offers Jane a job running the books. She accepts, then spends her first week rejecting his expense reports."},
        {scene: {set: "dinner", cast: {jane: "stand", skyler: "stand", walt: "stand"}, fx: ["sweat"]}, caption: "An alliance Walt did not plan for.",
         text: "Jane meets Skyler. They discover they both find Walt exhausting, and within a month they are running the money together."}
      ], ending: {name: "Paperwork", meter: 50, pct: 37,
        summary: "The operation gets a filing system and two managers who never let Walt near the money. It is the best-run empire in the Southwest, and the least fun for Walt.",
        share: "My timeline: Paperwork. Jane and Skyler took over the money. Heisenberg meter 50/100."}},
      {id: "c2", label: "Threaten her", tag: "Full Heisenberg.", beats: [
        {scene: {set: "bedroom", cast: {walt: "far", jane: "sit-glare"}, say: {who: "walt", text: "Do you know who I am?"}}, caption: "A speech, recorded.",
         text: "Walt corners Jane and delivers a long, menacing speech about who he really is. Jane records all of it on her phone."},
        {scene: {set: "bedroom", cast: {jane: "sit-glare", jesse: "sit", walt: "far"}, fx: ["sweat"]}, caption: "Now in his own voice.",
         text: "Jane now holds two secrets on Walt, one of them in his own voice. She plays it at parties."}
      ], ending: {name: "Cold War", meter: 80, pct: 29,
        summary: "Walt and Jane spend three seasons in a standoff, each holding enough to ruin the other. Jesse is stuck in the middle and thinks they are just shy around each other.",
        share: "My timeline: Cold War. Walt threatened Jane and she recorded it. Heisenberg meter 80/100."}},
      {id: "c3", label: "Tell Skyler first", tag: "Get ahead of it.", beats: [
        {scene: {set: "dinner", cast: {skyler: "stand", walt: "stand"}, say: {who: "skyler", text: "Show me the numbers."}}, caption: "The shortest marriage crisis on record.",
         text: "Walt goes home and tells Skyler everything before Jane can. Skyler listens without a word, then asks to see the numbers."},
        {scene: {set: "carwash", cast: {skyler: "spreadsheet", walt: "stand"}, fx: ["bubbles"]}, caption: "A car wash, a season early.",
         text: "By morning Skyler has a spreadsheet, a plan and her eye on a car wash. The money starts getting cleaned a full season early."}
      ], ending: {name: "Full Disclosure", meter: 45, pct: 34,
        summary: "With Skyler running the money from Season 2, Walt never has to hide it or explain it. The pile still grows. Try The Cash Pile to see what happens when it does.",
        share: "My timeline: Full Disclosure. Walt told Skyler everything a season early. Heisenberg meter 45/100."}}
    ]}}
  ]
});
