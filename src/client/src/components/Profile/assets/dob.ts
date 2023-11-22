export const months = () => {
  let mm: Array<number | string> = [];
  for (let i = 1; i < 13; i++) {
    if (i < 10) {
      mm = [...mm, `0${i}`];
    } else {
      mm = [...mm, i];
    }

  }
  return mm;
};

export const days = (month: string, year: number) => {
  let dd: number[] = [];
  let i = 1;
  switch (month) {
    case '02':
      const leap = new Date(year, 1, 29).getDate() === 29;
      while (i < 29) {
        dd = [...dd, i];
        i++;
      }
      return dd;
    case '04' || '06' || '09' || '11':
      while (i < 31) {
        dd = [...dd, i];
        i++;
      }
      return dd;
    default:
      while (i < 32) {
        dd = [...dd, i];
        i++;
      }
      return dd;
  }
};

export const years = () => {
  let yyyy: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = 1920; i <= currentYear; i++) {
    yyyy = [...yyyy, i];
  }
  return yyyy;
};