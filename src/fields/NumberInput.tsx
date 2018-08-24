import * as React from 'react';


class Props {
  id?: string;
  value?: number;
  updater?: (x: number) => void;
  className?: string;
  editable: boolean;
  max: number;
}


class NumberInput extends React.PureComponent<Props, number> {
  public static defaultProps: Partial<Props> = {
    editable: true,
    max: 1e21 - 1,
  };

  render() {
    const id = this.props.id;
    const update = (v: string) => {
      if (/^\d+$/.test(v)) {
        const number = Number(v);
        if (
          this.props.editable &&
          this.props.updater !== undefined &&
          !isNaN(number) &&
          number <= this.props.max
        ) {
          this.props.updater(Number(v));
        }
      }
      else if (v == "" && this.props.updater !== undefined) {
        this.props.updater(0);
      }
    };
    return (
      <input id={id} type="number" className={this.props.className}
             disabled={!this.props.editable} value={this.value()}
             onChange={(e) => update(e.currentTarget.value)}
      />);
  }

  private value(): string {
    if (this.props.value === undefined) {
      return ""
    }
    else {
      return this.props.value.toFixed()
    }
  }
}

export default NumberInput;