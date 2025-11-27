let _tmp: any = null;

export function saveTmp(v: any): any {
    return _tmp = v;
}

export function tmp(): any { // may reuse many time ?
    return _tmp;
}
export function withTmp(value: any): any {
    _tmp = null;
    return value;
}

/*
export function saveTmp(v: any): any {
    return tmp = v;
}
export function releaseTmp(v: any) {
    tmp = null;
    return v;
}*/

