class Repository {
  constructor(modelInstance) {
    this.modelInstance = modelInstance;
  }

  findRecord(where = {}, attributes = null, options = null) {
    const query = this.modelInstance.findOne(where);

    if (attributes) {
      query.select(attributes);
    }

    if (options) {
      query.setOptions(options);
    }

    return query.exec();
  }

  findAllRecords(where = {}, attributes = null, options = null) {
    const query = this.modelInstance.find(where);

    if (attributes) {
      query.select(attributes);
    }

    if (options) {
      query.setOptions(options);
    }

    return query.exec();
  }

  updateRecord(where = {}, values, options = null) {
    return new Promise((resolve, reject) => {
      const updatedOptions = {
        ...options,
        new: true,
      };

      const query = this.modelInstance.findOneAndUpdate(where, values);

      query.setOptions(updatedOptions);

      query.exec()
        .then(updatedObj => {
          resolve(updatedObj);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateRecords(where = {}, values, options = {}) {
    return this.modelInstance.updateMany(where, values, options).exec();
  }

  createRecord(values, options = {}) {
    return this.modelInstance.create(values, options);
  }

  deleteOne(whereObject, options = null) {
    const query = this.modelInstance.deleteOne(whereObject);

    if (options) {
      query.setOptions(options);
    }

    return query.exec();
  }

  deleteMany(whereObject, options = null) {
    const query = this.modelInstance.deleteMany(whereObject);

    if (options) {
      query.setOptions(options);
    }

    return query.exec();
  }
}

module.exports = Repository;
