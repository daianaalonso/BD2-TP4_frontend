import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditarProducto() {
  const { id } = useParams();
  const [resultado, setResultado] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    descripcion: "",
    codigo: "",
    precio: 0,
    marca: "",
    idCategoria: 0,
    version: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8080/producto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          descripcion: data.descripcion ? data.descripcion : "",
          codigo: data.codigo ? data.codigo : "",
          precio: data.precio ? data.precio : 0,
          marca: data.marca ? data.marca : "",
          idCategoria: data.idCategoria ? data.idCategoria : 0,
          version: data.version ? data.version : 0,
        });
      })
      .catch((error) => console.error("Error al obtener el producto:", error));

    fetch("http://localhost:8080/categorias")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) =>
        console.error("Error al obtener las categorias:", error)
      );
  }, [id]);

  function handleChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setFormData((formData) => ({
      ...formData,
      [inputName]: inputValue,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:8080/producto/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setResultado(data.result);
          });
        } else {
          return response.json().then((data) => {
            setResultado(data.error);
          });
        }
      })
      .catch((error) => {
        setResultado("Error al modificar: " + error.message);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="codigo">Codigo: </label>
        <input type="text" id="codigo" name="codigo" value={formData.codigo} />
        <hr />
        <label htmlFor="descripcion">Descripción: </label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <hr />
        <label htmlFor="precio">Precio: </label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
        />
        <hr />
        <label htmlFor="marca">Marca: </label>
        <input
          type="text"
          id="marca"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
        />
        <hr />
        <label htmlFor="idCategoria">Categoria: </label>
        <select
          id="idCategoria"
          name="idCategoria"
          value={formData.idCategoria}
          onChange={handleChange}
        >
          <option value={0}>Seleccione una categoria: </option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to="/">
            <button
              style={{
                backgroundColor: "grey",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                margin: "10px",
              }}
            >
              Volver
            </button>
          </Link>
          <button
            type="submit"
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              margin: "10px",
            }}
          >
            Guardar
          </button>
        </div>
      </form>
      <p>{resultado}</p>
    </>
  );
}
