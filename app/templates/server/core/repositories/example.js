const Repository = require('./index');
<% if (db === 'relational') { %>
const models = require('../db/models/index');
<% } else { %>
const example = require('../db/models/example');
<% } %>

class ExampleRepo extends Repository {
  // eslint-disable-next-line no-useless-constructor
  constructor(exampleModel) {
    super(exampleModel);
  }
}
<% if (db === 'relational') { %>
module.exports = new ExampleRepo(models.example);
<% } else { %>
module.exports = new ExampleRepo(example);
<% } %>

