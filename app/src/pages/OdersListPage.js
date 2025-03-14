import React, { useState, useEffect } from "react";

function OdersListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://europe-west9-ue-dev-cloud.cloudfunctions.net/quarkus-api/orders"
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des commandes");
      }
      const data = await response.json();

      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="OrdersListPage">
      <h1>Liste des Commandes</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Produit</th>
              <th>Date de la commande</th>
              <th>Date de livraison</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.product}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OdersListPage;
