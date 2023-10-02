import { useEffect, useState } from "react";
import "./Tarjetas.css";
import PropTypes from "prop-types";

Tarjetas.propTypes = {
  selectedTarjeta: PropTypes.number,
  setSelectedTarjeta: PropTypes.func,
};

export default function Tarjetas({ selectedTarjeta, setSelectedTarjeta }) {
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    const fetchTarjeta = async () => {
      try {
        const response = await fetch("http://localhost:8080/cliente?id=1");
        if (response.ok) {
          const json = await response.json();
          setTarjetas(json);
        } else {
          console.error("Error al cargar las tarjetas del cliente");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTarjeta();
  }, []);

  const handleTarjetaSelect = (idTarjeta) => {
    setSelectedTarjeta(parseInt(idTarjeta));
  };

  return (
    <div>
      <select
        onChange={(e) => handleTarjetaSelect(e.target.value)}
        value={selectedTarjeta}
      >
        <option value={0}>Seleccionar una tarjeta</option>
        {tarjetas.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
