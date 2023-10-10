//Recebe o que precisamos para criar a reserva no db
//user
//startDate
//endDate

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(request: Request) {
  const req = await request.json();
    
 const generatePrisma = () => {
    const prismaGenerate = spawn("npx", ["prisma", "generate"], {
      stdio: "inherit",
    });
    const prismaMigrate = spawn("npx", ["prisma", "migrate", "deploy"], {
      stdio: "inherit",
    });
    const prismaPull = spawn("npx", ["prisma", "db", "pull"], {
      stdio: "inherit",
    });


    prismaGenerate.on("close", (code) => {
      if (code === 0) {
        console.log("Prisma generation completed successfully.");
      } else {
        console.error(`Prisma generation failed with code ${code}.`);
      }
    });

    
    prismaMigrate.on("close", (code) => {
      if (code === 0) {
        console.log("Prisma generation completed successfully.");
      } else {
        console.error(`Prisma generation failed with code ${code}.`);
      }
    });


    
    prismaPull.on("close", (code) => {
      if (code === 0) {
        console.log("Prisma generation completed successfully.");
      } else {
        console.error(`Prisma generation failed with code ${code}.`);
      }
    });
  };
  const {
    citysSelected,
    highLights,
    uploadedImages,
    countryCode,
    descriptions,
  } = req.data;

  await prisma.trip.create({
    data: {
      name: descriptions.title,
      location: citysSelected.cityName,
      locationDescription: "n",
      description: descriptions.description,
      startDate: descriptions.startDate,
      endDate: descriptions.endDate,
      pricePerDay: descriptions.pricePerDay,
      coverImage: uploadedImages[0],
      imagesUrl: uploadedImages,
      highlights: highLights,
      maxGuests: parseInt(descriptions.guests),
      countryCode: countryCode,
      recommended: true,
      lat: citysSelected.positions.lat.toString(),
      lng: citysSelected.positions.lng.toString(),
    },
  });

  generatePrisma();

  return new NextResponse(
    JSON.stringify({
      req,
    }),
    { status: 201 }
  );
}
