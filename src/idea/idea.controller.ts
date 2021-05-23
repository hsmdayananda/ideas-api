import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { IdeaService } from '../idea/idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidatorPipe } from '../shared/validation.pipe'


@Controller('idea')
export class IdeaController {

    constructor(private ideaService: IdeaService) { }

    @Get()
    findAllIdeas() {
        return this.ideaService.showAll();
    }

    @Get(':id')
    readIdea(@Param('id') id: string) {
        return this.ideaService.read(id);
    }

    @Post()
    @UsePipes(new ValidatorPipe())
    createIdea(@Body() data: IdeaDTO) {
        return this.ideaService.create(data);
    }

    @Put(':id')
    @UsePipes(new ValidatorPipe())
    editIdea(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
        return this.ideaService.update(id, data)
    }

    @Delete(':id')
    deleteIdea(@Param('id') id: string) {

        return this.ideaService.destroy(id);
    }
}
