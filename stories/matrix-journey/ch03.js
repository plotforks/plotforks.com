/* Matrix journey chapter 3: The Matrix, "The Oracle". Content only (Opus pass).
   Canon: she never says the words outright; she reads his palms and eyes, says he has the gift but seems to be waiting for
   something, and lets him conclude he is not the One. She also warns that Morpheus will give his life for him.
   Nobody (Neo, Morpheus) knows yet that she is a program; that is revealed in Reloaded.
   New art used here: set "kitchen" (a small apartment kitchen, an oven, a "know thyself" sign over the door, a vase on a
   stand); cast oracle: "stand", "cookie" (holding out a cookie); neo: "sit"; fx "vase" (a vase falling and breaking),
   "cookies" (a tray of cookies); set "street" (a rainy city street at night, a parked car, lit windows). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 3, canon: "a", id: "oracle", code: "M1", episode: "The Matrix", title: "The Oracle's kitchen",
  setup: {
    kicker: "An apartment, a kitchen, the smell of cookies.",
    text: "Morpheus brings Neo to the Oracle, the woman who told him the One would come. She is baking. She tells Neo not to worry about the vase, and he turns and knocks it over. Then she looks at his palms and his eyes and tells him, kindly, that he has the gift but seems to be waiting for something. Maybe his next life. And Morpheus, she adds, will give his life for him.",
    caption: "Destiny, with a side of baked goods.",
    scene: {set: "kitchen", cast: {oracle: "cookie", neo: "sit"}, fx: ["vase", "cookies"]},
    variants: [
      {when: "warned", text: "Morpheus brings Neo to the Oracle, the woman who told him the One would come. Trinity keeps one eye on Cypher the whole drive over. The Oracle is baking. She tells Neo not to worry about the vase, and he knocks it over. Then she reads his palms and his eyes and tells him, kindly, that he has the gift but seems to be waiting for something. And Morpheus, she adds, will give his life for him."},
      {when: "bothPills", text: "Morpheus brings Neo to the Oracle, the woman who told him the One would come. She is baking, and she asks how both pills went down. She tells Neo not to worry about the vase, and he knocks it over. Then she reads his palms and his eyes and tells him, kindly, that he has the gift but seems to be waiting for something. And Morpheus, she adds, will give his life for him."}
    ]
  },
  question: "She says he isn't the One. What does Neo do with that?",
  choices: [
    {id: "a", label: "Believe her", tag: "What the film did.",
     effects: {belief: -15}, beats: [
      {scene: {set: "kitchen", cast: {oracle: "cookie", neo: "sit"}}, caption: "Right as rain, give or take.",
       text: "Neo takes it well, or looks like he does. She hands him a cookie and promises he'll feel better by the time he finishes it. He does, a little."},
      {scene: {set: "street", cast: {neo: "sit", morpheus: "stand"}}, caption: "For his ears only.",
       text: "In the car, Morpheus tells him that whatever she said was meant for him alone. Neo is very relieved not to have to repeat it."}
    ]},
    {id: "b", label: "Don't believe her", tag: "She's wrong, obviously.",
     effects: {belief: 20, agents: 5}, beats: [
      {scene: {set: "kitchen", cast: {oracle: "stand", neo: "stand"}, say: {who: "neo", text: "With respect, no."}}, caption: "She has heard this before.",
       text: "Neo tells the Oracle, politely, that she is wrong. She smiles like someone who has had this exact conversation several times, and gives him a cookie for the road."},
      {scene: {set: "street", cast: {neo: "stand"}}, caption: "The Matrix noticed.",
       text: "He walks out believing, and something in the Matrix notices. Across the city, an Agent touches his earpiece and turns his head."}
    ]},
    {id: "c", label: "Ask about the vase instead", tag: "Priorities.",
     effects: {belief: 5}, flags: ["vase"], beats: [
      {scene: {set: "kitchen", cast: {oracle: "cookie", neo: "sit"}, fx: ["vase"]}, caption: "The real question.",
       text: "Neo skips the destiny part and asks what is actually bothering him: would he have broken the vase if she hadn't mentioned it?"},
      {scene: {set: "kitchen", cast: {oracle: "cookie", neo: "stand"}, fx: ["cookies"]}, caption: "Noodle, baked.",
       text: "She hands him a cookie and tells him that one will bake his noodle for years. He leaves not knowing whether he is the One, but very unsure about pottery."}
    ]}
  ]
});
