import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ["debug", "log", "verbose", "error", "fatal", "warn"]
    });

    const config = new DocumentBuilder()
        .setTitle("Necroloto API")
        .setDescription("The necroloto API description")
        .setVersion("0.1")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(3000);
}

bootstrap();
