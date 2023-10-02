import { useState } from "react";
import PropTypes from "prop-types";

BotonComprar.propTypes = {
  selectedProductos: PropTypes.array,
  selectedTarjeta: PropTypes.number,
};

export default function BotonComprar({ selectedProductos, selectedTarjeta }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(selectedProductos, selectedTarjeta);

  const fetchCompra = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        `http://localhost:8080/venta?idCliente=1&idTarjeta=${selectedTarjeta}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(selectedProductos),
        }
      );

      if (response.ok) {
        const json = await response.json();
        setSuccessMessage(json.result);
        console.log("Compra exitosa");
      } else {
        const json = await response.json();
        setErrorMessage(json.error);
        console.error("Error en la compra.");
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };

  const handleComprarClick = (e) => {
    e.preventDefault();
    fetchCompra();
  };

  /*const handleComprarClick = (e) => {
    setSuccessMessage("");
    setErrorMessage("");

    e.preventDefault();

    fetch(
      `http://localhost:8080/venta?idCliente=1&idTarjeta=${selectedTarjeta}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(selectedProductos),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Compra exitosa");
          return response.json().then((data) => {
            setSuccessMessage(data.result);
          });
        } else {
          console.error("Error en la compra", e);
          return response.json().then((data) => {
            setErrorMessage(data.error);
          });
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud POST:", error);
      });
  };*/

  return (
    <div>
      <button className="button buttonCompra" onClick={handleComprarClick}>
        Comprar
      </button>
      <div className="result-container">
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
}
