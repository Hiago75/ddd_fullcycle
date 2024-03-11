import Address from "./Address";

describe("Address unit tests", () => {
  it("should throw error when street is empty", () => {
    expect(() => {
      new Address("", 123, "00000-000", "Cidade");
    }).toThrow("Street is required")
  })

  it("should throw error when Number is empty", () => {
    expect(() => {
      new Address("Rua", null, "00000-000", "Cidade");
    }).toThrow("Number is required")
  })

  it("should throw error when zip is empty", () => {
    expect(() => {
      new Address("Rua", 123, "", "Cidade");
    }).toThrow("Zip is required")
  })

  it("should throw error when city is empty", () => {
    expect(() => {
      new Address("Rua", 123, "00000-000", "");
    }).toThrow("City is required")
  })

  it("should return a default formated address", () => {
    const address = new Address("Rua", 123, "00000-000", "Cidade")

    const formattedAddress = address.getFormatedAddress();

    expect(formattedAddress).toEqual('Rua N° 123, Cidade. 00000-000')
  })
})