import { UserController } from "./UserController";
import { User, UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockDb: User[] = []
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        deleteUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue(mockDb)
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Marina',
                email: 'marina@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })
    it('Deve retornar erro quando não informar o nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'marina@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Nome e Email obrigatórios'})
    })

    it('Deve retornar erro quando não informar o email', () => {
        const mockRequest = {
            body: {
                name: 'Marina',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Nome e Email obrigatórios'})
    })

    it('Deve apagar o usuário informado', () => {
        const mockRequest = {
            body: {
                name: 'Marina',
                email: 'marina@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()

        userController.deleteUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário apagado' })
    })

    it('Deve retornar todos os usuários', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()

        userController.getAllUsers(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject(mockDb)
    })
})
