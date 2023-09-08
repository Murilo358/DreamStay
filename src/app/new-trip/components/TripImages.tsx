"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { LiaSpinnerSolid } from "react-icons/lia";
import Button from "@/components/Button";

interface tripImagesProps {
  setUploadedImages: any;
}

const TripImages = ({ setUploadedImages }: tripImagesProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [addedImages, setAddedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [disabledButton, setdisabledButton] = useState(false);

  async function uploadImage(image: File) {
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "my-uploads");
    setLoading(true);
    setdisabledButton(true);
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dcrhnzor7/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        toast.error(
          "Oops, erro ao fazer upload da image, tente novamente mais tarde!",
          {
            position: "bottom-center",
          }
        );
        setdisabledButton(false);
      });

    setUploadedImages((prevImages: any) => [...prevImages, data.url]);
    setLoading(false);
  }

  const handleClick = async () => {
    for (const image of images) {
      try {
        await uploadImage(image);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            // Verifique se reader.result é uma string
            const base64String = reader.result.split(",")[1];

            if (addedImages.includes(base64String)) {
              toast.error("Oops, essa imagem já foi adicionada!", {
                position: "bottom-center",
              });
            } else if (images.length === 5) {
              toast.error("Oops, nós aceitamos apenas 5 imagens!", {
                position: "bottom-center",
              });
            } else {
              setAddedImages((prevImages) => [...prevImages, base64String]);
              setImages((prevImages) => [...prevImages, file]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [addedImages, images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <h1
        data-aos="zoom-in"
        className="font-medium mt-10 mb-10 text-xl text-primaryDarker lg:text-3xl"
      >
        Adicione 5 fotos a sua acomodação
      </h1>
      <div
        data-aos="zoom-in"
        className="w-[380px] h-[380px] rounded-sm shadow-lg cursor-pointer"
        {...getRootProps()}
      >
        <Image alt="imageAdd" width={380} height={380} src="/addImage.png" />
        <input {...getInputProps()} />
      </div>
      {isDragActive ? (
        <p>Arraste as imagens aqui...</p>
      ) : (
        <p>Arraste as imagens aqui, ou clique para selecioná-las</p>
      )}
      {addedImages?.length > 0 && (
        <div className="flex gap-3 mt-4 justify-center flex-wrap">
          {addedImages.map((image) => (
            <Image
              className=" shadow-md rounded-sm"
              width={200}
              height={120}
              key={image}
              alt="imageAdd"
              src={`data:image/png;base64, ${image}`}
            />
          ))}
        </div>
      )}
      {images.length == 5 && (
        <button
          disabled={disabledButton}
          className={`mt-6 w-[200px]  h-[35px] bg-primary flex  justify-center rounded-sm text-white items-center ${
            disabledButton ? "bg-grayPrimary" : "hover:bg-primaryDarker"
          }  `}
          onClick={() => handleClick()}
        >
          {loading ? (
            <LiaSpinnerSolid className="animate-spin  w-[35px] h-[35px]" />
          ) : (
            "Confirmar"
          )}
        </button>
      )}
    </>
  );
};

export default TripImages;
