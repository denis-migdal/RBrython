import {save} from "./index.js";
import {glob} from 'glob';

const dir = "./src/tests/py/"

function generate(list) {
    let result = "const test_suite = {\n";

    for(let i = 0; i < list.length; ++i) {

        result += `\t"${list[i].slice(0,-3)}":\trequire("!!raw-loader!./${list[i]}").default,\n`;

    }

    /*
    "kernel/op/is": require("!!raw-loader!./py/kernel/op/is.py").default,
*/

    result += "}\nexport default test_suite";

    return result;
}

export default async function genTestSuite() {
    save(`${dir}/index.ts`, generate(await glob("**/*.py", {cwd: dir})) )
}