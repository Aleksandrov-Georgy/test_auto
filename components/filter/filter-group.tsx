"use client";

import React from "react";
import S from "./filter.module.scss";
import { Select } from "antd";
import rootAPI from "@/app/api/getData";
import { FilterTypes } from "@/types/dataTypes";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/redux";

export const FilterGroup: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { allCars } = useAppSelector((state) => state.root);

  const queryBrand = searchParams.get("brand");
  const queryModel = searchParams.get("model");
  const queryTariff = searchParams.get("tarif");
  const page = searchParams.get("page");

  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<FilterTypes>();

  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedModels, setSelectedModels] = React.useState<string[]>([]);
  const [selectedTariff, setSelectedTariff] = React.useState<string[]>([]);

  const [initialModels, setInitialModels] = React.useState<string[]>([]);
  const [variantsModel, setVariantsModel] = React.useState<string[]>([]);
  const [variantsTariff, setVariantsTariff] = React.useState<string[]>([]);

  const fetchData = async () => {
    queryBrand && setSelectedBrands([queryBrand][0].split(","));
    queryModel && setSelectedModels([queryModel][0].split(","));
    queryTariff && setSelectedTariff([queryTariff][0].split(","));

    try {
      const res = await rootAPI.getCatalog();
      setFilters(res.data);
      setInitialModels(
        res.data.models.values
          .map((el) => [...initialModels].concat(el.models))
          .flat(Infinity)
          .filter((el) => el !== undefined) as string[]
      );
      setVariantsTariff(Object.values(res.data.tarif.values));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeBrand = (value: string[]) => {
    setSelectedBrands(value);
    function getModelsByBrands(value: string[], filters: FilterTypes) {
      const filteredModels = filters.models.values.filter((modelGroup) => {
        return value.includes(modelGroup.brand);
      });

      const models = filteredModels.map((modelGroup) => {
        return modelGroup.models;
      });

      return models.flat(Infinity) as string[];
    }

    const models = getModelsByBrands(value, filters!);
    setVariantsModel(models);
  };

  const handleSelectedModel = (value: string[]) => {
    setSelectedModels(value);
  };

  const handleSelectedTarif = (value: string[]) => {
    setSelectedTariff(value);
  };

  React.useEffect(() => {
    router.push(
      `?brand=${selectedBrands}&model=${selectedModels}&tarif=${selectedTariff}&page=${page}`,
      { scroll: false }
    );
  }, [page, router, selectedBrands, selectedModels, selectedTariff]);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={S.filters}>
      {allCars && (
        <>
          <Select
            defaultValue={selectedBrands}
            loading={loading}
            mode="multiple"
            maxTagCount={3}
            allowClear
            className={S.select}
            placeholder={filters?.brands.name}
            options={filters?.brands.values.map((item: string) => ({
              value: item,
              label: item,
            }))}
            onChange={handleChangeBrand}
          />
          <Select
            defaultValue={selectedModels}
            loading={loading}
            maxTagCount={3}
            mode="multiple"
            allowClear
            className={S.select}
            placeholder={filters?.models.name}
            options={
              variantsModel?.length
                ? variantsModel.map((item: string) => ({
                    value: item,
                    label: item,
                  }))
                : initialModels?.map((item: string) => ({
                    value: item,
                    label: item,
                  })) || []
            }
            onChange={handleSelectedModel}
          />
          <Select
            defaultValue={selectedTariff}
            maxTagCount={2}
            loading={loading}
            mode="multiple"
            allowClear
            className={S.select}
            placeholder={filters?.tarif.name}
            options={variantsTariff?.map((item: string) => ({
              value: item,
              label: item,
            }))}
            onChange={handleSelectedTarif}
          />
        </>
      )}
    </div>
  );
};
