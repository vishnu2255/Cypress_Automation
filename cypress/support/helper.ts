
export const dateParamToISO = (date: { day: string; month: string; year: string }) => {
    const monthNumber = new Date(`${date.month} 1, ${date.year}`).getMonth() + 1;
    const paddedMonth = monthNumber.toString().padStart(2, '0');
    const paddedDay = date.day.padStart(2, '0');
    return `${date.year}-${paddedMonth}-${paddedDay}`;
  };