import { Router } from "express"
import { exampleController } from "../controllers/example.controller.js"
import { asyncHandler } from "../middleware/async-handler.js"

/**Routes for the resume website. */
const resumeRoutes = Router()

resumeRoutes.get(
	"/",
	asyncHandler((req, res) => exampleController.getAll(req, res))
)
resumeRoutes.get(
	"/:id",
	asyncHandler((req, res) => exampleController.getById(req, res))
)
resumeRoutes.post(
	"/",
	asyncHandler((req, res) => exampleController.create(req, res))
)
resumeRoutes.put(
	"/:id",
	asyncHandler((req, res) => exampleController.update(req, res))
)
resumeRoutes.delete(
	"/:id",
	asyncHandler((req, res) => exampleController.delete(req, res))
)

export { resumeRoutes }
