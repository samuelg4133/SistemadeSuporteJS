const tablinks = document.querySelectorAll(".tab .tab-link");

const tabcontent = document.querySelectorAll(".tab-content");

const openTabContent = (event) => {
    tabcontent.forEach((element) => {
        element.style.display = "none";
    });
    tablinks.forEach((element) => {
        element.className = element.className.replace(" active", "");
    });
    event.currentTarget.className += " active";
    tabcontent.forEach((element) => {
        if (element.classList.contains(event.currentTarget.classList.item(1))) {
            element.style.display = "block";
        }
    });
};

tablinks.forEach((el) => el.addEventListener("click", openTabContent));

document.querySelector("#default").click();

//Reset Form
const resetForm = () => {
    document.querySelector("input#name").value = "";
    document.querySelector("input#subject").value = "";
    document.querySelector("textarea#description").value = "";
};

let calls = JSON.parse(localStorage.getItem("calls")) || [];

// Enviar dados do formulário
const form = document.querySelector("#root #main form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        id: calls.length,
        user: document.querySelector("input#name").value,
        subject: document.querySelector("input#subject").value,
        description: document.querySelector("textarea#description").value,
    };
    try {
        calls.push(data);
        localStorage.setItem("calls", JSON.stringify(calls));
        alert('Dados inseridos com sucesso!');
    } catch (err) {
        console.error(err);
    } finally {
        resetForm();
    }
});

const makeTable = document.querySelector('#call-table table tbody');

const makeChild = (text, element, id, parent) => {
    const newTd = document.createElement(element);
    newTd.innerHTML = text;
    if (id != null) {
        newTd.id = id;
    }
    parent.appendChild(newTd);
}

const getCalls = () => {
    makeTable.innerHTML = '';
    calls.forEach(item => {
        const tr = document.createElement("tr");
        makeChild(item.user, 'td', null, tr);
        makeChild(item.subject, 'td', null, tr);
        makeChild(item.description, 'td', null, tr);
        makeChild('Finalizar', 'button', item.id, tr);
        makeTable.appendChild(tr);
    })
    const btn = document.querySelectorAll('table button');
    btn.forEach(btnClick => {
        btnClick.addEventListener('click', (e) => {
            const index = calls.
            findIndex(el => el.id == parseInt(e.target.id));
            e.target.parentNode.remove();
            calls.splice(index, 1);
            localStorage.setItem("calls", JSON.stringify(calls));
        })
    })
};

document.
querySelector('button.calls').
addEventListener('click', getCalls);