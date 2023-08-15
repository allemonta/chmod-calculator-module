import { expect } from "chai"
import { describe, it } from "mocha"

import Mode from "../src/lib/Mode"
import { PERMISSION, USER } from "../src/types"

function commonCheck(mode: Mode) {
    expect(mode.object[USER.OWNER][PERMISSION.READ]).to.be.true
    expect(mode.object[USER.OWNER][PERMISSION.WRITE]).to.be.true
    expect(mode.object[USER.OWNER][PERMISSION.EXECUTE]).to.be.true

    expect(mode.object[USER.GROUP][PERMISSION.READ]).to.be.true
    expect(mode.object[USER.GROUP][PERMISSION.WRITE]).to.be.true
    expect(mode.object[USER.GROUP][PERMISSION.EXECUTE]).to.be.false

    expect(mode.object[USER.OTHERS][PERMISSION.READ]).to.be.true
    expect(mode.object[USER.OTHERS][PERMISSION.WRITE]).to.be.false
    expect(mode.object[USER.OTHERS][PERMISSION.EXECUTE]).to.be.false

    expect(mode.toString("plain")).to.equal("rwxrw-r--", "check plain string")
    expect(mode.toString("octal")).to.equal("0764", "check octal string")
    expect(mode.toString("grouped")).to.equal("u=rwx,g=rw,o=r", "check grouped string")
}

describe("mode", function() {
    it("plain string constructor", function() {
        const mode = new Mode("rwxrw-r--")
        commonCheck(mode)
    })

    // Octal constructor not implemented yet
    it.skip("octal string constructor", function() {
        const mode = new Mode("0764")
        commonCheck(mode)
    })

    it("grouped constructor", function() {
        const mode = new Mode("u=rwx,g=rw,o=r")
        commonCheck(mode)
    })

    it("object constructor", function() {
        const mode = new Mode({
            OWNER: { READ: true, WRITE: true, EXECUTE: true },
            GROUP: { READ: true, WRITE: true, EXECUTE: false },
            OTHERS: { READ: true, WRITE: false, EXECUTE: false },
        })

        commonCheck(mode)
    })
})