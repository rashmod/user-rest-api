import bcrypt from 'bcrypt';

const saltRounds = 12;
export const hashPassword = async (plaintextPassword: string) => {
	const hash = await bcrypt.hash(plaintextPassword, saltRounds);
	return hash;
};

export const comparePassword = async (
	plaintextPassword: string,
	hash: string
) => {
	const result = await bcrypt.compare(plaintextPassword, hash);
	return result;
};
