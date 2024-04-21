namespace Prop {
  export type True = {_propType: "True"}
  export namespace True {
    export const intro: () => True = () => {return {_propType: "True"}}
  }
  export type False = never
  export namespace False {{}}
  export type And<L,R> = {_propType: "And", left: L, right: R}
  export namespace And {
    export function intro<L,R>(left: L, right: R): And<L,R> {return {_propType: "And", left: left, right: right}}
  }
  export type Or<L,R> = {_propType: "Or.inl", value: L} | {_propType: "Or.inr", value: R}
  export namespace Or {
    export function inl<L,R>(left: L): Or<L,R> {return {_propType: "Or.inl", value: left}}
    export function inr<L,R>(right: R): Or<L,R> {return {_propType: "Or.inr", value: right}}
  }
  export function Not<P>() {return (p: P) => Prop.False}
}
