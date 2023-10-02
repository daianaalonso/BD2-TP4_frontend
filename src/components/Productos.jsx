import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Productos.css";

Productos.propTypes = {
  selectedProductos: PropTypes.array,
  setSelectedProductos: PropTypes.func,
};

export default function Productos({ selectedProductos, setSelectedProductos }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch("http://localhost:8080/producto");
        if (response.ok) {
          const json = await response.json();
          setProductos(json);
        } else {
          console.error("Error al cargar los productos");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProducto();
  }, []);

  const handleProductoSelect = (idProducto) => {
    if (selectedProductos.includes(idProducto)) {
      setSelectedProductos(selectedProductos.filter((id) => id !== idProducto));
    } else {
      setSelectedProductos([...selectedProductos, idProducto]);
    }
  };

  return (
    <div>
      <table className="productos">
        <thead>
          <tr>
            <th>Editar</th>
            <th>Codigo</th>
            <th>Descripción</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Agregar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => {
            return (
              <tr key={p.id}>
                <td>
                  <Link to={`/producto/${p.id}`}>Editar</Link>
                </td>
                <td>{p.codigo}</td>
                <td>{p.descripcion}</td>
                <td>{p.marca.nombre}</td>
                <td>${p.precio}</td>
                <td>
                  <input
                    type="checkbox"
                    value={p.id}
                    checked={selectedProductos.includes(p.id)}
                    onChange={() => handleProductoSelect(p.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
