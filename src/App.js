import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bill, setBill] = useState(0);
  const  [myTip,setMyTip]=useState(0);
  const [friendTip, setFriendTip]=useState(0);
  const [reset, setReset]=useState(false);
  const averageTip=(myTip+friendTip)/2;
  function handleReset()
  {
    setBill(0);
    setFriendTip(0);
    setMyTip(0);
    setReset(true);
    setTimeout(()=>setReset(false),0);

    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 2000);
    }

  }
  return (
    <>
      <BillValue bill={bill} setBill={setBill} />
      <TipPercentage onTipChange={setMyTip} reset={reset}>
        How much do you rate a food?
      </TipPercentage>
      <TipPercentage onTipChange={setFriendTip} reset={reset}>
        How much does your friend rate a food?
      </TipPercentage>
      { bill > 0 && (
  <div className="result-display">
    <h1>
      <svg viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
      Total Amount
    </h1>
    <div className="result-breakdown">
      <span>${bill.toFixed(2)} (Bill)</span>
      <span>+ ${averageTip.toFixed(2)} (Tip)</span>
      <strong>${(bill + averageTip).toFixed(2)}</strong>
    </div>
  </div>
)}
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

function BillValue({ bill, setBill }) {
  const handleInput = (e) => setBill(Number(e.target.value));
  return (
    <>
      <label>How much was the Bill? </label>{" "}
      <input type="number" value={bill} onChange={handleInput} placeholder="Enter bill"></input>
    </>
  );
}

function TipPercentage({ children, onTipChange, reset}) {
  const [select, setSelect] = useState(0);
  useEffect(() => {
    if (reset) {
      setSelect(0); // Reset the dropdown to default
      onTipChange(0); // Notify parent to reset the tip value
    }
  }, [reset, onTipChange]);
  const handleSelect = (e) => {
    const value = (Number(e.target.value));
    setSelect(value);
    onTipChange(value);

  };
  return (
    <div>
      <label>
      {children}
      </label>
      <select value={select} onChange={handleSelect}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was ok (5%)</option>
        <option value={10}>It was Good (10%)</option>
        <option value={20}>It was amazing (20%)</option>
      </select>
    </div>
  );
}

export default App;
