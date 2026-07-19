# OSTO/SYMA Prozesswand

> **⚠️ UMGEZOGEN:** Die Prozesswand wird seit Juli 2026 im eigenen Repository
> `doelfruetimann-eng/doelfruetimann-eng-prozesswand` weiterentwickelt (Branch main).
> Dieser Ordner hier ist nur noch ein Archiv-Stand (V35) und wird nicht mehr gepflegt.

Digitale Projekt-Moderationswand nach OSTO/SYMA-Systematik (Systems Engineering)
mit Benutzerkonten, Cloud-Speicherung und KI-Agenten-Schwarm.

**Eine einzige Datei** (`index.html`) — kein Build, kein Server nötig.
Doppelklick öffnet sie im Browser.

## Funktionen

- Zeitachse (Phasen, horizontal) × 8 OSTO/SYMA-Ebenen (vertikal)
- Post-its (Doppelklick), Netzplan-Verbindungen, Meilensteine, System-Ei je Phase
- Benutzerkonten + Cloud-Speicherung pro Person (Supabase, Projekt `prozesswand`
  in der Organisation FridgeMate, Pro-Plan)
- KI-Moderator (W-Fragen, SMART-Check) — Anthropic-API, Schlüssel wird lokal
  im Browser gespeichert (Knopf „API-Schlüssel")
- **Agenten-Schwarm** „🤖 KI-Struktur": Architekt → Planer (je Phase) →
  Kritiker (Pre-Mortem, Anspruchsgruppen) → Verbinder (Netzplan).
  Arbeitet nach dem eingebauten Methodik-Regelwerk (Konstante `METHODIK`,
  Basis: Systems Engineering / Wiegand «Handbuch Planungserfolg»).
  Ergebnis erscheint als Vorschau: Ersetzen / Ergänzen / Verwerfen, mit Rückgängig.
- Modell je Rolle konfigurierbar (Konstante `MODELS`)

## Hinweise

- Der Supabase-„publishable key" in der Datei ist öffentlich vorgesehen;
  Datenzugriff ist durch Row-Level-Security-Policies geschützt.
- Wände liegen in Tabelle `walls` (user_id, data jsonb, updated_at).

## Roadmap (mit Nutzer abgestimmt)

1. ✅ Agenten-Schwarm (v1)
2. Dashboard + Projektjournal + Gate-Steuerung
3. Exporte: Projektbericht (Word), Architektur-Landkarte (SVG/PNG), KI-Paket (JSON + Prompts)
4. Supabase Realtime + externe LLM-Anbieter
