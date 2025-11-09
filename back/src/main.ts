import { createApp } from './common/utils/bootstrap-app';

async function bootstrap() {
  const { app, port } = await createApp();
  await app.listen(port);
}

bootstrap();
