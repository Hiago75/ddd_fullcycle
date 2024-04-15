import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import CustomerRepositoryInteface from "../../../domain/customer/repository/customer.repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInteface

  constructor(customerRepository: CustomerRepositoryInteface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput(customers: CustomerInterface[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city
        }
      })),
    }
  }
}