import { EXPORT } from "..";

export default {
    defaults: {
        exports: EXPORT.RETURN
    },
    transform: (jscode: string, sync: boolean) => {
        return `(${sync ? "" : "async "}function($RB){"use strict";${jscode}})`;
    }
}