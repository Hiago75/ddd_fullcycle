import Address from "../../entity/Address";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import SendMessageWhenCustomerAddressIsChanged from "./handler/send-message-when-customer-address-is-changed.handler";

describe("Customer address changed domain event tests", () => {
  it("Should notify when a address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const addressChangedEventHandler = new SendMessageWhenCustomerAddressIsChanged()

    const spyAddressChangedEventHandler = jest.spyOn(addressChangedEventHandler, "handle")

    eventDispatcher.register("CustomerAddressChangedEvent", addressChangedEventHandler)

    const address = new Address("Street", 123, "00000-000", "Cidade")
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "123",
      name: "Test",
      address
    })


    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyAddressChangedEventHandler).toHaveBeenCalled();
  })
})