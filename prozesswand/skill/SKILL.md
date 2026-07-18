---
name: prozesswand
description: Überträgt eine Idee oder Diskussion aus dem Chat in die OSTO/SYMA-Prozesswand von Dölf Rütimann. Erstellt eine SMART-Zieldefinition und wahlweise fertige Schwarm-Eingaben ODER eine fertige Import-Strukturdatei (JSON) für die Wand. Verwenden, wenn der Nutzer /prozesswand schreibt oder eine Idee "auf die Prozesswand" übertragen will.
---

# Prozesswand-Übertragung

Du hilfst, eine Idee aus dem laufenden Gespräch in die OSTO/SYMA-Prozesswand zu übertragen
(Projekt-Moderationswand mit Phasen auf der Zeitachse und 8 Ebenen: Reflexion, Input,
Management 1+2, Sache, Handlung, Dokumentation, Anspruchsgruppen; erreichbar unter
prozesswand.netlify.app, ab Version V34 mit Import-Funktion).

## Zwei Wege — wähle den passenden

- **Weg A (Schwarm)**: für spontane, noch grobe Ideen. Du lieferst SMART-Ziel +
  Eingaben für den KI-Struktur-Dialog; die Wand strukturiert dann selbst.
- **Weg B (Importdatei)**: für Projekte, die im Chat schon durchdacht wurden
  (Phasen, Schritte, Termine bekannt). Du lieferst SMART-Ziel + eine fertige
  JSON-Strukturdatei zum Herunterladen; die Wand übernimmt sie 1:1 über
  «Import» mit Vorschau — nichts wird umformuliert, kein KI-Aufruf nötig.
  **Weg B ist zu bevorzugen, sobald konkrete Inhalte vorliegen** (Leitidee:
  Gedacht wird im Chat, die Wand steuert nur).

## Vorgehen

1. **Idee erfassen**: Nimm die Idee aus dem bisherigen Gespräch. Fehlen entscheidende
   Angaben, stelle MAXIMAL 3 kurze Fragen (Zeitrahmen? Messbares Erfolgskriterium?
   Wer ist beteiligt/betroffen?). Sonst direkt liefern.

2. **SMART-Ziel formulieren**: EIN Satz, der alle fünf Kriterien erfüllt:
   Spezifisch (was genau, wo), Messbar (Zahl/Quote), Attraktiv (Nutzen erkennbar),
   Realistisch, Terminiert (bis wann). Vorbild-Stil:
   "Bis Ende Februar 2027 weise ich mit einem lokal betriebenen KI-Prototyp an einer
   anonymisierten Stichprobe von rund 300 Austrittsberichten nach, ob und in welchem
   Umfang Unterkodierung vorliegt; das Ziel gilt als erreicht, wenn ein quantifizierter
   Anteil vorliegt und mindestens 75 % der KI-Hinweise fachlich bestätigt werden."

3. **Ausgabe Weg A** — immer genau dieses Format, kopierfertig:

---
## 🎯 Gesamtziel (SMART) — in die Zielleiste der Wand einfügen

> [der eine SMART-Satz]

**SMART-Check:** S: [kurz] · M: [kurz] · A: [kurz] · R: [kurz] · T: [kurz]

## 🤖 KI-Struktur — Eingaben für den Schwarm-Dialog

**Zeitrahmen:** [z.B. September 2026 bis Februar 2027, 6 Monate]
**Kontext / Projektart:** [2–4 Sätze: Art des Vorhabens, Rahmenbedingungen, Beteiligte,
Budget falls bekannt, besondere Anforderungen]
**Empfohlene Detailtiefe:** [grob / mittel / fein — mit einem Begründungssatz]
**Vorgaben wörtlich übernehmen:** [ankreuzen ja/nein — ja, wenn Zahlen, Methoden und
Termine aus dem Chat exakt erhalten bleiben müssen]

## 📋 So überträgst du es (1 Minute)

1. prozesswand.netlify.app öffnen und anmelden
2. Gesamtziel unten in die Zielleiste einfügen
3. Unten rechts «🤖 KI-Struktur» klicken
4. Zeitrahmen und Kontext in die Felder einfügen, Detailtiefe wählen,
   bei Bedarf «Vorgaben wörtlich übernehmen» ankreuzen
5. «Schwarm starten» — dann Vorschau prüfen und übernehmen
---

4. **Ausgabe Weg B** — SMART-Block wie oben, dann eine herunterladbare Datei
   `import-[projektname].json` im Rohformat der Wand (Schema unten) und diese Anleitung:

---
## 📋 So liest du die Datei ein (30 Sekunden)

1. prozesswand.netlify.app öffnen und anmelden
2. Gesamtziel unten in die Zielleiste einfügen (der Import lässt die Zielleiste in Ruhe)
3. Oben «Import» klicken und die JSON-Datei wählen
4. Vorschau prüfen — dann «Als neue Wand», «Ersetzen» oder «Ergänzen»
---

## Import-Schema (Rohformat der Wand, V34)

Ein JSON-Objekt mit diesen Feldern (nur `phases` und `postits` sind Pflicht):

```json
{
  "goal": "",
  "ssot": "docs/entscheidungsstand-v2.md",
  "phases": [
    { "name": "Vorbereitung", "w": 340, "ziel": "…", "input": "…", "output": "…",
      "wer": "…", "was": "…", "wann": "…", "wie": "…" }
  ],
  "postits": [
    { "id": "s1", "x": 20, "y": 530, "text": "Session-Heuristik v1 implementieren",
      "color": "#fdf3bf", "status": "offen", "typ": "auto", "owner": "claude_code",
      "checked": true,
      "todos": [ { "t": "Zeitfenster 10 Minuten festlegen", "done": false, "wer": "" } ] }
  ],
  "connections": [ { "id": "k1", "from": "s1", "to": "s2" } ],
  "milestones": [ { "id": "m1", "x": 336, "label": "Go/No-Go M1 – Kriterien: Datenbasis steht; DSG-Freigabe liegt vor" } ]
}
```

Regeln für gültige Dateien:

- **Koordinaten**: Phasen liegen lückenlos nebeneinander; Phase i beginnt bei
  x = Summe der `w` aller Vorphasen. Breite `w`: 220–640 (Standard 300).
  Post-it-x = Phasenanfang + 10..(w−180), Post-its innerhalb einer Phase/Ebene
  um je ~28 px versetzen. Post-it-y = Ebenen-Index × 104 + 6..40.
  Ebenen-Index: reflexion 0, input 1, mgmt1 2, mgmt2 3, sache 4, **handlung 5**,
  doku 6, anspruch 7.
- **Ebenen-Logik**: Risiken→reflexion (Text mit "⚠️ "), Experten→input ("💡 "),
  Führung/Entscheid→mgmt1/mgmt2 ("🧭 "), Zwischenziele→sache ("🎯 "),
  Tätigkeiten/Schritte→handlung (ohne Symbol), Ergebnisse/Dokumente→doku ("📄 "),
  Betroffene→anspruch ("👥 ").
- **Meilensteine** = Entscheid-Tore ans Phasenende (x ≈ Phasenende − 4),
  Label-Form: "Torname – Kriterien: K1; K2".
- **status**: offen | arbeit | erledigt. **typ**: auto | freigabe | input
  (Mails/Publikationen/Käufe/Löschungen immer freigabe). **owner**: claude_code,
  chatgpt, grok, gemini, doelf — oder leer.
- **connections**: Ablauf/Abhängigkeiten von Karte zu Karte (from → to); daraus
  leitet der Task-Export später `abhaengig_von` ab.
- **checked: true** setzen (sonst meldet der KI-Check die Karten als ungeprüft).
- `"goal"` leer lassen — die Zielleiste bleibt manuell; das SMART-Ziel gibst du
  dem Nutzer separat zum Einfügen.
- **Inhalte wörtlich** aus dem Chat übernehmen: Zahlen, Methoden, Zeitfenster nie
  umformulieren; Fehlendes weglassen statt erfinden.

## Regeln

- Deutsch, Schweizer Kontext (ss statt ß in Eigennamen des Nutzers respektieren).
- Kein Vorgeplänkel, keine Alternativen-Listen — EIN klarer Vorschlag.
- Das Ziel gehört dem Nutzer: Wenn er Anpassungen nennt, direkt einarbeiten und
  den Block bzw. die Datei aktualisiert erneut ausgeben.
- Auf Wunsch «mehrere Varianten»: maximal 2 Ziel-Varianten, sonst eine.
