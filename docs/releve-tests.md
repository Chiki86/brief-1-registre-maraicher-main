# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. ✏️

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Ajout valide|Opération CH05 ajoutée | OK | Moi |
| Ajout KOF (coût -2000) | Opération refusée : coût positif requis | OK | Marc Boti |
| Recherche culture sorhgo | Aucune opération trouvée | OK | Marc Boti |
| Tri par coût décroissant | O06 (8000) en premier | OK | Marc Boti |
| Synthèse | 13 opérations, total 50195, min 1500, max 8000, P1 la plus coûteuse | OK | Marc Boti |
| Supprimer O02 | Opération supprimée, registre = 12 | OK | Marc Boti |
| ajouter une operation |  que l'opperation soit ajouté| operation ajouté le registre compte 14 operation| SENE RODRIGUE|

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : Marc BOTI,SENE RODRIGUE
