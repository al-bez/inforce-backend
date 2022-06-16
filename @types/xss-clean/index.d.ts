type FunctionAny<A = any[], B = any> = (...args: A extends any[] ? A : [A]) => B

declare module 'xss-clean' {
  const value: FunctionAny

  export default value
}
