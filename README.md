# Site MOOVE

Landing page de l'agence événementielle MOOVE.
Site statique — HTML / CSS / JS, sans framework ni build.

## Structure

```
index.html              → la page (HTML + CSS inline)
assets/
  ├── favicon.svg        → icône du site
  ├── js/script.js       → interactions (nav, animations, formulaire)
  ├── fonts/             → polices auto-hébergées (.woff2)
  └── images/            → photos et logo (optimisées)
robots.txt              → indexation moteurs de recherche
_originaux_backup/       → copie des images d'origine (non publié)
```

## Développer en local

Aucune installation. Pour prévisualiser, ouvre `index.html` dans un navigateur,
ou lance un petit serveur local :

```bash
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Formulaire de contact

Le formulaire envoie les demandes via [Web3Forms](https://web3forms.com)
vers **contact@moove-live.com**.

⚠️ Avant la mise en ligne, remplacer la clé d'accès dans `index.html` :
chercher `VOTRE_CLE_WEB3FORMS` et coller la vraie clé obtenue gratuitement
sur web3forms.com (en renseignant l'adresse contact@moove-live.com).

## Déploiement

Hébergé sur [Vercel](https://vercel.com), connecté au dépôt GitHub.
Chaque `git push` sur la branche principale met le site à jour automatiquement.
