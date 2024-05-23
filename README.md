Inspired by the Prop type in Lean
```ts
import "ts-propositions"

function pImpSelf<P extends Prop>(): (p:P) => P {return ((p) => p)}
```
