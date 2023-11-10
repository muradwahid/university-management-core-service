/* eslint-disable @typescript-eslint/no-explicit-any */
import { Building, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IBuildingFilterRequest } from "./building.interface";
import { IGenericResponse } from "../../../interfaces/common";
import { buildingSearchAbleFields } from "./building.constant";

const insertIntoDb=async (data:Building):Promise<Building> => {
  const result = await prisma.building.create({
    data
  }) 
  return result
}
const getAllFromDb = async (options:IPaginationOptions, filters:IBuildingFilterRequest): Promise<IGenericResponse<Building[]>> => {
  const {limit,page,skip} =paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: buildingSearchAbleFields.map(field => ({
        [field]: {
          contains:searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};
  const result = await prisma.building.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:options.sortBy && options.sortOrder
        ? {
            [options.sortBy as any]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  return {
    meta: {
      limit,
      page,
      total: await prisma.building.count(),
    },
    data: result,
  }
}
export const BuildingService = {
  insertIntoDb,
  getAllFromDb,
};