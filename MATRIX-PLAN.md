# The Matrix journey: blueprint (Opus design, 2026-09-19)

## EXPANSION 2026-09-20 (Opus pass done, Sonnet pass pending)
Six new chapters, so the trilogy is now **15 chapters**. Old files keep their names, only `n` moved:

| n | file | chapter |
|---|---|---|
| 1 | **n01-ledge.js** | the phone and the scaffolding at Metacortex (new) |
| 2 | **n02-interrogation.js** | Smith's room, the deal and the bug (new) |
| 3 | ch01.js | red pill or blue (was n1) |
| 4 | **n04-jump.js** | the jump program (new) |
| 5 | ch02.js | Cypher's drink (was n2) |
| 6 | ch03.js | the Oracle (was n3) |
| 7 | ch04.js | the Agents have Morpheus (was n4) |
| 8 | ch05.js | Smith in the subway (was n5) |
| 9 | **n09-merovingian.js** | the Frenchman's dessert, Reloaded (new) |
| 10 | ch06.js | the Architect (was n6) |
| 11 | **n11-mobilave.js** | the station between, Revolutions (new) |
| 12 | ch07.js | Machine City or Zion (was n7) |
| 13 | **n13-deusdeal.js** | `when: "machineCity"`, what Neo asks the machines (new) |
| 14 | ch08.js | the last fight with Smith (was n8) |
| 15 | ch09.js | the park at sunrise (was n9) |

New flags: ledgeJump, hidAtWork, informant, silentRoom, noJump, cheatJump, persephone, merovFight, merovDeal,
karma, trainFight, peaceOnly, freeAll, askedTrinity.
9 new endings (29 findable): She Comes Back, Nightclub Rematch, The Open Door, We Will See, The Connection,
The Other File, The Napkin, Lower the Gravity, The Man Who Checked.
New art for the Sonnet pass: set `rooftops`; cast `merovingian` (stand), `persephone` (stand), `trainman` (stand);
fx `bug`. Optional and nicer if cheap: a `ledge` set for chapter 1. Everything else reuses existing sets and poses.
All-canon path is unchanged and still lands on "The Sunrise": canon letters are now b,a,a,a,a,a,a,a,a,a,a,a,a,a,a.

## STATUS (update at the end of every session)
- Written (Opus), all content done: stories/matrix-journey/journey.js, ch01 to ch08, the aftertaste ch09, endings.js. Every chapter carries `canon` (all "a").
- 2026-09-19 path simulation (node, engine rules: chapter `when`, variants, beat `when` after effects, clamp 0..100, first-match endings): 8,751 paths, all 18 finale endings and both exits reachable, 0 fallback hits, all-canon path lands on "The Sunrise" (belief 95). Findable total 20 (18 + 2 exits); the 3 `fallback: true` endings are safety nets only.
- Engine (Sonnet pass) still to do: register the journey (load order journey.js, ch01..ch09, endings.js), use `meterScore: "belief"` and `meterLabel: "Belief"` instead of the hardcoded darkness meter, and make the badges journey-specific (the current ones are Breaking Bad only). Draw the art listed under "New art" below.
- Section title: "There Is No Spoiler". Legal: unofficial parody, original caricatures only, not affiliated with Warner Bros.; no frames, no likenesses of the actors, no logo or the green-code title treatment.

Decision: same shape as the Breaking Bad journey. One playthrough runs the trilogy in 8 chapters plus the aftertaste. Choices shift four hidden scores and set flags; branches reconverge at every chapter; the ending is computed from scores and flags.

## Scores (start value, clamp 0 to 100)
- belief 20: does Neo believe he is the One (shown as the meter, "Belief")
- trinity 30: his bond with Trinity
- agents 10: how closely the Agents are tracking him
- zion 50: Zion's odds of survival

## Continuity rule
Every non-exit choice keeps the next chapter's premise true. Flags change setups and beats (`when` variants), never the premise. Fixed points: Cypher betrays the crew (ch02 to ch04), Neo ends up alone with Smith in a subway (ch05), Neo dies in room 303 and rises (ch05), Neo meets the Architect (ch06), Neo falls into a coma and the machines march on Zion (ch06 to ch07), the machines plug Neo in against Smith (ch07 to ch08), Smith is gone and the Sentinels leave (ch08), the park at sunrise (ch09). Two exits, both jokes.

## Chapters (choices: effects, flags)
1. M1, "Red pill or blue". Morpheus, two pills.
   a. Red pill (canon): belief +10, agents +10
   b. Blue pill: EXIT employeeOfMonth
   c. Swallow both: belief +5, agents +20, flag bothPills
2. M1, "Cypher's drink". Cypher asks if Neo would go back. (Canon order: this scene comes before the Oracle; the approved list had them swapped.)
   a. Drink, dodge the question (canon): belief +5
   b. Say yes, he'd go back: EXIT mediumRare
   c. Tell Morpheus: trinity +10, zion +10, flag warned (Apoc and Switch survive the betrayal)
3. M1, "The Oracle's kitchen". She says, in effect, he is not the One.
   a. Believe her (canon): belief -15
   b. Don't believe her: belief +20, agents +5
   c. Ask about the vase instead: belief +5, flag vase
4. M1, "The Agents have Morpheus". Tank's hand is on the plug.
   a. Go in and get him (canon): belief +15, trinity +15, agents +15, flag rescued
   b. Let Tank pull the plug: belief -10, trinity -10, zion +15, flag morpheusDead
   c. Trade himself for Morpheus: belief +10, agents +25, zion +5, flag traded
5. M1, "Smith in the subway". Every branch ends in room 303 and the rising.
   a. Fight (canon): belief +25, agents +15, trinity +5
   b. Run: belief +5, trinity +15
   c. Ask Smith what his problem is: belief +10, agents +10, flag smithTalk
6. M2 Reloaded, "The Architect's two doors". Every branch ends with the Sentinels stopped and Neo in a coma.
   a. Left door, Trinity (canon): trinity +20, zion -15, belief +10
   b. Right door, Zion (refuses to pick the 23; Trinity dies): trinity -40, zion +20, belief +5, flag trinityLost
   c. Ask to speak to a manager (then takes the left door): trinity +10, belief +5, agents -10, flag manager
7. M3 Revolutions, "Machine City or Zion".
   a. To the Machine City with Trinity (canon; she dies in the crash): zion +25, belief +10, flags machineCity, crash
   b. Stay and defend Zion (the machines come to him): zion +10, agents +15, trinity +10, flag defendZion
   c. Go alone, keep Trinity safe: zion +20, trinity -10, flags machineCity, trinitySafe
   The manager flag pays off at the Deus Ex Machina ("Finally. The manager.").
8. M3, "The last fight with Smith".
   a. Let Smith copy him (canon; Neo dies): belief +15, flag sacrifice
   b. Keep fighting (Neo lives, blind): belief +20, zion +5, flag brawl
   c. Ask Smith what he actually wants (Neo lives, blind): belief +5, flag smithTalked
9. Aftertaste, "The park at sunrise". The Architect asks how long the peace will last.
   a. As long as it can (canon): flag peaceHold
   b. Until the sequel (points at Resurrections: the Analyst, Simulatte, a studio demanding a sequel): belief +5, flag sequel
   c. Wake everyone up: belief +5, zion -10, flag wakeAll

## Endings (evaluate in order, first match wins; 18 finale endings + 2 exits = 20 findable)
The live rules are in stories/matrix-journey/endings.js; this is the summary.
Exits: employeeOfMonth "Thomas Anderson, Employee of the Month"; mediumRare "Medium Rare".
- Sequel: sequel && smithTalked "Smith Owes Him One"; sequel && trinity>=60 && !trinityLost "Thomas and Tiffany"; sequel && belief>=85 "Mandatory Sequel"; sequel "Version Seven".
- Wake everyone: wakeAll && zion>=80 "Breakfast for Billions"; wakeAll && agents>=60 "Nobody Left to Chase"; wakeAll "Everybody Out".
- Peace: peaceHold && manager "Speak to the Manager"; && vase && sacrifice "The Vase"; && sacrifice && belief<60 "Not the One"; && sacrifice && crash && belief>=80 "The Sunrise" (closest to the films); && sacrifice && trinitySafe && !trinityLost "The One Who Stayed"; && brawl "Blind Champion"; && smithTalked "Smith, Retired"; && trinityLost "The Right Door"; && morpheusDead "For Morpheus"; && defendZion "Hold the Dock"; otherwise "The Truce".
- Fallbacks (not in the gallery): "The One" (belief>=80), "Neo" (belief>=40), "Mr. Anderson".
Each ending: name, 2 to 3 sentence summary, share line, meter = final belief.

## Badge ideas (engine, Sonnet)
Took Both Pills (bothPills), Saved Morpheus (rescued), Trinity Lives (trinitySafe or defendZion, and !trinityLost), Asked for the Manager (manager), Every Choice Canon, Never Canon, Early Exit, True Believer (belief >= 95).

## New art (code pass)
All Matrix art is new. Original caricatures only: no actor likenesses, no film frames.
- sets: redroom, pod, cubicle, ship, restaurant, kitchen, street, lobby, subway, hotel, architect, dock, machinecity, crater, park, cafe
- neo: sit, stand, pod, coat, fight, down, fly, blind, rain, bench · morpheus: sit, stand, chair · trinity: stand, coat, fall, cafe · cypher: drink, stand · smith: stand, fight, oracle, many · oracle: cookie, stand, sit · tank: stand · architect: sit, stand · deus: face · niobe: stand · sati: stand · analyst: stand
- fx: pills, mirror, cat, alarm, code, steak, vase, cookies, plug, shells, phone, train, bullets, screens, sentinels, gold, crash, emp, rain, light, sunrise (shared with Breaking Bad ch11a), gruel
Each chapter file's header comment describes what the new pieces look like.
