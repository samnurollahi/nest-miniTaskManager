import { DocumentBuilder } from '@nestjs/swagger';

export const configDev = new DocumentBuilder()
  .setTitle('miniTaskApp')
  .setVersion('1.0.0')
  .setDescription(
    'app mini task baraye modiriyat behtar team haye barnamenvisi hast',
  )
  .addBearerAuth(
    { type: 'http', in: 'Header', description: 'name: auth' },
    'auth',
  )
  .build();
