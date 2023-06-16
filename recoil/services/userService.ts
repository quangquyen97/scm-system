import BaseServices from "./baseService";

export class UserService extends BaseServices {
    constructor() {
        super();
    }

    getAllUser = async () => {
        return await this.get(`/api/userApi/get-all-user`);
    };
    deleteUser = async (id: any) => {
        return await this.put("api/userApi/delete-user", id)
    }
}

export const userService = new UserService();

