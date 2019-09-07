// const URL = "./mockdata.json";
// const URL = "https://www.graphqlhub.com/playground";
const URL = "http://localhost:9900/graphql";
let data;
let storyListElem = document.querySelector(".story-list");
function getDomainName(url) {
    return url.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/)[0];
}


const query = `
query {
topStories {
      id
      score
      title
      by
      time
      kids
      url
    }
} `;

// query if I was using graphQL Hub Api
// const query = `{
//     hn {
//       topStories {
//         id
//         score
//         title
//         by {
//           id
//         }
//         time
//         kids{
//           id
//         }
//         url
//       }
//     }
//   }
// `;


const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
};

fetch(URL, options)
    .then(res => {
        return res.json();
    })
    .then(response => {
        console.log(response);
        data = response;
        for (var i = 0; i < 30; i++) {
            let stories = data.data.topStories;
            console.log(stories);
            let htmlString = `
            <li class="story">
                <span class="title"> ${stories[i].title} </span> <a class="source" href="${stories[i].url}"> (${getDomainName(stories[i].url)})
                </a>
                <p class="details"> ${stories[i].score} points by ${stories[i].by.id} 2 hours ago | hide | ${stories[i].kids.length} comments </p>
            </li>
        `;
            storyListElem.innerHTML = storyListElem.innerHTML + htmlString;
        }
    })
    .catch(err => {
        console.error(err);
    });

