// Essa classe é uma entidade por possuir um ID. Entidades são sempre classes unicas e por isso possuem identificador.
// Essa classe é considerada anêmica por apenas armazenar dados. Nenhum tipo de processamento é feito dentro dela e a mesma não possui nenhuma regra de negócio, ela fica totalmente orientada ao ORM/DB.

class CustomerAnemic {
  _id: string;
  _name: string;
  _address: string;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): string {
    return this._name
  }
}