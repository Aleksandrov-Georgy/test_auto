"use client";

import React from "react";
import { FilterGroup } from "../../components/filter/filter-group";
import S from "./main.module.scss";
import { useAppSelector } from "@/redux/hooks/redux";
import CarsList from "@/components/cats-list/CarsList";
import { Pagination, PaginationProps } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const queryBrand = searchParams.get("brand");
  const queryModel = searchParams.get("model");
  const queryTariff = searchParams.get("tarif");

  const { allCars } = useAppSelector((state) => state.root);

  const onChange: PaginationProps["onChange"] = (page) => {
    router.push(
      `?brand=${queryBrand}&model=${queryModel}&tarif=${queryTariff}&page=${page}`,
      { scroll: false }
    );
  };

  return (
    <div className={S.main}>
      <FilterGroup />
      <>
        <CarsList />
      </>
      {allCars && (
        <div className={S.pagination}>
          <Pagination
            current={+page}
            onChange={onChange}
            total={allCars?.pages ? allCars?.pages * 10 : 0}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
