declare namespace JSX {
  interface IntrinsicElements {
    'date-form-component': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      value?: string;
      'allowed-events'?: string;
    };
  }
}