import { useEffect, useState } from "react";
import "./Descuentos.css";

export default function Descuentos() {
  const [descuentos, setDescuentos] = useState([]);

  useEffect(() => {
    const fetchDescuentos = async () => {
      try {
        const response = await fetch("http://localhost:8080/promocion");
        if (response.ok) {
          const json = await response.json();
          setDescuentos(json);
        } else {
          console.error("Error al cargar las promociones");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDescuentos();
  }, []);

  return (
    <div>
      <table className="descuentos">
        <thead>
          <tr>
            <th>Inicia</th>
            <th>Finaliza</th>
            <th>Tipo de descuento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {descuentos.map((d) => {
            return (
              <tr key={d.id}>
                <td>{d.fechaInicio}</td>
                <td>{d.fechaFin}</td>
                <td>{d.descripcion}</td>
                <td>{d.porcentaje * 100}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
