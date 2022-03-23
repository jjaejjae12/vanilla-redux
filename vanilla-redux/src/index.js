import { createStore } from "redux"

const from = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TOTO"
const DELETE_TODO = "DELETE_TOTO"

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text
  }
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoOj = { text: action.text, id: Date.now() };
      console.log( Date.now())
      return [newToDoOj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id))
}

const paintToDo = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li")
    const btn = document.createElement("button");
    btn.addEventListener("click", dispatchDeleteToDo)
    btn.innerText = "DEL"
    li.id = toDo.id
    li.innerText = toDo.text;
    li.appendChild(btn)
    ul.appendChild(li)
  });
}

store.subscribe(paintToDo)

const dispatchAddTodDo = (text) => {
  store.dispatch(addToDo(text))
}

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddTodDo(toDo);

};

from.addEventListener("submit", onSubmit)
