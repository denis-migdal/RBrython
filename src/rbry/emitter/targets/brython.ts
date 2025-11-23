import { EXPORT } from "..";

export default {
    defaults: {
        exports: EXPORT.BRYTHON,
        sync   : true
    },
    transform: (e: string) => e
}