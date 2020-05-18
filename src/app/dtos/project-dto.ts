import { ProjectTypeDto } from './project-type-dto';
import { CustomerDto } from './customer-dto';

export class ProjectDto {

    id: number;
    title: string;
    type: ProjectTypeDto;
    location: string;
    customer: CustomerDto;

}