import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_PROJECTS_ENDPOINT_URL, API_HTTP_OPTIONS, API_PROJECTS_TYPES_ENDPOINT_URL } from '../constants';
import { ProjectDto } from '../dtos/project-dto';
import { ProjectTypeDto } from '../dtos/project-type-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  /**
   * Get projects
   * We use "pipe" over the Observable to catch the error using operator RxJS catchError()
   * Observable can return multiple values, but An HttpClient Observable always emits a single value and ends
   * Tap only registers the operation (on log)
   */
  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(API_PROJECTS_ENDPOINT_URL)
      .pipe(
        tap(users => console.log('fetched projects')),
        catchError(this.handleError)
      );
  }

  /**
   * Delete project by id
   * Tap to check on console
   * @param id 
   */
  deleteProject(id: number): Observable<any> {
    const url = `${API_PROJECTS_ENDPOINT_URL}/${id}`;
    return this.http.delete<any>(url, API_HTTP_OPTIONS).pipe(
      tap(_ => console.log(`deleted project with id=${id}`)),
      catchError(this.handleError)
    );
  }

  /**
   * Get project by id
   * @param id 
   */
  getProject(id: number): Observable<ProjectDto> {
    const url = `${API_PROJECTS_ENDPOINT_URL}/${id}`;
    return this.http.get<ProjectDto>(url)
      .pipe(
        tap(project => console.log(`fetched project with id ${id}`)),
        catchError(this.handleError)
      );
  }

  /**
   * Create project
   * @param project 
   */
  createProject(project: ProjectDto): Observable<any> {
    return this.http.post(API_PROJECTS_ENDPOINT_URL, project, API_HTTP_OPTIONS).pipe(
      tap(newProject => console.log(`project created successfully: ${newProject}`)),
      catchError(this.handleError)
    );
  }

  /**
   * Update project
   * @param project 
   */
  updateProject(project: ProjectDto): Observable<any> {
    const url = `${API_PROJECTS_ENDPOINT_URL}`;
    return this.http.put(url, project, API_HTTP_OPTIONS).pipe(
      tap(updatedProject => console.log(`project updated successfully: ${updatedProject}`)),
      catchError(this.handleError)
    );
  }

  /**
   * Get project type
   */
  getProjectTypes(): Observable<any> {
    return this.http.get<ProjectTypeDto[]>(API_PROJECTS_TYPES_ENDPOINT_URL)
      .pipe(
        tap(projectTypes => console.log('fetched projectTypes')),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
