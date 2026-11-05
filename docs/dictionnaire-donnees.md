# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | O01 |
| `date`| Date de l'opération | texte | date qui existe, au format AAAA-MM-JJ |  —  | 2026-11-04 |
|`parcelle`| Parcelle où l'opération a lieu | texte | non vide (n'importe quel texte) | — | P1 |
| `culture`| Culture concernée | texte | non vide (n'importe quel texte) | — | tomate |
| `operation`| Type d'opération culturale | texte | doit appartenir à la liste fermée ci-dessous | — | arrosage |
| `coutFCFA`| Coût de l'opération | nombre | nombre positif ou nul | FCFA | 2000 |

**Listes de valeurs autorisées** : OPERATIONS = ['semis', 'arrosage', 'désherbage', 'repiquage', 'récolte']

**Sources** : `SUJET.md` et `donnees/operations.json`
