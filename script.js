function update_time() {
    let currentTime = new Date().toLocaleString();
    document.querySelector('#topnav h2').textContent = currentTime;
}
function process_line(line) {
    if (line === "clear") {
        for (let i = 1; i <= 100; i++) {
            document.getElementById(`textarea${i}`).value = "";
            document.getElementById(`textarea${i}`).readOnly = false;
        }
        document.getElementById('textarea1').focus();
    } 
    if (line.startsWith("echo ")) {
        let message = line.substring(5);
        for (let i = 1; i <= 100; i++) {
            if (document.getElementById(`textarea${i}`).value === line) {
                document.getElementById(`textarea${i + 1}`).value = message;
                document.getElementById(`textarea${i + 1}`).readOnly = true;
                break;
            }
        }
    }
    if (line == "exit"){
        window.close();
    }

    if (line.startsWith("cd ")) {
        try {
            let path = line.substring(3);
            window.location.href = `https://tbperson.github.io/${path}`;
        } catch (error) {
            for (let i = 1; i <= 100; i++) {
            if (document.getElementById(`textarea${i}`).value === line) {
                document.getElementById(`textarea${i + 1}`).value = `Error: ${error.message}`;
                document.getElementById(`textarea${i + 1}`).readOnly = true;
                break;
            }
            }
        }
        }
    if (line === "help"){
        let help = "Commands available: |" +
        "echo <message> - prints the message |" +
        "clear - clears the terminal |" +
        "exit - closes the terminal |" +
        "help - displays this message";
        for (let i = 1; i <= 100; i++) {
            if (document.getElementById(`textarea${i}`).value === line) {
                document.getElementById(`textarea${i + 1}`).value = help;
                document.getElementById(`textarea${i + 1}`).readOnly = true;
                break;
            }
        }
    }
    if (line === "ls") {
        for (let i = 1; i <= 100; i++) {
            if (document.getElementById(`textarea${i}`).value === line) {
                if (i > 96) {
                    alert("You have reached the maximum number of lines, the terminal is being cleared");
                    process_line("clear");
                    break;
                }
            }
        }
        console.log("Fetching directory listing...");
        fetch('https://api.github.com/repos/tbperson/tbperson.github.io/contents/')
            .then(response => {
                console.log("Received response:", response);
                return response.json();
            })
            .then(data => {
                console.log("Received data:", data);
                let folders = data
                    .filter(item => item.type === 'dir')
                    .map(item => item.name);
                let folderList = folders.filter(folder => folder !== '.github').join(' | ');
                console.log("Parsed folders:", folderList);
                for (let i = 1; i <= 100; i++) {
                    if (document.getElementById(`textarea${i}`).value === line) {
                        document.getElementById(`textarea${i + 1}`).value = "Here are the directories:";
                        document.getElementById(`textarea${i + 1}`).readOnly = true;
                        document.getElementById(`textarea${i + 2}`).value = folderList;
                        document.getElementById(`textarea${i + 2}`).readOnly = true;
                        document.getElementById(`textarea${i + 3}`).focus();
                        break;
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching directory listing:", error);
                for (let i = 1; i <= 100; i++) {
                    if (document.getElementById(`textarea${i}`).value === line) {
                        document.getElementById(`textarea${i + 1}`).value = `Error: ${error.message}`;
                        document.getElementById(`textarea${i + 1}`).readOnly = true;
                        break;
                    }
                }
            });
    }
    }




//Run the clock every 500ms
setInterval(update_time, 500);


for (let i = 1; i <= 100; i++) {
    document.write(`<input type="text" id="textarea${i}" style="display: block; width: 100%; margin-bottom: 5px; border: none; outline: none; color: white; background-color: transparent" autocomplete="off">`);
    let textarea = document.getElementById(`textarea${i}`);
    textarea.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            if (i === 100) {
                alert("You have reached the maximum number of lines, the terminal is being cleared");
                process_line("clear");
            }
            event.preventDefault();
            textarea.readOnly = true;
            if (i < 100) {
                document.getElementById(`textarea${i + 1}`).focus();
            }
            process_line(textarea.value);
        }
    });
}

document.getElementById('textarea1').focus();