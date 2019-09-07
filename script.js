// const URL = "./mockdata.json";
// const URL = "https://www.graphqlhub.com/playground";
const URL = "http://localhost:9900/graphql";
let data;
let storyListElem = document.querySelector(".story-list");

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
                <p class="details"> ${stories[i].score} points by ${stories[i].by.id} ${timeDiff(new Date(), new Date(1000 * stories[i].time))} | hide | ${stories[i].kids.length} comments </p>
            </li>
        `;
            storyListElem.innerHTML = storyListElem.innerHTML + htmlString;
        }
    })
    .catch(err => {
        console.error(err);
    });


function getDomainName(url) {
    return url.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/)[0];
}


function timeDiff(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}
