{{
const username = Input_username.text.trim();
const password = Input_password.text.trim();

// 1️⃣ Validate input
if (!username || !password) {
  showAlert("Please enter both username and password.", "warning");
  return;
}

// 2️⃣ Build the dynamic API URL
const apiUrl = `http://10.20.20.85:8081/api/v1/db/data/v1/p2jayvupgkb825m/users?where=(username,eq,${encodeURIComponent(username)})`;

// 3️⃣ Run a temporary ad-hoc query using the Appsmith REST API plugin
return login_api.run(
  {
    url: apiUrl,
    headers: {
      "xc-token": "teG1noINO8N0uB1aiM0efnpWMu2Qn5NKUdYhfg_R",
      "Content-Type": "application/json"
    },
    httpMethod: "GET"
  },
  () => {
    // 4️⃣ Handle success
    const user = login_api.data.list?.[0];
    if (!user) {
      showAlert("User not found!", "error");
      return;
    }

    if (user.password === password) {
      storeValue("currentUser", user);
      showAlert("Login successful!", "success");
      navigateTo("breakdownform");
    } else {
      showAlert("Incorrect password!", "error");
    }
  },
  (err) => {
    // 5️⃣ Handle failure
    console.error("Login query failed:", err);
    showAlert("Login failed. Please try again.", "error");
  }
);
}}
