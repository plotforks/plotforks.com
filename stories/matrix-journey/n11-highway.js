/* Matrix journey chapter 11 (new 2026-09-22): The Matrix Reloaded (2003), the freeway.
   Sits between the Merovingian (n:10) and the Architect (n:12). Every branch ends with the Keymaker delivered and
   the door reachable, because the Architect chapter needs both; what changes is who paid the toll.
   Sets lastSecond / earlyOnTheFreeway / trustedThem, used by the endings.
   No new art: set "street", cast neo "fly"/"coat"/"fight", trinity "coat"/"stand", morpheus "stand" all exist.
   The Twins are named and never drawn. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 11, canon: "a", id: "highway", code: "M2", episode: "Reloaded", title: "Fourteen miles of freeway",
  setup: {
    kicker: "A freeway, which everybody involved agrees is suicide.",
    text: "The Keymaker is in the back of a car doing ninety on a road that Morpheus has spent his whole career telling people to stay off, because on a freeway there is nowhere to go and everything is an Agent. Behind them are two Agents, two programs who walk through walls and keep smiling, and about four hundred cars belonging to people who did not sign up for this. Neo is nine miles away and can be here in under a minute.",
    caption: "Fourteen miles, and no exits that help.",
    scene: {set: "street", cast: {trinity: "coat", morpheus: "stand"}},
    variants: [
      {when: "merovFight", text: "The Keymaker is in the back of a car doing ninety, and he was taken out of a château by force two hours ago, which means the people chasing him are not only doing a job, they are annoyed. Behind them are two Agents, two programs who walk through walls and keep smiling, and four hundred cars belonging to people who did not sign up for this. Neo is nine miles away and can be here in under a minute."},
      {when: "agents>=60", text: "The Keymaker is in the back of a car doing ninety on a freeway, which is the worst possible ground, and the system has been looking very hard for Neo for some time now, which means the response arrives faster and there is more of it. Behind them are two Agents, two programs who walk through walls, and four hundred cars belonging to people who did not sign up for this."},
      {when: "trinity>=70", text: "The Keymaker is in the back of a car doing ninety on a freeway, and Trinity is driving it, which Neo has an opinion about that he has sensibly not expressed out loud. Behind them are two Agents, two programs who walk through walls and keep smiling, and four hundred cars belonging to people who did not sign up for any of this."}
    ]
  },
  question: "Neo can be on that freeway in under a minute, or he can not be. What does he do?",
  choices: [
    {id: "a", label: "Arrive at the last second", tag: "What the films did.",
     effects: {belief: 10, trinity: 10, agents: 15}, flags: ["lastSecond"], beats: [
      {scene: {set: "street", cast: {neo: "fly"}}, caption: "He comes in low and sideways, at the last possible moment.",
       text: "Neo arrives with about a second and a half in hand, plucks Morpheus off the roof of a lorry that is in the process of stopping being a lorry, and puts him down on tarmac. It is the most cinematic thing he has ever done and he does not think about it once beforehand."},
      {scene: {set: "street", cast: {neo: "coat", morpheus: "stand", trinity: "coat"}}, caption: "The Keymaker is delivered. So is the bill.",
       text: "The Keymaker gets out of the car alive and the door is reachable. Fourteen miles of freeway do not, and neither do a number of people whose afternoon was interrupted by a fight they could not see the point of."},
      {when: "belief>=70", scene: {set: "ship", cast: {neo: "sit"}}, caption: "He counts the cars afterwards, which is new.",
       text: "On the ship afterwards Neo asks Link to pull the accident reports off the freeway. Nobody has ever asked for that before. He reads all of them and does not tell anyone what number he arrived at."}
    ]},
    {id: "b", label: "Get there first and end it early", tag: "No chase at all.",
     effects: {belief: 20, agents: 30, zion: -5, trinity: -5}, flags: ["earlyOnTheFreeway"], beats: [
      {scene: {set: "street", cast: {neo: "fight", trinity: "stand"}}, caption: "He is standing on the on-ramp before the car reaches it.",
       text: "Neo does not wait to be needed. He is on the on-ramp before anybody gets there, takes both Agents apart in front of a queue of stationary traffic, and the two smiling programs decide, visibly, that today is not the day."},
      {scene: {set: "street", cast: {neo: "coat"}}, caption: "Nobody dies on that road. Several hundred people film it.",
       text: "The Keymaker is delivered without a scratch and not one civilian is hurt, which has never happened before. It also happens in daylight in front of several hundred people with cameras, in a system that is extremely good at noticing patterns."},
      {scene: {set: "cubicle", cast: {smith: "stand"}}, caption: "The response escalates, permanently.",
       text: "After that afternoon the system stops treating Neo as an anomaly to be contained and starts treating him as a condition to be planned around. Everything that comes looking for him afterwards comes in larger numbers and with fewer questions."}
    ]},
    {id: "c", label: "Stay away and let them work", tag: "They have done this before.",
     effects: {belief: -5, trinity: 15, zion: 5, agents: -5}, flags: ["trustedThem"], beats: [
      {scene: {set: "street", cast: {trinity: "coat", morpheus: "stand"}}, caption: "Two people who were doing this before he was born.",
       text: "Neo stays off the freeway, which costs him more than the fight would have. Morpheus and Trinity do it themselves, badly, brilliantly and at enormous cost, in the way people do things when nobody is coming to help."},
      {scene: {set: "ship", cast: {morpheus: "sit"}}, caption: "The Keymaker arrives. Morpheus does not walk for a week.",
       text: "The Keymaker is delivered, which was the entire point, and Morpheus comes back with a broken arm, a concussion and a look that he keeps giving Neo across the mess table without ever saying anything about it."},
      {when: "trinity>=70", scene: {set: "ship", cast: {trinity: "stand", neo: "sit"}}, caption: "Trinity says the useful thing, once.",
       text: "Trinity tells him, in about nine words and only once, that a man who comes for everything eventually becomes a man everything waits for. He does not agree with her at the time. He remembers it later, on a different road, at a worse moment."}
    ]}
  ]
});
