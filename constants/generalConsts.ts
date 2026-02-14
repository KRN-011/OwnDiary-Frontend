// REGEXs
export const REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  username: /^[a-zA-Z0-9_]+$/,
};

// Password check conditions
export const PASSWORD_CONDITIONS = (passwordValue: string) => {
  return {
    length: passwordValue?.length >= 8,
    uppercase: /[A-Z]/.test(passwordValue || ""),
    lowercase: /[a-z]/.test(passwordValue || ""),
    number: /\d/.test(passwordValue || ""),
    special: /[@$!%*?&]/.test(passwordValue || ""),
  };
};
