// Email validation rules
export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email",
  },
};

// Regular expression (RegEx) for password validation
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/;

// Password validation rules
export const PasswordValidation = {
  required: "Password is required",
  pattern: {
    value: passwordRegEx,
    message:
      "Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};

// Generic validation rule for required fields
// Takes in a field name as a parameter and returns a rule that makes the field required
export const RequiredField = (fieldName: string) => ({
  // Displays a custom error message indicating that the given field is required
  required: `${fieldName} is required`,
});
