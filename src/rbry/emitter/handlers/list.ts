import Handlers, { Handler } from "./index";

import {default as ClassDef} from "./definitions/ClassDef";
Handlers["ClassDef"] = ClassDef as Handler;

import {default as FunctionDef} from "./definitions/FunctionDef";
Handlers["FunctionDef"] = FunctionDef as Handler;

import {default as Lambda} from "./definitions/Lambda";
Handlers["Lambda"] = Lambda as Handler;

import {default as Arguments} from "./definitions/Arguments";
Handlers["arguments"] = Arguments as Handler;

import {default as Global} from "./vars/Global";
Handlers["Global"] = Global as Handler;

import {default as Nonlocal} from "./vars/Nonlocal";
Handlers["Nonlocal"] = Nonlocal as Handler;


import {default as Subscript} from "./operators/Subscript";
Handlers["Subscript"] = Subscript as Handler;

import {default as Assert} from "./keywords/Assert";
Handlers["Assert"] = Assert as Handler;

import {default as Pass} from "./keywords/Pass";
Handlers["Pass"] = Pass as Handler;

import {default as Return} from "./keywords/Return";
Handlers["Return"] = Return as Handler;


import {default as Assign} from "./operators/Assign";
Handlers["Assign"] = Assign as Handler;

import {default as Attribute} from "./operators/Attribute";
Handlers["Attribute"] = Attribute as Handler;

import {default as AugAssign} from "./operators/AugAssign";
Handlers["AugAssign"] = AugAssign as Handler;

import {default as BinOp} from "./operators/BinOp";
Handlers["BinOp"] = BinOp as Handler;

import {default as Call} from "./operators/Call";
Handlers["Call"] = Call as Handler;

import {default as Compare} from "./operators/Compare";
Handlers["Compare"] = Compare as Handler;

import {default as UnaryOp} from "./operators/UnaryOp";
Handlers["UnaryOp"] = UnaryOp as Handler;

import {default as Constant} from "./vars/Constant";
Handlers["Constant"] = Constant as Handler;

import {default as Expr} from "./vars/Expr";
Handlers["Expr"] = Expr as Handler;

import {default as Name} from "./vars/Name";
Handlers["Name"] = Name as Handler;

import {default as JoinedStr} from "./vars/JoinedStr";
Handlers["JoinedStr"] = JoinedStr as Handler;

import {default as If} from "./controlflows/If";
Handlers["If"] = If as Handler;

import {default as While} from "./controlflows/While";
Handlers["While"] = While as Handler;

import {default as For} from "./controlflows/For";
Handlers["For"] = For as Handler;

import {default as Try} from "./controlflows/Try";
Handlers["Try"] = Try as Handler;

import {default as Match} from "./controlflows/Match";
Handlers["Match"] = Match as Handler;

import {default as Continue} from "./keywords/Continue";
Handlers["Continue"] = Continue as Handler;

import {default as Break} from "./keywords/Break";
Handlers["Break"] = Break as Handler;

import {default as Raise} from "./keywords/Raise";
Handlers["Raise"] = Raise as Handler;

import {default as ImportFrom} from "./imports/ImportFrom";
Handlers["ImportFrom"] = ImportFrom as Handler;

import {default as Import} from "./imports/Import";
Handlers["Import"] = Import as Handler;

import {default as BoolOp} from "./operators/BoolOp";
Handlers["BoolOp"] = BoolOp as Handler;

