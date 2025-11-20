export default function setattr(obj: object, key: string, value:unknown) {
    // @ts-ignore
    return obj[key] = value;
}