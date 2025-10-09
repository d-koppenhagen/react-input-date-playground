class DateFormComponent extends HTMLElement {
  private form: HTMLFormElement;
  private input: HTMLInputElement;
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });

    this.form = document.createElement('form');
    const label = document.createElement('label');
    label.textContent = 'Bitte ein Datum eingeben:';

    this.input = document.createElement('input');
    this.input.type = 'date';
    this.input.addEventListener('change', this.handleChange.bind(this));

    label.appendChild(this.input);
    this.form.appendChild(label);

    this.shadow.appendChild(this.form);
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'value' && this.input) {
      this.input.value = newValue || '';
    }
  }

  private handleChange() {
    this.dispatchEvent(new CustomEvent('datechange', {
      detail: { value: this.input.value },
      bubbles: true
    }));
  }
}

customElements.define('date-form-component', DateFormComponent);
