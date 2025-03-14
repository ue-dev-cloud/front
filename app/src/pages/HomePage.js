import React, { useState } from "react";

function HomePage() {
  const products = [
    "Smartphone Galaxy S23",
    "Tablette iPad Air",
    "Écran 4K",
    "Casque Audio Pro",
    "Clavier Mécanique RGB",
    "Souris Gaming",
    "Webcam HD 1080p",
    "Enceinte Bluetooth",
    "SSD 1To",
  ];

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    product: products[0], // Initialiser avec le premier produit
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://europe-west9-ue-dev-cloud.cloudfunctions.net/quarkus-api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Commande envoyée avec succès!");
        setFormData({ name: "", address: "", product: products[0] });
      } else {
        alert("Erreur lors de l'envoi de la commande");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="HomePage">
      <h1>Passer une commande</h1>
      <form onSubmit={handleSubmit} className="order-form">
        <div>
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Adresse:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="product">Produit:</label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            className="product-select"
          >
            {products.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Envoyer la commande</button>
      </form>
    </div>
  );
}

export default HomePage;
