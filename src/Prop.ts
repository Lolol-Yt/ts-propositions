interface Prop {_propType: string}
namespace Prop {
  export interface True extends Prop {_propType: "True"}
  export namespace True {
    export const intro: () => True = () => {return {_propType: "True"}}
  }
  
  export interface False extends Prop {_propType: "False", proof: never}
  export namespace False {{/* Todo: make elim*/}}
  
  export interface And<L,R> extends Prop = {_propType: "And", left: L, right: R}
  export namespace And {
    export function intro<L,R>(left: L, right: R): And<L,R> {return {_propType: "And", left: left, right: right}}
  }
  export namespace Or {
    export interface inl<L> extends Prop {_propType: "Or.inl", value: L}
    export interface inr<R> extends Prop {_propType: "Or.inr", value: R}
  }
  export type Or<L,R> = inl<L> | inr<R>
  export namespace Or {
    export function inl<L,R>(left: L): Or<L,R> {return {_propType: "Or.inl", value: left}}
    export function inr<L,R>(right: R): Or<L,R> {return {_propType: "Or.inr", value: right}}
    export function elim<L,R,C>(orProp: Or<L,R>, onLeft: (p: L) => C, onRight: (p: R) => C) {
      switch (orProp._propType) {
        case "Or.inl":
          return onLeft(orProp.value)
        case "Or.inr":
          return onRight(orProp.value)
      }
    }
  }
  
  export type Not<P> = (p: P) => False
  export namespace Not {
    export function contradiction<P>(p: P, np: Not<P>): False {return np(p)}
  }
  
  export type Eq<T,A extends T,B extends A> = A extends B ? {_propType: "Eq", left: A, right: B} : never
  export namespace Eq {
    export function rfl<T,A extends T>(a: A): Eq<T,A,A> {return {_propType: "Eq", left: a, right: a} as Eq<T,A,A>}
  }
}
