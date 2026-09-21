import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';

interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UserService {
    constructor(private readonly logger: LoggerService) { }
    private users: User[] = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
    ];

    findAllUsers(name: string = '') {
        this.logger.log('Finding all users');
        return this.users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }

    findOneUser(id: number) {
        this.logger.log(`Finding user by id: ${id}`);

        const user = this.users.find(user => user.id === id);

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        return user;
    }

    createUser(user: CreateUserDto) {
        this.logger.log('Creating a new user');
        const newUser: User = {
            id: this.users.length + 1,
            ...user
        };
        this.users.push(newUser);
        return { data: newUser, message: 'User created successfully' };
    }

    updateUser(id: number, body: UpdateUserDto) {
        this.logger.log(`Updating user with id: ${id}`);
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...body };
        }
    }

    deleteUser(id: number) { 
        this.logger.log(`Deleting user with id: ${id}`);
        this.users = this.users.filter(user => user.id !== id);
        return { message: `User with id ${id} deleted successfully` };
    }
}


// The dependency chain looks like this:
// UserController -> needs UserService
// UserService -> needs LoggerService
// Nest -> creates instances of LoggerService and UserService and injects them into UserController. (creates and connects everything) 