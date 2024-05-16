export const isAdult = (birthdate: string) => {
  const today = new Date();
  const birthdateArray = birthdate.split('/');
  const birthYear = parseInt(birthdateArray[2], 10);
  const birthMonth = parseInt(birthdateArray[1], 10);
  const birthDay = parseInt(birthdateArray[0], 10);

  const age = today.getFullYear() - birthYear;
  const monthDifference = today.getMonth() - birthMonth;

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDay)
  ) {
    return age - 1 >= 18;
  }

  return age >= 18;
};
