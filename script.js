// Global variables
let currentUser = null
let currentSlide = 1
let profilePhoto = null
let currentSection = "begin-quest"

// Quest data with dummy content
const quests = {
  inbox: [],
  today: [
    {
      id: 1,
      title: "Post Schedule on Team Dashboard",
      description: "Add updated weekly goals and tasks to the workspace.",
      doDate: "June 24",
      dueDate: "June 25",
      type: "side-quest",
      xp: 50,
      completed: false,
      guild: "Guild",
    },
    {
      id: 2,
      title: "Print Attendance Sheet",
      doDate: "June 24",
      dueDate: "June 25",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
    {
      id: 3,
      title: "Clear Desktop Icons",
      doDate: "June 24",
      dueDate: "June 25",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
  ],
  mainQuests: [
    {
      id: 4,
      title: "Write Talk Script for Webinar",
      date: "June 27",
      type: "main-quest",
      xp: 100,
      completed: false,
    },
    {
      id: 5,
      title: "Finalize Capstone Proposal",
      date: "June 28",
      type: "main-quest",
      xp: 100,
      completed: false,
    },
    {
      id: 6,
      title: "Deploy Beta Version of Faerie Court",
      date: "June 29",
      type: "main-quest",
      xp: 100,
      completed: false,
    },
    {
      id: 7,
      title: "Event Teaser Video",
      date: "June 30",
      type: "main-quest",
      xp: 100,
      completed: false,
    },
  ],
  sideQuests: [
    {
      id: 8,
      title: "Post Schedule on Team Dashboard",
      date: "June 25",
      type: "side-quest",
      xp: 50,
      completed: false,
    },
    {
      id: 9,
      title: "Create Social Media Countdown",
      date: "June 26",
      type: "side-quest",
      xp: 50,
      completed: false,
    },
    {
      id: 10,
      title: "Coordinate Food Orders for Team Meeting",
      date: "June 26",
      type: "side-quest",
      xp: 50,
      completed: false,
    },
    {
      id: 11,
      title: "Update Slide Deck for Client Pitch",
      date: "June 28",
      type: "side-quest",
      xp: 50,
      completed: false,
    },
  ],
  miniQuests: [
    {
      id: 12,
      title: "Print Attendance Sheet",
      date: "June 25",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
    {
      id: 13,
      title: "Clear Desktop Icons",
      date: "June 26",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
    {
      id: 14,
      title: "Charge Camera Batteries",
      date: "June 26",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
  ],
  guildQuests: [
    {
      id: 15,
      title: "Set Up Event QR Check-In Form",
      date: "June 26",
      author: "Katarina",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
    {
      id: 16,
      title: "Mock Interview with Teammate",
      date: "June 27",
      author: "Seraphine",
      type: "main-quest",
      xp: 100,
      completed: false,
    },
    {
      id: 17,
      title: "Upload Documentation to Repository",
      date: "June 29",
      author: "Karma",
      type: "side-quest",
      xp: 50,
      completed: false,
    },
  ],
}



// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on dashboard page
  if (window.location.pathname.includes("dashboard.html")) {
    initializeDashboard()
    updateSidebarAvatar()
  }

  // Settings dropdown functionality
  const settingsIcon = document.getElementById("settingsIcon")
  const settingsDropdown = document.getElementById("settingsDropdown")

  if (settingsIcon && settingsDropdown) {
    settingsIcon.addEventListener("click", (e) => {
      e.stopPropagation()
      settingsDropdown.classList.toggle("show")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      settingsDropdown.classList.remove("show")
    })
  }

  // Notification panel functionality
  const notificationIcon = document.getElementById("notificationIcon")
  const notificationPanel = document.getElementById("notificationPanel")
  const notificationClose = document.getElementById("notificationClose")

  if (notificationIcon && notificationPanel && notificationClose) {
    notificationIcon.addEventListener("click", () => {
      notificationPanel.classList.toggle("show")
    })

    notificationClose.addEventListener("click", () => {
      notificationPanel.classList.remove("show")
    })

    document.addEventListener("click", (event) => {
      if (!notificationPanel.contains(event.target) && event.target !== notificationIcon) {
        notificationPanel.classList.remove("show")
      }
    })
  }
})

// Login functionality
function login() {
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  if (!email || !password) {
    alert("Please enter both email and password")
    return
  }

  // Create user data
  const userData = {
    username: email.split("@")[0] || "Adventurer",
    level: 1,
    email: email,
    xp: 0,
    firstName: "New",
    lastName: "User",
  }

  // Store user data
  localStorage.setItem("faerieCourtUser", JSON.stringify(userData))

  // Redirect to dashboard
  window.location.href = "dashboard.html"
}

// Show signup page
function showSignup() {
  window.location.href = "signup.html"
}

// Signup functionality
function validateAndContinue(event) {
  event.preventDefault()

  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const username = document.getElementById("signupUsername").value
  const email = document.getElementById("signupEmail").value
  const password = document.getElementById("signupPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value

  // Validation
  const takenUsernames = ["admin", "faeriecourt", "testuser"]

  if (takenUsernames.includes(username.toLowerCase())) {
    alert("Username is already taken.")
    return
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  if (!passwordRegex.test(password)) {
    alert("Password must be at least 8 characters long and include uppercase, lowercase, and a number.")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.")
    return
  }

  // Store form data temporarily
  sessionStorage.setItem(
    "signupData",
    JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  )

  nextSlide()
}

function handleDropClick(event) {
  event.preventDefault()
  document.getElementById("photoInput").click()
}

function handlePhotoUpload(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePhoto = e.target.result
      const preview = document.getElementById("preview")
      preview.innerHTML = `<img src="${profilePhoto}" alt="Preview" style="max-width: 150px; max-height: 150px; border-radius: 8px; object-fit: contain;">`
    }
    reader.readAsDataURL(file)
  } else {
    alert("Please select an image file.")
  }
}

function validateAndNext() {
  if (!profilePhoto) {
    alert("Please upload a photo before proceeding.")
    return
  }
  nextSlide()
}

function nextSlide() {
  if (currentSlide < 3) {
    document.getElementById(`slide-${currentSlide}`).classList.remove("active")
    currentSlide++
    document.getElementById(`slide-${currentSlide}`).classList.add("active")
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    document.getElementById(`slide-${currentSlide}`).classList.remove("active")
    currentSlide--
    document.getElementById(`slide-${currentSlide}`).classList.add("active")
  }
}

function finishSignup() {
  const signupData = JSON.parse(sessionStorage.getItem("signupData"))

  const userData = {
    firstName: signupData.firstName,
    lastName: signupData.lastName,
    username: signupData.username,
    email: signupData.email,
    level: 1,
    xp: 0,
    profilePhoto: profilePhoto,
  }

  localStorage.setItem("faerieCourtUser", JSON.stringify(userData))
  sessionStorage.removeItem("signupData")

  alert("Account created successfully! Welcome to Faerie Court!")
  window.location.href = "dashboard.html"
}

// Dashboard functionality
function initializeDashboard() {
  const userData = localStorage.getItem("faerieCourtUser")
  if (!userData) {
    window.location.href = "index.html"
    return
  }

  currentUser = JSON.parse(userData)
  updateUserDisplay()
  populateQuests()
  showSection("begin-quest")
}

function updateUserDisplay() {
  if (!currentUser) return

  document.getElementById("displayUsername").textContent = currentUser.username
  document.getElementById("userLevel").textContent = `LVL ${currentUser.level}`
  document.getElementById("welcomeMessage").textContent = `Hi, ${currentUser.firstName || currentUser.username}`

  // Update level progress
  const progressPercent = ((currentUser.xp % 1000) / 1000) * 100
  document.getElementById("levelProgress").style.width = `${progressPercent}%`

  // Update badges
  updateBadges()
}

function updateBadges() {
  document.getElementById("inboxBadge").textContent = quests.inbox.length
  document.getElementById("todayBadge").textContent = quests.today.filter((q) => !q.completed).length
  document.getElementById("mainQuestsBadge").textContent = quests.mainQuests.filter((q) => !q.completed).length
  document.getElementById("sideQuestsBadge").textContent = quests.sideQuests.filter((q) => !q.completed).length
  document.getElementById("miniQuestsBadge").textContent = quests.miniQuests.filter((q) => !q.completed).length
  document.getElementById("faerieCourtBadge").textContent = quests.guildQuests.filter((q) => !q.completed).length
}

function populateQuests() {
  populateTodayQuests()
  populateMainQuests()
  populateSideQuests()
  populateMiniQuests()
  populateGuildQuests()
}

function populateTodayQuests() {
  const container = document.getElementById("todayQuests")
  if (!container) return

  container.innerHTML = ""
  quests.today.forEach((quest) => {
    container.appendChild(createQuestCard(quest, "today"))
  })
}

function populateMainQuests() {
  const container = document.getElementById("mainQuestsList")
  if (!container) return

  container.innerHTML = ""
  quests.mainQuests.forEach((quest) => {
    container.appendChild(createQuestCard(quest, "mainQuests"))
  })
}

function populateSideQuests() {
  const container = document.getElementById("sideQuestsList")
  if (!container) return

  container.innerHTML = ""
  quests.sideQuests.forEach((quest) => {
    container.appendChild(createQuestCard(quest, "sideQuests"))
  })
}

function populateMiniQuests() {
  const container = document.getElementById("miniQuestsList")
  if (!container) return

  container.innerHTML = ""
  quests.miniQuests.forEach((quest) => {
    container.appendChild(createQuestCard(quest, "miniQuests"))
  })
}

function populateGuildQuests() {
  const container = document.getElementById("guildQuestsList")
  if (!container) return

  container.innerHTML = ""
  quests.guildQuests.forEach((quest) => {
    container.appendChild(createGuildQuestCard(quest))
  })
}

function createQuestCard(quest, category) {
  const card = document.createElement("div");
  card.setAttribute("data-property-1", "Quest");
  card.style = `
    width: 750px;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 42px;
    display: inline-flex;
  `;

  card.innerHTML = `
    <div style="
      align-self: stretch;
      padding: 12px 24px;
      background: white;
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.30);
      border-radius: 12px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      display: flex;
    ">

      <!-- Meatballs Menu Icon -->
      <div style="width: 24px; height: 24px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 12.75C6.19891 12.75 6.38968 12.671 6.53033 12.5303C6.67098 12.3897 6.75 12.1989 6.75 12C6.75 11.8011 6.67098 11.6103 6.53033 11.4697C6.38968 11.329 6.19891 11.25 6 11.25C5.80109 11.25 5.61032 11.329 5.46967 11.4697C5.32902 11.6103 5.25 11.8011 5.25 12C5.25 12.1989 5.32902 12.3897 5.46967 12.5303C5.61032 12.671 5.80109 12.75 6 12.75ZM12 12.75C12.1989 12.75 12.3897 12.671 12.5303 12.5303C12.671 12.3897 12.75 12.1989 12.75 12C12.75 11.8011 12.671 11.6103 12.5303 11.4697C12.3897 11.329 12.1989 11.25 12 11.25C11.8011 11.25 11.6103 11.329 11.4697 11.4697C11.329 11.6103 11.25 11.8011 11.25 12C11.25 12.1989 11.329 12.3897 11.4697 12.5303C11.6103 12.671 11.8011 12.75 12 12.75ZM18 12.75C18.1989 12.75 18.3897 12.671 18.5303 12.5303C18.671 12.3897 18.75 12.1989 18.75 12C18.75 11.8011 18.671 11.6103 18.5303 11.4697C18.3897 11.329 18.1989 11.25 18 11.25C17.8011 11.25 17.6103 11.329 17.4697 11.4697C17.329 11.6103 17.25 11.8011 17.25 12C17.25 12.1989 17.329 12.3897 17.4697 12.5303C17.6103 12.671 17.8011 12.75 18 12.75Z" stroke="black"/>
        </svg>
      </div>

      <!-- Main Content Row -->
      <div style="
        align-self: stretch;
        justify-content: space-between;
        align-items: flex-start;
        display: inline-flex;
      ">
        <div style="display: flex; align-items: flex-start; gap: 15px;">
          <!-- Checkbox Icon -->
          <div style="height: 24px; display: flex; align-items: center; gap: 5px;">
            <div class="quest-checkbox" style="--check-color: ${typeColors[quest.type]}; width: 15px; height: 15px;">
              <input type="checkbox" id="quest${quest.id}" ${quest.completed ? "checked" : ""} 
                    onchange="completeQuest(${quest.id}, '${category}')">
              <label for="quest${quest.id}"></label>
            </div>
          </div>

          <!-- Title and Date Info -->
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <div style="
              color: var(--Schemes-On-Surface-Variant, #52443B);
              font-size: 16px;
              font-family: "SF Pro Display", sans-serif;
              font-weight: 510;
              line-height: 24px;
              letter-spacing: 0.15px;
              word-wrap: break-word;
            ">
              ${quest.title}
            </div>

            <div style="display: inline-flex; gap: 5px;">
              <div style="
                color: var(--Schemes-Outline, #84746A);
                font-size: 14px;
                font-family: "SF Pro Display", sans-serif;
                font-weight: 510;
                line-height: 20px;
                letter-spacing: 0.10px;
              ">Do on</div>

              <div style="
                color: var(--Schemes-Outline, #84746A);
                font-size: 14px;
                font-family: "SF Pro Display", sans-serif;
                font-weight: 510;
                line-height: 20px;
                letter-spacing: 0.10px;
              ">${quest.doDate || "—"}</div>

              <div style="
                color: var(--Schemes-Outline, #84746A);
                font-size: 14px;
                font-family: "SF Pro Display", sans-serif;
                font-weight: 510;
                line-height: 20px;
                letter-spacing: 0.10px;
              ">•</div>

              <div style="
                color: var(--Schemes-Outline, #84746A);
                font-size: 14px;
                font-family: "SF Pro Display", sans-serif;
                font-weight: 510;
                line-height: 20px;
                letter-spacing: 0.10px;
              ">Due on</div>

              <div style="
                color: var(--Schemes-Outline, #84746A);
                font-size: 14px;
                font-family: "SF Pro Display", sans-serif;
                font-weight: 510;
                line-height: 20px;
                letter-spacing: 0.10px;
              ">${quest.dueDate || "—"}</div>
            </div>
          </div>
        </div>

        <!-- XP -->
        <div style="
          color: #FF8D28;
          font-size: 16px;
          font-family: "SF Pro Display", sans-serif;
          font-weight: 510;
          line-height: 24px;
          letter-spacing: 0.15px;
          word-wrap: break-word;
          opacity: 0.90;
          text-align: right;
        ">
          ${quest.xp} XP
        </div>
      </div>

      <!-- Expand Icon -->
      <div style="width: 24px; height: 24px; position: relative;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 15L7 10H17L12 15Z" fill="#221A15"/>
        </svg>
      </div>
    </div>
  `;

  return card;
}


function createGuildQuestCard(quest) {
  const card = document.createElement("div")
  card.className = "guild-quest-card"
  card.dataset.questId = quest.id

  card.innerHTML = `
        <div class="quest-author">
            <span>👤</span>
            <span>${quest.author}</span>
        </div>
        <div class="quest-checkbox">
            <input type="checkbox" id="guild${quest.id}" ${quest.completed ? "checked" : ""} 
                   onchange="completeQuest(${quest.id}, 'guildQuests')">
            <label for="guild${quest.id}"></label>
        </div>
        <div class="quest-content">
            <h4>${quest.title}</h4>
            <div class="quest-meta">
                <span class="quest-date">${quest.date}</span>
            </div>
        </div>
        <div class="quest-xp">${quest.xp} XP</div>
        <button class="quest-expand" onclick="expandQuest(${quest.id})">⌄</button>
    `

  return card
}

function completeQuest(questId, category) {
  const questList = quests[category]
  const questIndex = questList.findIndex((q) => q.id === questId)

  if (questIndex !== -1) {
    const quest = questList[questIndex]
    quest.completed = !quest.completed

    // Update user XP
    if (quest.completed && currentUser) {
      currentUser.xp += quest.xp

      // Check for level up
      const newLevel = Math.floor(currentUser.xp / 1000) + 1
      if (newLevel > currentUser.level) {
        currentUser.level = newLevel
        alert(`🎉 Level Up! You are now Level ${newLevel}!`)
      }

      localStorage.setItem("faerieCourtUser", JSON.stringify(currentUser))
      updateUserDisplay()

      alert(`Quest ${quest.completed ? "completed" : "uncompleted"}! ${quest.completed ? "+" : "-"}${quest.xp} XP`)
    }

    updateBadges()
  }
}

function expandQuest(questId) {
  alert(`Quest details for quest ${questId} would be shown here.`)
}

// Navigation functions
function showSection(sectionName) {
  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Add active class to clicked nav item
  event.target.closest(".nav-item").classList.add("active")

  // Hide all content sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Show selected section
  const targetSection = document.getElementById(sectionName)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  currentSection = sectionName
}

// Quest creation functions
function addQuestForm() {
  const questForms = document.getElementById("questForms")
  const newForm = document.createElement("div")
  newForm.className = "quest-form-card"
  newForm.innerHTML = `
              <input type="text" placeholder="Quest name" class="quest-title-input" id="questTitle">
              <textarea placeholder="Description" class="quest-description" id="questDescription"></textarea>

              <div class="quest-options" style="display: flex; gap: 16px 12px; flex-wrap: wrap; margin-top: 1rem;">

                <div class="quest-field" style="width: 17%;">
                  <label class="quest-label" style="display: flex; align-items: center; gap: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 11C5.53333 11 5.13889 10.8389 4.81667 10.5167C4.49444 10.1945 4.33333 9.80004 4.33333 9.33337C4.33333 8.86671 4.49444 8.47226 4.81667 8.15004C5.13889 7.82782 5.53333 7.66671 6 7.66671C6.46667 7.66671 6.86111 7.82782 7.18333 8.15004C7.50556 8.47226 7.66667 8.86671 7.66667 9.33337C7.66667 9.80004 7.50556 10.1945 7.18333 10.5167C6.86111 10.8389 6.46667 11 6 11ZM3.33333 14.6667C2.96667 14.6667 2.65278 14.5362 2.39167 14.275C2.13056 14.0139 2 13.7 2 13.3334V4.00004C2 3.63337 2.13056 3.31949 2.39167 3.05837C2.65278 2.79726 2.96667 2.66671 3.33333 2.66671H4V1.33337H5.33333V2.66671H10.6667V1.33337H12V2.66671H12.6667C13.0333 2.66671 13.3472 2.79726 13.6083 3.05837C13.8694 3.31949 14 3.63337 14 4.00004V13.3334C14 13.7 13.8694 14.0139 13.6083 14.275C13.3472 14.5362 13.0333 14.6667 12.6667 14.6667H3.33333ZM3.33333 13.3334H12.6667V6.66671H3.33333V13.3334Z" fill="#8A5021"/>
                    </svg>
                    Do Date
                  </label>
                  <input type="date" class="input-field">
                </div>

                <div class="quest-field" style="width: 17%;">
                  <label class="quest-label" style="display: flex; align-items: center; gap: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 11C5.53333 11 5.13889 10.8389 4.81667 10.5167C4.49444 10.1945 4.33333 9.80004 4.33333 9.33337C4.33333 8.86671 4.49444 8.47226 4.81667 8.15004C5.13889 7.82782 5.53333 7.66671 6 7.66671C6.46667 7.66671 6.86111 7.82782 7.18333 8.15004C7.50556 8.47226 7.66667 8.86671 7.66667 9.33337C7.66667 9.80004 7.50556 10.1945 7.18333 10.5167C6.86111 10.8389 6.46667 11 6 11ZM3.33333 14.6667C2.96667 14.6667 2.65278 14.5362 2.39167 14.275C2.13056 14.0139 2 13.7 2 13.3334V4.00004C2 3.63337 2.13056 3.31949 2.39167 3.05837C2.65278 2.79726 2.96667 2.66671 3.33333 2.66671H4V1.33337H5.33333V2.66671H10.6667V1.33337H12V2.66671H12.6667C13.0333 2.66671 13.3472 2.79726 13.6083 3.05837C13.8694 3.31949 14 3.63337 14 4.00004V13.3334C14 13.7 13.8694 14.0139 13.6083 14.275C13.3472 14.5362 13.0333 14.6667 12.6667 14.6667H3.33333ZM3.33333 13.3334H12.6667V6.66671H3.33333V13.3334Z" fill="#8A5021"/>
                    </svg>
                    Due Date
                  </label>
                  <input type="date" class="input-field">
                </div>

                <div class="quest-field" style="width: 17%;">
                  <label class="quest-label" style="display: flex; align-items: center; gap: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.12256 1.66736C7.63704 1.22196 8.36284 1.22124 8.87744 1.66638C9.36283 2.08689 10.0119 2.67289 10.8237 3.4574L11.6899 4.30994C12.9177 5.53737 13.7728 6.47526 14.3335 7.12244C14.7785 7.63692 14.7786 8.36286 14.3335 8.87732C13.773 9.52464 12.9178 10.4619 11.6899 11.6898C10.4626 12.9175 9.52469 13.7726 8.87744 14.3334C8.36299 14.7784 7.63704 14.7784 7.12256 14.3334C6.63727 13.913 5.98806 13.3271 5.17627 12.5424L4.31006 11.6898C3.08225 10.4623 2.22763 9.52426 1.66748 8.87732C1.22198 8.36271 1.22201 7.63707 1.66748 7.12244L1.6665 7.12146C2.08697 6.63613 2.67307 5.98779 3.45752 5.17615L4.31006 4.30994C5.53741 3.08225 6.47554 2.22757 7.12256 1.66736Z" stroke="#8A5021" stroke-width="1.7"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.7131 5.0456C6.68243 4.6136 6.87643 4.1886 7.29643 4.08294C7.52655 4.0263 7.76279 3.99843 7.99977 3.99994C8.2781 3.99994 8.51277 4.03494 8.70377 4.08294C9.12377 4.1886 9.31743 4.6136 9.2871 5.0456C9.22343 5.94427 9.1021 7.50527 8.97077 8.37994C8.92743 8.66827 8.7541 8.91627 8.46677 8.9646C8.34377 8.9856 8.1901 8.99994 8.0001 8.99994C7.8101 8.99994 7.65643 8.98527 7.53343 8.9646C7.2461 8.91627 7.07243 8.66827 7.02943 8.37994C6.8981 7.50527 6.77677 5.94427 6.7131 5.0456ZM7.99977 12.3333C8.30919 12.3333 8.60593 12.2104 8.82472 11.9916C9.04352 11.7728 9.16643 11.476 9.16643 11.1666C9.16643 10.8572 9.04352 10.5604 8.82472 10.3416C8.60593 10.1229 8.30919 9.99994 7.99977 9.99994C7.69035 9.99994 7.3936 10.1229 7.17481 10.3416C6.95602 10.5604 6.8331 10.8572 6.8331 11.1666C6.8331 11.476 6.95602 11.7728 7.17481 11.9916C7.3936 12.2104 7.69035 12.3333 7.99977 12.3333Z" fill="#8A5021"/>
                    </svg>
                    Quest Type
                  </label>
                  <select class="input-field">
                    <option value="">-- Select --</option>
                    <option>Main Quest</option>
                    <option>Side Quest</option>
                    <option>Mini Quest</option>
                  </select>
                </div>

                <div class="quest-field" style="width: 20%;">
                  <label class="quest-label" style="display: flex; align-items: center; gap: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                      <path d="M6 0.5L0 3.22727V7.31818C0 11.0682 2.53333 14.6136 6 15.5C9.46667 14.6136 12 11.0682 12 7.31818V3.22727L6 0.5ZM8 10.0455H6.66667V12.0909H5.33333V10.0455H4V8.68182H5.33333L4.66667 4.65909L6 3.56818L7.33333 4.65909L6.66667 8.68182H8V10.0455Z" fill="#FF8D28"/>
                    </svg>
                    Select Guild
                  </label>
                  <select class="input-field">
                    <option value="">-- Select --</option>
                    <option>Capstone Group 8</option>
                  </select>
                </div>

                <div class="quest-field" style="width: 20%;">
                  <label class="quest-label" style="display: flex; align-items: center; gap: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect width="16" height="16" rx="8" fill="#FFDCC5"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4001 6.4C10.4001 7.72548 9.32558 8.8 8.0001 8.8C6.67461 8.8 5.6001 7.72548 5.6001 6.4C5.6001 5.07452 6.67461 4 8.0001 4C9.32558 4 10.4001 5.07452 10.4001 6.4ZM9.6001 6.4C9.6001 7.28366 8.88375 8 8.0001 8C7.11644 8 6.4001 7.28366 6.4001 6.4C6.4001 5.51634 7.11644 4.8 8.0001 4.8C8.88375 4.8 9.6001 5.51634 9.6001 6.4Z" fill="#6D390B"/>
                      <path d="M8.0001 10C5.41034 10 3.20381 11.5314 2.36328 13.6768C2.56804 13.8801 2.78374 14.0725 3.00941 14.2528C3.63531 12.2831 5.59878 10.8 8.0001 10.8C10.4014 10.8 12.3649 12.2831 12.9908 14.2528C13.2165 14.0725 13.4322 13.8801 13.6369 13.6768C12.7964 11.5314 10.5899 10 8.0001 10Z" fill="#6D390B"/>
                    </svg>
                    Assign Member
                  </label>
                  <select class="input-field">
                    <option value="">-- Select --</option>
                    <option>Elli</option>
                  </select>
                </div>
              </div>
              <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;">

              <div class="quest-actions">
                <div style="display: flex; justify-content: flex-end;">
                <button class="btn-cancel" onclick="removeQuestForm(this)">Cancel</button>  
                <button class="btn-begin-quest" onclick="createQuest(this)">Begin quest
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <g clip-path="url(#clip0_60226_1301)">
                        <path d="M9.33312 11.2778L11.2776 9.33336L2.33312 0.388916H0.388672V2.33336L9.33312 11.2778Z" fill="white"/>
                        <path d="M0.388672 0.388916V2.33336L9.33312 11.2778L10.3053 10.3056L0.388672 0.388916Z" fill="white"/>
                        <path d="M12.998 12.7587C13.1084 12.6483 13.1761 12.5153 13.2045 12.3823L11.1659 9.9731L10.8933 9.7001C10.674 9.48077 10.2828 9.51616 10.0191 9.77983L9.78033 10.0178C9.51705 10.2811 9.48166 10.6723 9.70099 10.8917L9.98916 11.1798L12.3808 13.204C12.515 13.176 12.6484 13.1079 12.7596 12.9971L12.998 12.7587Z" fill="white"/>
                        <path d="M12.998 12.7586C13.1085 12.6482 13.1761 12.5152 13.2045 12.3822L12.6826 11.7654L12.396 13.1981C12.5248 13.1681 12.6531 13.1036 12.7596 12.9966L12.998 12.7586ZM11.7108 10.6174L11.3655 12.3445L11.8555 12.759L12.1744 11.1646L11.7108 10.6174ZM11.166 9.97303L10.8934 9.70003C10.8562 9.66418 10.8134 9.63474 10.7666 9.61292L10.3863 11.5154L10.8763 11.9299L11.2484 10.0699L11.166 9.97303ZM10.2323 9.62769C10.1531 9.66609 10.0811 9.71764 10.0191 9.78014L9.78037 10.0177C9.68687 10.1106 9.61849 10.2257 9.58165 10.3522C9.52642 10.5505 9.56376 10.7547 9.70104 10.8916L9.93281 11.1234L10.2323 9.62769ZM10.2323 9.62769C10.2323 9.62717 10.2323 9.62717 10.2323 9.62769V9.62769Z" fill="white"/>
                        <path d="M12.9308 14C13.5214 14 14.0002 13.5212 14.0002 12.9305C14.0002 12.3399 13.5214 11.8611 12.9308 11.8611C12.3401 11.8611 11.8613 12.3399 11.8613 12.9305C11.8613 13.5212 12.3401 14 12.9308 14Z" fill="white"/>
                        <path d="M11.5212 8.6816C11.5586 8.71891 11.5883 8.76322 11.6085 8.812C11.6287 8.86078 11.6391 8.91307 11.6391 8.96588C11.6391 9.01868 11.6287 9.07097 11.6085 9.11975C11.5883 9.16853 11.5586 9.21284 11.5212 9.25016L9.15213 11.6193C9.1148 11.6566 9.07048 11.6862 9.0217 11.7064C8.97292 11.7266 8.92064 11.737 8.86785 11.737C8.81505 11.737 8.76278 11.7266 8.714 11.7064C8.66522 11.6862 8.6209 11.6566 8.58357 11.6193C8.54624 11.5819 8.51663 11.5376 8.49642 11.4888C8.47622 11.4401 8.46582 11.3878 8.46582 11.335C8.46582 11.2822 8.47622 11.2299 8.49642 11.1811C8.51663 11.1324 8.54624 11.088 8.58357 11.0507L10.9527 8.6816C10.99 8.64423 11.0343 8.61459 11.0831 8.59436C11.1319 8.57413 11.1842 8.56372 11.237 8.56372C11.2898 8.56372 11.3421 8.57413 11.3908 8.59436C11.4396 8.61459 11.4839 8.64423 11.5212 8.6816Z" fill="white"/>
                        <path d="M8.58339 12.2993C8.95925 12.2993 9.26394 11.9946 9.26394 11.6188C9.26394 11.2429 8.95925 10.9382 8.58339 10.9382C8.20753 10.9382 7.90283 11.2429 7.90283 11.6188C7.90283 11.9946 8.20753 12.2993 8.58339 12.2993Z" fill="white"/>
                        <path d="M11.5214 9.36172C11.8972 9.36172 12.2019 9.05703 12.2019 8.68117C12.2019 8.30531 11.8972 8.00061 11.5214 8.00061C11.1455 8.00061 10.8408 8.30531 10.8408 8.68117C10.8408 9.05703 11.1455 9.36172 11.5214 9.36172Z" fill="white"/>
                        <path d="M8.58371 12.0078C8.79849 12.0078 8.9726 11.8336 8.9726 11.6189C8.9726 11.4041 8.79849 11.23 8.58371 11.23C8.36894 11.23 8.19482 11.4041 8.19482 11.6189C8.19482 11.8336 8.36894 12.0078 8.58371 12.0078Z" fill="white"/>
                        <path d="M11.5212 9.07001C11.736 9.07001 11.9101 8.8959 11.9101 8.68113C11.9101 8.46635 11.736 8.29224 11.5212 8.29224C11.3064 8.29224 11.1323 8.46635 11.1323 8.68113C11.1323 8.8959 11.3064 9.07001 11.5212 9.07001Z" fill="white"/>
                        <path d="M13.1845 11.4108C13.2121 11.4383 13.234 11.4709 13.249 11.5069C13.264 11.5429 13.2717 11.5814 13.2717 11.6204C13.2717 11.6594 13.264 11.6979 13.249 11.7339C13.234 11.7699 13.2121 11.8026 13.1845 11.83L11.8327 13.1814C11.8052 13.2089 11.7725 13.2308 11.7365 13.2457C11.7006 13.2606 11.662 13.2682 11.6231 13.2682C11.5842 13.2682 11.5456 13.2606 11.5097 13.2457C11.4737 13.2308 11.441 13.2089 11.4135 13.1814C11.386 13.1539 11.3641 13.1212 11.3492 13.0852C11.3343 13.0493 11.3267 13.0107 11.3267 12.9718C11.3267 12.9329 11.3343 12.8943 11.3492 12.8584C11.3641 12.8224 11.386 12.7897 11.4135 12.7622L12.7653 11.4108C12.7927 11.3832 12.8254 11.3612 12.8614 11.3463C12.8973 11.3313 12.9359 11.3236 12.9749 11.3236C13.0138 11.3236 13.0524 11.3313 13.0884 11.3463C13.1244 11.3612 13.157 11.3832 13.1845 11.4108Z" fill="white"/>
                        <path d="M4.66661 11.2778L2.72217 9.33336L11.6666 0.388916H13.6111V2.33336L4.66661 11.2778Z" fill="white"/>
                        <path d="M13.611 0.388916V2.33336L4.66656 11.2778L3.69434 10.3056L13.611 0.388916Z" fill="white"/>
                        <path d="M1.00191 12.7587C0.898249 12.6557 0.826541 12.525 0.79541 12.3823L2.83397 9.9731L3.10658 9.7001C3.32591 9.48077 3.71713 9.51616 3.9808 9.77983L4.21919 10.0178C4.48247 10.2811 4.51785 10.6723 4.29852 10.8917L4.01035 11.1798L1.61869 13.204C1.47505 13.1732 1.34347 13.1013 1.23991 12.9971L1.00191 12.7587Z" fill="white"/>
                        <path d="M1.00191 12.7586C0.898249 12.6557 0.826541 12.5249 0.79541 12.3822L1.3173 11.7654L1.60391 13.1981C1.46616 13.1665 1.34012 13.0967 1.2403 12.9966L1.00191 12.7586ZM2.28913 10.6174L2.63447 12.3445L2.14447 12.759L1.82558 11.1646L2.28913 10.6174ZM2.83397 9.97303L3.10658 9.70003C3.14373 9.66418 3.18657 9.63474 3.23335 9.61292L3.61369 11.5154L3.12369 11.9299L2.75152 10.0699L2.83397 9.97303ZM3.76769 9.62769C3.84352 9.66464 3.91624 9.71519 3.9808 9.78014L4.21919 10.0181C4.31797 10.1169 4.38447 10.2336 4.41791 10.3526C4.47313 10.5509 4.4358 10.7551 4.29852 10.892L4.06674 11.1237L3.76769 9.62769ZM3.76769 9.62769C3.76769 9.62717 3.76769 9.62717 3.76769 9.62769V9.62769Z" fill="white"/>
                        <path d="M1.06944 14C1.66008 14 2.13889 13.5212 2.13889 12.9305C2.13889 12.3399 1.66008 11.8611 1.06944 11.8611C0.478807 11.8611 0 12.3399 0 12.9305C0 13.5212 0.478807 14 1.06944 14Z" fill="white"/>
                        <path d="M2.47872 8.6816C2.44135 8.71891 2.4117 8.76322 2.39148 8.812C2.37125 8.86078 2.36084 8.91307 2.36084 8.96588C2.36084 9.01868 2.37125 9.07097 2.39148 9.11975C2.4117 9.16853 2.44135 9.21284 2.47872 9.25016L4.84783 11.6193C4.88516 11.6566 4.92948 11.6862 4.97826 11.7064C5.02703 11.7266 5.07931 11.737 5.13211 11.737C5.1849 11.737 5.23718 11.7266 5.28596 11.7064C5.33473 11.6862 5.37905 11.6566 5.41639 11.6193C5.45372 11.5819 5.48333 11.5376 5.50353 11.4888C5.52374 11.4401 5.53414 11.3878 5.53414 11.335C5.53414 11.2822 5.52374 11.2299 5.50353 11.1811C5.48333 11.1324 5.45372 11.088 5.41639 11.0507L3.04727 8.6816C3.00996 8.64423 2.96565 8.61459 2.91687 8.59436C2.86809 8.57413 2.8158 8.56372 2.763 8.56372C2.71019 8.56372 2.6579 8.57413 2.60912 8.59436C2.56034 8.61459 2.51603 8.64423 2.47872 8.6816Z" fill="white"/>
                        <path d="M5.4164 12.2993C5.79226 12.2993 6.09695 11.9946 6.09695 11.6188C6.09695 11.2429 5.79226 10.9382 5.4164 10.9382C5.04053 10.9382 4.73584 11.2429 4.73584 11.6188C4.73584 11.9946 5.04053 12.2993 5.4164 12.2993Z" fill="white"/>
                        <path d="M2.4789 9.36172C2.85476 9.36172 3.15945 9.05703 3.15945 8.68117C3.15945 8.30531 2.85476 8.00061 2.4789 8.00061C2.10303 8.00061 1.79834 8.30531 1.79834 8.68117C1.79834 9.05703 2.10303 9.36172 2.4789 9.36172Z" fill="white"/>
                        <path d="M5.41623 12.0078C5.63101 12.0078 5.80512 11.8336 5.80512 11.6189C5.80512 11.4041 5.63101 11.23 5.41623 11.23C5.20146 11.23 5.02734 11.4041 5.02734 11.6189C5.02734 11.8336 5.20146 12.0078 5.41623 12.0078Z" fill="white"/>
                        <path d="M2.47873 9.07001C2.69351 9.07001 2.86762 8.8959 2.86762 8.68113C2.86762 8.46635 2.69351 8.29224 2.47873 8.29224C2.26396 8.29224 2.08984 8.46635 2.08984 8.68113C2.08984 8.8959 2.26396 9.07001 2.47873 9.07001Z" fill="white"/>
                        <path d="M0.815705 11.4108C0.788074 11.4383 0.766146 11.4709 0.751182 11.5069C0.736219 11.5429 0.728516 11.5814 0.728516 11.6204C0.728516 11.6594 0.736219 11.6979 0.751182 11.7339C0.766146 11.7699 0.788074 11.8026 0.815705 11.83L2.16748 13.1814C2.19501 13.2089 2.22769 13.2308 2.26365 13.2457C2.29962 13.2606 2.33817 13.2682 2.37709 13.2682C2.41602 13.2682 2.45457 13.2606 2.49054 13.2457C2.5265 13.2308 2.55918 13.2089 2.58671 13.1814C2.61423 13.1539 2.63607 13.1212 2.65096 13.0852C2.66586 13.0493 2.67353 13.0107 2.67353 12.9718C2.67353 12.9329 2.66586 12.8943 2.65096 12.8584C2.63607 12.8224 2.61423 12.7897 2.58671 12.7622L1.23493 11.4108C1.20746 11.3832 1.1748 11.3612 1.13883 11.3463C1.10285 11.3313 1.06428 11.3236 1.02532 11.3236C0.986355 11.3236 0.947779 11.3313 0.911806 11.3463C0.875833 11.3612 0.843173 11.3832 0.815705 11.4108Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_60226_1301">
                          <rect width="14" height="14" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
      `

  questForms.appendChild(newForm)
}

function removeQuestForm(button) {
  const form = button.closest(".quest-form-card")
  form.style.animation = "fadeOut 0.3s ease-in-out"
  setTimeout(() => {
    form.remove()
  }, 300)
}

function createQuest(button) {
  const form = button.closest(".quest-form-card")
  const title = form.querySelector(".quest-title-input").value
  const description = form.querySelector(".quest-description").value

  if (!title.trim()) {
    alert("Please enter a quest title")
    return
  }

  const newQuest = {
    id: Date.now(),
    title: title,
    description: description || "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),
    type: "side-quest",
    xp: 50,
    completed: false,
  }

  quests.today.push(newQuest)
  populateTodayQuests()
  updateBadges()

  // Clear form
  form.querySelector(".quest-title-input").value = ""
  form.querySelector(".quest-description").value = ""

  alert("Quest created successfully!")
}

function setDueDate() {
  const date = prompt("Enter due date (e.g., June 30):")
  if (date) {
    alert(`Due date set to: ${date}`)
  }
}

function selectQuestType() {
  const types = ["Main Quest (100 XP)", "Side Quest (50 XP)", "Mini Quest (15 XP)"]
  const choice = prompt(`Select quest type:\n1. ${types[0]}\n2. ${types[1]}\n3. ${types[2]}\n\nEnter 1, 2, or 3:`)

  if (choice >= 1 && choice <= 3) {
    alert(`Quest type set to: ${types[choice - 1]}`)
  }
}

function selectGuild() {
  const guilds = ["Faerie Court", "Capstone Group 8", "GDG PUP", "g1 art app"]
  const choice = prompt(`Select guild:\n${guilds.map((g, i) => `${i + 1}. ${g}`).join("\n")}\n\nEnter number:`)

  if (choice >= 1 && choice <= guilds.length) {
    alert(`Guild set to: ${guilds[choice - 1]}`)
  }
}

// Profile management
function editProfile() {
  if (!currentUser) return

  // Populate edit form
  document.getElementById("editFirstName").value = currentUser.firstName || ""
  document.getElementById("editLastName").value = currentUser.lastName || ""
  document.getElementById("editUsername").value = currentUser.username || ""

  showSection("edit-profile")
}

function saveProfile() {
  const firstName = document.getElementById("editFirstName").value
  const lastName = document.getElementById("editLastName").value
  const username = document.getElementById("editUsername").value
  const password = document.getElementById("editPassword").value
  const confirmPassword = document.getElementById("editConfirmPassword").value

  if (password && password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }

  // Update user data
  currentUser.firstName = firstName
  currentUser.lastName = lastName
  currentUser.username = username

  localStorage.setItem("faerieCourtUser", JSON.stringify(currentUser))
  updateUserDisplay()

  alert("Profile updated successfully!")
  showSection("begin-quest")
  updateSidebarAvatar();
}

function cancelEdit() {
  showSection("begin-quest")
}

// Utility functions
function logout() {
  localStorage.removeItem("faerieCourtUser")
  window.location.href = "index.html"
}

function openTrashBin() {
  alert("🗑️ Trash bin is empty")
}

function createGuild() {
  const guildName = prompt("Enter guild name:")
  if (guildName) {
    alert(`Guild "${guildName}" created successfully!`)
  }
}

function postGuildQuest() {
  const questTitle = prompt("Enter guild quest title:")
  if (questTitle) {
    const newQuest = {
      id: Date.now(),
      title: questTitle,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),
      author: currentUser.username,
      type: "side-quest",
      xp: 50,
      completed: false,
    }

    quests.guildQuests.push(newQuest)
    populateGuildQuests()
    updateBadges()

    alert("Guild quest posted successfully!")
  }
}

// Achievement system (placeholder)
function checkAchievements() {
  if (currentUser.xp >= 1000 && currentUser.level === 1) {
    alert("🏆 Achievement Unlocked: First Level Up!")
  }
}

// Team collaboration (placeholder)
function inviteTeammate() {
  const email = prompt("Enter teammate email:")
  if (email) {
    alert(`Invitation sent to ${email}!`)
  }
}

// Quest filtering (placeholder)
function filterQuests(filter) {
  alert(`Filtering quests by: ${filter}`)
}


const typeColors = {
  'side-quest': '#E0B400',
  'mini-quest': '#03C991',
  'main-quest': '#FA5DD8',
};

card.style.setProperty('--check-color', typeColors[quest.type]);

function expandQuest(id) {
  const details = document.getElementById(`details-${id}`);
  const summary = document.getElementById(`summary-${id}`);

  if (details && summary) {
    const isExpanded = details.style.display === "block";
    details.style.display = isExpanded ? "none" : "block";
    summary.style.display = isExpanded ? "flex" : "none";
  }
}

function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.style.display = 'none');

  // Show the selected section
  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = 'block';
  }
}

// Move updateSidebarAvatar to global scope
function updateSidebarAvatar() {
  const data = localStorage.getItem('questifyProfilePic');
  const userAvatar = document.getElementById('userAvatar');
  console.log('updateSidebarAvatar called. userAvatar:', userAvatar, 'data:', data);
  if (userAvatar) {
    // Remove previous img if any
    let existingImg = userAvatar.querySelector('img');
    if (existingImg) userAvatar.removeChild(existingImg);
    // Remove SVG if any
    let existingSVG = userAvatar.querySelector('svg');
    if (existingSVG) userAvatar.removeChild(existingSVG);
    if (data) {
      // Add img
      const avatarImg = document.createElement('img');
      avatarImg.src = data;
      avatarImg.alt = 'Profile';
      avatarImg.style.width = '100%';
      avatarImg.style.height = '100%';
      avatarImg.style.objectFit = 'cover';
      userAvatar.appendChild(avatarImg);
    } else {
      // Add default SVG
      userAvatar.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"><rect width=\"24\" height=\"24\" rx=\"12\" fill=\"#FFDCC5\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.6001 9.6C15.6001 11.5882 13.9884 13.2 12.0001 13.2C10.0119 13.2 8.40015 11.5882 8.40015 9.6C8.40015 7.61177 10.0119 6 12.0001 6C13.9884 6 15.6001 7.61177 15.6001 9.6ZM14.4001 9.6C14.4001 10.9255 13.3256 12 12.0001 12C10.6747 12 9.60015 10.9255 9.60015 9.6C9.60015 8.27452 10.6747 7.2 12.0001 7.2C13.3256 7.2 14.4001 8.27452 14.4001 9.6Z\" fill=\"#6D390B\"/><path d=\"M12.0001 15C8.11552 15 4.80571 17.297 3.54492 20.5152C3.85206 20.8202 4.1756 21.1087 4.51412 21.3792C5.45296 18.4246 8.39818 16.2 12.0001 16.2C15.6021 16.2 18.5473 18.4246 19.4862 21.3792C19.8247 21.1087 20.1482 20.8202 20.4554 20.5152C19.1946 17.2971 15.8848 15 12.0001 15Z\" fill=\"#6D390B\"/></svg>`;
    }
  }
}

// Profile Picture Upload Logic
(function() {
  const input = document.getElementById('profilePicInput');
  const img = document.getElementById('profilePicImg');
  const svg = document.getElementById('profilePicDefault');
  const changeBtn = document.getElementById('changePicBtn');
  const removeBtn = document.getElementById('removePicBtn');
  // Load from localStorage
  function loadProfilePic() {
    const data = localStorage.getItem('questifyProfilePic');
    if (data) {
      img.src = data;
      img.style.display = '';
      svg.style.display = 'none';
      removeBtn.style.display = '';
    } else {
      img.src = '';
      img.style.display = 'none';
      svg.style.display = '';
      removeBtn.style.display = 'none';
    }
    // Always update sidebar avatar when profile pic changes
    updateSidebarAvatar();
  }
  changeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    input.click();
  });
  input.addEventListener('change', function(e) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        localStorage.setItem('questifyProfilePic', evt.target.result);
        loadProfilePic();
      };
      reader.readAsDataURL(input.files[0]);
    }
  });
  removeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('questifyProfilePic');
    loadProfilePic();
  });
  loadProfilePic();
})();