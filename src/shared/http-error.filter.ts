import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common'


@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        //const status = exception.getStatus();
        const status = 'test status';

        const errorResponse = {
            code: status,
            timestamp: new Date().toDateString(),
            path: req.url,
            method: req.method,
            message: exception.message
        }


        Logger.error(
            `${req.method} ${req.url}`,
            JSON.stringify(errorResponse),
            'ExceptionFilter',
        );
        res.status(404).json(errorResponse)
    }

}
