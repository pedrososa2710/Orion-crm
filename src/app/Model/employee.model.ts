export interface IEmployee {
  addresses: any;
  id: string;
  employeeName: string;
  role: string;
  initials: string;
  mode: string;
  status: 'Active' | 'Pending' | 'Inactive';
  phone: string;
  email: string;
  assignedTo: string;
}

export class Employee implements IEmployee {
  addresses: any;
  id: string;
  employeeName: string;
  role: string;
  initials: string;
  mode: string;
  status: 'Active' | 'Pending' | 'Inactive';
  phone: string;
  email: string;
  assignedTo: string;

  constructor(
    addresses: any = 0,
    id: string = '',
    employeeName: string = '',
    role: string = '',
    initials: string = '',
    mode: string = '',
    status: 'Active' | 'Pending' | 'Inactive' = 'Active',
    phone: string = '',
    email: string = '',
    assignedTo: string = '',
  ) {
    this.addresses = addresses;
    this.id = id;
    this.employeeName = employeeName;
    this.role = role;
    this.initials = initials;
    this.mode = mode;
    this.status = status;
    this.phone = phone;
    this.email = email;
    this.assignedTo = assignedTo;
  }
}
