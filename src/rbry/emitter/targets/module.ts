import { EXPORT } from "..";

export default {
    defaults: {
        exports: EXPORT.MODULE
    },
    transform: (e: string) => e
}