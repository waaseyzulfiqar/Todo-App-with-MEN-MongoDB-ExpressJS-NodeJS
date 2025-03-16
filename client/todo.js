const input = document.querySelector("#input");

const ol = document.querySelector("ol");

const renderTodo = async () => {
  try {
    const data = await fetch("http://localhost:4211/getAllTodos");
    const todo = await data.json();
    // console.log(todo);
    if (todo.length === 0) {
      ol.innerHTML = `
        <h4 class="no-todos">Nothing to do? Add a new todo to stay productive!</h4>
      `;
    } else {
      ol.innerHTML = "";

      todo.map((todo, index) => {
        ol.innerHTML += ` <li key=${index} class="text-start p-2" id="todoJs">${todo.task}

                            <div class="d-flex">
                            <button onclick="liEditBtn('${todo._id}')" class="edit-btn"><i class="ri-edit-box-line"></i></button>
                              <button onclick="liDelBtn('${todo._id}')" class="del-btn"><i class="ri-close-line"></i></button>
                            </div>

                            </li>`;
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

renderTodo();

// create Todo

const createTodo = async () => {
  try {
    var todoObj;

    if (input.value.trim()) {
      todoObj = {
        task: input.value,
      };
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Todo Input shouldn't be empty`,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const res = await fetch("http://localhost:4211/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoObj),
    });

    input.value = "";
    // console.log(res);

    if (res.status == 200 && res.ok === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Todo Added!😊",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    renderTodo();
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `${error.message} || Oops 😕 Something went wrong`,
      showConfirmButton: false,
      timer: 1500,
    });
    console.log(error.message);
  }
};

// Delete Todo

const liDelBtn = (id) => {
  try {
    Swal.fire({
      title: "Are you sure ?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#4cc54c",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:4211/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(res);

        if (res.status == 200 && res.ok === true) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Todo Deleted!😊",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        renderTodo();
      } else if (result.isDenied) {
        // renderTodo();
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Update Todo

const liEditBtn = async (id) => {
  try {
    const { value: editedTodo } = await Swal.fire({
      title: "Edit your Todo",
      input: "text",
      showCancelButton: true,
      confirmButtonColor: "#4cc54c", // Change the button color to blue
      cancelButtonColor: "#d33", // Change the cancel button color to red
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    console.log(editedTodo);
    if (editedTodo) {
      const res = await fetch(`http://localhost:4211/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: editedTodo,
        }),
      });

      // console.log(res);
      if (res.status == 200 && res.ok === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Todo Updated!😊",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      renderTodo();
    }
  } catch (error) {
    console.log(error.message);
  }
};
