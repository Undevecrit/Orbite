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
    id: "tshirt-orbite",
    titre: "T-shirt Orbite",
    description: "T-shirt noir en coton bio, logo Orbite brodé sur la poitrine.",
    image: "/assets/shop/tshirt-orbite.jpg",
    prixIndicatif: 25,
    prixMin: 15
  },
  {
    id: "affiche-systeme-solaire",
    titre: "Affiche du Système solaire",
    description: "Affiche A2 illustrée des huit planètes à l'échelle des distances.",
    image: "/assets/shop/affiche-systeme-solaire.jpg",
    prixIndicatif: 18,
    prixMin: 10
  },
  {
    id: "mug-nebuleuse",
    titre: "Mug Nébuleuse d'Orion",
    description: "Mug en céramique avec une photo de M42 qui se révèle à la chaleur.",
    image: "/assets/shop/mug-nebuleuse.jpg",
    prixIndicatif: 14,
    prixMin: 8
  }
];
