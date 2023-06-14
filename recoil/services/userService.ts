import BaseServices from "./baseService";

export class UserService extends BaseServices {
    constructor() {
        super();
    }

    getAllUser = () => {
        return this.get(`/api/userApi/get-all-user`);
    };

}

export const userService = new UserService();

