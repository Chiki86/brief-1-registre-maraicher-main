// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Pas de modèle pour ce fichier : à vous de combiner ce que vous avez appris.
import { versNombre } from './outils.js';
import { trouverParId, verifierOperation } from './registre.js';
import { syntheseParParcelle } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['date', 'parcelle', 'culture', 'operation', 'coutFCFA'];

// Supprime du registre l'opération qui a cet identifiant.
// Renvoie l'opération supprimée, ou undefined si elle n'existe pas (le registre ne change pas).
export function supprimerOperation(operations, id) {
 const index = operations.findIndex((operation) => operation.id === id);
  if (index === -1) {
    return undefined;
  }
  return operations.splice(index, 1)[0];
}

// Modifie UN champ d'une opération. La nouvelle valeur arrive sous forme de TEXTE et suit
// les mêmes règles qu'à l'ajout. Renvoie les erreurs : [] si la modification est faite ;
// sinon les messages, et l'opération ne change pas.
// Erreurs : identifiant introuvable · champ 'id' (non modifiable) · champ absent de CHAMPS_MODIFIABLES
//           · valeur refusée par les règles de l'ajout.
export function modifierOperation(operations, id, champ, valeur) {
const operation = trouverParId(operations, id);
  if (operation === undefined) {
    return [`Identifiant introuvable : ${id}.`];
  }
  if(champ === 'id'){
    return [`Le champ 'id' est non modifiable`];
  }
  if (!CHAMPS_MODIFIABLES.includes(champ)) {
    return [`Champ absent de CHAMPS_MODIFIABLES`];
  }
   const texte = String(valeur).trim();
  const nouvelleSaisie = {
    ...operation,
    coutFCFA: String(operation.coutFCFA),
    [champ]: texte,
  };
  const autresOperations = operations.filter(op => op.id !== id);

  const erreurs = verifierOperation(nouvelleSaisie, autresOperations);

  if (erreurs.length > 0) {
    return erreurs;
}
operation[champ] = champ === 'coutFCFA' ? versNombre(texte) : texte;
  return [];
}

// Renvoie une COPIE triée par coût décroissant : la plus chère d'abord.
export function trierParCoutDecroissant(operations) {
 return [...operations].sort((a,b)=> b.coutFCFA - a.coutFCFA)
}

// Renvoie la parcelle dont le total des coûts est le plus élevé : { parcelle, total },
// ou null si le registre est vide. En cas d'égalité : la première parcelle rencontrée.
export function parcelleLaPlusCouteuse(operations) {
  if(operations.length === 0){
    return null
  }
  let coutEleve = {}
  for(const opers of operations){
    if(coutEleve[opers.parcelle]=== undefined){
      coutEleve[opers.parcelle] = 0
    }
    coutEleve[opers.parcelle] += opers.coutFCFA
  }
  let parcelleMax = null
  let tMax = -1
  for(const parcelle in coutEleve){
    if(coutEleve[parcelle]>tMax){
      tMax = coutEleve[parcelle]
      parcelleMax = parcelle
    }
  }
  return{
    parcelle : parcelleMax,
    total : tMax
  }
}
