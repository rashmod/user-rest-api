// custom.d.ts

declare module 'express-session' {
	interface SessionData {
		user: any; // Modify 'any' to match your actual user data structure
	}
}
