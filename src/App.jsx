import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Descuentos from "./components/Descuentos";
import Productos from "./components/Productos";
import Tarjetas from "./components/Tarjetas";
import BotonComprar from "./components/BotonComprar";
import BotonMonto from "./components/BotonMonto";
import { useState } from "react";
import EditarProducto from "./components/EditarProducto";

function App() {
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [selectedTarjeta, setSelectedTarjeta] = useState(0);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Ventas Online</h1>
        </header>

        <Switch>
          <Route path="/producto/:id">
            <div className="main-content">
              <section className="promociones">
                <h2>Editar Producto</h2>
                <EditarProducto />
              </section>
            </div>
          </Route>
          <Route path="/">
            <div className="main-content">
              <section className="promociones">
                <h2>Promociones Vigentes</h2>
                <Descuentos />
              </section>
              <section className="tarjetas">
                <h2>Tarjetas del Cliente</h2>
                <Tarjetas
                  selectedTarjeta={selectedTarjeta}
                  setSelectedTarjeta={setSelectedTarjeta}
                />
              </section>
              <section className="productos">
                <h2>Lista de Productos</h2>
                <Productos
                  selectedProductos={selectedProductos}
                  setSelectedProductos={setSelectedProductos}
                />
              </section>
            </div>
            <div className="actions">
              <BotonMonto
                selectedProductos={selectedProductos}
                selectedTarjeta={selectedTarjeta}
              />
              <BotonComprar
                selectedProductos={selectedProductos}
                selectedTarjeta={selectedTarjeta}
              />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
