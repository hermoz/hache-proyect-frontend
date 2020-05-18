
import { ProjectDto } from './project-dto';

export class CustomerDto {

    id: number;
    name: string;
    cif: string;
    email: string;
    taxResidence: string;
    phone: string;
    population: string;
    projects: Set<ProjectDto>;

}
