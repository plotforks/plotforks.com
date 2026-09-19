/* Matrix journey chapter 2: The Matrix, "Cypher's drink". Content only (Opus pass).
   Canon order: Cypher offers Neo the drink on the ship before the Oracle visit, and his steak dinner with Smith follows the
   same night, so this chapter comes before the Oracle (the approved list had them the other way round).
   Cypher's betrayal happens in every non-exit branch; the "warned" flag only changes how much damage he does in ch04.
   New art used here: sets "ship" (the Nebuchadnezzar's main deck: worn chairs with head jacks, screens of falling green code),
   "restaurant" (a white-tablecloth table, a steak, a wine glass); cast cypher: "drink", "stand"; smith: "stand";
   tank: "stand"; fx "code" (falling green code on the screens), "steak". */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 2, canon: "a", id: "cypher", code: "M1", episode: "The Matrix", title: "Cypher's drink",
  setup: {
    kicker: "The Nebuchadnezzar, after midnight.",
    text: "Neo has been rebuilt, retrained and taught kung fu in an afternoon, and he can't sleep. On the bridge, Cypher is watching green code fall down the screens. He pours Neo a glass of homemade liquor that he says is good for cleaning engines and nothing else. Then he asks: if Neo could go back into the Matrix and forget all this, would he?",
    caption: "A nightcap, with a question in it.",
    scene: {set: "ship", cast: {cypher: "drink", neo: "stand"}, fx: ["code"]},
    variants: [
      {when: "bothPills", text: "Neo has been rebuilt, retrained and taught kung fu in an afternoon, and he can't sleep. On the bridge, Cypher is watching green code fall down the screens. He has heard about the two pills, and he pours Neo a glass of homemade liquor with great interest. Then he asks: if Neo could go back into the Matrix and forget all this, would he?"}
    ]
  },
  question: "Would Neo go back?",
  choices: [
    {id: "a", label: "Drink, and dodge the question", tag: "What the film did, more or less.",
     effects: {belief: 5}, beats: [
      {scene: {set: "ship", cast: {cypher: "drink", neo: "stand"}, fx: ["code"]}, caption: "It tastes the way it sounds.",
       text: "Neo drinks, coughs, and says nothing useful. Cypher nods as if he has heard the answer anyway, then wonders out loud why he himself took the red one."},
      {scene: {set: "restaurant", cast: {cypher: "stand", smith: "stand"}, fx: ["steak"]}, caption: "Medium rare, allegedly.",
       text: "Later that night Cypher plugs himself in alone and has dinner with Agent Smith. The steak is perfect. It does not exist, and he has decided he doesn't care."}
    ]},
    {id: "b", label: "Say yes, he'd go back", tag: "Honesty, at the worst moment.",
     exit: "mediumRare", beats: [
      {scene: {set: "ship", cast: {cypher: "drink", neo: "stand"}, say: {who: "cypher", text: "I know a guy."}}, caption: "The guy is an Agent.",
       text: "Cypher lights up. He knows a guy who can arrange it: new memories, lots of money, no pod. The guy turns out to be Agent Smith."},
      {scene: {set: "restaurant", cast: {cypher: "stand", neo: "stand"}, fx: ["steak"]}, caption: "Table for two, in a dream.",
       text: "A week later Neo and Cypher are famous actors who have never met. They eat at the same restaurant every Thursday, and the steak is excellent."}
    ]},
    {id: "c", label: "Tell Morpheus about it", tag: "Snitching, for the resistance.",
     effects: {trinity: 10, zion: 10}, flags: ["warned"], beats: [
      {scene: {set: "ship", cast: {neo: "stand", morpheus: "stand", trinity: "stand"}}, caption: "Nine years of loyalty, one conversation.",
       text: "Neo tells Morpheus that Cypher seems homesick. Morpheus says Cypher has been with him for nine years. Trinity says nothing, and starts watching Cypher."},
      {scene: {set: "ship", cast: {cypher: "stand", trinity: "stand"}, fx: ["code"]}, caption: "Somebody noticed.",
       text: "Cypher has his dinner with Agent Smith that night anyway. When he unplugs, Trinity is sitting in the next chair, cleaning a very large wrench."}
    ]}
  ]
});
