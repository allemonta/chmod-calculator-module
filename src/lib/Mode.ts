import { ModeObject, USER, UserPermissions } from "../types/index"
import { emptyModeObject, flatStringRegex, groupedStringRegex, iteratePermissions, COMPLETE_PLAIN_PERMISSIONS_STRING, userPosition, permissionChar } from "./utils"

export default class Mode {
    readonly object: ModeObject

    constructor(mode: ModeObject | string) {
        if (typeof mode === 'object') {
            this.object = mode
        } else {
            if (mode.match(groupedStringRegex)) {
                this.object = this._groupedStringToObjectMode(mode)
            } else if (mode.match(flatStringRegex)) {
                this.object = this._flatStringToObjectMode(mode)
            } else {
                throw new Error('Invalid mode string')
            }
        }
    }

    private _flatStringToObjectMode(mode: string): ModeObject {
        const out = emptyModeObject()

        iteratePermissions((user, permission, index) => {
            const isAllowed = mode[index] !== "-"
            out[user][permission] = isAllowed
        })
    
        return out
    }

    private _groupedStringToObjectMode(mode: string): ModeObject {
        const splitted = mode.split(",").map(e => e.split("=")[1])

        const out = emptyModeObject()

        iteratePermissions((user, permission, index) => {
            const group = splitted[userPosition[user]]
            const isAllowed = group.includes(permissionChar[permission])
            out[user][permission] = isAllowed
        })
    
        return out
    }

    get octal(): string {
        let out = 0

        iteratePermissions((user, permission, index) => {
            const isAllowed = this.object[user][permission]
            out += isAllowed ? Math.pow(2, 8 - index) : 0
        })
    
        return out.toString(8).padStart(4, "0")
    }

    get plain(): string {
        const out = COMPLETE_PLAIN_PERMISSIONS_STRING.split("")

        iteratePermissions((user, permission, index) => {
            const isAllowed = this.object[user][permission]
            out[index] = isAllowed ? COMPLETE_PLAIN_PERMISSIONS_STRING[index] : "-"
        })
    
        return out.join("")
    }

    get grouped(): string {
        const group: Partial<Record<USER, string>> = {}

        iteratePermissions((user, permission, index) => {
            if (!group[user]) group[user] = ""

            const isAllowed = this.object[user][permission]
            if (isAllowed) {
                group[user] += COMPLETE_PLAIN_PERMISSIONS_STRING[index]
            }
        })

        return `u=${group[USER.OWNER]},g=${group[USER.GROUP]},o=${group[USER.OTHERS]}`
    }

    toString(format: "octal" | "plain" | "grouped"): string {
        switch (format) {
            case "octal":
                return this.octal
            case "plain":
                return this.plain
            case "grouped":
                return this.grouped
            default:
                throw new Error('Invalid format')
        }
    }
}