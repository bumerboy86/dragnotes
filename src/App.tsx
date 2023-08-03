import { DragEvent, useState } from 'react'
import './App.css'

type TTodo = {
  id: string,
  message: string,
  index: number
}

function App() {
  const [todoItem, setTodoItem] = useState<TTodo | null>(null);
  const [todo, setTodo] = useState<TTodo[]>([
    {
      id: "03",
      message: "Third note 3",
      index: 1
    },
    {
      id: "01",
      message: "First note 1",
      index: 3
    },
    {
      id: "02",
      message: "Second note 2",
      index: 4
    },
    {
      id: "04",
      message: "Four note 4",
      index: 2
    },
  ])

  function onDragOverHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    if (e.currentTarget.className === "todo_item") {
      e.currentTarget.style.boxShadow = "0 2px 2px 2px gray"
    }
  }

  function onDragLeaveHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.boxShadow = "none"
  }

  function onDragStartHandler(e: DragEvent<HTMLDivElement> , item: TTodo): void {
    setTodoItem(item)
  }

  function onDragEndHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.boxShadow = "none"
  }

  function onDropHandler(e: DragEvent<HTMLDivElement>, item: TTodo): void {
    e.preventDefault();
    setTodo(prev => [...prev].map(key => {
      if (key.id === item.id && todoItem) {
        return {...key, index: todoItem.index}
      }
      if (todoItem && key.id === todoItem.id) {
        return {...key, index: item.index}
      }
      return key
    }))
    e.currentTarget.style.boxShadow = "none"
  }
  

  return (
    <>
      <h1>Todo-List</h1>
      <button className="todo_button" onClick={() => console.log(todo)}>Show notes</button>
      <div className='todo_list'>
        {todo.length && todo.sort((a, b) => a.index - b.index).map(item => {
          return <div 
                  key={item.id}
                  className='todo_item'
                  draggable={true}
                  onDragOver={(e) => onDragOverHandler(e)}
                  onDragLeave={(e) => onDragLeaveHandler(e)}
                  onDragStart={(e) => onDragStartHandler(e, item)}
                  onDragEnd={(e) => onDragEndHandler(e)}
                  onDrop={(e) => onDropHandler(e, item)}
                  >
                    <p>{item.message}</p>
                  </div>
        })}
      </div>
    </>
  )
}

export default App
