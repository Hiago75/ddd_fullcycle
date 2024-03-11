import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendMessageWhenCustomerAddressIsChanged implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle(event: CustomerAddressChangedEvent): void {
    const eventDataAddress = event.eventData.address

    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${eventDataAddress.getFormatedAddress()}`)
  }
}