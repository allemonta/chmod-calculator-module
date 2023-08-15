import { PERMISSION, USER, ModeObject } from "../types"

export const userPosition = {
    [USER.OWNER]: 0,
    [USER.GROUP]: 1,
    [USER.OTHERS]: 2
}

export const permissionPosition = {
    [PERMISSION.READ]: 0,
    [PERMISSION.WRITE]: 1,
    [PERMISSION.EXECUTE]: 2
}

export const permissionChar = {
    [PERMISSION.READ]: "r",
    [PERMISSION.WRITE]: "w",
    [PERMISSION.EXECUTE]: "x"
}

export const flatStringRegex = new RegExp(/^[r-][w-][x-][r-][w-][x-][r-][w-][x-]$/)
export const octalRegex = new RegExp(/^[0-7]{3}$/)
export const groupedStringRegex = new RegExp(/^u=[r]?[w]?[x]?,g=[r]?[w]?[x]?,o=[r]?[w]?[x]?$/)

export const permissionIndex = (user: USER, permission: PERMISSION): number => {
    return userPosition[user] * 3 + permissionPosition[permission]
}

export type IterateFn = (user: USER, permission: PERMISSION, index: number) => void
export const iteratePermissions = (callback: IterateFn) => {
    // Order matters
    [USER.OWNER, USER.GROUP, USER.OTHERS].forEach((user) => {
        [PERMISSION.READ, PERMISSION.WRITE, PERMISSION.EXECUTE].forEach((permission) => {
            const index = permissionIndex(user, permission)
            callback(user, permission, index)
        })
    })
}

export const emptyModeObject = (): ModeObject => {
    const support: any = {}
    iteratePermissions((user, permission) => {
        if (!support[user]) support[user] = {}
        support[user][permission] = false
    })

    return support as ModeObject
}

export const COMPLETE_PLAIN_PERMISSIONS_STRING = "rwxrwxrwx"