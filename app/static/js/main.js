// app/static/js/main.js
function handleDomainClick(domain) {
  const url = `/domain/summary?domain=${domain}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Inspect the data here
      renderDomainInfo(data); // Directly pass the data object to render
    })
    .catch(error => {
      console.error("Error fetching domain info:", error);
    });
}


function renderDomainInfo(infoArray) {
  const info = infoArray[0]; // Get the first object from the array

  // Display the values...
  document.getElementById('active-urls').innerText = info.active_urls.toLocaleString();
  document.getElementById('domain-name').innerText = info.domain;
  document.getElementById('errored-urls').innerText = info.errored_urls.toLocaleString();
  document.getElementById('monitored-urls').innerText = info.objective_urls.toLocaleString();
  document.getElementById('url-count').innerText = info.url_count.toLocaleString();
}




$(document).ready(function() {
  $(".domain-list li a").click(function(event) {
    event.preventDefault();
    console.log("Domain clicked!"); // Log a message when a domain is clicked
    const domain = $(this).text();
    handleDomainClick(domain);
  });
});


