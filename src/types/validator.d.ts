declare module 'validatorjs' {
  interface ErrorMessages {
    [key: string]: string;
  }

  interface AttributeFormatter {
    (attribute: string): string;
  }

  interface RegisterCallback {
    (value: any, requirement: string | number, attribute: string): boolean;
  }

  interface RegisterAsyncCallback {
    (value: any, requirement: string | number, attribute: string, passes: (success?: boolean) => void): void;
  }

  interface AttributeNames {
    [key: string]: string;
  }

  interface Rules {
    [key: string]: string | string[];
  }

  interface Errors {
    all(): Record<string, string[]>;
    get(attribute: string): string[];
    first(attribute: string): string;
    has(attribute: string): boolean;
  }

  interface ValidatorStatic {
    new <A>(data: A, rules: Rules, customMessages?: ErrorMessages): Validator<A>;
    setMessages(lang: string, messages: ErrorMessages): any;
    getMessages(lang: string): ErrorMessages;
    useLang(lang: string): void;
    getDefaultLang(): string;
    setAttributeFormatter(func: AttributeFormatter): void;
    stopOnError(attributes: boolean | string[]): void;
    register(name: string, fn: RegisterCallback, message?: string): void;
    registerAsync(name: string, fn: RegisterAsyncCallback, message: string): void;
  }

  interface Validator<A> {
    lang: string;
    input: A;
    messages: ErrorMessages;
    errors: Errors;
    errorCount: number;
    hasAsync: boolean;
    rules: Rules;
    numericRules: string[];
    attributeFormatter: AttributeFormatter;
    check(): boolean;
    checkAsync(passes?: Function, fails?: Function): void;
    setAttributeNames(attributes: AttributeNames): void;
    setAttributeFormatter(func: AttributeFormatter): void;
    getRule(name: string): Function;
    stopOnError(passes?: Function): boolean | void;
    passes(passes?: Function): boolean | void;
    fails(fails?: Function): boolean | void;
  }

  const Validator: ValidatorStatic;
  export = Validator;
  export as namespace Validator;
}