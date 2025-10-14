const BASE_API_URL = 'https://theofficeapi.dev/api/episodes';

const episodesToShow = [
    { season: 2, episode: "22" },
    { season: 3, episode: "19" },
    { season: 3, episode: "22" },
    { season: 4, episode: "9" },
    { season: 4, episode: "13" },
    { season: 4, episode: "14" },
    { season: 5, episode: "12" },
    { season: 5, episode: "14/15" },
    { season: 6, episode: "4/5" },
    { season: 6, episode: "10" },
    { season: 7, episode: "19" },
    { season: 7, episode: "22" },
];

async function fetchEpisodesForSeasons(seasons) {
    const promises = seasons.map(season =>
        fetch(`${BASE_API_URL}?season=${season}&limit=30`).then(res => res.json())
    );
    const results = await Promise.all(promises);
    return results.flatMap(data => data.results);
}

function filterEpisodes(allEpisodes, filters) {
    return allEpisodes.filter(ep =>
        filters.some(f =>
            ep.seasonId === f.season &&
            String(ep.episode) === String(f.episode)
        )
    );
}

function renderEpisodes(episodes) {
    const container = document.querySelector('.episodesContainer');
    container.innerHTML = '';
    episodes.forEach(episode => {
        container.innerHTML += `
      <div class="cardEpisode">
        <div class="background-episode">
            <h3>${episode.title}</h3>
            <div class="seasonEpisode">
                <p>S: ${episode.seasonId}</p>
                <p>E: ${episode.episode}</p>
            </div>
        </div>
        <p class="summary">${episode.summary}</p>
      </div>
    `;
    });
}

const seasons = [...new Set(episodesToShow.map(e => e.season))];
console.log(episodesToShow);

fetchEpisodesForSeasons(seasons)
    .then(allEpisodes => filterEpisodes(allEpisodes, episodesToShow))
    .then(renderEpisodes);