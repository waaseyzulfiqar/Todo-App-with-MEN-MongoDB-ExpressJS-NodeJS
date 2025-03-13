const input = document.querySelector("#input");

const ol = document.querySelector("ol");

let todo = [];

let todoArray = []; // to save todo data to localstorage

const form = document.querySelector("#form");

const renderTodo = () => {
  try {
    if (todo.length === 0) {
      ol.innerHTML = `
        <h4 class="no-todos">Nothing to do? Add a new todo to stay productive!</h4>
      `;
    } else {
      ol.innerHTML = "";

      for (let i = 0; i < todo.length; i++) {
        ol.innerHTML += ` <li class="text-start p-2" id="todoJs">${todo[i]}
    
                            <div class="d-flex">
                            <button onclick="liEditBtn(${i})" class="edit-btn"><i class="ri-edit-box-line"></i></button>
                              <button onclick="liDelBtn(${i})" class="del-btn"><i class="ri-close-line"></i></button>
                            </div>
                            
                            </li>`;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

renderTodo();

const addTodo = () => {
  try {
    let date = new Date();

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (input.value.trim()) {
        let userTodoObj = {
          task: input.value,
          createdAt: date.toLocaleString(),
        };

        todo.unshift(input.value);

        renderTodo();

        todoArray.push(userTodoObj);

        input.value = "";
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const liDelBtn = (index) => {
  try {
    Swal.fire({
      title: "Are you sure ?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#4cc54c",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        todo.splice(index, 1);
        todoArray.splice(index, 1); // Remove the deleted todo item from todoArray
        renderTodo();
      } else if (result.isDenied) {
        renderTodo();
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const liEditBtn = async (index) => {
  try {
    const { value: editedTodo } = await Swal.fire({
      title: "Edit your Todo",
      input: "text",
      inputValue: todo[index], // Use the current todo item as the input value
      showCancelButton: true,
      confirmButtonColor: "#4cc54c", // Change the button color to blue
      cancelButtonColor: "#d33", // Change the cancel button color to red
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (editedTodo) {
      todo.splice(index, 1, editedTodo); // Use the editedTodo value to update the todo item

      todoArray[index].task = editedTodo; // Update the edited todo item in todoArray

      renderTodo();
    }
  } catch (error) {
    console.log(error.message);
  }
};
