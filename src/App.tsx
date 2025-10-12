import { useEffect, useRef, useState } from 'react';
import { DateField, DateInput, DateSegment, Label } from 'react-aria-components';

import './App.css';
import './DateFormComponent';

function App() {
  const [webComponentValue, setWebComponentValue] = useState('2024-01-15');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_iframeValue, setIframeValue] = useState('2024-02-14');
  const webComponentRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleDateChange = (e: CustomEvent) => {
    console.log('Date changed:', e.detail.value);
  };

  useEffect(() => {
    const element = webComponentRef.current;
    if (!element) return;



    element.addEventListener('datechange', handleDateChange as EventListener);

    return () => {
      element.removeEventListener('datechange', handleDateChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'datechange') {
        console.log('Iframe date changed:', e.data.value);
      } else if (e.data.type === 'datesubmit') {
        console.log('Iframe form submitted:', e.data.value);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const setIframeDate = (value: string) => {
    setIframeValue(value);
    iframeRef.current?.contentWindow?.postMessage({ type: 'setValue', value }, '*');
  };

  return (
    <main>
      <h1>Input type date mit React:</h1>

      <h2>Variante 1: label + input</h2>

      <form>
        <label htmlFor="my-date-input-1">Bitte ein Datum eingeben:</label>
        <input id="my-date-input-1" type="date" />
      </form>

      <h2>Variante 2: input als Kindelement von label:</h2>

      <form>
        <label>
          Bitte ein Datum eingeben:
          <input type="date" />
        </label>
      </form>

      <h2>Variante 3: Web Component</h2>

      <div>
        <button type='button' onClick={() => setWebComponentValue('2024-12-31')}>
          Datum auf Silvester setzen
        </button>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <date-form-component
          ref={webComponentRef}
          value={webComponentValue} />
      </div>

      <h2>Variante 4: Iframe</h2>

      <div>
        <button type='button' onClick={() => setIframeDate('2024-12-31')}>
          Datum auf Silvester setzen
        </button>
        <iframe
          title='date iframe'
          ref={iframeRef}
          src="/react-input-date-playground/iframe-form.html"
        />
      </div>

      <h2>Variante 5: Drei separate Eingabefelder (iOS VoiceOver Workaround)</h2>

      <form>
        <label aria-hidden htmlFor="my-date-input-2">Bitte ein Datum eingeben:</label>
        <input aria-hidden id="my-date-input-2" type="date" />
        <fieldset>
          <legend>Bitte ein Datum eingeben:</legend>
          <label>
            Tag
            <input type="number" />
          </label>
          <label>
            Monat
            <input type="number" />
          </label>
          <label>
            Jahr
            <input type="number" />
          </label>
        </fieldset>
      </form>

      <h2>Variante 6: Text-Eingabe mit Format-Hinweis (iOS VoiceOver Workaround)</h2>

      <form>
        <label aria-hidden htmlFor="my-date-input-3">Bitte ein Datum eingeben:</label>
        <input aria-hidden id="my-date-input-3" type="date" />
        <label htmlFor="date-text">
          Datum (TT.MM.JJJJ):
          <input
            id="date-text"
            type="text"
            placeholder="31.12.2024"
            pattern='[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9][0-9][0-9]'
            aria-describedby="date-format"
          />
        </label>
        <div className='sr-only' id="date-format">Format: Tag Punkt Monat Punkt Jahr</div>
      </form>

      <h2>Variante 7: react-aria-components (iOS VoiceOver Workaround)</h2>

      <label aria-hidden htmlFor="my-date-input-3">Bitte ein Datum eingeben:</label>
      <input aria-hidden id="my-date-input-3" type="date" />
      <form className='sr-only'>
        <DateField>
          <Label>Bitte ein Datum eingeben:</Label>
          <DateInput>
            {segment => <DateSegment segment={segment} />}
          </DateInput>
        </DateField>
      </form>

      <h2>Variante 8: role textinput</h2>

      <form>
        <label htmlFor="my-date-input-4">Bitte ein Datum eingeben:</label>
        <input id="my-date-input-4" type="date" role='textbox' />
      </form>
    </main>
  );
}

export default App;
