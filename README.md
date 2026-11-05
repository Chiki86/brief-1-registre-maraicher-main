# Registre des opérations maraîchères

> Projet individuel du SAS DFS, brief 1 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

La responsable d'une exploitation maraîchère pédagogique qui suit au jour le jour les opérations faites sur ses parcelles : semis, arrosage, désherbage, repiquage et récolte. Son besoin est de garder une trace écrite et fiable de ces gestes, avec leur date, la parcelle et la culture concernées, et leur coût en FCFA, au lieu de tout noter sur des papiers qui se perdent. Pour chaque opération, il saisit un identifiant, une date, une parcelle, une culture, le type d'opération (choisi dans une liste fermée) et un coût. Le programme contrôle la saisie et refuse ce qui est invalide en expliquant chaque erreur, puis enregistre l'opération dans un fichier. Il peut ensuite afficher la liste des opérations, les rechercher par identifiant, parcelle ou culture, les trier par coût ou par date, et obtenir une synthèse des dépenses : total, coût minimum et maximum, nombre d'opérations et total par parcelle. L'outil ne donne aucun conseil de culture et ne dit pas si l'exploitation est rentable, car il ne connaît ni les revenus, ni les quantités récoltées, ni les surfaces. Il ne fait que décrire et additionner les dépenses déjà saisies

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-1-registre-maraicher.git
cd brief-1-registre-maraicher
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/operations.json`
- [x] Ajouter une opération, saisies invalides refusées sans arrêter le programme
- [x] Lister les opérations, message si le registre est vide
- [x] Rechercher par identifiant ou par parcelle ; filtrer par culture
- [x] Trier par coût ou par date
- [x] Synthèse : total, nombre et total par parcelle, coût minimum et maximum
- [x] Bonus : supprimer et modifier une opération (choix 6 et 7)
- [x] Bonus : tri par coût décroissant, parcelle la plus coûteuse

## Données

Les données sont enregistrées dans le fichier `donnees/operations.json`. Il contient 10 opérations réparties sur trois parcelles (P1, P2, P3) et trois cultures (tomate, gombo, aubergine), du 20 au 26 octobre 2026. Chaque opération a six champs : `id`, `date`, `parcelle`, `culture`, `operation` et `coutFCFA` voir (docs/dictionnaire-donnees.md)). Les coûts sont exprimés en FCFA et les dates au format AAAA-MM-JJ. Ces données sont **fictives** : elles servent à tester le programme et ne décrivent pas une vraie exploitation.

## Limites

- Données saisies à la main, sans contrôle de cohérence : le programme vérifie le format (date réelle, coût positif, opération dans la liste), pas la logique. Il accepterait une récolte datée avant le semis, ou une parcelle que l'exploitation n'a pas.
- Pas de conseil agronomique : l'outil décrit des opérations déjà faites, il ne dit pas quand semer, arroser ou récolter.
-Pas de revenus : le registre enregistre des dépenses, pas les ventes. Il ne mesure donc pas la rentabilité : le total des coûts ne dit pas si l'exploitation gagne ou perd de l'argent.

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

CHEICK HAMED TIDIANE, SOUMAHORO, Chiki86. 
Entraide: KAMAGATE JUNIOR,MARC BOTI,FRESHNELLE DANS src/registre.js pour mieux comprendre la fonction verifierOperation
Aussi l'assistant IA pour relire mon code et comprendre des erreurs dans quasiment toutes les parties de mon code et plusieurs fonctions
