import { z } from "zod";

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({ required_error: 'academic department is required!' }),
    semesterRegistrationId: z.string({ required_error: 'semester registration is required!' }),
    courseIds: z.array(z.string({ required_error: 'course is required!' }),{required_error: 'course ids are required!'}),
  })
})

export const OffredCourseValidations = {
  create
}