"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5 ">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className=" px-5 whitespace-nowrap text-center font-medium text-grayPrimary ">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>
      <div className="flex justify-between  mt-5 text-grayPrimary quick-search_container w-full">
        <Swiper
          spaceBetween={50}
          slidesPerView={5}
          freeMode={true}
          className="w-full"
          scrollbar={{
            hide: true,
          }}
          modules={[FreeMode, Scrollbar]}
          breakpoints={{
            0: {
              navigation: false,
              slidesPerView: 3,
              spaceBetween: 10,
              slidesPerGroup: 3,
            },
            580: {
              slidesPerView: 5,
              spaceBetween: 20,
              slidesPerGroup: 2,
            },

            995: {
              slidesPerView: 6,
              spaceBetween: 20,
              slidesPerGroup: 4,
            },
          }}
        >
          <SwiperSlide>
            {" "}
            <div>
              <Link
                className="flex flex-col  items-center  pb-10pb-10"
                href="/trips/search?text=hotel"
              >
                <Image
                  width={35}
                  height={35}
                  src="/hotel-icon.png"
                  alt="Hotel"
                />
                <p className=" text-sm  ">Hotel</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=fazenda"
              >
                <Image
                  width={35}
                  height={35}
                  src="/farm-icon.png"
                  alt="Fazenda"
                />
                <p className="text-center text-sm  ">Fazenda</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=chalé"
              >
                <Image
                  width={35}
                  height={35}
                  src="/cottage-icon.png"
                  alt="Chalé"
                />
                <p className="text-center text-sm  ">Chalé</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=pousada"
              >
                <Image
                  width={35}
                  height={35}
                  src="/inn-icon.png"
                  alt="Pousada"
                />
                <p className="text-center text-sm  ">Pousada</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=apartamento"
              >
                <Image
                  width={35}
                  height={35}
                  src="/Apartment.png"
                  alt="Apartamento"
                />
                <p className="text-center text-sm  ">Apartamento</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=celeiro"
              >
                <Image width={35} height={35} src="/Barn.png" alt="Celeiro" />
                <p className="text-center text-sm  ">Celeiro</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=cabana"
              >
                <Image width={35} height={35} src="/Cabin.png" alt="Cabana" />
                <p className="text-center text-sm  ">Cabana</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=van"
              >
                <Image width={35} height={35} src="/Campervan.png" alt="Van" />
                <p className="text-center text-sm  ">Van</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=castelo"
              >
                <Image width={35} height={35} src="/Castle.png" alt="Castelo" />
                <p className="text-center text-sm  ">Castelo</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=cúpula"
              >
                <Image width={35} height={35} src="/Dome.png" alt="Castelo" />
                <p className="text-center text-sm  ">Cúpula</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=tenda"
              >
                <Image width={35} height={35} src="/Tent.png" alt="Tenda" />
                <p className="text-center text-sm  ">Tenda</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=barco"
              >
                <Image
                  width={35}
                  height={35}
                  src="/Houseboat.png"
                  alt="CasaNoBarco"
                />
                <p className="text-center text-sm  ">Barco</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=arvore"
              >
                <Image
                  width={35}
                  height={35}
                  src="/Tree house.png"
                  alt="casa na árvore"
                />
                <p className="text-center text-sm  ">Árvore</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Link
                className="flex flex-col  items-center  pb-10"
                href="/trips/search?text=torre"
              >
                <Image width={35} height={35} src="/Tower.png" alt="tower" />
                <p className="text-center text-sm  ">Torre</p>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default QuickSearch;
