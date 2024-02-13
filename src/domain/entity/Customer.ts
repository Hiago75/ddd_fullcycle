// Essa entidade é focada em NEGÓCIO, ou seja, não está relacionada ao ORM que está ligada a PERSISTENCIA. Durante o desenvolvimento do software, vai ser necessário ter 2 entidades, uma delas responsável pela persistencia e a outra seria essa responsável pela regra. Muitas vezes o nome entidade sequer cabe a persistência que pode usar um nome diferente para facilitar o entendimento do contexto de cada arquivo. Um exemplo de como organizar isso seria:

import Address from "./Address";

/* 
  Complexidade de negócio:
  Domain
  - Entity
  - - Customer (regra de negócio)
  
  Complexidade acidental: 
  infra
  - Entity/Model
  - - Customer (get, set)
*/

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  // Uma entidade sempre deve possuir consistencia nos seus dados 100% das vezes. Dados obrigatórios de uma entidade precisam ser definidos assim que ela for criada para manter a consistência afim de validar regras de negócio. O dev deve ser capaz de confiar no estado atual do objeto, sendo assim, eu devo poder confiar que os campos obrigatórios estão consistentes.
  // Quando se fala de consitência os dados abaixo, sendo considerados obrigatórios precisam ser preenchidos diretamente no construtor. 
  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  get Address(): Address {
    return this._address
  }

  set Address(address: Address) {
    this._address = address;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  // A diferença entre o uso de uma função e um set é a expressividade. Usar essa função torna mais expressivo o porque de um name existir dentro da classe e como ele tem que se comportar. Uma entidade bem escrita expressa o negócio. Ao invés de usarmos getters e setters definimos explicitamente como as alterações e modelagens dos dados devem ser feitas usando métodos que contém essas funcionalidades, mesmo que eles sejam apenas um nome mais bonito para um getter/setter.

  // Para manter uma boa consistência de dados, uma entidade por padrão SEMPRE se auto valida. Não deve ser possível passar um "" para esse changeName. Qualquer validação que seja jogada para alguma parte externa, causa um risco de que nossa classe seja inconsistente.
  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required")
    }

    if (this._name.length === 0) {
      throw new Error('Name is required')
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}