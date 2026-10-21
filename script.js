
const bookingForm = document.getElementById("bookingForm");
const result = document.getElementById("result");
const bookingList = document.getElementById("bookingList");

// Example transport rates per kilometer
const rates = {
    Truck: 50,
    Bus: 30,
    Car: 15
};

let bookings = [];
let nextId = 1;

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const customer =
        document.getElementById("customer").value.trim();

    const pickup =
        document.getElementById("pickup").value.trim();

    const destination =
        document.getElementById("destination").value.trim();

    const vehicle =
        document.getElementById("vehicle").value;

    const distance =
        Number(document.getElementById("distance").value);

    if (!customer || !pickup || !destination ||
        !rates[vehicle] || !Number.isFinite(distance) ||
        distance <= 0) {
        result.textContent = "Please enter valid booking details.";
        return;
    }

    const cost = distance * rates[vehicle];

    const booking = {
        id: nextId++,
        customer,
        pickup,
        destination,
        vehicle,
        distance,
        cost
    };

    bookings.push(booking);

    result.textContent =
        `Booking successful! Estimated cost: ₹${cost.toLocaleString("en-IN")}`;

    bookingForm.reset();
    displayBookings();
});

function displayBookings() {
    bookingList.replaceChildren();

    if (bookings.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No bookings available.";
        bookingList.appendChild(message);
        return;
    }

    bookings.forEach(function (booking) {
        const item = document.createElement("div");
        item.className = "booking-item";

        const details = document.createElement("p");
        details.textContent =
            `Booking #${booking.id} | Customer: ${booking.customer} | ` +
            `Vehicle: ${booking.vehicle} | From: ${booking.pickup} | ` +
            `To: ${booking.destination} | Distance: ${booking.distance} km | ` +
            `Estimated Cost: ₹${booking.cost.toLocaleString("en-IN")}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Booking";
        deleteButton.addEventListener("click", function () {
            bookings = bookings.filter(function (entry) {
                return entry.id !== booking.id;
            });

            displayBookings();
        });

        item.append(details, deleteButton);
        bookingList.appendChild(item);
    });
}

displayBookings();
