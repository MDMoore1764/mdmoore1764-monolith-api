import { Router } from "express"
import { resumeRoutes } from "./resume.routes.js"

/**General API routes, typically for diagnostics or other common functions. */
export const generalRoutes = Router()

generalRoutes.get("/health", async (req, res) => {
	await new Promise<void>((res, _rej) => {
		setTimeout(res, Math.random() * 5000)
	})

	res.json({ status: "ok", timestamp: new Date().toISOString() })
})

generalRoutes.use("/resume", resumeRoutes)
