# NodeJS and Typescript REST microservice framework

* Controller decorators from routing-controllers
* Dependency injection container from inversify
* Logging based on log4js
* Database support based on typeorm
* Modules support
* Unified AJAX error responses

[Boilerplate](https://github.com/c7s/node-ts-microservice-boilerplate)

[Yeoman generator](https://github.com/c7s/generator-node-ts-microservice)

[Performance tests](https://github.com/melfa/node-framework-load-test) for routing-controllers, typeorm, log4js.


## Usage

Bootstrap:
```typescript
import { Container } from 'inversify';
import { Connection, getRepository, Repository } from 'typeorm';
import {
  WebApplication,
  ClusteredWebApplication,
  Environment,
  middlewares,
} from '@c7s/node-ts-framework';
import { Type } from './Type';

export class AppModule extends Module {

  public async initDiContainer(container: Container) {
    container.bind<Connection>(Type.DbConnection)
      .toConstantValue(await (new components.DbConnectionFactory).create([this]));

  }

  protected get baseDirectory() {
    return __dirname;
  }

}

const modules = [new AppModule];
const app = Environment.Development === process.env.PROJECT_ENV ?
  new WebApplication(modules, [middlewares.ErrorHandlingMiddleware]) :
  new ClusteredWebApplication(modules, [middlewares.ErrorHandlingMiddleware]);
app.run();

```

Controller looks like:
```typescript
@JsonController('/client')
export class ClientController {
  @di.inject(Type.ClientDataRepository)
  protected clientDataRepository!: Repository<Client>;

  @Post('/')
  @HttpCode(201)
  public async create(
    @BodyParam('client', { required: true }) clientForm: CreateClientForm,
    @Res() response: Response,
  ) {
  }
}
```
