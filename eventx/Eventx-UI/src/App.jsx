import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>EventX 🎉</h1>
      <p>{data ? data : "جاري تحميل البيانات..."}</p>
    </div>
  );
}

export default App;
