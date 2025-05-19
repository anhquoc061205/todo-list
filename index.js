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
async function getTodos(){
 try{
    const response = await axios.get("https://6627a8e6b625bf088c0930ad.mockapi.io/tasks");


const ul = document.querySelector(".todo-list");
ul.innerHTML = "";
response.data.forEach((item) => {
    console.log(item);
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
                        <button ><i class="fa-solid fa-pen-to-square"></i></button>
                        <button><i class="fa-solid fa-trash"></i></button>
                    </div>
                </li>`;
                   
//    gắn thẻ li vào ul
   ul.appendChild(li);
    
});
  // lấy ra danh sách ul



 }catch(err){
      console.log(err);
 }
}


// Post function
async function addTodo(){
    let inputData = todoInput.value.trim();
    if (!inputData) return;
    const newTodo = {
    createdAt: new Date().toISOString(),
    content: inputData,
    isCompleted: false,
    
    };

   try{
   
    await axios.post("https://6627a8e6b625bf088c0930ad.mockapi.io/tasks", newTodo);

   todoInput.value = "";
//    fetch Data
    getTodos();
    // Alert notification
    Swal.fire({
      title: "có cái lol",
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
   }catch (error) {
    console.log(error);
   }


}

const handelUpdate(id, content){
    Swal.fire({
  title: "Submit your Github username",
  input: "text",
  inputAttributes: {
    autocapitalize: "off"
  },
  inputValue: content,
  showCancelButton: true,
  confirmButtonText: "Look up",
  showLoaderOnConfirm: true,
  preConfirm: async (dataInput) => {
  axios.put(`https://6627a8e6b625bf088c0930ad.mockapi.io/tasks/${id}`,
    {
        content: dataInput,
    } 
    );
  },
});
}