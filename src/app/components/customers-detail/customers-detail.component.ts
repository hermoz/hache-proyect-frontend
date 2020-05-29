import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDto } from '../../dtos/customer-dto';
import { ProjectDto } from '../../dtos/project-dto';
import { ProjectsService } from '../../services/projects.service';
import { CustomersService } from '../../services/customers.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { CREATE_CUSTOMERS, UPDATE_CUSTOMERS } from '../../constants';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.css']
})
export class CustomersDetailComponent implements OnInit {

  @Input() customer: CustomerDto;
  projects: ProjectDto[];
  isNewCustomerPage = false;
  isCustomerDetailPage = false;
  id: number;
  textActionButton: string;
  hasCreateCustomersPrivilege: boolean;
  hasUpdateCustomersPrivilege: boolean;

  constructor(
    private customersService: CustomersService,
    private projectsService: ProjectsService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.hasCreateCustomersPrivilege = this.tokenStorageService.getPrivileges().has(CREATE_CUSTOMERS);
    this.hasUpdateCustomersPrivilege = this.tokenStorageService.getPrivileges().has(UPDATE_CUSTOMERS);

    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = +params.id;
        // if we are in a url with an ID not numeric, we redirect to home.
        if (isNaN(this.id)) {
          this.router.navigate(['']);
        } else {
          this.isCustomerDetailPage = true;
          this.getCustomer();
          this.textActionButton = 'Save Customer';
        }
      } else {
        this.isNewCustomerPage = true;
        this.customer = new CustomerDto();
        this.textActionButton = 'Create Customer';
      }

      this.getProjects();
    });

  }
/**
 * We both get customers and projects
 */
  private getCustomer() {
    this.customersService.getCustomer(this.id)
    .subscribe((res: any) => {
      this.customer = res;
    }, err => {
      alert(err.error.message);
    });
  }

  private getProjects() {
    this.projectsService.getProjects()
    .subscribe((res: any) => {
      this.projects = res;
    }, err => {
      alert(err.error.message);
    });
  }

  compareProjectDto(projectOne: ProjectDto, projectTwo: ProjectDto) {
    if (projectOne == null || projectTwo == null) {
      return false;
    }
    return projectOne.id === projectTwo.id;
  }

  /**
   * Save customers details in both cases:
   * - Customer creation
   * - Customer update
   */
  saveCustomer() {
    if (this.isNewCustomerPage) {
      this.customersService.createCustomer(this.customer)
      .subscribe((res: any) => {
        alert('new customer created successfully');
        this.router.navigate(['/customers']);
      }, err => {
        alert(err.error.message);
      });
    } else {
      this.customersService.updateCustomer(this.customer)
      .subscribe((res: any) => {
        alert('customer updated successfully');
        this.router.navigate(['/customers']);
      }, err => {
        alert(err.error.message);
      });
    }
  }

}
