import { Component, OnInit, Input } from '@angular/core';
import { ProjectDto } from '../../dtos/project-dto';
import { CustomerDto } from '../../dtos/customer-dto';
import { ProjectsService } from '../../services/projects.service';
import { CustomersService } from '../../services/customers.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CREATE_PROJECTS, UPDATE_PROJECTS } from '../../constants';
import { ProjectTypeDto } from '../../dtos/project-type-dto';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.css']
})
export class ProjectsDetailComponent implements OnInit {

  @Input() project: ProjectDto;
  projectTypes: ProjectTypeDto[];
  customers: CustomerDto[];
  isNewProjectPage = false;
  isProjectDetailPage = false;
  id: number;
  textActionButton: string;
  hasCreateProjectsPrivilege: boolean;
  hasUpdateProjectsPrivilege: boolean;

  constructor(
    private projectsService: ProjectsService,
    private customersService: CustomersService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.hasCreateProjectsPrivilege = this.tokenStorageService.getPrivileges().has(CREATE_PROJECTS);
    this.hasUpdateProjectsPrivilege = this.tokenStorageService.getPrivileges().has(UPDATE_PROJECTS);

    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = +params.id;
        // if we are in a url with an ID not numeric, we redirect to home.
        if (isNaN(this.id)) {
          this.router.navigate(['']);
        } else {
          this.isProjectDetailPage = true;
          this.getProject();
          this.textActionButton = 'Save Project';
        }
      } else {
        this.isNewProjectPage = true;
        this.project = new ProjectDto();
        this.textActionButton = 'Create Project';
      }

      this.getCustomers();
      this.getProjectTypes();
    });

  }

// Get project by id
  private getProject() {
    this.projectsService.getProject(this.id)
    .subscribe((res: any) => {
      this.project = res;
    }, err => {
      alert(err.error.message);
    });
  }
// Get customers
  private getCustomers() {
    this.customersService.getCustomers()
    .subscribe((res: any) => {
      this.customers = res;
    }, err => {
      alert(err.error.message);
    });
  }

//Get project type
  private getProjectTypes() {
    this.projectsService.getProjectTypes()
    .subscribe((res: any) => {
      this.projectTypes = res;
    }, err => {
      alert(err.error.message);
    });
  }

  compareCustomerDto(customerOne: CustomerDto, customerTwo: CustomerDto) {
    if (customerOne == null || customerTwo == null) {
      return false;
    }
    return customerOne.id === customerTwo.id;
  }

  compareProjectTypeDto(projectTypeOne: ProjectTypeDto, projectTypeTwo: ProjectTypeDto) {
    if (projectTypeOne == null || projectTypeTwo == null) {
      return false;
    }
    return projectTypeOne.id === projectTypeTwo.id;
  }

    /**
     * Save project details in both cases:
     * - User creation
     * - User update
     */
  saveProject() {
    if (this.isNewProjectPage) {
      this.projectsService.createProject(this.project)
      .subscribe((res: any) => {
        alert('new project created successfully');
        this.router.navigate(['/projects']);
      }, err => {
        alert(err.error.message);
      });
    } else {
      this.projectsService.updateProject(this.project)
      .subscribe((res: any) => {
        alert('project updated successfully');
        this.router.navigate(['/projects']);
      }, err => {
        alert(err.error.message);
      });
    }
  }

}
