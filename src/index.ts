// eslint-disable-next-line @typescript-eslint/ban-types
function Decorator(constructor: Function): void {
  constructor.prototype.decorated = true
}

@Decorator
class TsSdkTemplate {
  static namespace = '__NAMESPACE__'
  static version = '__VERSION__'

  private name = 'ts-sdk-template'

  private obj = {
    foo: {
      bar: {
        baz: 'baz'
      }
    }
  }

  private nullish: string | undefined

  public nullishCoalescingOperator(): string {
    const nullish = this.nullish ?? 'nullish'
    console.log(nullish)
    return nullish
  }

  public optionalChain(): string {
    console.log(this.obj?.foo?.bar?.baz)

    return this.obj?.foo?.bar?.baz
  }

  public objectSpread(): {
    x: number
    y: number
    z: {
      a: number
      b: number
    }
  } {
    const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
    console.log(x) // 1
    console.log(y) // 2
    console.log(z) // { a: 3, b: 4 }

    return { x, y, z }
  }

  public arrowFunction: () => string = () => {
    const str = 'arrowFunction'
    console.log(str)
    return str
  }

  public async asyncFunction(): Promise<string> {
    const resolved = await new Promise<string>(resolve => resolve('resolved'))
    console.log(resolved)

    return resolved
  }

  public showPrivateName(): string {
    console.log(this.name)
    return this.name
  }
}

export default TsSdkTemplate
