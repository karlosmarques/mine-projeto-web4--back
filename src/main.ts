import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.enableCors({
    origin: 'http://localhost:3000', //Dafni, se a porta que vcs estiverem usando for a 3000, pode deixar assim, mas se for outra, alterem, pfv! 😉
    credentials: true
  });

  await app.listen(8000);
}
bootstrap();
