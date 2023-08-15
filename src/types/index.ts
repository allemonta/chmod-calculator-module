export enum PERMISSION {
    READ = "READ",
    WRITE = "WRITE",
    EXECUTE = "EXECUTE"
}

export enum USER {
    OWNER = "OWNER",
    GROUP = "GROUP",
    OTHERS = "OTHERS"
}

export type UserPermissions = {
    [PERMISSION.READ]: boolean,
    [PERMISSION.WRITE]: boolean,
    [PERMISSION.EXECUTE]: boolean
}

export type ModeObject = {
    [USER.OWNER]: UserPermissions,
    [USER.GROUP]: UserPermissions,
    [USER.OTHERS]: UserPermissions
}