# Kawa Maison Design System

## Identite Visuelle
Kawa Maison est une boutique fictive de cafes artisanaux premium. L'interface doit evoquer une epicerie fine contemporaine: sobre, chaude, lisible, commerciale et rassurante. Le logo est uniquement le texte `Kawa Maison`, avec une composition typographique calme et elegante.

## Couleurs
- Fond principal: `#f7f0e6` ivoire chaud, utilise sur le body et les grandes sections.
- Fond secondaire: `#fffaf3` creme clair, utilise pour les zones calmes et les formulaires.
- Cartes: `#fffdf8` blanc casse, jamais blanc pur dominant.
- Texte principal: `#211713` brun-noir doux.
- Texte secondaire: `#75675d` taupe lisible.
- Accent principal: `#6f3f25` brun cafe, pour CTA, liens importants et etats actifs.
- Accent secondaire: `#c59a4b` dore doux, a utiliser avec parcimonie.
- Bordures: `#e6d9c8` beige gris clair.
- Succes: `#3f6f4e`; alerte douce: `#9a5b2f`.

## Typographies
- Police principale: Geist Sans, deja integree via `next/font`.
- Titres: graisse 600 a 700, interlignage serre mais confortable.
- Texte courant: 16px desktop, 15px mobile, interlignage 1.6.
- Chiffres prix et stats: graisse 600, alignement net.

## Espacements
- Conteneur max: 1180px, padding horizontal 24px desktop, 16px mobile.
- Sections: 72px desktop, 48px tablette, 36px mobile.
- Grilles: gap 24px desktop, 16px mobile.
- Composants compacts: increments de 4px/8px.

## Arrondis Et Ombres
- Cartes et panneaux: 8px de rayon maximum.
- Boutons et champs: 6px a 8px.
- Ombres: legeres et diffuses uniquement (`0 18px 45px rgba(58, 38, 24, 0.08)`).
- Eviter les grosses cartes flottantes imbriquees.

## Boutons
- Primaire: fond brun cafe, texte creme, hauteur 44-48px, hover plus sombre.
- Secondaire: fond transparent ou creme, bordure beige, texte brun.
- Tertiaire: lien texte brun avec soulignement au hover.
- Tous les boutons doivent avoir un focus visible et une zone tactile confortable.

## Cartes Produits
- Image dominante en haut, ratio stable 4:3 ou carre selon contexte.
- Nom, origine/categorie, notes aromatiques, prix et CTA visibles sans surcharge.
- Bordure fine beige, fond blanc casse, hover discret par ombre et translation tres legere.
- Stock faible signale avec une couleur chaude sobre.

## Formulaires
- Labels visibles, champs creme clair ou blanc casse, bordure beige.
- Focus brun cafe avec anneau discret.
- Messages courts et utiles, jamais decoratifs.
- Inputs pleine largeur sur mobile.

## Header Et Footer
- Header sticky, fond ivoire legerement translucide, bordure basse beige.
- Navigation simple: Accueil, Boutique, Panier, Admin.
- Logo texte fort mais discret.
- Footer en bande pleine largeur brun-noir doux avec texte creme et liens sobres.

## Ton General
Francais, premium accessible, precis et chaleureux. Le site doit vendre sans paraitre agressif: peu de slogans, beaucoup de clarte, des microcopies rassurantes.

## Responsive
- Mobile: navigation compacte, grilles en une colonne, CTA pleine largeur si necessaire.
- Tablette: grilles 2 colonnes, filtres empiles ou horizontaux selon place.
- Desktop: grilles 3 a 4 colonnes, contenu limite en largeur, header horizontal.
- Aucun texte ne doit deborder de son conteneur.

## Accessibilite
- Contraste suffisant entre texte et fond.
- Navigation clavier visible.
- `alt` descriptif pour toutes les images produit.
- Boutons et liens avec noms accessibles.
- Ne pas se reposer uniquement sur la couleur pour communiquer un statut.

## Regles Images Produit
- Pas de hotlinking: les images doivent vivre dans `public/images/` ou `public/images/products/`.
- Eviter les logos tiers et le texte lisible sur les packagings.
- Palette visuelle coherente: beige, creme, brun cafe, lumiere naturelle douce.
- Ratio stable pour eviter les sauts de layout.
- Fallback local obligatoire si une image manque.

## Prompts IA Si Remplacement Photo
1. Premium product photography of an artisan coffee bag on a warm beige background, soft natural light, minimal luxury branding, realistic, high-end e-commerce photo, no text
2. Top view of roasted coffee beans on a cream background, elegant minimal composition, warm lighting, premium coffee brand aesthetic
3. Ceramic cup of black coffee on a beige linen table, soft morning light, premium lifestyle photography, minimal, realistic
4. Artisan coffee package with coffee beans around it, warm brown and cream palette, luxury e-commerce product photography, no readable text
5. French press coffee maker with coffee cup and beans, premium kitchen counter, soft shadows, realistic photography
6. Espresso coffee shot in a small ceramic cup, crema visible, warm luxury lighting, minimal background
