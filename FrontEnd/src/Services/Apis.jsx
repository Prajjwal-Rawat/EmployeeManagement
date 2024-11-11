const BaseUrl = import.meta.env.VITE_APP_BASE_URL;


export const loginApi  = BaseUrl + "login";
export const createEmployee = BaseUrl + "createEmployee"
export const getAllEmployees = BaseUrl + "getAllEmployees"
export const getEmployeeById = BaseUrl + "getEmployee/:id"
export const updateEmployee = BaseUrl + "updateEmployee/:id"
export const deleteEmployee = BaseUrl + "deleteEmployee/:id"