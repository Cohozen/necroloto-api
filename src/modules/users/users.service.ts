import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UsersMapper } from "./users.mapper";
import { UserResponseDto } from "./dto/user-response.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,
        private usersMapper: UsersMapper
    ) {}

    async create(dto: CreateUserDto): Promise<UserResponseDto> {
        const user = await this.usersRepository.create(dto);
        return this.usersMapper.toUserResponse(user);
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.usersRepository.findAll();
        return this.usersMapper.toUserResponseList(users);
    }

    async findOne(id: string): Promise<UserResponseDto | null> {
        const user = await this.usersRepository.findById(id);
        return user ? this.usersMapper.toUserResponse(user) : null;
    }

    async findByClerkId(clerkId: string): Promise<UserResponseDto | null> {
        const user = await this.usersRepository.findByClerkId(clerkId);
        return user ? this.usersMapper.toUserResponse(user) : null;
    }

    async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.usersRepository.update(id, dto);
        return this.usersMapper.toUserResponse(user);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
