import { z } from 'zod';

const create = z.object({
  body: z.object({
    year: z.number({ required_error: 'year is required!' }),
    title: z.string({ required_error: 'title is required!' }),
    code: z.string({ required_error: 'code is required!' }),
    startMonth: z.string({ required_error: 'start month is required!' }),
    endMonth: z.string({ required_error: 'end month is required!' }),
  }),
});
const updateAcademicSemester = z.object({
  body: z.object({
    year: z.string().optional(),
    title: z.string().optional(),
    code: z.string().optional(),
    startMonth: z.string().optional(),
    endMonth: z.string().optional(),
  })
})
export const AcademicSemesterZodValidation = {
  create,
  updateAcademicSemester,
};
