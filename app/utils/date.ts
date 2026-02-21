/**
 * Returns true if the given year is a leap year
 * @param year
 * @returns true if the leap, false otherwise
 */
const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * Returns the number of days in the given month
 * @param year
 * @param month
 * @returns number of days in the month
 */
export const getDaysInMonth = (year: number, month: number): number => {
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }
    if ([4, 6, 9, 11].includes(month)) {
        return 30;
    }
    return 31;
};

/**
 * Returns the day of the week for the first day of the given month
 * @param year 
 * @param month 
 * @returns day of the week (0=Sunday, 6=Saturday)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month - 1, 1).getDay();
};

/**
 * Returns a formatted date string in "YYYY-MM-DD" format
 * @param year 
 * @param month 
 * @param day 
 * @returns a formatted date string in "YYYY-MM-DD" format
 */
export const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};
