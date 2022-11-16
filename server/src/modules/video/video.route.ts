import { Router } from "express";
import requireUser from "../../middleware/requireUser";
import { uploadVideoHandler } from "./video.controller";

const videoRouter = Router()

videoRouter.post('/', requireUser, uploadVideoHandler)

export default videoRouter
