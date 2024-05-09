//fetch accesbility issues
const testAccessibility = async (e) => {
  e.preventDefault();

  const url = document.querySelector("#url").value;

  if (url === "") {
    alert("Please add a url");
  } else {
    setLoading();

    const response = await fetch(`api/test?url=${url}`);
    console.log("Status:", response.status);

    // if (response.ok) {
    //   console.log("Response is OK");

    //   // Check the content type of the response
    //   const contentType = response.headers.get("content-type");
    //   console.log("Content-Type:", contentType);

    //   // Here you can process the response data based on its type (e.g., JSON, text, etc.)
    // } else {
    //   console.log("Response failed with status:", response.status);
    // }

    if (response.status !== 200) {
      setLoading(false);
      alert("Something went wrong");
    } else {
      const data = await response.json();
      // console.log(data);
      addIssuesToDOM(data.issues);
      setLoading(false);
    }
  }
};

//add issues to DOM
const addIssuesToDOM = (issues) => {
  const issuesOutput = document.querySelector("#issues");

  issuesOutput.innerHTML = "";

  issues.forEach((issue) => {
    const output = `
        <div class="card mb-5">
          <div class="card-body">
            <h4>${issue.message}</h4>
            <p class="bg-light p-3 my-3">${escapeHTML(issue.context)}</p>
            <p class="bg-secondary text-light p-2">CODE: ${issue.code}</p>
          </div>
        </div>
      `;

    issuesOutput.innerHTML += output;
  });
};

//set loading state

const setLoading = (isLoading = true) => {
  const loader = document.querySelector(".loader");
  if (isLoading) {
    loader.style.display = "block";
  } else {
    loader.style.display = "none";
  }
};

//escape HTML

function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.querySelector("#form").addEventListener("submit", testAccessibility);
