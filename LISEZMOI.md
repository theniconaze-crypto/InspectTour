# InspecTour — application Android

L'application est embarquée **hors ligne** (Tailwind, Excel, icônes inclus). Les données restent stockées sur la tablette.

## Obtenir l'APK — méthode A : GitHub (sans rien installer)
1. Créez un dépôt GitHub (privé conseillé) et envoyez-y le contenu de ce dossier.
2. Onglet **Actions** → « Build APK » → **Run workflow** (se lance aussi à chaque push).
3. Une fois terminé (≈ 5 min), téléchargez l'artefact **InspecTour-apk** → `app-debug.apk`.

## Méthode B : Android Studio
1. `npm install` puis `npm run sync`
2. `npx cap open android` → Build > Build APK(s). Fichier : `android/app/build/outputs/apk/debug/app-debug.apk`

## Installer sur la tablette
Copiez l'APK sur la tablette, ouvrez-le, autorisez « Sources inconnues » si demandé.

## Modifier l'application
Éditez `src/index.html`, puis `npm run sync` et reconstruisez.

## Spécificités Android
- **PDF** : le bouton ouvre le dialogue d'impression Android → « Enregistrer au format PDF ».
- **Excel** : l'export ouvre la feuille de partage (Drive, mail, fichiers…).
- **Photos** : appareil photo via le bouton Photo (permission demandée au premier usage).
- APK « debug » : suffisant pour une installation interne. Pour Google Play, il faudra un APK/AAB signé (release).
