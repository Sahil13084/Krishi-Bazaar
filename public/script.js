const form = document.getElementById("produceForm");
const listingContainer = document.getElementById("listingContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const res = await fetch("http://localhost:5000/api/listings", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  if (data.listing) {
    alert("Listing posted!");
    displayListing(data.listing);
    form.reset();
  }
});

async function loadListings() {
  const res = await fetch("http://localhost:5000/api/listings");
  const listings = await res.json();
  listings.forEach(displayListing);
} 
 window.onload = loadListings;

function displayListing(listing) {
  const div = document.createElement("div");
  div.classList.add("listing", "bg-white", "p-4", "rounded", "shadow", "mb-4");
    div.innerHTML = `
    <h3 class="text-lg font-semibold">${listing.product} – ₹${listing.price}/kg</h3> <p><strong>Seller:</strong> ${listing.name} (${listing.state})</p> <p>${listing.description}</p> <img src="${listing.imageUrl}" width="150" class="rounded shadow" /> <p> <a href="https://wa.me/${listing.phone}" target="_blank" class="text-green-600">Contact on WhatsApp</a> </p>
  `;
  listingContainer.appendChild(div);
}

loadListings();
