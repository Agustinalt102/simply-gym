import "./App.css";
import logo from "./assets/logo.png";

import { useState, useEffect } from "react";

function App() {

  const categorias = [
    "Abdominales",
    "Pecho",
    "Trapecio",
    "Hombros",
    "Espalda superior",
    "Espalda baja",
    "Dorsales",
    "Triceps",
    "Biceps",
    "Antebrazos",
    "Cuadriceps",
    "Gemelos",
    "Gluteos",
    "Isquiotibiales",
    "Abductores",
    "Aductores"
  ];

  const [categoriaActiva, setCategoriaActiva] =
    useState("Pecho");

  const [ejercicio, setEjercicio] =
    useState("");

  const [kg, setKg] =
    useState("");

  const [series, setSeries] =
    useState("");

  const [repeticiones, setRepeticiones] =
    useState("");

  const [descanso, setDescanso] =
    useState("");

  const [timer, setTimer] =
    useState(0);

  const [listaEjercicios, setListaEjercicios] =
    useState(() => {

      const datosGuardados =
        localStorage.getItem("ejercicios");

      return datosGuardados
        ? JSON.parse(datosGuardados)
        : [];
    });

  useEffect(() => {

    localStorage.setItem(
      "ejercicios",
      JSON.stringify(listaEjercicios)
    );

  }, [listaEjercicios]);

  useEffect(() => {

    let intervalo = null;

    if (timer > 0) {

      intervalo = setInterval(() => {

        setTimer((prev) => prev - 1);

      }, 1000);
    }

    return () => clearInterval(intervalo);

  }, [timer]);

  const agregarEjercicio = () => {

    if (
      ejercicio === "" ||
      kg === "" ||
      series === "" ||
      repeticiones === "" ||
      descanso === ""
    ) {
      return;
    }

    const nuevoEjercicio = {

      categoria: categoriaActiva,
      ejercicio,
      kg,
      series,
      repeticiones,
      descanso
    };

    const nuevaLista = [
      ...listaEjercicios,
      nuevoEjercicio
    ];

    setListaEjercicios(nuevaLista);

    /* INICIA TIMER AUTOMATICO */

    setTimer(Number(descanso));

    /* LIMPIAR INPUTS */

    setEjercicio("");
    setKg("");
    setSeries("");
    setRepeticiones("");
    setDescanso("");
  };

  const eliminarEjercicio = (index) => {

    const nuevaLista =
      listaEjercicios.filter(
        (_, i) => i !== index
      );

    setListaEjercicios(nuevaLista);
  };

  const iniciarDescanso = (segundos) => {

    setTimer(Number(segundos));
  };

  const volumenTotal =
    listaEjercicios.reduce(
      (total, item) => {

        return (
          total +
          (
            Number(item.kg) *
            Number(item.series) *
            Number(item.repeticiones)
          )
        );

      },
      0
    );

  return (

    <div className="container">

      <header className="header">

        <div className="logo">

          <img
            src={logo}
            alt="Simply Gym"
          />

        </div>

        <div className="hero-text">

          <h1 className="title">
            SIMPLY GYM
          </h1>

          <p className="subtitle">
            Sistema de entrenamiento inteligente
          </p>

        </div>

      </header>

      <div className="categories">

        {categorias.map((categoria, index) => (

          <button
            key={index}
            onClick={() =>
              setCategoriaActiva(categoria)
            }
            className={`category-btn ${
              categoriaActiva === categoria
                ? "active"
                : ""
            }`}
          >
            {categoria}
          </button>

        ))}

      </div>

      <div className="line"></div>

      <div className="volume-box">

        🔥 Volumen total:
        {" "}
        {volumenTotal}
        {" "}
        kg

      </div>

      {timer > 0 && (

        <div className="timer-box">

          ⏱️ Descanso:
          {" "}
          {timer}s

        </div>

      )}

      <section className="form-card">

        <h2>{categoriaActiva}</h2>

        <input
          type="text"
          placeholder="Ej: Press banca"
          className="input"
          value={ejercicio}
          onChange={(e) =>
            setEjercicio(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Kg"
          className="input"
          value={kg}
          onChange={(e) =>
            setKg(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Series"
          className="input"
          value={series}
          onChange={(e) =>
            setSeries(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Repeticiones"
          className="input"
          value={repeticiones}
          onChange={(e) =>
            setRepeticiones(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Descanso (seg)"
          className="input"
          value={descanso}
          onChange={(e) =>
            setDescanso(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={agregarEjercicio}
        >
          Agregar ejercicio
        </button>

      </section>

      <section className="exercise-list">

        {listaEjercicios.map((item, index) => (

          <div
            className="exercise-card"
            key={index}
          >

            <h3>{item.ejercicio}</h3>

            <p>
              <strong>Músculo:</strong>
              {" "}
              {item.categoria}
            </p>

            <p>
              <strong>Kg:</strong>
              {" "}
              {item.kg}
            </p>

            <p>
              <strong>Series:</strong>
              {" "}
              {item.series}
            </p>

            <p>
              <strong>Repeticiones:</strong>
              {" "}
              {item.repeticiones}
            </p>

            <p>
              <strong>Descanso:</strong>
              {" "}
              {item.descanso}s
            </p>

            <button
              className="rest-btn"
              onClick={() =>
                iniciarDescanso(item.descanso)
              }
            >
              Iniciar descanso
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                eliminarEjercicio(index)
              }
            >
              ✕
            </button>

          </div>

        ))}

      </section>

    </div>
  );
}

export default App;