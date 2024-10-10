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
  login: `${AUTHENTICATION_BASE_URL}/login`,
  register: `${AUTHENTICATION_BASE_URL}/register`,
  forgotPassword: `${AUTHENTICATION_BASE_URL}/forgot-password`,
  ResetPassword: `${AUTHENTICATION_BASE_URL}/reset-password`,
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

const QUIZ_BASE_URL = `${BASE_URLS}/quiz`

export const QUIZ_URLs = {
  fetchAllQuizzes: `${QUIZ_BASE_URL}`,
  fetchQuiz: (id: string) => `${QUIZ_BASE_URL}/${id}`,
  createQuiz: `${QUIZ_BASE_URL}`,
  updateQuiz: (id: string) => `${QUIZ_BASE_URL}/${id}`,
  deleteQuiz: (id: string) => `${QUIZ_BASE_URL}/${id}`,
  joinQuiz: `${QUIZ_BASE_URL}//join`,
  submitQuiz: (id: string) => `${QUIZ_BASE_URL}/submit/${id}`,
  fetchQuizResults: `${QUIZ_BASE_URL}/result/`,
  fetchFiveUpcomingQuizzes: `${QUIZ_BASE_URL}/incoming`,
  fetchLastFiveQuizzes: `${QUIZ_BASE_URL}/completed`,
  reassignQuiz: (id: string) => `${QUIZ_BASE_URL}/reassign/${id}`,
  fetchQuestionsWithAnswers: (id: string) =>
    `${QUIZ_BASE_URL}/without-answers/${id}`,
}

//Groups_BASE_URL urls
const GROUPS_BASE_URL = `${BASE_URLS}/group`;

export const GROUPS_URLs = {
  getAll: `${GROUPS_BASE_URL}`,
  create: `${GROUPS_BASE_URL}`,
  getById: (id: string) => `${GROUPS_BASE_URL}/${id}`,
  update: (id: string) => `${GROUPS_BASE_URL}/${id}`,
  delete: (id: string) => `${GROUPS_BASE_URL}/${id}`,
};


//student_BASE_URL urls
const STUDENTS_BASE_URL = `${BASE_URLS}/student`;

export const STUDENTS_URLs = {
  getAll: `${STUDENTS_BASE_URL}`,
};
