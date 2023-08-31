const form = document.getElementById("form");
const blogContainer = document.getElementById("blog-container");

form.addEventListener('submit', async(event) => {
    // Prevents the form from auto submitting 
    event.preventDefault();

    let senderAddress = document.getElementById('sender-address').value;

    console.log(senderAddress);

    const isStreaming = await fetch(`http://localhost:3000/stream-gated/${senderAddress}/stream.png`);
    console.log(isStreaming.status);

    if(isStreaming.status === 200) {
        blogContainer.className = "visible-content";

    } else {
        alert("You are not streaming!");
    }
})
