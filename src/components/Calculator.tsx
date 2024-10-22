"use client";

import React from 'react';

import { useState, useEffect } from 'react';
import styles from '@styles/Calculator.module.css';

// Definir la interfaz para el formulario
interface Formulario {
  id: number;
  tipo: 'balcon' | 'ventana' | 'logia';
  dimensions: {
    largo?: string;
    ancho: string;
    alto?: string;
  };
  material: string;
  grosor: string;
  precio: number;
}

const Calculator = () => {
  // Estado para manejar múltiples formularios de cotización
  const [formularios, setFormularios] = useState<Formulario[]>([
    { id: 1, tipo: 'balcon', dimensions: { largo: '', ancho: '', alto: '' }, material: 'MONOFILAMENTO (POLIAMIDA NYLON)', grosor: '2 mm', precio: 0 }
  ]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  

  // Función para calcular el precio de un formulario individual
  const calcularPrecio = (formulario: Formulario): number => {
    let basePrecio = 100;
    let area = 0;

    if (formulario.tipo === 'balcon') {
      area = parseFloat(formulario.dimensions.largo || '0') * parseFloat(formulario.dimensions.ancho) * parseFloat(formulario.dimensions.alto || '0');
    } else if (formulario.tipo === 'ventana') {
      area = parseFloat(formulario.dimensions.ancho) * parseFloat(formulario.dimensions.alto || '0');
    } else if (formulario.tipo === 'logia') {
      area = parseFloat(formulario.dimensions.ancho) * parseFloat(formulario.dimensions.alto || '0');
    }

    if (formulario.material === 'MONOFILAMENTO (POLIAMIDA NYLON)') {
      basePrecio += 50;
    }

    if (formulario.grosor === '2 mm') {
      basePrecio += 10;
    } else if (formulario.grosor === '3 mm') {
      basePrecio += 20;
    }

    const precioCalculado = area * basePrecio;

    // Retorna 0 si el precio calculado es NaN o indefinido
    return isNaN(precioCalculado) ? 0 : precioCalculado;
  };

  // Función para recalcular el precio total
  useEffect(() => {
    const nuevoPrecioTotal = formularios.reduce((total, formulario) => total + calcularPrecio(formulario), 0);
    setPrecioTotal(nuevoPrecioTotal);
  }, [formularios]);

  // Función para manejar cambios en un formulario específico
  const handleChange = (index: number, field: keyof Formulario, value: string | 'balcon' | 'ventana' | 'logia') => {
    setFormularios((prevFormularios) => {
      const nuevosFormularios = [...prevFormularios];
      if (field === 'tipo') {
        nuevosFormularios[index].dimensions = value === 'balcon' ? { largo: '', ancho: '', alto: '' } : { ancho: '', alto: '' };
      }
      nuevosFormularios[index][field] = value as never;
      return nuevosFormularios;
    });
  };

  // Función para manejar cambios en las dimensiones
  const handleDimensionChange = (index: number, dimField: keyof Formulario['dimensions'], value: string) => {
    setFormularios((prevFormularios) => {
      const nuevosFormularios = [...prevFormularios];
      nuevosFormularios[index].dimensions[dimField] = value;
      return nuevosFormularios;
    });
  };

  // Función para agregar un nuevo formulario
  const agregarFormulario = () => {
    const nuevoFormulario: Formulario = {
      id: formularios.length + 1,
      tipo: 'balcon',
      dimensions: { largo: '', ancho: '', alto: '' },
      material: 'MONOFILAMENTO (POLIAMIDA NYLON)',
      grosor: '2 mm',
      precio: 0,
    };
    setFormularios((prevFormularios) => {
      const nuevosFormularios = [...prevFormularios, nuevoFormulario];
      // Recalcula el precio total tras agregar un nuevo formulario
      const nuevoPrecioTotal = nuevosFormularios.reduce((total, formulario) => total + calcularPrecio(formulario), 0);
      setPrecioTotal(nuevoPrecioTotal);
      return nuevosFormularios;
    });
  };

  // Función para eliminar un formulario
  const eliminarFormulario = (index: number) => {
    setFormularios((prevFormularios) => prevFormularios.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.calculator}>
      <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 mt-6 text-center shadow-sm">
        Cotizador de Mallas de Seguridad
      </h2>

      <div className={styles.cardContainer}>
        {formularios.map((formulario, index) => (
          <div key={formulario.id} className={styles.card}>
            {/* Botón para eliminar la tarjeta */}
            <button className="absolute top-2 left-2 text-red-500 text-sm w-6 h-6 flex items-center justify-center rounded-full border border-transparent hover:text-white hover:bg-red-500 transition duration-300"
             onClick={() => eliminarFormulario(index)}>
              &times;
            </button>

            {/* Título del formulario */}

            {/* Botón de Información "?" */}
            <button
              onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
              className="absolute top-2 right-8 text-blue-500 text-sm w-6 h-6 flex items-center justify-center rounded-full border border-transparent hover:text-white hover:bg-blue-500 transition duration-300"
            >
              ?
            </button>

            {/* Modal con la Imagen */}
            {showModal && (
              <div className="absolute top-10 right-8 bg-white p-4 shadow-lg rounded-lg z-50">
                <img src="/image/informacion.jpg" alt="Información" className="w-100 h-auto rounded" />
              </div>
            )}

            {/* Selección del Tipo */}
            <div className={styles.section}>
              <label className={styles.label}>Selecciona el Tipo</label>
              <select value={formulario.tipo} onChange={(e) => handleChange(index, 'tipo', e.target.value)} className={styles.inputField}>
                <option value="balcon">Balcón</option>
                <option value="ventana">Ventana</option>
                <option value="logia">Logia</option>
              </select>
            </div>

            {/* Campos de Entrada para el Tipo Seleccionado */}
            {formulario.tipo === 'balcon' && (
              <div className={styles.section}>
                <label className={styles.label}>Balcón (Largo x Ancho x Alto)</label>
                <input
                  type="number"
                  placeholder="Largo"
                  value={formulario.dimensions.largo}
                  onChange={(e) => handleDimensionChange(index, 'largo', e.target.value)}
                  className={styles.inputField}
                />
                <input
                  type="number"
                  placeholder="Ancho"
                  value={formulario.dimensions.ancho}
                  onChange={(e) => handleDimensionChange(index, 'ancho', e.target.value)}
                  className={styles.inputField}
                />
                <input
                  type="number"
                  placeholder="Alto"
                  value={formulario.dimensions.alto}
                  onChange={(e) => handleDimensionChange(index, 'alto', e.target.value)}
                  className={styles.inputField}
                />
              </div>
            )}

            {formulario.tipo === 'ventana' && (
              <div className={styles.section}>
                <label className={styles.label}>Ventana (Ancho x Alto)</label>
                <input
                  type="number"
                  placeholder="Ancho"
                  value={formulario.dimensions.ancho}
                  onChange={(e) => handleDimensionChange(index, 'ancho', e.target.value)}
                  className={styles.inputField}
                />
                <input
                  type="number"
                  placeholder="Alto"
                  value={formulario.dimensions.alto}
                  onChange={(e) => handleDimensionChange(index, 'alto', e.target.value)}
                  className={styles.inputField}
                />
              </div>
            )}

            {formulario.tipo === 'logia' && (
              <div className={styles.section}>
                <label className={styles.label}>Logia (Ancho x Alto)</label>
                <input
                  type="number"
                  placeholder="Ancho"
                  value={formulario.dimensions.ancho}
                  onChange={(e) => handleDimensionChange(index, 'ancho', e.target.value)}
                  className={styles.inputField}
                />
                <input
                  type="number"
                  placeholder="Alto"
                  value={formulario.dimensions.alto}
                  onChange={(e) => handleDimensionChange(index, 'alto', e.target.value)}
                  className={styles.inputField}
                />
              </div>
            )}

            {/* Selección de Material */}
           {/*  <div className={styles.section}>
              <label className={styles.label}>Material</label>
              <select value={formulario.material} onChange={(e) => handleChange(index, 'material', e.target.value)} className={styles.inputField}>
                <option value="MONOFILAMENTO (POLIAMIDA NYLON)">MONOFILAMENTO (POLIAMIDA NYLON)</option>
                */}
                
                {/* Agrega más opciones de material si es necesario */}
             {/* </select>
            </div> */}

            {/* Selección de Grosor 
            {/* <div className={styles.section}>
              <label className={styles.label}>Grosor de la Malla</label>
              <select value={formulario.grosor} onChange={(e) => handleChange(index, 'grosor', e.target.value)} className={styles.inputField}>
                <option value="2 mm">2 mm</option>
                <option value="3 mm">3 mm</option>
              </select>
            </div>
            */}

          </div>
        ))}
      </div>

      {/* Botón para agregar nuevo formulario */}
      <button onClick={agregarFormulario} className={styles.button}>
        Agregar
      </button>

      {/* Mostrar el Precio Total */}
      <div className="text-2xl font-semibold text-green-600">
        <h3>
          Precio Total Estimado: ${isNaN(precioTotal) ? '0.00' : precioTotal.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default Calculator;
