function AddTodo({ addTodo, setItem, item }) {
    return (
      <div className="add">
        <input className="addTodo" value={item} onChange={(e) => {
          setItem(e.target.value);
        }} ></input>
        <button className="button" onClick={() => {
          console.log(item)
          addTodo(item)
        }}>
          Add
        </button>
      </div>
    )
  
  }
export default AddTodo;