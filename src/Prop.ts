interface Prop {_propType: string}
namespace Prop {
  export interface True extends Prop {_propType: "True"}
  export namespace True {
    export const intro: () => True = () => {return {_propType: "True"}}
  }
  
  export interface False extends Prop {_propType: "False", proof: never}
  export namespace False {
    export function elim<C>(f: False) {return f.proof as C}
  }
  
  export interface And<L extends Prop,R extends Prop> extends Prop {_propType: "And", left: L, right: R}
  export namespace And {
    export function intro<L extends Prop,R extends Prop>(left: L, right: R): And<L,R> {return {_propType: "And", left: left, right: right}}
  }
  export namespace Or {
    export interface inl<L extends Prop> extends Prop {_propType: "Or.inl", value: L}
    export interface inr<R extends Prop> extends Prop {_propType: "Or.inr", value: R}
  }
  export type Or<L extends Prop,R extends Prop> = Or.inl<L> | Or.inr<R>
  export namespace Or {
    export function inl<L extends Prop,R extends Prop>(left: L): Or<L,R> {return {_propType: "Or.inl", value: left}}
    export function inr<L extends Prop,R extends Prop>(right: R): Or<L,R> {return {_propType: "Or.inr", value: right}}
    export function elim<L extends Prop,R extends Prop,C>(orProp: Or<L,R>, onLeft: (p: L) => C, onRight: (p: R) => C): C {
      switch (orProp._propType) {
        case "Or.inl":
          return onLeft(orProp.value)
        case "Or.inr":
          return onRight(orProp.value)
      }
    }
  }
  
  export type Not<P extends Prop> = (p: P) => False
  export namespace Not {
    export function contradiction<P extends Prop>(p: P, np: Not<P>): False {return np(p)}
  }
  
  export type Eq<A,B> = A extends B ? (B extends A ? {_propType: "Eq", left: A, right: B} : never) : never
  export namespace Eq {
    export function rfl<A>(a: A): Eq<A,A> {return {_propType: "Eq", left: a, right: a} as Eq<A,A>}
  }
}
