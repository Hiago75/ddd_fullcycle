import { toXML } from 'jstoxml'
import { OutputListCustomerDto } from '../../../usecase/customer/list/list.customer.dto';

export default class CutsomerPresenter {
  static listXML(data: OutputListCustomerDto) {
    const xmlOption = {
      header: true,
      indent: " ",
      newline: "\n",
      allowEmpty: true,
    }

    return toXML({
      customers: {
        customer: data.customers.map((customer) => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            numebr: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city
          }
        })),
      },
    }, xmlOption)
  }
}