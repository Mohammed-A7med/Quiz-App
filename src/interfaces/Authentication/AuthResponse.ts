// Shared interface for email
interface EmailField {
  email: string;
}

// Shared interface for password
interface PasswordField {
  password: string;
}

// Register form data extends from common fields
export interface RegisterFormData extends EmailField, PasswordField {
  first_name: string;
  last_name: string;
  role: "Instructor" | "Student";
}

// Login form data extends from common fields
export interface LoginFormData extends EmailField, PasswordField {}

// Forget password form only requires email
export interface ForgetPasswordFormData extends EmailField {}

// Reset password form data extends from login form and adds an OTP
export interface ResetPasswordFormData extends EmailField, PasswordField {
  otp: string;
}

// Change password form data
export interface ChangePasswordFormData extends PasswordField {
  password_new: string;
}

// Error response interface stays the same
export interface AxiosErrorResponse {
  data: {
    message: string;
  };
  [key: string]: any;
}
