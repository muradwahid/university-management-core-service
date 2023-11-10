/* eslint-disable @typescript-eslint/no-explicit-any */
import { Faculty } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IFacultyFilterAbleFields } from "./faculty.interface";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { FacultySearchAbleField } from "./faculty.constant";


const getAllFromDb=async (options:IPaginationOptions,filters:IFacultyFilterAbleFields):Promise<IGenericResponse<Faculty[] >> => {
  const {page,limit,skip}=paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: FacultySearchAbleField.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};
    const result = await prisma.faculty.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy as any]: options.sortOrder,
            }
          : {
              createdAt: 'desc',
            },
      include: {
        academicDepartment: true,
        academicFaculty: true,
      },
    });
    const total = await prisma.faculty.count();
    return {
      meta: {
        limit,
        page,
        total,
      },
      data: result,
    };
}
const getDataById = async (id:string):Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id
    },
    include: {
      academicDepartment: true,
      academicFaculty: true
    }
  })
  return result;
}
const insertIntoDb = async (data:Faculty):Promise<Faculty> => {
  const result=await prisma.faculty.create({
    data,
    include: {
      academicDepartment: true,
      academicFaculty: true
    }
  })
  return result;
}
const updateIntoDb =async (id:string,data:Partial<Faculty>):Promise<Faculty> => { 
  const result = await prisma.faculty.update({
    where: {
      id
    },
    data,
    include: {
      academicDepartment: true,
      academicFaculty: true
    }
  })
  return result
}
const deleteFromDb = async (id:string) => {
  const result = await prisma.faculty.delete({
    where: {
      id
    }
  })
  return result;
}
export const FacultyService = {
  insertIntoDb,
  getAllFromDb,
  getDataById,
  updateIntoDb,
  deleteFromDb,
};