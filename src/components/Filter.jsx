function Filter({ setFilter }) {
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
    </div>
  );
}

export default Filter;