import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

interface Todo {
  content: string;
  isChecked: boolean;
}

function App() {
  const [Todoz, setTodoz] = useState<Todo[]>([]);
  const [toDo, setToDo] = useState("");
  const [duplicateMesssage, setDuplicateMessage] = useState<string | null>(
    null
  );

  const handleAddClick = (e: React.FormEvent) => {
    e.preventDefault();

    const actualTodo = toDo.trim();
    if (actualTodo === "") return;
    const toDoExists = Todoz.some(
      (todo) => todo.content.toLowerCase() === actualTodo.toLowerCase()
    );
    if (!toDoExists) {
      setTodoz((recent) => [
        ...recent,
        { content: actualTodo, isChecked: false },
      ]);
      setToDo("");
    } else {
      setDuplicateMessage("ToDo already exists!");
    }
  };

  const handleDelete = (id: string) => {
    setTodoz((prevTodos) => prevTodos.filter((todo) => todo.content != id));
  };

  const handleEdit = (id: string, newContent: string) => {
    setTodoz((prevTodos) =>
      prevTodos.map((todo) => {
        return todo.content == id ? { ...todo, content: newContent } : todo;
      })
    );
  };

  const handleCheck = (id: string) => {
    setTodoz((previousTodoz) =>
      previousTodoz.map((todo) =>
        id === todo.content ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  useEffect(() => {
    if (duplicateMesssage) {
      const timer = setTimeout(() => {
        setDuplicateMessage(null);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [duplicateMesssage]);

  return (
    <main>
    <div> <h1>Pulse Tasks</h1>
    </div>

      <form action="">
        <input
          type="text"
          value={toDo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setToDo(e.target.value)
          }
          placeholder="Enter a pulseTask..."
        />
        <button onClick={handleAddClick}>add</button>
        {duplicateMesssage && <p>{duplicateMesssage}</p>}
      </form>

      <ul className="to-do-list">
        {Todoz.map((todo, index) => (
          <li key={index}>
            <div>
              <input
                type="checkbox"
                checked={todo.isChecked}
                onChange={() => handleCheck(todo.content)}
              />
              <div
                className="item"
                style={{
                  textDecoration: todo.isChecked ? "line-through" : "none",
                }}
              >
                {todo.content}
              </div>
              <div className="btns">
                <button
                  onClick={() =>
                    handleEdit(
                      todo.content,
                      prompt("Edit Todo: ", todo.content) || todo.content
                    )
                  }
                >
                  <MdEdit />{" "}
                </button>
                <button onClick={() => handleDelete(todo.content)}>
                  {" "}
                  <MdDelete />{" "}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
