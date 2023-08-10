// app/static/js/main.js
function handleDomainClick(domain) {
  const url = `https://reports.openato.com/domain/summary?domain=${domain}&format=json`;

  // Perform AJAX request (using fetch here, but could use jQuery or other method)
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Assuming more than one item might be returned, taking the first one
      const domainInfo = data[0];

      // Function to render the domain information to the DOM
      renderDomainInfo(domainInfo);
    })
    .catch(error => {
      console.error("Error fetching domain info:", error);
    });
}

function renderDomainInfo(info) {
  // Example of displaying some of the data - adjust as needed
  document.getElementById('domain-name').innerText = info.domain;
  document.getElementById('active-urls').innerText = info.active_urls;
  document.getElementById('url-count').innerText = info.url_count;
  // Add more fields as required
}

$(document).ready(function() {
  $(".domain-list li a").click(function(event) {
    event.preventDefault(); // Prevent the default link behavior
    const domain = $(this).text(); // Get the clicked domain name
    handleDomainClick(domain); // Call the function defined earlier to handle the click
  });
  $("#domain-info").show(); // Make sure the domain info is shown
});

