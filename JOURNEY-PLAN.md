# Breaking Bad journey: blueprint (Opus design, 2026-09-19)

## STATUS (update at the end of every session)
- Written (Opus), all content done: journey.js, ch01 to ch10, the aftertaste pair ch11a/ch11b (both `n: 11`, gated by chapter-level `when`), endings.js. Every chapter carries `canon` (ch1 a, ch2 a, ch3 a, ch4 a, ch5 c, ch6 a, ch7 a, ch8 a, ch9 b, ch10 b, ch11a a, ch11b a).
- 2026-09-19 path simulation (node, engine rules: chapter `when`, variants, beat `when` after effects, clamp 0..100, first-match endings): 53,467 paths, all 19 finale endings and all 3 exits reachable, 0 fallback hits, all-canon path lands on "Felina". Findable total 22 (19 + 3 exits); the 3 `fallback: true` endings are safety nets only.
- Art vocabulary used by the journey, not yet drawn: sets "house" (exterior; with fx siren = raid), "basement", "superlab", "compound" (Jack's clubhouse), "courtroom"; walt "keys", "floor"; jesse "run", "chained", "drive"; krazy8 "chained", "stand"; badger "stand"; mike "stand"; gale "stand"; declan "stand"; jack "stand"; todd "stand"; judge "sit"; skyler "sit"; fx "lily" (potted lily of the valley), "flash" (white flash in a window, no gun shown), "sunrise", "blue" (blue crystals on a newspaper front page).
- Engine (Sonnet pass): journey mode is being built in index.html; it already supports several chapters sharing one `n` with a chapter-level `when`, and `canon` on chapters. Load order: journey.js, ch01..ch10, ch11a, ch11b, endings.js. The feedback form is live (SITE.ideaFormUrl = https://tally.so/r/rjXG1p, Artifact Version 3).
- The v2 page (moments mode, new cast, fan links, PayPal button + QR, ideas-form placeholder) is live as Artifact Version 2 (2026-09-19). The journey engine must be added to this index.html without breaking moments mode.
- Second journey written: The Matrix trilogy, see MATRIX-PLAN.md.
- Later: rename the project to plotforks (umbrella site), GitHub Pages under a GitHub organization, domain plotforks.com (Dimos buys).

Decision: Dimos chose a "journey with scores" over a pure tree. One playthrough runs the whole series in 10 chapters plus one aftertaste chapter. Each choice shifts hidden scores and sets flags. Branches reconverge at every chapter, so the writing grows in a straight line, and the finale ending is computed from the scores and flags. The standalone moments (stories/phoenix.js, stories/cashpile.js) stay as "Short stories" mode. The journey is its own content and reuses their art.

## Scores (start value, clamp 0 to 100)
- darkness 10: how far Walt has turned into Heisenberg (shown as the Heisenberg meter)
- jesse 50: Jesse's trust in Walt
- hank 0: Hank's suspicion
- family 70: how much of his family is still with him

## Continuity rule
Every non-exit choice must keep the next chapter's premise true. Flags change the text of later setups and beats (`when` variants), never the premise. Only three choices in the whole journey are exits (instant early endings); they exist as jokes that invite a replay.

## Chapters (choices: effects, flags)
1. S1E1 Pilot, "The ride-along". Walt spots his ex-student Jesse fleeing a DEA raid.
   a. Blackmail Jesse into a partnership (canon): darkness +10, jesse -10
   b. Tell Hank what he saw: EXIT "shortest"
   c. Tell Skyler about the cancer first, then call Jesse: darkness +5, family +15, jesse +5, flag skylerKnows
2. S1E3, "Krazy-8 in the basement".
   a. Kill him (canon): darkness +20, flag firstKill
   b. Let him go: darkness -5, hank +15, jesse -5, flag krazyAlive
   c. Leave him tied up outside the DEA office: darkness +5, hank +25
3. S1E5 Gray Matter, "Elliott's offer".
   a. Refuse it (canon): darkness +10, family -10
   b. Take the job: EXIT "cornerOffice"
   c. Take their money for treatment, keep cooking: darkness +5, family +5, hank +5, flag grayMoney
4. S2E8 Better Call Saul, "Badger is arrested".
   a. Hire Saul (canon): hank -10, darkness +5, flag saul
   b. Hire a real lawyer: hank +10, family +5, darkness -5
   c. Handle it themselves: darkness +10, hank +15, jesse +10
5. S2E12 Phoenix, "Jane's bedside" (journey version; Jesse stays in town in every branch).
   a. Roll her onto her side: darkness -10, jesse +5, flags janeAlive noCrash
   b. Call 911: darkness -5, hank +20, jesse -10, flags janeAlive noCrash
   c. Watch (canon): darkness +25, family -10
6. S3E13 Full Measure, "Gale".
   a. Send Jesse to kill Gale (canon): darkness +20, jesse -20
   b. Warn Gale and let him vanish (Gus still needs Walt and Jesse): jesse +10, flag galeAlive
   c. Do it himself, sparing Jesse: darkness +30, jesse +10
7. S4E12 End Times, "Getting Jesse back". Gus is gone after this chapter in every branch.
   a. Poison Brock to turn Jesse against Gus (canon): darkness +25, jesse +10. Handle plainly; no jokes about the child.
   b. Tell Jesse the truth and plan against Gus together: darkness +15, jesse +20
   c. Tip off the DEA about Gus: darkness +5, hank +20, flag gusArrested
8. S5E6 Buyout, "Five million each".
   a. Refuse: he's in the empire business (canon): darkness +20, jesse -15
   b. Take the buyout: EXIT "fiveMillion"
   c. License the formula to Declan's crew: darkness +10, hank +10, jesse +5, flag licensed
9. S5E8 Gliding Over All, "The cash pile". Hank finds the book in every branch.
   a. Open a chain of car washes: darkness +5, hank +15, family +10, flag carwash
   b. Tell Skyler he's out (canon): darkness -5, family +10
   c. Keep cooking, rent a bigger unit: darkness +15, family -20
10. S5E13 To'hajiilee, "Cornered in the desert". Jack's crew is on the way.
   a. Call Jack off and surrender to Hank: darkness -20, flag surrendered
   b. Let Jack's crew come (canon): darkness +20, flag shootout
   c. Offer Hank a deal (the money, the network, everything): darkness +10, flag deal
11a. Aftertaste, `when: "shootout"`. S5E16 Felina, "Jack's compound". Jack offers Walt a deal before the gun fires (in the show he only starts to, after it, and never finishes).
   a. Press the button on the keys (canon; frees Jesse): darkness -5, jesse +20, flag gunTrunk
   b. Take Jack's deal: darkness +10, jesse -20, flag jackDeal
   c. Slide the keys to Jesse: darkness -10, jesse +25, flag jesseKeys
11b. Aftertaste, `when: "!shootout"`. Sentencing day (surrender and deal runs; Hank alive). The judge asks if Walt has anything to say.
   a. The truth: he did it for himself (canon "a": echoes his confession to Skyler in Felina): darkness -10, family +10, flag confessed
   b. A forty-minute chemistry lecture: darkness +5, flag lectured
   c. Nothing at all: darkness +10, family -10, flag silent

## Endings (evaluate in order, first match wins; 19 finale endings + 3 exits = 22 findable)
The live rules are in stories/bb-journey/endings.js; this is the summary.
Exits: shortest "The Shortest Series Ever"; cornerOffice "Corner Office"; fiveMillion "The Five Million Dollar Man".
- Shootout, then Felina: gunTrunk && jesse>=80 "Side by Side"; gunTrunk && janeAlive "Jane Drives the Getaway Car"; gunTrunk "Felina" (aired); jackDeal && jesse>=40 "Package Deal"; jackDeal && carwash "Clean Getaway"; jackDeal "King of Nothing"; jesseKeys && jesse>=70 "The Ambulance"; jesseKeys "Jesse's Call".
- Surrender, then sentencing: surrendered && confessed && jesse>=70 "Character Witness"; surrendered && confessed && family>=60 "Visiting Hours"; surrendered && confessed && darkness<=30 "Almost a Good Man"; surrendered && lectured "Cell Block Chemistry"; surrendered && silent "The Copycat"; surrendered "Walter White, Inmate".
- Deal, then sentencing: deal && hank>=70 "Hank Says No"; deal && carwash "Plea Bargain With Wax"; deal && lectured && galeAlive "Lecture Tour"; deal && silent "Mr. Lambert"; deal "The Deal".
- Fallbacks (not in the gallery): "Heisenberg", "Walter", "Mr. White".
Retired in the aftertaste rewrite: "Ozymandias" (replaced by "Felina"), "Buried", "Cooperating Witness".
Each ending: name, 2 to 3 sentence summary, share line, meter = final darkness.

## Engagement layer (engine, Sonnet)
- Resume an unfinished journey (localStorage).
- Endings gallery: "You've found 7 of 23 endings", unseen ones as "?".
- Badges: Saved Jane, Pure Heisenberg (darkness >= 95), Car Wash Tycoon, Early Exit, Every Choice Canon, Never Canon.
- End screen: the four scores as bars, the path taken per chapter, and "Play again".
- Journey map: the 10 chapters along S1 to S5 with the option picked in each, drawn as the player goes.

## Data format (for the engine pass)
```
(window.JOURNEYS = window.JOURNEYS || {})["breaking-bad"] = {start:{...}, scoreLabels:{...}, chapters:[], endings:[], exits:{}};
chapter = {id, code, episode, title, setup:{kicker, text, caption, scene, variants:[{when, text, scene?}]}, question,
           choices:[{id, label, tag, effects:{darkness:10, ...}, flags:[...], beats:[{scene, caption, text, when?}], exit?}]}
ending  = {id, when, name, summary, share}
when    = "darkness>=60 && janeAlive && !galeAlive"   (score comparisons, flags, !flags, joined by &&)
```
One file per chapter: stories/bb-journey/ch01.js ... ch10.js, plus endings.js. Chapters can be written in separate sessions.

## New art this needs (code pass)
Sets: meth-house raid (pilot), basement, a lawyer's office (reuse office), superlab, desert standoff (reuse desert). Cast: gus, mike, gale, krazy8, badger, jack, declan. No drawing of Brock's poisoning; the plant alone carries it.
