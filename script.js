document.getElementById('generateForm').addEventListener('click', () => {
    const numPeople = parseInt(document.getElementById('numPeople').value);
    const numTeams = parseInt(document.getElementById('numTeams').value);
    const formsDiv = document.getElementById('forms');
    const assignButton = document.getElementById('assignTeams');
    formsDiv.innerHTML = '';
  
    if (isNaN(numPeople) || isNaN(numTeams) || numPeople < 1 || numTeams < 1) {
      alert('Lütfen geçerli bir sayı girin!');
      return;
    }
  
    formsDiv.innerHTML += '<h3>Kişiler:</h3>';
    for (let i = 0; i < numPeople; i++) {
      formsDiv.innerHTML += `<input type="text" class="person-input" placeholder="Kişi ${i + 1}"><br>`;
    }
  
    formsDiv.innerHTML += '<h3>Takımlar:</h3>';
    for (let i = 0; i < numTeams; i++) {
      formsDiv.innerHTML += `<input type="text" class="team-input" placeholder="Takım ${i + 1}"><br>`;
    }
  
    assignButton.style.display = 'block';
  });
  
  document.getElementById('assignTeams').addEventListener('click', () => {
    const people = Array.from(document.querySelectorAll('.person-input')).map(input => input.value).filter(val => val.trim() !== '');
    const teams = Array.from(document.querySelectorAll('.team-input')).map(input => input.value).filter(val => val.trim() !== '');
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (people.length === 0 || teams.length === 0) {
      alert('Lütfen kişi ve takım isimlerini doldurun!');
      return;
    }
  
    if (teams.length < people.length) {
      alert('Takım sayısı kişi sayısından az olamaz!');
      return;
    }
  
    // Takımları karıştır
    const shuffledTeams = teams.sort(() => 0.5 - Math.random());
  
    // Kişilerle takımları eşleştir
    const matches = people.map((person, index) => ({
      person,
      team: shuffledTeams[index]
    }));
  
    // Sonuçları tablo olarak yazdır
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>Kişi</th>
      <th>Takım</th>
    `;
    table.appendChild(headerRow);
  
    matches.forEach(match => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${match.person}</td>
        <td>${match.team}</td>
      `;
      table.appendChild(row);
    });
  
    resultDiv.appendChild(table);
  });
  