import { Component, OnInit } from '@angular/core';
import { CustomerDto } from '../../dtos/customer-dto';
import { CustomersService } from '../../services/customers.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { DELETE_CUSTOMERS, CREATE_CUSTOMERS } from '../../constants';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  columns: string[] = [
    'id', 'name', 'cif', 'email', 'taxResidence', 'phone', 'population'
  ];

  customers: CustomerDto[];
  hasCreateCustomersPrivilege = false;
  hasDeleteCustomersPrivilege = false;

  constructor(private customersService: CustomersService, private tokenStorageService: TokenStorageService) { }

    /**
     * Delete and create are controlled privileges on customers
     */ 
  ngOnInit(): void {
    this.hasCreateCustomersPrivilege = this.tokenStorageService.getPrivileges().has(CREATE_CUSTOMERS);
    this.hasDeleteCustomersPrivilege = this.tokenStorageService.getPrivileges().has(DELETE_CUSTOMERS);
    this.getCustomers();
  }

  getCustomers() {
    this.customersService.getCustomers()
    .subscribe((res: any) => {
      this.customers = res;
    }, err => {
      this.customers = [];
      alert(err.error.message);
    });
  }

  /**
   * Delete customer by id
   * @param id 
   */
  deleteCustomer(id: number) {
    const agreeDelete = confirm(`Are you sure to delete the customer with id ${id}. It deletes the related projects to this customer too.`);
    if (agreeDelete === true) {
      this.customersService.deleteCustomer(id)
      .subscribe((res: any) => {
        console.log(`Customer deleted with id ${id}`);
        // if delete is ok, we update the customers list;
        this.getCustomers();
      }, err => {
        alert(err.error.message);
      });
    }
  }

}
