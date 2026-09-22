/* Matrix journey chapter 9 (new 2026-09-22): The Matrix Reloaded (2003), the courtyard full of Smiths.
   Sits between the subway (n:8) and the Merovingian (n:10), which is where the copying starts in the films.
   Every branch ends with Neo leaving the courtyard alive and Smith still multiplying, because the Architect,
   Mobil Ave and the last fight all need both of those to be true.
   Sets flewAway / stoodAndFought / letHimCopy, used by the endings and read by the last-fight chapter.
   No new art: set "street", cast smith "many" and "fight", neo "coat" / "fight" / "fly" all exist already. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 9, canon: "a", id: "burlybrawl", code: "M2", episode: "Reloaded", title: "One of him, then a hundred",
  setup: {
    kicker: "A courtyard with a swing set and one broken railing.",
    text: "Smith is not an Agent any more. Smith is a program that got unplugged and did not go, and he has found a way to press his hand against somebody and turn them into another Smith. He explains this to Neo in a courtyard, calmly, the way a man explains a hobby, and then there are three of him, and then eleven, and then more of him than there is courtyard.",
    caption: "A hundred identical men, all of them patient.",
    scene: {set: "street", cast: {neo: "coat", smith: "many"}},
    variants: [
      {when: "smithTalk", text: "Smith is not an Agent any more, and he has already told Neo what he is: a program that got unplugged and did not go. In a subway once he explained it face to face. Now he has found a way to press his hand against somebody and turn them into another Smith, and he demonstrates it in a courtyard, calmly, the way a man explains a hobby, until there are more of him than there is courtyard."},
      {when: "belief>=70", text: "Smith is not an Agent any more. Smith is a program that got unplugged and did not go, and he has found a way to press his hand against somebody and turn them into another Smith. He explains this to a man who has stopped being surprised by anything, which annoys him, and then there are three of him, and then eleven, and then more of him than there is courtyard."}
    ]
  },
  question: "There is no winning a fight against a number. What does Neo do about it?",
  choices: [
    {id: "a", label: "Take off", tag: "What the films did.",
     effects: {belief: 15, agents: 20}, flags: ["flewAway"], beats: [
      {scene: {set: "street", cast: {neo: "fight", smith: "many"}}, caption: "He tries the fight first, for about a minute.",
       text: "Neo fights a hundred of them with a length of railing, extremely well, and discovers the one thing a hundred of anything guarantees: he is not losing, and he is not getting anywhere either. The hundred and first arrives while he is working that out."},
      {scene: {set: "rooftops", cast: {neo: "fly"}}, caption: "Straight up, which is not a retreat if you are the one flying.",
       text: "He goes up through the courtyard roof and leaves them standing in it, which every Smith in the pile finds personally insulting. Flying away from a fight you were winning is the first genuinely humble thing Neo does, and it costs him nothing except every Smith now knowing he can be made to leave."},
      {when: "trinity>=60", scene: {set: "ship", cast: {neo: "sit", trinity: "stand"}}, caption: "Trinity counts the dents in the coat and says nothing.",
       text: "Back on the ship Trinity looks at the coat, counts, and does not say any of the four things she is thinking. She has worked out, before he has, that the problem is not that there are a hundred. The problem is that there is no number at which he stops."}
    ]},
    {id: "b", label: "Stand and finish it", tag: "However long it takes.",
     effects: {belief: 10, agents: 30, trinity: -10, zion: -10}, flags: ["stoodAndFought"], beats: [
      {scene: {set: "street", cast: {neo: "fight", smith: "fight"}}, caption: "Forty minutes, and the courtyard stops being a courtyard.",
       text: "Neo does not leave. He stays for forty minutes and takes them apart one at a time in a small square of concrete, and every one he deletes is replaced by a copy made out of somebody who lived on that street."},
      {scene: {set: "street", cast: {smith: "many"}, fx: ["dust"]}, caption: "The arithmetic never once moves in his favour.",
       text: "He wins every exchange and loses the afternoon, because the population of the courtyard is a resource and his stamina is not. When he finally goes up through the roof there are four hundred of them and the block is empty of anybody who was not one."},
      {scene: {set: "ship", cast: {morpheus: "stand", neo: "sit"}}, caption: "Morpheus asks the wrong question, carefully.",
       text: "Morpheus asks how many. Neo tells him. Morpheus says nothing for a while and then asks whether anyone else was in the courtyard when it started, and Neo finds that he does not want to answer that one."}
    ]},
    {id: "c", label: "Let one of them touch him", tag: "Find out what copying costs.",
     effects: {belief: 25, agents: 25, trinity: -5}, flags: ["letHimCopy"], beats: [
      {scene: {set: "street", cast: {neo: "coat", smith: "stand"}}, caption: "He puts his hands down and waits, which stops everything.",
       text: "Neo stops fighting, drops his hands and lets the nearest Smith reach him, because he wants to know what the process actually is rather than what it looks like. Every copy in the courtyard stops moving at once, which tells him something before the hand even lands."},
      {scene: {set: "crater", cast: {neo: "rain", smith: "oracle"}}, caption: "It does not take, and both of them find that interesting.",
       text: "It does not take. Something in him refuses the copy the way a body refuses the wrong blood, and for a moment the two of them are the only quiet things in a courtyard full of shouting. Smith looks almost pleased, and then very frightened, which is worse."},
      {scene: {set: "ship", cast: {neo: "sit"}}, caption: "He now knows the ending, and tells nobody.",
       text: "Neo leaves knowing exactly one useful fact: the copying is not a weapon, it is an invitation, and there is a version of the end of all this where he accepts it on purpose. He does not mention this to Morpheus, or to Trinity, or to anyone at all."}
    ]}
  ]
});
