import { Controller, Get, UseGuards } from "@nestjs/common";

@Controller()
export class AppController {
    constructor() {}

    @Get("version")
    getVersion(): string {
        return "v0.1";
    }
}
