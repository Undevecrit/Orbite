/**
 * =========================================================================
 *  BOUTIQUE — articles soumis au vote (/shop)
 * =========================================================================
 *  id            : identifiant unique, sans espace (envoyé dans la Sheet)
 *  titre, description : texte
 *  image         : URL (ex. "/assets/shop/tshirt.jpg"), optionnel
 *  prixIndicatif : prix affiché au visiteur (en €)
 *  prixMin       : prix minimum que le visiteur peut proposer (en €)
 * =========================================================================
 */
const PRODUITS = [
  {
    id: "T-shirt JDEPLE",
    titre: "T-shirt « J'ai des étoiles plein les yeux »",
    description: "T-shirt noir avec logo Orbite sur la poitrine a gauche; et texte « J'ai des étoiles plein les yeux » dans le dos.",
    image: "assets/shop/IMG_7981.jpeg",
    prixIndicatif: 29,
    prixMin: 27.80
  },
  {
    id: "Interstellaire - Le mag",
    titre: "Interstellaire - Le mag",
    description: "Un abonnement mensuel pour un petit magazine en format A5 d'une trentaine de pages ! Idéal pour les passionnés ou simplement les curieux ! Orbite proposera un premier exemplaire test a prix réduit pour que vous puissiez faire votre choix.",
    image: "/assets/shop/interstellaire.jpeg",
    prixIndicatif: 14,
    prixMin: 13
  },
  {
    id: "Sweat Space Lover",
    titre: "Sweat Space Lover",
    description: "Sweat avec impression SPACE LOVER au dos, écusson Orbite sur la poitrine, côté gauche.",
    image: "/assets/shop/sweatsplover.jpeg",
    prixIndicatif: 38,
    prixMin: 35
  },
  {
    id: "Poster Andromède",
    titre: "Poster Andromède",
    description: "Poster en format A4 la galaxie la plus proche de nous, Andromède",
    image: "/assets/shop/postandro.jpg",
    prixIndicatif: 9,
    prixMin: 7
  },
  {
    id: "Poster Curiosity",
    titre: "Poster Curiosity",
    description: "Poster en format A4 du rover Curiosity qui explore la planète rouge, Mars.",
    image: "/assets/shop/postcurio.jpg",
    prixIndicatif: 9,
    prixMin: 7
  },
  {
    id: "Poster Terre",
    titre: "Poster Terre",
    description: "Poster en format A4 de notre chère planète, la Terre.",
    image: "/assets/shop/postterre.jpg",
    prixIndicatif: 9,
    prixMin: 7
  },
  {
    id: "Poster Nébuleuse",
    titre: "Poster Nébuleuse",
    description: "Poster en format A4 de la nébuleuse du papillon.",
    image: "/assets/shop/postnebu.jpg",
    prixIndicatif: 9,
    prixMin: 7
  },
];
