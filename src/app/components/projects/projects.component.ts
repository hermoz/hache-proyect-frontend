import { Component, OnInit } from '@angular/core';
import { ProjectDto } from '../../dtos/project-dto';
import { ProjectsService } from '../../services/projects.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { CREATE_PROJECTS, DELETE_PROJECTS } from 'src/app/constants';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: ProjectDto[];
  hasCreateProjectsPrivilege: boolean;
  hasDeleteProjectsPrivilege: boolean;
  columns: string[] = [
    'id', 'title', 'type', 'location', 'customer'
  ];

  constructor(private projectsService: ProjectsService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    /**
     * Delete and create are controlled privileges on users
     */
    this.hasCreateProjectsPrivilege = this.tokenStorageService.getPrivileges().has(CREATE_PROJECTS);
    this.hasDeleteProjectsPrivilege = this.tokenStorageService.getPrivileges().has(DELETE_PROJECTS);
    this.getProjects();
  }

  /**
   * Get list of projects
   */
  getProjects() {
    this.projectsService.getProjects()
    .subscribe((res: any) => {
      this.projects = res;
    }, err => {
      this.projects = [];
      alert(err.error.message);
    });
  }

  /**
   * Delete project by id
   * @param id 
   */
  deleteProject(id: number) {
    const agreeDelete = confirm(`Are you sure to delete the project with id ${id}`);
    if (agreeDelete === true) {
      this.projectsService.deleteProject(id)
      .subscribe((res: any) => {
        console.log(`Project deleted with id ${id}`);
        // if delete is ok, we update the projects list;
        this.getProjects();
      }, err => {
        alert(err.error.message);
      });
    }
  }

}
