declare class TsSdkTemplate {
    static namespace: string;
    static version: string;
    private name;
    private obj;
    private nullish;
    nullishCoalescingOperator(): string;
    optionalChain(): string;
    objectSpread(): {
        x: number;
        y: number;
        z: {
            a: number;
            b: number;
        };
    };
    arrowFunction: () => string;
    asyncFunction(): Promise<string>;
    showPrivateName(): string;
}
export default TsSdkTemplate;
