import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./baseURL";
import { AllCarsProps, CarById, FilterTypes } from "@/types/dataTypes";

const api = axios.create({
  baseURL: BASE_URL,
});

class rootAPI {
  /** Получить список авто с маркой, моделью и тарифом */
  static async getCatalog(): Promise<AxiosResponse<FilterTypes>> {
    return api.get<FilterTypes>(`${BASE_URL}/test/?w=catalog-filter`);
  }

  /**
   * Асинхронно получает список всех автомобилей.
   *
   * @return {Promise<AxiosResponse<AllCarsProps>>} возвращает промис, который разрешается в ответ от API с данными всех автомобилей.
   */
  static async getAllCars(page: string): Promise<AxiosResponse<AllCarsProps>> {
    return api.get<AllCarsProps>(
      `${BASE_URL}/test/?w=catalog-cars&page=${page}`
    );
  }

  /**
   * Получает информацию о машине по её идентификатору из API.
   *
   * @param {string} id - Идентификатор авто.
   * @return {Promise<AxiosResponse<CarById>>} Промис, который возвращает данные, содержащим детали авто.
   */

  static async getCarById(id: string): Promise<AxiosResponse<CarById>> {
    return api.get<any>(`${BASE_URL}/test/?w=catalog-car&id=${id}`);
  }
}

export default rootAPI;
