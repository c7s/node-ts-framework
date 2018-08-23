/**
 * Support specifying REST list options:
 * to switch return mode: return=only:count, return=only:searchIndex
 * to return additional fields: return=addition:description,content,commentsCount
 */
export class ReturnSpecification {
  public additions: string[] = [];
  protected onlyValue?: string;

  constructor(returnSpec?: string) {
    if (returnSpec) {
      const [mode, value] = returnSpec.split(':');
      switch (mode) {
        case 'only':
          this.onlyValue = value;
          break;

        case 'addition':
          this.additions = value.split(',');
          break;
      }

    }
  }

  public only(only: string) {
    return this.onlyValue === only;
  }

  public addition(name: string): boolean {
    return this.additions.indexOf(name) > -1;
  }

}
