import express from 'express';
import { BuildingController } from './building.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingZodValidation } from './building.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
router.get('/',BuildingController.getAllFromDb)
router.post('/create-building',auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),validateRequest(BuildingZodValidation.createRoom),BuildingController.insertIntoDb)
export const BuildingRoute = router;