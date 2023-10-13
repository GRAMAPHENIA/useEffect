/* eslint-disable react/jsx-key */
"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setItems(json));

    return () => {
      console.log("vualta al recurso que cambia");
    };
  }, [resourceType]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-20">
      <h1 className="text-4xl">REACT CON NEXT</h1>
      <div>
        <h2 className="text-2xl">🧩useEffect</h2>
        <section className="space-x-2 space-y-5">
          <button
            className="border-2 border-gray-600 px-4 py-2 rounded-full"
            onClick={() => setResourceType("posts")}
          >
            Publicaciones
          </button>
          <button
            className="border-2 border-gray-600 px-4 py-2 rounded-full"
            onClick={() => setResourceType("users")}
          >
            Usuarios
          </button>
          <button
            className="border-2 border-gray-600 px-4 py-2 rounded-full"
            onClick={() => setResourceType("comments")}
          >
            Comentarios
          </button>
        </section>
        <h1 className="pt-4 capitalize text-4xl">{resourceType}</h1>
      </div>
      {items.map((item) => (
        <div key={item.id} className="max-w-[600px] border p-4 my-4">
          <p>
            🧿 {item.title}
            {item.name}
          </p>
        </div>
      ))}
      <footer>🔓hecho con Next, React y Tailwind </footer>
    </main>
  );
}
