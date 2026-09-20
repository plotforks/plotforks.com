/* Matrix journey chapter 7: The Matrix Revolutions (2003), "Machine City or Zion". Content only (Opus pass).
   Canon: Neo, freed from the Mobil Ave station, takes Niobe's ship to the Machine City with Trinity; Bane (Smith in a human
   body) stows away and blinds him; Neo sees in gold light; Trinity dies in the crash; Neo offers the Deus Ex Machina a deal
   (he stops Smith, they spare Zion). Every branch ends with the machines willing to plug Neo in against Smith, so ch08 holds.
   "manager" (ch06 c) pays off here. Trinity's death handled plainly.
   New art used here: sets "dock" (Zion's dock: a huge domed cavern, gun turrets, a drilling hole in the ceiling),
   "machinecity" (black towers, lightning, a golden sky above the clouds); cast neo: "blind" (a cloth over his eyes);
   niobe: "stand"; deus: "face" (a giant face made of a swarm of small machines);
   fx "gold" (Neo's gold-light vision), "crash" (a ship nose-down among towers, no bodies shown), "emp" (a blue pulse ring). */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["matrix"] = window.JOURNEYS["matrix"] || {}).chapters =
  window.JOURNEYS["matrix"].chapters || [];
window.JOURNEYS["matrix"].chapters.push({
  n: 12, canon: "a", id: "revolutions", code: "M3", episode: "The Matrix Revolutions", title: "Machine City or Zion",
  setup: {
    kicker: "Zion, the last day.",
    text: "Trinity got Neo out of a train station between worlds by pointing a gun at a man in a very expensive suit. Now a quarter of a million Sentinels are drilling toward Zion's dock, and Smith has copied himself onto almost everyone in the Matrix, the Oracle included. Neo is sure the answer is in the Machine City, where no human has ever gone and come back. Zion needs every fighter it has.",
    caption: "Quarter of a million, and counting.",
    scene: {set: "dock", cast: {neo: "coat", trinity: "coat"}, fx: ["sentinels"]},
    variants: [
      {when: "trinityLost && morpheusDead", text: "Seraph got Neo out of a train station between worlds, alone. Trinity is gone, and so is Morpheus. Zion is under siege, and the Matrix is almost entirely Smith. Neo is sure the answer is in the Machine City, where no human has ever gone and come back. Zion needs every fighter it has."},
      {when: "trinityLost", text: "Morpheus and Seraph got Neo out of a train station between worlds. Trinity is gone, and Neo has not said her name since. Zion is under siege, and the Matrix is almost entirely Smith. Neo is sure the answer is in the Machine City, where no human has ever gone and come back. Zion needs every fighter it has."},
      {when: "morpheusDead", text: "Trinity got Neo out of a train station between worlds by pointing a gun at a man in a very expensive suit. Niobe, who runs the fleet now that Morpheus is gone, has a ship ready. Zion is under siege, and the Matrix is almost entirely Smith. Neo is sure the answer is in the Machine City, where no human has ever gone and come back. Zion needs every fighter it has."}
    ]
  },
  question: "The machines are coming. Where does Neo go?",
  choices: [
    {id: "a", label: "To the Machine City, with Trinity", tag: "What the film did.",
     effects: {zion: 25, belief: 10}, flags: ["machineCity", "crash"], beats: [
      {when: "!trinityLost", scene: {set: "machinecity", cast: {neo: "blind", trinity: "coat"}, fx: ["gold"]}, caption: "Blue sky, once.",
       text: "Smith, wearing a man named Bane, stows away and takes Neo's eyes. Neo sees him anyway, in gold light. Trinity flies above the clouds so they can see the sky, once."},
      {when: "!trinityLost", scene: {set: "machinecity", cast: {neo: "blind"}, fx: ["crash"]}, caption: "The crash.",
       text: "The ship comes down in the Machine City. Trinity dies in Neo's arms. He gets up and keeps walking, because she told him to."},
      {when: "trinityLost", scene: {set: "machinecity", cast: {neo: "blind"}, fx: ["gold", "crash"]}, caption: "Alone, and in gold.",
       text: "Neo goes alone. Smith, wearing a man named Bane, is waiting on board and takes his eyes. Neo sees the Machine City anyway, in gold light, and walks the last mile from the wreck."},
      {when: "!manager", scene: {set: "machinecity", cast: {neo: "blind", deus: "face"}}, caption: "Terms and conditions.",
       text: "A face made of a million machines looks down at him. Neo offers a deal: Smith is their problem too. He will stop Smith, if they leave Zion alone."},
      {when: "manager", scene: {set: "machinecity", cast: {neo: "blind", deus: "face"}, say: {who: "neo", text: "Finally. The manager."}}, caption: "The complaint is read.",
       text: "A face made of a million machines looks down at him. It has read his complaint. Neo offers a deal: he will stop Smith, if they leave Zion alone."}
    ]},
    {id: "b", label: "Stay and defend Zion", tag: "Boots on the dock.",
     effects: {zion: 10, agents: 15, trinity: 10}, flags: ["defendZion"], beats: [
      {scene: {set: "dock", cast: {neo: "coat"}, fx: ["sentinels"]}, caption: "One time in three.",
       text: "Neo stays. Out here he can stop Sentinels with his mind, or at least one attempt in three. The dock holds for a day, which nobody expected."},
      {scene: {set: "dock", cast: {niobe: "stand", neo: "coat"}, fx: ["emp"]}, caption: "The pulse.",
       text: "Niobe brings the fleet's last ship in and fires its pulse, which wipes out the Sentinels in the dock and every machine on Zion's side too. It buys them a night."},
      {scene: {set: "dock", cast: {neo: "coat"}, fx: ["sentinels"]}, caption: "A visitor, not an attack.",
       text: "That night a single Sentinel floats down into the dock and does not attack. The machines have a Smith problem too, and they want to talk to the One."}
    ]},
    {id: "c", label: "Go alone, keep Trinity safe", tag: "Chivalry, arguably.",
     effects: {zion: 20, trinity: -10}, flags: ["machineCity", "trinitySafe"], beats: [
      {when: "!trinityLost", scene: {set: "dock", cast: {neo: "coat", trinity: "coat"}}, caption: "She has opinions.",
       text: "Neo tells Trinity to stay in Zion. She tells him exactly what she thinks of that, then stays, because Zion needs pilots and she is the best one left."},
      {when: "trinityLost", scene: {set: "dock", cast: {neo: "coat"}}, caption: "Nobody left to protect.",
       text: "There is nobody left to keep safe. Neo takes a ship and goes alone, and nobody on the dock tries to stop him."},
      {scene: {set: "machinecity", cast: {neo: "blind"}, fx: ["gold"]}, caption: "Bane, again.",
       text: "Smith, wearing a man named Bane, stows away and takes Neo's eyes. Neo sees him anyway, in gold light, and lands the ship by himself, badly."},
      {when: "!manager", scene: {set: "machinecity", cast: {neo: "blind", deus: "face"}}, caption: "Terms and conditions.",
       text: "A face made of a million machines looks down at him. Neo offers a deal: Smith is their problem too. He will stop Smith, if they leave Zion alone."},
      {when: "manager", scene: {set: "machinecity", cast: {neo: "blind", deus: "face"}, say: {who: "neo", text: "Finally. The manager."}}, caption: "The complaint is read.",
       text: "A face made of a million machines looks down at him. It has read his complaint. Neo offers a deal: he will stop Smith, if they leave Zion alone."}
    ]}
  ]
});
