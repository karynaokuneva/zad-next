import { Customer, CustomerInput } from "@/lib/models/customer";

export class CustomerService {
  private customers: Customer[] = [];
  private maxId: number = 0;

  constructor() {
    this.customers = [
      {
        id: ++this.maxId,
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
      },
      {
        id: ++this.maxId,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
      },
    ];
  }

  async getAll(): Promise<Customer[]> {
    return this.customers;
  }

  async getById(id: number): Promise<Customer | null> {
    const customer = this.customers.find((c) => c.id === id);
    return customer ?? null;
  }

  async create(input: CustomerInput): Promise<Customer> {
    const customer: Customer = { id: ++this.maxId, ...input };
    this.customers.push(customer);
    return customer;
  }

  async update(id: number, input: CustomerInput): Promise<Customer> {
    const idx = this.customers.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Customer not found");

    const customer = this.customers[idx];
    customer.firstName = input.firstName;
    customer.lastName = input.lastName;
    customer.email = input.email;

    return customer;
  }

  async delete(id: number): Promise<void> {
    const idx = this.customers.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Customer not found");
    this.customers.splice(idx, 1);
  }
}

export const customerService = new CustomerService();
