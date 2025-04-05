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

function displayListing(listing) {
  const div = document.createElement("div");
  div.classList.add("listing");
  div.innerHTML = `
    <h3>${listing.product} – ₹${listing.price}/kg</h3>
    <p><strong>Seller:</strong> ${listing.name}</p>
    <p>${listing.description}</p>
    <img src="${listing.imageUrl}" width="150" />
    <a href="https://wa.me/${listing.phone}" target="_blank">Contact on WhatsApp</a>
  `;
  listingContainer.appendChild(div);
}

loadListings();
