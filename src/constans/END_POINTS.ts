// Base URL for the API
const BASE_URLS = "https://upskilling-egypt.com:3005/api";

// Function to get request headers, particularly for authorization
export const requestHeader = () => {
  return {
    // Authorization header with the user token from localStorage
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  };
};

//AUTHENTICATION_BASE_URL urls
const AUTHENTICATION_BASE_URL = `${BASE_URLS}/auth`;

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
};

//Groups_BASE_URL urls
const GROUPS_BASE_URL = `${BASE_URLS}/group`;

export const GROUPS_URLs = {
  // URL for getting all groups
  getAll: `${GROUPS_BASE_URL}`,

  // URL for creating a new group
  create: `${GROUPS_BASE_URL}`,

  // URL for getting a group by ID
  getById: (id: string) => `${GROUPS_BASE_URL}/${id}`,

  // URL for updating a group by ID
  update: (id: string) => `${GROUPS_BASE_URL}/${id}/update`,

  // URL for deleting a group by ID
  delete: (id: string) => `${GROUPS_BASE_URL}/${id}/delete`,
};
