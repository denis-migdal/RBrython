import { ParsedCode } from "@SBrython/rbry/ast/types";
import { Results } from "../results";
import { BryRunner } from "../runner";

declare const $B: any;

export default function buildAST(code: string, results: Results, use_parser: boolean) {

    const _ast: {bry: ParsedCode|null, sbry: ParsedCode|null} = {
         bry: null,
        sbry: null
    }

    const beg = performance.now();
    _ast.bry = _ast.sbry = BryRunner.parse(code);
    const t0 = performance.now();

    // tokens count
    const tokens = $B.tokenizer(code, '_');
    results.nb_tokens += tokens.length;

    results.bry .times[results.bry .offset++] += t0 - beg;
    results.sbry.times[results.sbry.offset++] += t0 - beg;

    return _ast;
}