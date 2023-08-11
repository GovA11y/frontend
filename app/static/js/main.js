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


// Edit Page
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const domain = document.getElementById('search-bar').value;
  const url = `https://reports.openato.com/domain/list-update?format=json&domain=${domain}`;
  fetch(url)
    .then(response => response.json())
    .then(data => renderDomainsTable(data))
    .catch(error => console.error("Error fetching domain list:", error));
});

function renderDomainsTable(domains) {
  const tableBody = document.getElementById('domains-table');
  tableBody.innerHTML = ""; // Clear previous results

  domains.forEach(domain => {
    const row = `<tr>
        <td>${domain.domain_id}</td>
        <td>${domain.domain}</td>
        <td><input type="checkbox" data-id="${domain.domain_id}" class="is-active" ${domain.is_domain_active ? 'checked' : ''}></td>
        <td><input type="checkbox" data-id="${domain.domain_id}" class="is-objective" ${domain.is_domain_objective ? 'checked' : ''}></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

document.getElementById('edit-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const updateData = Array.from(document.querySelectorAll('.is-active, .is-objective'))
    .map(input => ({
      domain_id: input.dataset.id,
      is_active: document.querySelector(`.is-active[data-id="${input.dataset.id}"]`).checked,
      is_objective: document.querySelector(`.is-objective[data-id="${input.dataset.id}"]`).checked
    }));

  // Now you can send updateData to the server as JSON
  fetch('https://reports.openato.com/domain/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  })
  .then(response => response.json())
  .then(data => alert('Update successful!'))
  .catch(error => alert('An error occurred while updating the domains.'));
});
