/* eslint-disable no-return-assign */

class Assignable {
  constructor(properties: any) {
    Object.keys(properties).map(
      (key) =>
        // @ts-ignore
        (this[key] = properties[key])
    );
  }
}

export class AccountData extends Assignable { }
