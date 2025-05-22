const API_URL = "https://6627a8e6b625bf088c0930ad.mockapi.io/tasks";

const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");

document.addEventListener("DOMContentLoaded", getTodos);
addButton.addEventListener("click", addTodo);

// function getTodos(){
//    fetch("https://6627a8e6b625bf088c0930ad.mockapi.io/tasks")
// //    chuyển về json
//    .then(response => response.json())
// //    lấy dữ liệu
//    .then((data) => console.log(data))
// //    in ra lỗi nếu có lỗi
//    .catch((err) => console.log(err));

// }
// function getTodos(){
//    const response = axios.get("https://6627a8e6b625bf088c0930ad.mockapi.io/tasks")
//    .then((response) => console.log(response.data))
//    .catch((error) => console.log(error));
// axios.get("https://6627a8e6b625bf088c0930ad.mockapi.io/tasks");
// console.log(response);
// }

// Get function
async function getTodos() {
  try {
    const response = await axios.get(API_URL);

    const ul = document.querySelector(".todo-list");
    ul.innerHTML = "";

    response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    response.data.forEach((item) => {
      // console.log(item);
      // console.log(item.content);
      const li = document.createElement("li");

      li.className = "todo-item";
      //    format day
      const date = new Date(item.createdAt);
      // const formatDate = `${date.toLocaleDateString()} - ${date.toLocaleDateString}`;
      const formatDate = `${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`;

      //    gắn nội dung
      li.innerHTML = ` 
                    <div class="todo-content">
                        <input type="checkbox">
                        <div>
                            <p>${item.content}</p>
                            <span>Created: ${formatDate}</span>
                        </div>
                    </div>
                    <div class="todo-actions">
                        <button onclick="handelUpdate(${item.id}, '${item.content}')"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onClick = "handelDelete(${item.id})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </li>`;

      //    gắn thẻ li vào ul
      ul.appendChild(li);
    });
    // lấy ra danh sách ul
  } catch (err) {
    console.log(err);
  }
}

// Post function
async function addTodo() {
  let inputData = todoInput.value.trim();
  if (!inputData) return;
  const newTodo = {
    createdAt: new Date().toISOString(),
    content: inputData,
    isCompleted: false,
  };

  try {
    await axios.post(API_URL, newTodo);

    todoInput.value = "";
    //    fetch Data
    getTodos();
    // Alert notification
    showNotification("Add todo successfully!");
  } catch (error) {
    console.log(error);
  }
}

// put function
function handelUpdate(id, content) {
  Swal.fire({
    title: "Submit your Github username",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    inputValue: content,
    showCancelButton: true,
    confirmButtonText: "Look up",
    showLoaderOnConfirm: true,
    preConfirm: async (dataInput) => {
      await axios.put(`${API_URL}/${id}`, {
        content: dataInput,
      });
      getTodos();
      showNotification("Add todo successfully!");
    },
  });
}

// Delete function
function handelDelete(id) {
  console.log(id);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then( async (result) => {
      if (result.isConfirmed) {
      await axios.delete(`${API_URL}/${id}`);

      getTodos();
      showNotification("Add rodo successfully!");
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}

// add thông báo cho các function
function showNotification(message) {
  Swal.fire({
    title: message,
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
    backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `,
  });
}
