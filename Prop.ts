type Sorry<T> = (x:T)
type False = null
type True = {}
type Eq<T> = {left: T, right: T}
type Prop<T> = True | False | Eq<T>
