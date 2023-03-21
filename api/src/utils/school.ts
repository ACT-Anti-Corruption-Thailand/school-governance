export const getCurrentSchoolYear = () => {
	const now = new Date();
	return now.getFullYear() - +(now.getMonth() < 4);
};
