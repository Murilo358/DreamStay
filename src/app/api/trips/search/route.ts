import { prisma } from "@/lib/prisma";
import { Console } from "console";
import { NextResponse } from "next/server";

const generateSearchQuery = (
  text: string,
  endDate?: string | null,
  budget?: string | null
) => {
  let searchQuery: any = {
    OR: [
      {
        name: {
          search: text,
        },
      },
      {
        location: {
          search: text,
        },
      },
      {
        description: {
          search: text,
        },
      },
    ],
    AND: [],
  };

  if (endDate !== "undefined" && endDate !== "null") {
    searchQuery = {
      ...searchQuery,
      AND: [
        ...searchQuery.AND,
        {
          endDate: {
            //gte: maior ou igual a data
            lte: endDate,
          },
        },
      ],
    };
  }
  if (budget !== "undefined" && budget !== "null") {
    searchQuery = {
      ...searchQuery,
      AND: [
        ...searchQuery.AND,
        {
          pricePerDay: {
            //lte: menor ou igual a data
            lte: Number(budget),
          },
        },
      ],
    };
  }
  console.log(endDate);
  return searchQuery;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  const endDate = searchParams.get("endDate");
  const budget = searchParams.get("budget");

  if (!text) {
    return new NextResponse(
      JSON.stringify({
        message: "missing text paramater",
      }),
      { status: 400 }
    );
  }

  const trips = await prisma.trip.findMany({
    where: generateSearchQuery(text, endDate, budget),
  });

  return new NextResponse(JSON.stringify(trips), { status: 200 });
}
