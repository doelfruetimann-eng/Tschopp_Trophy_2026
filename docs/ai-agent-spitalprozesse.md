# Die intelligente Schicht über den Spitalprozessen

**Konzeptpapier · Stand 2026-05-21**

Wem gehört künftig die intelligente Schicht über den Unternehmensprozessen –
am Beispiel eines Spitals?

---

## 1. Ausgangslage

**Heute:**

```
Mensch → SAP-Maske → Prozess
```

Der Mensch übersetzt seine Absicht selbst in Klicks und Feldeingaben. Die
Maske ist gleichzeitig Bedien-, Validierungs- und Kontrollschicht. Das Wissen,
*wie* ein Prozess korrekt ausgelöst wird, liegt beim geschulten Anwender.

**Morgen:**

```
Mensch → natürlicher Sprachbefehl → AI-Agent → SAP API
```

Die Absicht wird in natürlicher Sprache geäussert. Ein Agent übersetzt sie in
API-Aufrufe. Die Maske verschwindet als *primäre* Bedienoberfläche – die
Intelligenz, *wie* ein Prozess korrekt abläuft, wandert in die Agentenschicht.

Die strategische Kernfrage lautet darum: **Wem gehört diese Agentenschicht?**
Wer sie kontrolliert, kontrolliert den Zugang zum Anwender, die Prozesshoheit
und das Compliance-Risiko.

---

## 2. Die drei Anwärter

| Anwärter | Stärke | Schwäche |
|---|---|---|
| **ERP-Hersteller** (SAP mit Joule / Business AI) | Datenmodell, APIs, Buchungslogik, Berechtigungen und Audit-Trail nativ | Kennt nur die eigene Welt, nicht den durchgängigen Spitalprozess |
| **Hyperscaler / Foundation-Model-Anbieter** (Microsoft Copilot, OpenAI, Anthropic) | Bester Sprach-Layer, Arbeitsplatz-Kontext (Mail, Teams, Dokumente) | Keine Prozess-Semantik, Blackbox, Datenhoheit ausser Haus |
| **Spital-eigener Orchestrator** | Einziger Ort, an dem der *durchgängige* Prozess zusammenläuft; volle Governance-Hoheit | Muss selbst gebaut/betrieben werden; Integrationsaufwand |

Die Schicht wird sich **aufspalten**: Sprachverständnis kommt vom Modell-
Anbieter, transaktionale Bausteine vom ERP-Hersteller – aber die *Orchestrierung*
des Gesamtprozesses gehört ins Spital.

---

## 3. Empfohlene Zielarchitektur

```
Mensch → natürlicher Sprachbefehl
       → AI-Agent (spital-eigener Orchestrator, mit Rollen-/Rechtekontext)
       → spezialisierte Sub-Agenten / MCP-Connectoren
       → SAP API | KIS API (z. B. Epic/Cerner) | Labor API | Dienstplan
       → deterministische Guardrails (Vier-Augen, Limits, Audit-Log)
       → Prozess
```

Kernprinzipien:

- **Orchestrator im Spital.** Nur hier laufen SAP, Klinik-Informationssystem,
  Labor und Dienstplan zu einem durchgängigen Prozess zusammen
  ("Patient aufnehmen → OP planen → Material reservieren → abrechnen").
- **Modell als austauschbarer Baustein.** Das Sprachmodell ist eine
  Komponente, kein Eigentümer der Schicht – es muss wechselbar bleiben.
- **Deterministische Guardrails.** Kritische Schritte (Limits, Vier-Augen-
  Prinzip, revisionssichere Buchung) laufen über regelbasierte Kontrollen,
  nicht über das Sprachmodell.
- **Die Maske bleibt – in neuer Rolle.** Sie wird zur **Bestätigungs- und
  Ausnahme-Oberfläche**: Der Agent schlägt vor, der Mensch quittiert
  kritische Schritte.

---

## 4. Governance & Guardrails

- **Rollen- und Rechtekontext** des Anwenders wird an den Agenten durchgereicht;
  der Agent darf nie mehr dürfen als der Mensch.
- **Audit-Log** über jeden Agentenschritt – Eingabe, Interpretation, API-Aufruf,
  Ergebnis – revisionssicher.
- **Vier-Augen-Prinzip** für kritische Transaktionen bleibt erzwungen.
- **Mensch im Entscheidungspfad** ("human in the loop") für nicht-reversible
  oder haftungsrelevante Schritte.
- **Datenhoheit:** Patientendaten (MDR, Datenschutz) verlassen die kontrollierte
  Umgebung nicht; die "letzte Meile" Entscheidung wird nicht an eine Blackbox
  delegiert.

---

## 5. Risiken & Trade-offs

- **Eigentum = Kunde, aber auch Haftung.** Wer die Schicht besitzt, besitzt den
  Anwenderzugang – trägt aber auch das Compliance- und Haftungsrisiko.
- **Lock-in.** Wird die Schicht dem ERP-Hersteller oder einem Hyperscaler
  überlassen, entsteht ein schwer auflösbarer Abhängigkeitseffekt.
- **Eigenbau-Kosten.** Ein eigener Orchestrator bindet Ressourcen für Bau und
  Betrieb – der Preis für Governance-Hoheit.
- **Akzeptanz.** Anwender müssen dem Agenten vertrauen; Transparenz und die
  Bestätigungs-Oberfläche sind dafür Voraussetzung.

---

## 6. Fazit

Die intelligente Schicht "gehört" am Ende dem, der **Orchestrator + Guardrails
+ Audit** kontrolliert. Aus Governance- und Haftungsgründen sollte das im
Spital-Kontext das **Spital selbst** sein – nicht SAP und nicht der
Modell-Anbieter. Sprachmodell und ERP-Bausteine sind zugelieferte, austauschbare
Komponenten dieser Schicht.

---

## 7. Nächste Schritte

1. Stakeholder-Abgleich: IT, Medizin-Controlling, Datenschutz/Compliance.
2. Prozess-Inventar: 2–3 durchgängige Spitalprozesse als Pilotkandidaten.
3. Prototyp-Spike: Sprachbefehl → Agent → Mock-SAP-API mit Guardrails.
4. Make-or-Buy-Entscheid für den Orchestrator.
