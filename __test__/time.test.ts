import { getTimeAgo } from "@/lib/time";

describe("getTimeAgo", () => {

    test("returns Now", () => {
        expect(getTimeAgo(Date.now())).toBe("Now");
    });

    test("returns 30 Second", () => {
        expect(getTimeAgo(Date.now() - 30000))
            .toBe("30 Second");
    });

    test("returns 5 Minute", () => {
        expect(getTimeAgo(Date.now() - 300000))
            .toBe("5 Minute");
    });

    test("returns 2 Hour", () => {
        expect(getTimeAgo(Date.now() - 7200000))
            .toBe("2 Hour");
    });

    test("returns Never", () => {
        expect(getTimeAgo(0))
            .toBe("Never");
    });

});