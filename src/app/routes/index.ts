import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { BuildingRoute } from '../modules/building/building.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { StudentRoutes } from '../modules/student/student.route';
import { RoomRoutes } from '../modules/room/room.route';
import { CourseRouter } from '../modules/course/course.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    routes: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    routes: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    routes: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    routes: StudentRoutes,
  },
  {
    path: '/faculty',
    routes: FacultyRoutes,
  },
  {
    path: '/buildings',
    routes: BuildingRoute,
  },
  {
    path: '/rooms',
    routes: RoomRoutes,
  },
  {
    path: '/courses',
    routes:CourseRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
