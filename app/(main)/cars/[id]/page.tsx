"use client";

import React, { Suspense } from "react";
import rootAPI from "@/app/api/getData";
import S from "./cars.module.scss";
import { CarId } from "@/types/dataTypes";
import { Button } from "antd";
import { useRouter } from "next/navigation";
const CarouselImage = React.lazy(() => import("@/components/carusel/carusel"));

const Cars = ({ params: { id } }: { params: { id: string } }) => {
  const [dataCar, setDataCar] = React.useState<CarId>();
  const router = useRouter();

  const fetchData = async (id: string): Promise<void> => {
    try {
      const response = await rootAPI.getCarById(id);
      setDataCar(response.data.item);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <>
      <div className={S.wrapper}>
        <div className={S.image}>
          <Suspense fallback={<div>Loading...</div>}>
            <CarouselImage image={dataCar?.images} />
          </Suspense>
        </div>
        <div className={S.content}>
          <h1>
            {dataCar?.brand} {dataCar?.model}
          </h1>
          {dataCar?.price && <p>Стоимость: {dataCar?.price}</p>}
          {!!dataCar?.tarif.length && <p>Тариф: {dataCar?.tarif[0]}</p>}
        </div>
      </div>
      <Button
        onClick={() => router.back()}
        className={S.button_back}
      >
        Назад
      </Button>
    </>
  );
};

export default Cars;
