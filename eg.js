function generateTeams() {
    const namesInput = document.getElementById('names');
    const teamDisplay = document.getElementById('teamDisplay');

    // Get names and split them into an array
    const names = namesInput.value.split('\n').map(name => name.trim());

    // Remove empty strings from the array
    const filteredNames = names.filter(name => name !== '');

    // Shuffle the array of names to randomize
    const shuffledNames = shuffleArray(filteredNames);

    // Get the number of teams from the input
    const numTeams = parseInt(document.getElementById('numTeams').value);

    // Calculate the number of members in each team
    const membersPerTeam = Math.floor(shuffledNames.length / numTeams);

    // Generate teams
    const teams = [];
    for (let i = 0; i < numTeams; i++) {
        teams.push(shuffledNames.slice(i * membersPerTeam, (i + 1) * membersPerTeam));
    }

    // Display the teams on the webpage
    teamDisplay.innerHTML = '';
    teams.forEach((team, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'team';
        teamDiv.innerHTML = `<strong>Team ${index + 1}:</strong> ${team.join(', ')}`;
        teamDisplay.appendChild(teamDiv);
    });

    // Add a "Copy to Clipboard" button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.addEventListener('click', () => copyToClipboard(teams));
    teamDisplay.appendChild(copyButton);
}

function copyToClipboard(teams) {
    const textToCopy = teams.map((team, index) => `Team ${index + 1}: ${team.join(', ')}`).join('\n');
    
    // Create a textarea element to hold the text temporarily
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // Select the text and copy it to the clipboard
    textarea.select();
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textarea);

    // Notify the user that the text has been copied
    alert('Teams copied to clipboard!');
}

function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
