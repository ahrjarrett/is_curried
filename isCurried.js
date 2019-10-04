// data (functions) to test:
const sortDescendingUncurried = (a, b) => b - a
const sortDescendingCurried = a => b => b - a

// Calling this function returns a new version of itself indefinitely
const NOOP = () => NOOP // (Did I make the Church numeral for Infinity??)

// Predicates:
const isFunction = a => Boolean(typeof a === 'function')
const isUnary = fn => Boolean(fn.length === 1)

// This is the wonky test for curried-ness...
const callWithUndefinedAt2 = fn => fn.apply(NOOP(), [NOOP(), undefined])

// This solution duplicates function calls instead of composing. It also declares `fn` and passes it.
const isCurriedUncomposed = fn => isFunction(callWithUndefinedAt2(fn)) && isUnary(callWithUndefinedAt2(fn))

// But it works. Can we refactor with composition to make my pointfree-helper pointfree?
console.log('false  :: ', isCurriedUncomposed(sortDescendingUncurried))
console.log(' true  :: ', isCurriedUncomposed(sortDescendingCurried))


// Let's implement some helpers &
const compose = (f, g) => x => f(g(x))
const allPass = (...fns) => a => [...fns.map(fn => fn(a))].every(x => x)
const isUnaryFn = allPass(isFunction, isUnary)

// This solution uses composition & is pointfree!
const isCurried = compose(isUnaryFn, callWithUndefinedAt2)

console.log('false  :: ', isCurried(sortDescendingUncurried))
console.log(' true  :: ', isCurried(sortDescendingCurried))

