/* Breaking Bad journey: finale endings. Content only (Opus pass).
   Evaluated in order after the last chapter played (ch11a or ch11b, the aftertaste); the first `when` that holds wins.
   Every finale path has exactly one of surrendered / shootout / deal from ch10, plus one ch11 flag:
   shootout runs play ch11a (gunTrunk / jackDeal / jesseKeys), the others play ch11b (confessed / lectured / silent).
   Rules are grouped by those flags; the last three are safety fallbacks and do not count in the gallery.
   {meter} in share lines = final darkness score. */
(window.JOURNEYS = window.JOURNEYS || {});
(window.JOURNEYS["breaking-bad"] = window.JOURNEYS["breaking-bad"] || {}).endings = [
  /* Shootout, then "Felina" (ch11a) */
  {id: "sideBySide", when: "gunTrunk && jesse>=80", name: "Side by Side",
   summary: "Jesse drives, and Walt rides in the passenger seat for the first time since the RV. They make it as far as a hospital in Farmington. Walt insists on correcting the doctor's chemistry.",
   share: "My timeline: Side by Side. Jesse drove Walt away from Jack's compound. Heisenberg meter {meter}/100."},
  {id: "janeDrives", when: "gunTrunk && janeAlive", name: "Jane Drives the Getaway Car",
   summary: "Jane was waiting down the road with the engine running, and nobody asks how she knew where to come. She and Jesse leave New Mexico for good. Walt stays behind with the equipment.",
   share: "My timeline: Jane Drives the Getaway Car. Jane lived, and it mattered in the end. Heisenberg meter {meter}/100."},
  {id: "felina", when: "gunTrunk", name: "Felina",
   summary: "The timeline closest to the show. Walt settles every account, frees Jesse, and dies on the floor of a meth lab, among the only things he ever fully trusted.",
   share: "My timeline: Felina. Almost exactly what happened on TV. Heisenberg meter {meter}/100."},
  {id: "packageDeal", when: "jackDeal && jesse>=40", name: "Package Deal",
   summary: "Walt and Jesse drive out of the compound in separate cars and never speak again. Jack's crew sells Todd's cloudy imitation as the real thing, and within a year the name Heisenberg is a joke in three states.",
   share: "My timeline: Package Deal. Walt took Jack's deal and got Jesse out in it. Heisenberg meter {meter}/100."},
  {id: "cleanGetaway", when: "jackDeal && carwash", name: "Clean Getaway",
   summary: "Walt drives his barrels from one car wash to the next, laundering as he goes, like a man in a very clean witness protection program. The trunk stays shut for good.",
   share: "My timeline: Clean Getaway. Walt took Jack's deal and vanished into his own car washes. Heisenberg meter {meter}/100."},
  {id: "kingOfNothing", when: "jackDeal", name: "King of Nothing",
   summary: "Walt gets some of his money back and none of anything else. The cancer returns in the spring. He spends it alone in a rented house, next to barrels he no longer has any use for.",
   share: "My timeline: King of Nothing. Walt took Jack's deal and kept almost nothing. Heisenberg meter {meter}/100."},
  {id: "ambulance", when: "jesseKeys && jesse>=70", name: "The Ambulance",
   summary: "Walt survives the night because Jesse decided he should. He is tried from a hospital bed and serves what is left of his life in a prison ward. Jesse visits once, to say he is never visiting again.",
   share: "My timeline: The Ambulance. Walt gave Jesse the keys and Jesse saved his life. Heisenberg meter {meter}/100."},
  {id: "jessesCall", when: "jesseKeys", name: "Jesse's Call",
   summary: "Jesse drives north and does not look back. Walt answers one last call on Todd's phone, from Lydia, and makes one more, to 911. The police find him sitting up, waiting for them.",
   share: "My timeline: Jesse's Call. Walt gave Jesse the keys and let him decide. Heisenberg meter {meter}/100."},

  /* Surrender, then sentencing (ch11b) */
  {id: "characterWitness", when: "surrendered && confessed && jesse>=70", name: "Character Witness",
   summary: "Jesse testifies at sentencing, for Walt, and calls him the best teacher he ever had. The judge takes five years off, and the family is in the front row.",
   share: "My timeline: Character Witness. Walt surrendered and Jesse spoke for him. Heisenberg meter {meter}/100."},
  {id: "visitingHours", when: "surrendered && confessed && family>=60", name: "Visiting Hours",
   summary: "Walt goes to prison, and his family visits every Sunday. Holly learns to read from his letters, which are grammatically perfect.",
   share: "My timeline: Visiting Hours. Walt surrendered, told the truth, and his family kept visiting. Heisenberg meter {meter}/100."},
  {id: "almostGood", when: "surrendered && confessed && darkness<=30", name: "Almost a Good Man",
   summary: "Walt surrenders with his conscience mostly intact and admits the rest in open court. He did terrible things, but fewer than he could have, and in this timeline that turns out to matter.",
   share: "My timeline: Almost a Good Man. Walt surrendered before he became Heisenberg. Heisenberg meter {meter}/100."},
  {id: "cellBlock", when: "surrendered && lectured", name: "Cell Block Chemistry",
   summary: "Walt teaches chemistry to the other inmates, and every one of them passes. The warden is thrilled until he learns which chapter they found most interesting.",
   share: "My timeline: Cell Block Chemistry. Walt surrendered and started teaching again. Heisenberg meter {meter}/100."},
  {id: "copycat", when: "surrendered && silent", name: "The Copycat",
   summary: "Walt never says another word about it. A year later blue product appears in Phoenix, and every agent in the Southwest spends the next season trying to find out who learned from him.",
   share: "My timeline: The Copycat. Walt said nothing, and somebody kept cooking. Heisenberg meter {meter}/100."},
  {id: "inmate", when: "surrendered", name: "Walter White, Inmate",
   summary: "Walt serves his sentence alone, writing long letters nobody answers. When the cancer comes back, he faces it the way he should have faced it the first time: honestly.",
   share: "My timeline: Walter White, Inmate. Walt surrendered, alone. Heisenberg meter {meter}/100."},

  /* Deal, then sentencing (ch11b) */
  {id: "hankSaysNo", when: "deal && hank>=70", name: "Hank Says No",
   summary: "Hank has waited too long to settle for a deal. He takes the confession and the man, and gives Walt nothing but his own words read back to him in court.",
   share: "My timeline: Hank Says No. Walt offered everything and Hank took it all, without a deal. Heisenberg meter {meter}/100."},
  {id: "pleaWax", when: "deal && carwash", name: "Plea Bargain With Wax",
   summary: "Walt trades the car wash books for immunity for Skyler. The chain is seized and sold at auction, and the new owners are delighted by how profitable it is.",
   share: "My timeline: Plea Bargain With Wax. Walt traded the car wash books for his family. Heisenberg meter {meter}/100."},
  {id: "lectureTour", when: "deal && lectured && galeAlive", name: "Lecture Tour",
   summary: "Part of the deal is a prison education program. Gale co-teaches it with him from the visitors' side of the glass, and brings the coffee machine.",
   share: "My timeline: Lecture Tour. Walt made a deal and ended up teaching chemistry with Gale. Heisenberg meter {meter}/100."},
  {id: "mrLambert", when: "deal && silent", name: "Mr. Lambert",
   summary: "Walt does his time under Skyler's maiden name in a unit for men who gave up too many names. Nobody there has heard of Heisenberg, and he finds that much harder than prison.",
   share: "My timeline: Mr. Lambert. Walt made a deal and disappeared under a borrowed name. Heisenberg meter {meter}/100."},
  {id: "theDeal", when: "deal", name: "The Deal",
   summary: "The family gets protection, the DEA gets the network, and Walt gets a small room and a long sentence. For once, he negotiated for someone else.",
   share: "My timeline: The Deal. Walt traded everything for his family's safety. Heisenberg meter {meter}/100."},

  {id: "heisenberg", fallback: true, when: "darkness>=85", name: "Heisenberg",
   summary: "Whatever else happened, the name outlived the man.",
   share: "My timeline: Heisenberg. Heisenberg meter {meter}/100."},
  {id: "walter", fallback: true, when: "darkness>=50", name: "Walter",
   summary: "Half teacher, half kingpin, and never fully either.",
   share: "My timeline: Walter. Heisenberg meter {meter}/100."},
  {id: "mrWhite", fallback: true, when: "", name: "Mr. White",
   summary: "In the end he was mostly what Jesse always called him: Mr. White.",
   share: "My timeline: Mr. White. Heisenberg meter {meter}/100."}
];
