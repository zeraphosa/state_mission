import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState([]);
  const [guzergah, setGuzergah] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (guzergah.length === 0) setDisable(true);
    else setDisable(false);
  }, [guzergah]);

  return (
    <div className="App">
      <div className="first">
        <input
          type={"text"}
          placeholder="Guzergah"
          onChange={(e) => setGuzergah(e.target.value)}
        />
        <button
          onClick={() => {
            setInputs([...inputs, { durak_adi: "", enlem: "", boylam: "" }]);
          }}
        >
          Yeni Durak Ekle
        </button>
      </div>
      <div className="second">
        {inputs.map((singleInputs, idx) => {
          return (
            <div key={idx} className="inputs">
              <input type={"text"} placeholder="Durak Adi" />
              <input type={"text"} placeholder="Enlem" />
              <input type={"text"} placeholder="Boylam" />
            </div>
          );
        })}
      </div>
      <button disabled={disable}>KAYDET</button>
    </div>
  );
}

export default App;
