import { INestApplication } from "@nestjs/common";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { reportMiddleware } from "./middlewares/report.middleware";
import { HttpAdapterHost } from "@nestjs/core";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";

export function initCoreApplication(app: INestApplication) {
    app.use(loggerMiddleware);
    app.use(reportMiddleware);
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));
};