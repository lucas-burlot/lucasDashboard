# LucasDashboard
MyJob est un site web permettant de gérer ses candidatures de manière simple et efficace. Il permet de créer, modifier, supprimer et visualiser ses candidatures. Il permet également de visualiser des statistiques sur ses candidatures.

Le projet est déployer avec Vercel, pourquoi Vercel ?
- Vercel est un service de déploiement continu et d'hébergement web qui permet aux développeurs de sites web de déployer des sites web facilement et rapidement.

Lien du site en ligne : https://myjob-chi.vercel.app


### Comment installer le projet
```
npm install
```

### Comment lancer le projet
```
npm run serve
```

### Listes des librairies utilisées
- Angular
- Bootstrap
- Plotly.js (Une librairie très complète pour la création de graphiques / statistiques)
- ngx-pagination (une librairie facile à utiliser pour la pagination et elle est bien intégrer avec Angular)
- ngx-toastr (une librairie facile à utiliser pour les notifications et elle est bien intégrer avec Angular)
- fontawesome (une librairie d'icônes très complète)


### Pages
- Page d'accueil (Dahsboard avec les graphiques + données concernant les candidatures)
- Page de connexion
- Page d'inscription
- Page de profil (Modification / Visualisation)
- Listing de ses candidatures
- Page de création d'une candidature
- Page de modification d'une candidature
- Page de suppression d'une candidature (Modal avec confirmation)

### Fonctionnalités spécifique
- Utilisation de RxJS pour la gestion des données (*Complexe mais très puissant si bien utilisé*)
- Utilisations de guards pour la gestion des routes (*Permet de protéger les routes et de rediriger l'utilisateur si il n'est pas connecté*)
- Utilisation de services pour la gestion des données (*Permet de centraliser les données et de les partager entre les composants*)
- Utilisation de pipes pour la gestion des dates en français + les paginations (*Permet de formater les données avant de les afficher*)

