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

export const days = () => {
  let dd: Array<number | string> = [];
  for (let i = 1; i < 32; i++) {
    if (i < 10) {
      dd = [...dd, `0${i}`];
    } else {
      dd = [...dd, i];
    }
  }
  return dd;
};

export const years = () => {
  let yyyy: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = 1920; i <= currentYear; i++) {
    yyyy = [...yyyy, i];
  }
  return yyyy;
};