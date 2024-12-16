//Function to update the time on the topnav
function update_time() {
    let currentTime = new Date().toLocaleString();
    document.querySelector('#topnav h2').textContent = currentTime;
}
//Function to process the input from the terminal
function process_line(line) {
    if (line === "clear") {
        
        for (let i = 0; i <= 100; i++) {
            document.getElementById(`textarea${i}`).value = "";
            document.getElementById(`textarea${i}`).readOnly = false;
        }
        document.getElementById('textarea1').focus();
    } 
    //If the line starts with "echo ", the message is printed to the next line
    if (line.startsWith("echo ")) {
        let message = ">" + line.substring(5);
        let i;
        for (i = 0; i <= 100; i++) {
            if(i> 98){
                alert("You have reached the maximum number of lines, the terminal is being cleared");
                process_line("clear");
                break;
            }
            console.log(document.getElementById(`textarea${i}`).value);
            if (document.getElementById(`textarea${i}`).value === line) {
                document.getElementById(`textarea${i + 1}`).value = message;
                document.getElementById(`textarea${i + 1}`).readOnly = true;
                break;
            }
            
        }
        document.getElementById(`textarea${i + 2}`).focus();
    }
    if (line == "exit"){
        window.close();
    }

    //If the line starts with "cd ", the user is redirected to the specified path within the github, if it exists
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
        
    if (line === "help") {
        let helpMessage = "> Available commands: clear, echo <message>, exit, cd <path>, help, about, contact, sl, ls";
        for (let i = 0; i <= 100; i++) {
            if(i> 98){
                alert("You have reached the maximum number of lines, the terminal is being cleared");
                process_line("clear");
                break;
            }
            if (document.getElementById(`textarea${i}`).value === line) {
                document.getElementById(`textarea${i + 1}`).value = helpMessage;
                document.getElementById(`textarea${i + 1}`).readOnly = true;
                document.getElementById(`textarea${i + 2}`).focus();
                break;
            }

        }
    }
    if (line === "about") {
        let about = "> This terminal allows you to navigate my GitHub Pages. You can use commands like 'cd <path>' to navigate to different directories, 'ls' to list directories, 'echo <message>' to print > a message, 'clear' to clear the terminal, 'exit' to close the terminal, 'help' to display available commands, and 'contact' to get my contact information.";
        let aboutLines = about.split(' ').reduce((acc, word, index) => {
            if (index % 30 === 0) acc.push([]);
            acc[acc.length - 1].push(word);
            return acc;
        }, []).map(line => line.join(' '));
        
        for (let i = 1; i <= 100; i++) {
            if (document.getElementById(`textarea${i}`).value === line) {
                if(i> 98){
                    alert("You have reached the maximum number of lines, the terminal is being cleared");
                    process_line("clear");
                    break;
                }
                aboutLines.forEach((aboutLine, index) => {
                    document.getElementById(`textarea${i + 1 + index}`).value = aboutLine;
                    document.getElementById(`textarea${i + 1 + index}`).readOnly = true;
                });
                document.getElementById(`textarea${i + 1 + aboutLines.length}`).focus();
                break;
            }
        }
    }
    if (line==="contact"){
        let contactInfo = "> You can reach me at: https://github.com/tbperson";
        for (let i = 1; i <= 100; i++) {
            if(i> 98){
                alert("You have reached the maximum number of lines, the terminal is being cleared");
                process_line("clear");
                break;
            }
            if (document.getElementById(`textarea${i}`).value === line) {
                document.getElementById(`textarea${i + 1}`).value = contactInfo;
                document.getElementById(`textarea${i + 1}`).readOnly = true;
                break;
            }
            document.getElementById(`textarea${i + 2}`).focus();
            break;
        }
    }
    if(line==="sl"){
        jumpscare();
    }
    if (line === "ls") {
        for (let i = 0; i <= 100; i++) {
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
                for (let i = 0; i <= 100; i++) {
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
                for (let i = 0; i <= 100; i++) {
                    if (document.getElementById(`textarea${i}`).value === line) {
                        document.getElementById(`textarea${i + 1}`).value = `Error: ${error.message}`;
                        document.getElementById(`textarea${i + 1}`).readOnly = true;
                        break;
                    }
                }
            });

    }
    }

//Jumpscare function when user misspells "ls"
function jumpscare() {
    document.getElementById('terminal').style.display = 'none';
    document.getElementById('jumpscare').style.display = 'block';
    setTimeout(() => {
        document.getElementById('jumpscare').style.display = 'none';
        document.getElementById('terminal').style.display = 'block';
    }, 5000);
}


//Run the clock every 500ms
setInterval(update_time, 500);


for (let i = 1; 0 <= 100; i++) {
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
            setTimeout(() => {
                textarea.value = "> " + textarea.value;
            }, 500);
        }
    });
}

document.getElementById('textarea1').focus();
