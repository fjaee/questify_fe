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
  const card = document.createElement("div")
  card.className = "quest-card"
  card.dataset.questId = quest.id


  card.innerHTML = `
    <div class="quest-checkbox" style="--check-color: ${typeColors[quest.type]}">
      <input type="checkbox" id="quest${quest.id}" ${quest.completed ? "checked" : ""} 
            onchange="completeQuest(${quest.id}, '${category}')">
      <label for="quest${quest.id}"></label>
    </div>

    <div class="quest-content">
      <div class="quest-top-row">
        <h4>${quest.title}</h4>
        <div class="quest-right-actions">
          <span class="quest-xp">${quest.xp} XP</span>
          <button class="quest-expand-btn" onclick="expandQuest(${quest.id})" aria-label="Expand quest">
            <svg class="icon-dropdown" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      <div class="quest-summary-dates" id="summary-${quest.id}">
        <span>Do on ${quest.doDate || "—"}</span>
        <span class="dot"> • </span>
        <span>Due on ${quest.dueDate || "—"}</span>
      </div>

      <div class="quest-extra-details" id="details-${quest.id}" style="display: none;">
        ${quest.description ? `<p>${quest.description}</p>` : ""}
        <div class="quest-meta-expanded-row">

          ${quest.doDate ? `
            <div class="btn-option no-click">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="..." fill="#8A5021" />
              </svg>
              ${quest.doDate}
            </div>
          ` : ""}

          ${quest.dueDate ? `
            <div class="btn-option no-click">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="..." fill="#8A5021" />
              </svg>
              ${quest.dueDate}
            </div>
          ` : ""}

          <div class="btn-option no-click">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="..." stroke="#8A5021" stroke-width="1.7"/>
            </svg>
            ${quest.type.replace("-", " ")}
          </div>

          ${quest.guild ? `
            <div class="btn-option no-click">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 16">
                <path d="..." fill="#FF8D28"/>
              </svg>
              ${quest.guild}
            </div>
          ` : ""}
          
        </div>
      </div>    
    </div>
  `;


  return card
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

        <div class="quest-options">
          <button class="btn-option" onclick="setDueDate(this)">
            <!-- Calendar Icon (Do Date) -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M6 11C5.53 11 5.14 10.84 4.82 10.52C4.49 10.19 4.33 9.8 4.33 9.33C4.33 8.87 4.49 8.47 4.82 8.15C5.14 7.83 5.53 7.67 6 7.67C6.47 7.67 6.86 7.83 7.18 8.15C7.51 8.47 7.67 8.87 7.67 9.33C7.67 9.8 7.51 10.19 7.18 10.52C6.86 10.84 6.47 11 6 11ZM3.33 14.67C2.97 14.67 2.65 14.54 2.39 14.28C2.13 14.01 2 13.7 2 13.33V4C2 3.63 2.13 3.32 2.39 3.06C2.65 2.8 2.97 2.67 3.33 2.67H4V1.33H5.33V2.67H10.67V1.33H12V2.67H12.67C13.03 2.67 13.35 2.8 13.61 3.06C13.87 3.32 14 3.63 14 4V13.33C14 13.7 13.87 14.01 13.61 14.28C13.35 14.54 13.03 14.67 12.67 14.67H3.33ZM3.33 13.33H12.67V6.67H3.33V13.33Z" fill="#8A5021"/>
            </svg>
            Do Date
          </button>

          <button class="btn-option" onclick="setDueDate(this)">
            <!-- Calendar Icon (Due Date) — Same as Do Date -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M6 11C5.53 11 5.14 10.84 4.82 10.52C4.49 10.19 4.33 9.8 4.33 9.33C4.33 8.87 4.49 8.47 4.82 8.15C5.14 7.83 5.53 7.67 6 7.67C6.47 7.67 6.86 7.83 7.18 8.15C7.51 8.47 7.67 8.87 7.67 9.33C7.67 9.8 7.51 10.19 7.18 10.52C6.86 10.84 6.47 11 6 11ZM3.33 14.67C2.97 14.67 2.65 14.54 2.39 14.28C2.13 14.01 2 13.7 2 13.33V4C2 3.63 2.13 3.32 2.39 3.06C2.65 2.8 2.97 2.67 3.33 2.67H4V1.33H5.33V2.67H10.67V1.33H12V2.67H12.67C13.03 2.67 13.35 2.8 13.61 3.06C13.87 3.32 14 3.63 14 4V13.33C14 13.7 13.87 14.01 13.61 14.28C13.35 14.54 13.03 14.67 12.67 14.67H3.33ZM3.33 13.33H12.67V6.67H3.33V13.33Z" fill="#8A5021"/>
            </svg>
            Due Date
          </button>

          <button class="btn-option" onclick="selectQuestType(this)">
            <!-- Quest Type Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M7.12 1.67C7.64 1.22 8.36 1.22 8.88 1.67C9.36 2.09 10.01 2.67 10.82 3.46L11.69 4.31C12.92 5.54 13.77 6.48 14.33 7.12C14.78 7.64 14.78 8.36 14.33 8.88C13.77 9.52 12.92 10.46 11.69 11.69C10.46 12.92 9.52 13.77 8.88 14.33C8.36 14.78 7.64 14.78 7.12 14.33C6.64 13.91 5.99 13.33 5.18 12.54L4.31 11.69C3.08 10.46 2.23 9.52 1.67 8.88C1.22 8.36 1.22 7.64 1.67 7.12C2.09 6.64 2.67 5.99 3.46 5.18L4.31 4.31C5.54 3.08 6.48 2.23 7.12 1.67Z" stroke="#8A5021" stroke-width="1.7"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.71 5.05C6.68 4.61 6.88 4.19 7.3 4.08C7.53 4.03 7.76 4 8 4C8.28 4 8.51 4.03 8.7 4.08C9.12 4.19 9.32 4.61 9.29 5.05C9.22 5.94 9.1 7.51 8.97 8.38C8.93 8.67 8.75 8.92 8.47 8.96C8.34 8.99 8.19 9 8 9C7.81 9 7.66 8.99 7.53 8.96C7.25 8.92 7.07 8.67 7.03 8.38C6.9 7.51 6.78 5.94 6.71 5.05ZM8 12.33C8.31 12.33 8.61 12.21 8.82 11.99C9.04 11.77 9.17 11.48 9.17 11.17C9.17 10.86 9.04 10.56 8.82 10.34C8.61 10.12 8.31 10 8 10C7.69 10 7.39 10.12 7.17 10.34C6.96 10.56 6.83 10.86 6.83 11.17C6.83 11.48 6.96 11.77 7.17 11.99C7.39 12.21 7.69 12.33 8 12.33Z" fill="#8A5021"/>
            </svg>
            Quest Type
          </button>

          <button class="btn-option" onclick="selectGuild(this)">
            <!-- Guild Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
              <path d="M6 0.5L0 3.23V7.32C0 11.07 2.53 14.61 6 15.5C9.47 14.61 12 11.07 12 7.32V3.23L6 0.5ZM8 10.05H6.67V12.09H5.33V10.05H4V8.68H5.33L4.67 4.66L6 3.57L7.33 4.66L6.67 8.68H8V10.05Z" fill="#FF8D28"/>
            </svg>
            Select a Guild
          </button>

          <button class="btn-option" id="assigneeBtn">
            <!-- Avatar Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect width="16" height="16" rx="8" fill="#FFDCC5"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4 6.4C10.4 7.73 9.33 8.8 8 8.8C6.67 8.8 5.6 7.73 5.6 6.4C5.6 5.07 6.67 4 8 4C9.33 4 10.4 5.07 10.4 6.4ZM9.6 6.4C9.6 7.28 8.88 8 8 8C7.12 8 6.4 7.28 6.4 6.4C6.4 5.52 7.12 4.8 8 4.8C8.88 4.8 9.6 5.52 9.6 6.4Z" fill="#6D390B"/>
              <path d="M8 10C5.41 10 3.2 11.53 2.36 13.68C2.57 13.88 2.78 14.07 3.01 14.25C3.64 12.28 5.6 10.8 8 10.8C10.4 10.8 12.36 12.28 12.99 14.25C13.22 14.07 13.43 13.88 13.64 13.68C12.8 11.53 10.59 10 8 10Z" fill="#6D390B"/>
            </svg>
            Assign to Member
          </button>
        </div>

        <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;">

        <div class="quest-actions">
          <div style="display: flex; gap: 0.5rem;">
          <button class="btn-cancel" onclick="removeQuestForm(this)">Cancel</button>
            <button class="btn-begin-quest" onclick="createQuest(this)">
              Begin Quest
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <g clip-path="url(#clip0_60226_1019)">
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
                <clipPath id="clip0_60226_1019">
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