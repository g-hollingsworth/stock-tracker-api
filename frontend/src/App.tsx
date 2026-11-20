import { useState } from 'react';

function App() {
  const name = 'World';
  const myfunc = () => {
    alert('Button clicked!');
  };

  const x = 5;
  let y = 'Apple';
  if (x < 10) {
    y = 'Banana';
  }

  function Car(props: { color: string; year: number; brand: string; carinfo: string[] }) {
    return (
      <h2>
        Hi, I am a {props.color} {props.year} {props.brand} Car! {props.carinfo[0]} {props.carinfo[1]}
      </h2>
    );
  }

  const carinfo = ['This is a car', 'It is very fast'];

  function MyForm() {
    const [stockName, setStockName] = useState('');
    const [inputVal, setInputVal] = useState<any>(null);

    async function readTicker(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:8000/stocks/${stockName}`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setInputVal(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    }

    return (
      <div>
        <form onSubmit={readTicker}>
          <label>
            Enter a Valid Stock Symbol:
            <input
              type="text"
              value={stockName}
              onChange={(e) => {
                if (e.target.value.length <= 5) {
                  setStockName(e.target.value);
                }
              }}
            />
          </label>
          <p>Current value: {stockName}</p>
          <button type="submit">Search</button>
        </form>
        {inputVal && <pre>{JSON.stringify(inputVal)}</pre>}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hello {/* Wonderful comment */} {name}!</h1>

      <h2>Welcome to the best stock tracking app! of all time!</h2>

      <p>Watch me add 5 + 5 = {5 + 5}</p>
      <p>Y is: {y}</p>
      <p>{x < 10 ? 'Banana' : 'Apple'}</p>

      <ul>
        <li>Stock 1</li>
        <li>Stock 2</li>
        <li>Stock 3</li>
      </ul>

      <div>
        <p>p1</p>
        <p>p2</p>
      </div>

      <>
        <p>p1 part 2</p>
        <p>p2 part 2</p>
      </>

      {/* <button onClick={myfunc} disabled={true}>Click me</button> */}

      <Car color="red" brand="Toyota" year={2020} carinfo={carinfo} />

      <MyForm />
    </div>
  );
}

export default App;