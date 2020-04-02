import './config/env';
import Server from './config/server';
import routes from './routes';
<% if (db === 'nosql') { %>
import mongooseInit from './config/mongoose';

mongooseInit();
<% } %>
export default new Server()
  .router(routes)
  .listen(process.env.PORT);
