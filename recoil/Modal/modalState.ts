import { useEffect } from 'react';
import axios from "axios";
import { Data } from "react-csv/components/CommonPropTypes";
import { atom, selector } from "recoil"
import { notifiError, notifiSuccess } from "../../components/toastify-noti/notifi";
import { userService } from "../services/userService";

const modalAttributesData = {
    open: false,
    dimmer: "blurring",
    type: "CLOSE_MODAL"
}

const userDefaultData =
    { id: 0 }

const listModalAttributes = atom({
    key: 'listModal',
    default: modalAttributesData
})

export const getUserDefaultData = selector({
    key: 'getUserDefaultDataS',
    get: async ({ get }) => {
        let data = await userService.getAllUser()
        console.log(data, 'data')
        return await userService.getAllUser()
    },
    set: async ({ set, get }, newData) => {
        // Update state w/ new appended values
        const currentState = await get(listUserData);

        console.log(currentState)
        set(listUserData, newData);
    },
})
const listUserData = atom({
    key: "listUser",
    default: getUserDefaultData,
})
console.log(listUserData, 'listUserData')




export const newActionModal = selector({
    key: "newModalAction",
    get: ({ get }) => {
        const list = get(listModalAttributes);
        return list
    },
    set: ({ get, set }, action: any) => {
        const list = get(listModalAttributes);
        switch (action) {
            case "MODAL_CLOSE":
                return set(listModalAttributes, { ...list, open: false })
            case "MODAL_OPEN":
                return set(listModalAttributes, { ...list, open: true })
            default:
                break;
        }
    }
})


export const modalDeleteUserAction = selector({
    key: "modalDeleteUser",
    get: async ({ get }) => {
        const id = get(listModalAttributes);

    },
    set: ({ get, set }, id) => {
        const list = get(listModalAttributes);
    }
})