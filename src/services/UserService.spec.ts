import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);
    const mockConsole = jest.spyOn(global.console, 'log')

    it('Deve adicionar um novo usuário', () => {
        userService.createUser('Marina', 'marina@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve apagar o usuário informado', () => {
        userService.deleteUser('Marina', 'marina@test.com')
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })
})
