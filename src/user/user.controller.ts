import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';
import { RoleGuard } from '../guards/role.guard.js';

// @Get('all')      // GET /user/all
// @Get(':id')      // GET /user/:id  —  dynamic segment
// @Post()          // POST /user
// @Put(':id')      // PUT /user/:id  —  dynamic segment
// @Delete(':id')      // DELETE /user/:id  —  dynamic segment

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    // GET /user
    @Get()
    getUser(@Query('name') name: string): unknown {
        // const users = [
        //     { id: 1, name: 'John Doe', },
        //     { id: 2, name: 'Jane Smith', }]
        // if (name) {
        //     return users.filter(user => user.name === name);
        // }
        // return users;

        // const userService = new UserService(); // Wrong way to instantiate the service, it should be injected via constructor
        // return userService.findAllUsers(name);

        return this.userService.findAllUsers(name);
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): unknown {
        // const users = [
        //     { id: 1, name: 'John Doe', },
        //     { id: 2, name: 'Jane Smith', }]
        // return users.find(user => user.id == id);
        return this.userService.findOneUser(id);
    }

    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto): unknown {
        return this.userService.createUser(CreateUserDto);
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() UpdateUserDto: UpdateUserDto): unknown {
        // return { data: { id, ...UpdateUserDto }, message: 'User updated successfully' };
        return this.userService.updateUser(id, UpdateUserDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    deleteUser(@Param('id') id: number): unknown {
        // return { message: `User with id ${id} deleted successfully` };
        return this.userService.deleteUser(id);
    }

}
