console.log("Hello");
document.addEventListener("DOMContentLoaded", getTodos);
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


async function getTodos(){
 try{
    const response = await axios.get("https://6627a8e6b625bf088c0930ad.mockapi.io/tasks");
console.log(response.data);
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
                        <button><i class="fa-solid fa-pen-to-square"></i></button>
                        <button><i class="fa-solid fa-trash"></i></button>
                    </div>
                </li>`;
                   const ul = document.querySelector(".todo-list");
//    gắn thẻ li vào ul
   ul.appendChild(li);
    
});
  // lấy ra danh sách ul



 }catch(err){
      console.log(err);
 }
}