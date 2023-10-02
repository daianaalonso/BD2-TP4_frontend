import { useState } from "react";
import "./Boton.css";
import PropTypes from "prop-types";

BotonMonto.propTypes = {
  selectedProductos: PropTypes.array,
  selectedTarjeta: PropTypes.number,
};

export default function BotonMonto({ selectedProductos, selectedTarjeta }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [monto, setMonto] = useState(null);

  console.log(selectedProductos, selectedTarjeta);

  const fetchMonto = async () => {
    setErrorMessage("");
    setMonto(null);

    try {
      const response = await fetch(
        `http://localhost:8080/venta?productos=${selectedProductos.join(
          ","
        )}&idTarjeta=${selectedTarjeta}`
      );
      if (response.ok) {
        const json = await response.json();
        setMonto(json);
      } else {
        const json = await response.json();
        setErrorMessage(json.error);
      }
    } catch (error) {
      console.error("Error al calcular el monto.", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchMonto();
  };

  return (
    <div>
      <button className="button buttonMonto" onClick={handleClick}>
        Monto Total
      </button>
      <div className="result-container">
        {monto && <p style={{ color: "green" }}>${monto}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
}
