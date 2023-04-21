// Debug function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getYear(specifiedTime: Date): number {
	const now = new Date();
	return now.getFullYear() - +(now < specifiedTime);
}

export const getCurrentSchoolYear = () => {
	const now = new Date();
	return now.getFullYear() - +(now.getMonth() < 4);
	// return getYear(new Date(2023, 2, 25));
};
