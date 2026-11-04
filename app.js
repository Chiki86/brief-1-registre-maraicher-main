// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/operations.json';
function afficherAccueil() {
  console.log('='.repeat(50));
  console.log('   REGISTRE DES OPÉRATIONS MARAÎCHÈRES');
  console.log('   Exploitation maraîchère pédagogique');
  console.log('='.repeat(50));
}
function afficherMenu() {
  console.log('\n--------------------- MENU ---------------------');
  console.log('1. Ajouter une opération');
  console.log('2. Lister les opérations');
  console.log('3. Rechercher (identifiant, parcelle, culture)');
  console.log('4. Trier (coût, date)');
  console.log('5. Synthèse des dépenses');
  console.log('0. Quitter');
}
async function chargerRegistre() {
  try {
    const operations = await chargerJson(FICHIER_DONNEES);
    console.log(`${operations.length} opération(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
    return operations;
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le registre démarre vide.`);
    return [];
  }
}
async function ajouter(operations) {
  console.log('\n--- Ajouter une opération ---');
  const id = await demander('Identifiant (ex. O11) : ');
  if (id === null) return;
  const date = await demander('Date (AAAA-MM-JJ) : ');
  if (date === null) return;
  const parcelle = await demander('Parcelle (ex. P1) : ');
  if (parcelle === null) return;
  const culture = await demander('Culture (ex. tomate) : ');
  if (culture === null) return;
  const operation = await demander(`Opération (${OPERATIONS.join(', ')}) : `);
  if (operation === null) return;
  const cout = await demander('Coût en FCFA : ');
  if (cout === null) return;

  // demander() renvoie déjà un texte sans espaces autour : pas de trim() nécessaire.
  const saisie = {
    id: id.toUpperCase(),
    date,
    parcelle: parcelle.toUpperCase(),
    culture: culture.toLowerCase(),
    operation: operation.toLowerCase(),
    coutFCFA: cout,
  };
  const erreurs = ajouterOperation(operations, saisie);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, operations);
    console.log(`Opération ${saisie.id} ajoutée. Le registre compte ${operations.length} opération(s).`);
  } else {
    console.log('Opération refusée :');
    for (const message of erreurs) {
      console.log(`  - ${message}`);
    }
    console.log(`Le registre compte toujours ${operations.length} opération(s).`);
  }
}
function lister(operations) {
  console.log(`\n--- Liste des opérations (${operations.length}) ---`);
  console.log(listerOperations(operations));
}

async function rechercher(operations) {
  console.log('\n--- Rechercher une opération ---');
  console.log('1. Par identifiant');
  console.log('2. Par parcelle');
  console.log('3. Par culture');
  const critere = await demander('Votre choix : ');
  if (critere === null) return;

  let resultats;
  switch (critere) {
    case '1': {
      const id = await demander('Identifiant (ex. O03) : ');
      if (id === null) return;
      const trouvee = trouverParId(operations, id.toUpperCase());
      resultats = trouvee === undefined ? [] : [trouvee]; // trouverParId renvoie un objet ou undefined
      break;
    }
    case '2': {
      const parcelle = await demander('Parcelle (ex. P1) : ');
      if (parcelle === null) return;
      resultats = filtrerParParcelle(operations, parcelle.toUpperCase());
      break;
    }
    case '3': {
      const culture = await demander('Culture (ex. tomate) : ');
      if (culture === null) return;
      resultats = filtrerParCulture(operations, culture.toLowerCase());
      break;
    }
    default:
      console.log(`Choix inconnu : « ${critere} ». Tapez 1, 2 ou 3.`);
      return;
  }

  if (resultats.length === 0) {
    console.log('Aucune opération trouvée.');
  } else {
    console.log(`${resultats.length} opération(s) trouvée(s) :`);
    console.log(resultats.map(formaterOperation).join('\n'));
  }
}
async function trier(operations) {
  console.log('\n--- Trier les opérations ---');
  console.log('1. Par coût (croissant)');
  console.log('2. Par date (de la plus ancienne à la plus récente)');
  const critere = await demander('Votre choix : ');
  if (critere === null) return;

  let resultat;
  switch (critere) {
    case '1':
      resultat = trierParCout(operations); // renvoie une copie : le registre garde son ordre
      break;
    case '2':
      resultat = trierParDate(operations);
      break;
    default:
      console.log(`Choix inconnu : « ${critere} ». Tapez 1 ou 2.`);
      return;
  }

  console.log(`\n--- Opérations triées (${resultat.length}) ---`);
  console.log(listerOperations(resultat));
}

function synthese(operations) {
  console.log('\n--- Synthèse des dépenses ---');
  if (operations.length === 0) {
    console.log('Aucune opération enregistrée.');
    return;
  }

  console.log(`Nombre d'opérations : ${operations.length}`);
  console.log(`Total des coûts : ${totalCouts(operations)} FCFA`);

  const { min, max } = coutMinMax(operations);
  console.log(`Coût minimum : ${min} FCFA`);
  console.log(`Coût maximum : ${max} FCFA`);

  console.log('Par parcelle :');
  const parParcelle = syntheseParParcelle(operations);
  for (const parcelle of Object.keys(parParcelle).sort()) {
    const { nombre, total } = parParcelle[parcelle];
    console.log(`  ${parcelle} : ${nombre} opération(s), ${total} FCFA`);
  }
}

async function main() {
  ouvrirSaisie();
   try {
    afficherAccueil();
    const operations = await chargerRegistre();

    let continuer = true;
    while (continuer) {
      afficherMenu();
      const choix = await demander('Votre choix : ');
      if (choix === null) break; // Ctrl+C

      try {
        switch (choix) {
          case '1':
            await ajouter(operations);
            break;
          case '2':
            lister(operations);
            break;
          case '3':
            await rechercher(operations);
            break;
          case '4':
            await trier(operations);
            break;
          case '5':
            synthese(operations);
            break;
          case '0':
            console.log('Au revoir !');
            continuer = false;
            break;
          default:
            console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
        }
      } catch (erreur) {
        if (erreur.message.startsWith('TODO')) {
          console.log(`À compléter : ${erreur.message}`);
        } else {
          console.log(`Erreur inattendue : ${erreur.message}`);
        }
      }
    }
  } finally {
  fermerSaisie();
}
}

main();
