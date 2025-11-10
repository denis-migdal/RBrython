// prevents circular dependencies.

import { _boolean } from "../tmp_corelib/boolean";
import { float } from "../tmp_corelib/float";
import overrided_types from "./overridden_types";
import { str } from "../tmp_corelib/str";

overrided_types["number"]  = float;
overrided_types["string"]  = str;
overrided_types["boolean"] = _boolean;