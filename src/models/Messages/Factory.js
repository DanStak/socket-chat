import messagesSchemas from '../../schemas/messages-schemas';

class Factory {

  static create (data) {
    const Model = messagesSchemas[data.type].model;

    return new Model(data)
  }
}

export default Factory;
