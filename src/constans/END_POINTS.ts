// Base URL for the API
const BASE_URLS = "https://upskilling-egypt.com:3005/api"

// Function to get request headers, particularly for authorization
export const requestHeader = () => {
  return {
    // Authorization header with the user token from localStorage
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  }
}

//AUTHENTICATION_BASE_URL urls
const AUTHENTICATION_BASE_URL = `${BASE_URLS}/auth`

export const AUTH_URLs = {
  // URL for user login
  login: `${AUTHENTICATION_BASE_URL}/login`,

  // URL for user registration
  register: `${AUTHENTICATION_BASE_URL}/register`,

  // URL for requesting a password reset link
  forgotPassword: `${AUTHENTICATION_BASE_URL}/forgot-password`,

  // URL for resetting the password
  ResetPassword: `${AUTHENTICATION_BASE_URL}/reset-password`,

  // URL for changing the user's password
  ChangePassword: `${AUTHENTICATION_BASE_URL}/change-password`,
}

//QUESTIONS_BASE_URL urls
const QUESTIONS_BASE_URL = `${BASE_URLS}/question`

export const QUESTION_URLs = {
  fetchAllQuestions: `${QUESTIONS_BASE_URL}`,
  fetchQuestion: (id: string) => `${QUESTIONS_BASE_URL}/${id}`,
  addQuestion: `${QUESTIONS_BASE_URL}`,
  updateQuestion: (id: string) => `${QUESTIONS_BASE_URL}/${id}`,
  deleteQuestion: (id: string) => `${QUESTIONS_BASE_URL}/${id}`,
}
