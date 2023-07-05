import { prisma } from "@/lib/prisma";
import React, { useState } from "react";

//Com o SSR é possivel se conectar diretamente ao banco de dados assim:
//Ja que é um server component pode se conectar com o prisma
const getTrips = async () => {
  //prisma é o ts criado em lib
  //Faz o acesso ao db e retorna todas as trips através do objeto vazio
  const trips = await prisma.trip.findMany({});
  return trips;
};

const Trips = async () => {
  // const data = await getTrips();
  //Ou também podemos usar um fetch
  //Essa requisição será feita apenas uma vez, e as requisições subsequentes iremos pegar do cache
  //Ou podemos passar como segundo parametro, um objeto com o revalidate que no caso irá se atualizar o cache a cada 10s
  //E caso seja 0 precisamos deletar a pagina .next para excluir o cache, fazendo com que toda vez que o componente
  //seja acessado ele irá fazer a requisição

  const data = await fetch("http://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());
  //Esse fetch é o fetch do nextJs, isso ja faz com que ele traga os dados sem useffect e etc
  //Isso usando o server component
  console.log(data);

  return (
    <div>
      {data.map((i: any) => (
        <p key={i.id}>{i.title}</p>
      ))}
    </div>
  );
};

export default Trips;
