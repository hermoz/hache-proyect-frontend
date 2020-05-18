import { HttpHeaders } from '@angular/common/http';
export const API_HTTP_OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

export const API_URL = 'http://localhost:8080/api';
export const API_AUTH_ENDPOINT_URL = API_URL + '/auth/authenticate';
export const API_USERS_ENDPOINT_URL = API_URL + '/users';
export const API_ROLES_ENDPOINT_URL = API_URL + '/roles';
export const API_PROJECTS_ENDPOINT_URL = API_URL + '/projects';

// privilege names
export const CREATE_USERS = 'CREATE_USERS';
export const CREATE_PROJECTS = 'CREATE_PROJECTS';
export const READ_USERS = 'READ_USERS';
export const READ_PROJECTS = 'READ_PROJECTS';
export const READ_CUSTOMERS = 'READ_CUSTOMERS';
export const DELETE_USERS = 'DELETE_USERS';
export const DELETE_PROJECTS = 'DELETE_PROJECTS';