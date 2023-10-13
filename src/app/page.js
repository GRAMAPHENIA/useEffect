"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [resourceType, setResourceType] = useState("posts");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const itemsPerPage = 4;
  const totalItems = 100; // Asume un total de 100 elementos

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;

    fetch(
      `https://jsonplaceholder.typicode.com/${resourceType}?_start=${startIndex}&_limit=${itemsPerPage}`
    )
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, [resourceType, page]);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Ajusta el número máximo de números de página a mostrar
  const maxPageNumbers = 5;

  // Calcula el número de la página actual
  const currentPage = page;

  // Calcula el primer y último número de página a mostrar
  let startPage = currentPage - Math.floor(maxPageNumbers / 2);
  let endPage = currentPage + Math.floor(maxPageNumbers / 2);

  // Asegura de que no se muestren números de página negativos o mayores que el total de páginas
  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, maxPageNumbers);
  } else if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - maxPageNumbers + 1);
  }

  // Genera un array de números de página dentro del rango
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <h1 className="text-4xl mb-10">REACT CON NEXT</h1>
      <div>
        <h2 className="text-2xl">🧩useEffect</h2>
        <section className="space-x-2 space-y-5">
          <button
            className="border-2 border-gray-600 bg-slate-900 hover:bg-slate-700 px-4 py-2 rounded-full"
            onClick={() => setResourceType("posts")}
          >
            Publicaciones
          </button>
          <button
            className="border-2 border-gray-600 bg-slate-900 hover:bg-slate-700 px-4 py-2 rounded-full"
            onClick={() => setResourceType("users")}
          >
            Usuarios
          </button>
          <button
            className="border-2 border-gray-600 bg-slate-900 hover:bg-slate-700 px-4 py-2 rounded-full"
            onClick={() => setResourceType("comments")}
          >
            Comentarios
          </button>
        </section>
        <h1 className="pt-4 capitalize text-4xl">{resourceType}</h1>
      </div>
      <div className="w-[470px] m-5 space-y-10">
        {items.map((item) => (
          <div key={item.id} className="border rounded-xl p-4 space-y-10">
            <h1 className="text-slate-300">
              <span className="text-2xl text-white">Titulo:</span> {item.name}
            </h1>

            <p className="text-slate-300">
              <span className="text-2xl text-white">Comenterio:</span>
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="">
        <button
          className="px-5 pb-3 text-2xl border-2 rounded-[50%] p-4 flex-row m-2 justify-center items-center"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ⇐
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`ml-2 ${
              pageNumber === currentPage ? "text-pink-400" : "text-gray-500"
            }`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="px-5 pb-3 text-2xl border-2 rounded-[50%] p-4 flex-row m-2 justify-center items-center"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          ⇒
        </button>
      </div>
      <footer className="mt-5">🔓hecho con Next, React y Tailwind</footer>
    </main>
  );
}
