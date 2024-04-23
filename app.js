const firebaseConfig = {
    apiKey: "AIzaSyANNjKH98XGR1GWQxED2Tq1ec3Uo2bEKxE",
    authDomain: "task-management-693be.firebaseapp.com",
    projectId: "task-management-693be",
    storageBucket: "task-management-693be.appspot.com",
    messagingSenderId: "534165362582",
    appId: "1:534165362582:web:d96828de9a6e0fcfd22fb7",
    measurementId: "G-P5GQ2PCRWF"
};

const firebase = initializeApp(firebaseConfig);
const db = firebase.firestore();

function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("Tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput = "";
    }
}

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <span>${doc.data().task}</span>
        <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

db.collection("tasks").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    })
});

function deleteTask(id) {
    db.collection("Tasks").doc(id).delete();
}
