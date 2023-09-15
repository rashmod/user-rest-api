import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const connectDB = async () => {
	try {
		const connection = await prisma.$connect();
		console.log('successfully connected to the database');
	} catch (error) {
		console.log('error connecting to the database');
		console.log('Error: ', error);
	}
};

export default connectDB;
