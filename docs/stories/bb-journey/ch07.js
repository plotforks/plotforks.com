/* Journey chapter 7: S4E12 "End Times". Content only (Opus pass). Gus is gone after this chapter in every branch.
   Sensitive: the poisoning of a child. Handled plainly, never as a joke; no drawing of the child, the plant carries it.
   New art used here: fx "lily" (a potted lily of the valley). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).chapters =
  window.JOURNEYS["breaking-bad"].chapters || [];
window.JOURNEYS["breaking-bad"].chapters.push({
  n: 13, canon: "a", id: "endtimes", code: "S4E12", episode: "End Times", title: "Getting Jesse back",
  setup: {
    kicker: "The White house, a pool, a garden.",
    text: "Gus has pulled Jesse close and pushed Walt out. Walt can't reach Gus without Jesse, and Jesse no longer trusts him. Walt is out of time and out of ideas, except for one.",
    caption: "Out of time, not out of ideas.",
    scene: {set: "house", cast: {walt: "stand"}, fx: ["lily"]},
    variants: [
      {when: "noSaul", text: "Gus has pulled Jesse close and pushed Walt out. Walt can't reach Gus without Jesse, and Jesse no longer trusts him. He also has no lawyer, no large quiet man to lift things out of pockets, and nobody to call who is not already listed in his phone under a real name. Walt is out of time and out of ideas, except for one."},
      {when: "galeAlive", text: "Gus has pulled Jesse close and pushed Walt out. Walt can't reach Gus without Jesse, and Jesse no longer trusts him. A postcard from Nepal sits on the kitchen counter. Walt is out of time and out of ideas, except for one."}
    ]
  },
  question: "Walt needs Jesse back. What does he do?",
  choices: [
    {id: "a", label: "Poison Brock", tag: "What the show did.",
     effects: {darkness: 25, jesse: 10}, beats: [
      {scene: {set: "house", cast: {walt: "stand"}, fx: ["lily"]}, caption: "A plant by the pool.",
       text: "Walt makes a child sick with a plant from his garden and lets Jesse believe Gus did it. It works exactly as he planned."},
      {scene: {set: "house", cast: {walt: "stand", jesse: "stand"}}, caption: "The truth arrives much later.",
       text: "Brock recovers. Jesse helps Walt end Gus, and does not learn what really happened until it is far too late."}
    ]},
    {id: "b", label: "Tell Jesse the truth", tag: "Partners, for real this time.",
     effects: {darkness: 15, jesse: 20}, beats: [
      {scene: {set: "rv", cast: {walt: "stand", jesse: "stand"}, say: {who: "jesse", text: "Why didn't you just say so?"}}, caption: "An honest conversation, finally.",
       text: "Walt tells Jesse everything: once Gus has a replacement, he will kill them both. Jesse believes him, which surprises both of them."},
      {scene: {set: "superlab", cast: {walt: "stand", jesse: "stand"}}, caption: "Same ending, different partnership.",
       text: "They plan it together, and it ends as it did in the show, with Gus gone. This time there is no lie between them."}
    ]},
    {id: "c", label: "Tip off the DEA", tag: "Let Hank do the dangerous part.",
     effects: {darkness: 5, hank: 20}, flags: ["gusArrested"], beats: [
      {scene: {set: "office", cast: {hank: "read"}}, caption: "Special delivery.",
       text: "An anonymous envelope reaches Hank: photos, ledgers and the address of a very clean industrial laundry. Hank reads it twice and calls for a warrant."},
      {scene: {set: "office", cast: {hank: "suspicious"}}, caption: "Hero of the week.",
       text: "Gus is arrested in his own restaurant. Hank is a hero, and he starts wondering who sent the envelope, and how they knew so much."}
    ]}
  ]
});
