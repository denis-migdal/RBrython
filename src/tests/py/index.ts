const test_suite = {
	"kernel/op/or":	require("!!raw-loader!./kernel/op/or.py").default,
	"kernel/op/is":	require("!!raw-loader!./kernel/op/is.py").default,
	"kernel/op/and":	require("!!raw-loader!./kernel/op/and.py").default,
	"kernel/match/classes":	require("!!raw-loader!./kernel/match/classes.py").default,
	"kernel/ctrlflow/continue":	require("!!raw-loader!./kernel/ctrlflow/continue.py").default,
	"kernel/ctrlflow/break":	require("!!raw-loader!./kernel/ctrlflow/break.py").default,
	"core/int/op":	require("!!raw-loader!./core/int/op.py").default,
	"core/float/op":	require("!!raw-loader!./core/float/op.py").default,
}
export default test_suite