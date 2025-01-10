import { useEffect, useState } from "react";

function App() {
  const [Todoz, setTodoz] = useState<string[]>([]);
  const [toDo, setToDo] = useState("");
  const [duplicateMesssage, setDuplicateMessage] = useState<string | null>(
    null
  );

  const handleAddClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (toDo.trim() === "") return;
    const toDoExists = Todoz.some(
      (todo) => todo.toLowerCase() === toDo.toLowerCase()
    );
    if (!toDoExists) {
      setTodoz((recent) => [...recent, toDo]);
      setToDo("");
    } else {
      setDuplicateMessage("ToDo already exists!");
    }
  };

  useEffect(() => {
    if (duplicateMesssage) {
      const timer = setTimeout(() => {
        setDuplicateMessage(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [duplicateMesssage]);
  return (
    <main>
      <form action="">
        <input
          type="text"
          value={toDo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setToDo(e.target.value)
          }
        />
        <button onClick={handleAddClick}>add</button>
        {duplicateMesssage && <p>{duplicateMesssage}</p>}
      </form>

      <div className="to-do-list">
        {Todoz.map((todo, index) => (
          <div key={index}>{todo} </div>
        ))}
      </div>
    </main>
  );
}

export default App;
