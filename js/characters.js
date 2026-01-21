const API_URL = 'https://theofficeapi.dev/api/character';

const ids = [3, 29, 39, 45, 47, 55, 67, 69, 76, 78,];
// const ids = [2, 3, 18, 29, 39, 45, 47, 55, 63, 67, 69, 72, 76, 78,];
// const ids = [2, 3, 11, 18, 29, 39, 45, 47, 54, 55, 61, 63, 67, 69, 72, 76, 78,]; 

async function fetchCharactersByIds(ids) {
  const promises = ids.map(id =>
    fetch(`${API_URL}/${id}`).then(res => res.json())
  );
  return Promise.all(promises);
}

function renderCharacters(characters) {
  const container = document.querySelector('.charactersContainer');
  container.innerHTML = '';
  characters.forEach(character => {
    container.innerHTML += `
      <div class="cardCharacter">
        <div class="background">
            <p class="nameCharacter">${character.name}</p>
            <p class="actorCharacter">Atuado por: ${character.actor}</p>
        </div>
        <div class="jobCharacter">
          <span>Job:</span>
          <p>${Array.isArray(character.job)
        ? character.job[character.job.length - 1]
        : character.job
      }</p>
        </div>
        <div class="workplaceCharacter">
          <span>Workplace:</span>
          <p>${Array.isArray(character.workplace) ? character.workplace[character.workplace.length - 1] : character.workplace}</p>
        </div>
      </div>
    `;
  });
}

fetchCharactersByIds(ids).then(renderCharacters);