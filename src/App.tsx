import './App.css';

function App() {
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
          Bitte ein Datum eingeben
          <input type="date" />
        </label>
      </form>
    </main>
  );
}

export default App;
