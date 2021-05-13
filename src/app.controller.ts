import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/**
 * controller : responsável por todas as rotas, requisições que chegam até nossa api
 * provider: abstraem as regras de negócio da nossa aplicação
 * class : onde os dados podem ficar armazenados
 * module: armazenam tudo oque foi criado de uma entidade por exemplo, de task no módule você pode colocar oque é
 * o provider, controller dele
 *
 * todos os controllers são automaticamente registrados no módulo global da nossa aplicação
 *
 */
