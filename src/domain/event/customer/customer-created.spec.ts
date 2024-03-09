import EventDispatcher from "../@shared/event-dispatcher"
import CustomerCreatedEvent from "./customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler from "./handler/send-email-when-customer-is-created.handler";
import SendMessageWhenCustomerIsCreatedHandler from "./handler/send-message-when-customer-is-created.handler";

describe("Customer created domain event tests", () => {
  it("Should notify when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const messageEventHandler = new SendMessageWhenCustomerIsCreatedHandler()
    const mailEventHandler = new SendEmailWhenCustomerIsCreatedHandler();

    const spyMessageEventHandler = jest.spyOn(messageEventHandler, "handle")
    const spyMailEventHandler = jest.spyOn(mailEventHandler, "handle")

    eventDispatcher.register("CustomerCreatedEvent", messageEventHandler)
    eventDispatcher.register("CustomerCreatedEvent", mailEventHandler)

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
      name: "Test"
    })

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyMessageEventHandler).toHaveBeenCalled();
    expect(spyMailEventHandler).toHaveBeenCalled();
  })
})