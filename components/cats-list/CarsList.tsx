import React, { useMemo } from "react";
import S from "./cars-list.module.scss";
import { useActions } from "@/redux/hooks/actions";
import rootAPI from "@/app/api/getData";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Car } from "@/types/dataTypes";

export default function CarsList() {
  const searchParams = useSearchParams();
  const { addAllCars } = useActions();

  const [allCars, setAllCars] = React.useState<Car[]>();

  const page = searchParams.get("page");
  const queryBrand = searchParams.get("brand");
  const queryModel = searchParams.get("model");
  const queryTariff = searchParams.get("tarif");

  function filterCars(
    allCars: Car[] | undefined,
    queryBrand: string | null,
    queryModel: string | null,
    queryTariff: string | null
  ): Car[] | undefined {
    if (!queryBrand && !queryModel && !queryTariff) {
      return allCars;
    }

    return allCars?.filter((car) => {
      return (
        (queryBrand && queryBrand.includes(car.brand)) ||
        (queryModel && queryModel.includes(car.model)) ||
        (queryTariff &&
          car.tarif.some((tariff) => queryTariff.includes(tariff)))
      );
    });
  }

  const fetchData = async (page: string): Promise<void> => {
    try {
      const response = await rootAPI.getAllCars(page);
      setAllCars(response.data.list);
      addAllCars(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData(page || "1");
  }, [page]);

  const filteredCars = useMemo(() => {
    return filterCars(allCars, queryBrand, queryModel, queryTariff);
  }, [allCars, queryBrand, queryModel, queryTariff]);

  return (
    <>
      <div className={S.wrapper}>
        {filteredCars?.map((car) => (
          <Link
            href={`/cars/${car.id}`}
            className={S.car}
            key={car.id}
          >
            <img
              src={car.image}
              alt={car.brand}
            />
            <div className={S.content}>
              <h3>
                {car.brand} {car.model}
              </h3>
              <p>Гос. номер: {car.number}</p>

              <p>Стоимость: {car.price}</p>
              <p>Тариф: {car.tarif}</p>
            </div>
          </Link>
        ))}
        {filteredCars?.length === 0 && (
          <h3 className={S.no_data}>Нет данных</h3>
        )}
      </div>
    </>
  );
}
