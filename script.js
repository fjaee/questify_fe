let currentUser = null
let currentSection = "begin-quest"
const quests = {
  inbox: [],
  today: [
    {
      id: 1,
      title: "Post Schedule on Team Dashboard",
      description: "Add updated weekly goals and tasks to the workspace.",
      date: "June 25",
      type: "side-quest",
      xp: 50,
      completed: false,
      guild: "Guild",
    },
    {
      id: 2,
      title: "Print Attendance Sheet",
      date: "June 25",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
    {
      id: 3,
      title: "Clear Desktop Icons",
      date: "June 25",
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
      title: "Deploy Beta Version of Questify",
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
      xp: 15,
      completed: false,
    },
    {
      id: 16,
      title: "Mock Interview with Teammate",
      date: "June 27",
      author: "Seraphine",
      xp: 100,
      completed: false,
    },
    {
      id: 17,
      title: "Upload Documentation to Repository",
      date: "June 29",
      author: "Karma",
      xp: 50,
      completed: false,
    },
  ],
}

function showSignup() {
  window.location.href = "signup.html"
}

function login() {
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  if (email && password) {
    currentUser = {
      username: "User",
      level: 0,
      email: email,
    }

    localStorage.setItem("questifyUser", JSON.stringify(currentUser))

    window.location.href = "dashboard.html"
  } else {
    alert("Please enter both email and password")
  }
}

function handleSignup(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const userData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  if (userData.password !== userData.confirmPassword) {
    alert("Passwords do not match")
    return
  }

  currentUser = {
    username: userData.username,
    level: 1,
    email: userData.email,
  }

  localStorage.setItem("questifyUser", JSON.stringify(currentUser))

  alert("Account created successfully! Welcome to Questify!")
  window.location.href = "dashboard.html"
}

function logout() {
  localStorage.removeItem("questifyUser")
  window.location.href = "index.html"
}

function showSection(sectionName) {
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => {
    item.classList.remove("active")
  })

  const targetSection = document.getElementById(sectionName + "-section")
  if (targetSection) {
    targetSection.classList.add("active")
    targetSection.classList.add("fade-in")
  }

  const clickedNavItem = event.target.closest(".nav-item")
  if (clickedNavItem) {
    clickedNavItem.classList.add("active")
  }

  currentSection = sectionName

  if (sectionName === "faerie-court") {
    showGuildSection("faerie-court")
  }
}

function showGuildSection(guildName) {
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  const guildSection = document.getElementById(guildName + "-section")
  if (guildSection) {
    guildSection.classList.add("active")
    guildSection.classList.add("fade-in")
  }
}

function addQuestForm() {
  const questForms = document.querySelector(".quest-forms");
  const newForm = document.createElement("div");
  newForm.className = "quest-form-card fade-in";
  newForm.innerHTML = `
    <input type="text" placeholder="Quest name" class="quest-title-input" />
    <textarea placeholder="Description" class="quest-description"></textarea>

    <div class="quest-options">
      <button class="btn-option">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 11C5.53333 11 5.13889 10.8389 4.81667 10.5167C4.49444 10.1945 4.33333 9.80004 4.33333 9.33337C4.33333 8.86671 4.49444 8.47226 4.81667 8.15004C5.13889 7.82782 5.53333 7.66671 6 7.66671C6.46667 7.66671 6.86111 7.82782 7.18333 8.15004C7.50556 8.47226 7.66667 8.86671 7.66667 9.33337C7.66667 9.80004 7.50556 10.1945 7.18333 10.5167C6.86111 10.8389 6.46667 11 6 11ZM3.33333 14.6667C2.96667 14.6667 2.65278 14.5362 2.39167 14.275C2.13056 14.0139 2 13.7 2 13.3334V4.00004C2 3.63337 2.13056 3.31949 2.39167 3.05837C2.65278 2.79726 2.96667 2.66671 3.33333 2.66671H4V1.33337H5.33333V2.66671H10.6667V1.33337H12V2.66671H12.6667C13.0333 2.66671 13.3472 2.79726 13.6083 3.05837C13.8694 3.31949 14 3.63337 14 4.00004V13.3334C14 13.7 13.8694 14.0139 13.6083 14.275C13.3472 14.5362 13.0333 14.6667 12.6667 14.6667H3.33333ZM3.33333 13.3334H12.6667V6.66671H3.33333V13.3334Z" fill="#8A5021"/>
      </svg> Do Date
      </button>
      <button class="btn-option">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 11C5.53333 11 5.13889 10.8389 4.81667 10.5167C4.49444 10.1945 4.33333 9.80004 4.33333 9.33337C4.33333 8.86671 4.49444 8.47226 4.81667 8.15004C5.13889 7.82782 5.53333 7.66671 6 7.66671C6.46667 7.66671 6.86111 7.82782 7.18333 8.15004C7.50556 8.47226 7.66667 8.86671 7.66667 9.33337C7.66667 9.80004 7.50556 10.1945 7.18333 10.5167C6.86111 10.8389 6.46667 11 6 11ZM3.33333 14.6667C2.96667 14.6667 2.65278 14.5362 2.39167 14.275C2.13056 14.0139 2 13.7 2 13.3334V4.00004C2 3.63337 2.13056 3.31949 2.39167 3.05837C2.65278 2.79726 2.96667 2.66671 3.33333 2.66671H4V1.33337H5.33333V2.66671H10.6667V1.33337H12V2.66671H12.6667C13.0333 2.66671 13.3472 2.79726 13.6083 3.05837C13.8694 3.31949 14 3.63337 14 4.00004V13.3334C14 13.7 13.8694 14.0139 13.6083 14.275C13.3472 14.5362 13.0333 14.6667 12.6667 14.6667H3.33333ZM3.33333 13.3334H12.6667V6.66671H3.33333V13.3334Z" fill="#8A5021"/>
      </svg> Due Date
      </button>
      <button class="btn-option">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M7.12256 1.66736C7.63704 1.22196 8.36284 1.22124 8.87744 1.66638C9.36283 2.08689 10.0119 2.67289 10.8237 3.4574L11.6899 4.30994C12.9177 5.53737 13.7728 6.47526 14.3335 7.12244C14.7785 7.63692 14.7786 8.36286 14.3335 8.87732C13.773 9.52464 12.9178 10.4619 11.6899 11.6898C10.4626 12.9175 9.52469 13.7726 8.87744 14.3334C8.36299 14.7784 7.63704 14.7784 7.12256 14.3334C6.63727 13.913 5.98806 13.3271 5.17627 12.5424L4.31006 11.6898C3.08225 10.4623 2.22763 9.52426 1.66748 8.87732C1.22198 8.36271 1.22201 7.63707 1.66748 7.12244L1.6665 7.12146C2.08697 6.63613 2.67307 5.98779 3.45752 5.17615L4.31006 4.30994C5.53741 3.08225 6.47554 2.22757 7.12256 1.66736Z" stroke="#8A5021" stroke-width="1.7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.7131 5.0456C6.68243 4.6136 6.87643 4.1886 7.29643 4.08294C7.52655 4.0263 7.76279 3.99843 7.99977 3.99994C8.2781 3.99994 8.51277 4.03494 8.70377 4.08294C9.12377 4.1886 9.31743 4.6136 9.2871 5.0456C9.22343 5.94427 9.1021 7.50527 8.97077 8.37994C8.92743 8.66827 8.7541 8.91627 8.46677 8.9646C8.34377 8.9856 8.1901 8.99994 8.0001 8.99994C7.8101 8.99994 7.65643 8.98527 7.53343 8.9646C7.2461 8.91627 7.07243 8.66827 7.02943 8.37994C6.8981 7.50527 6.77677 5.94427 6.7131 5.0456ZM7.99977 12.3333C8.30919 12.3333 8.60593 12.2104 8.82472 11.9916C9.04352 11.7728 9.16643 11.476 9.16643 11.1666C9.16643 10.8572 9.04352 10.5604 8.82472 10.3416C8.60593 10.1229 8.30919 9.99994 7.99977 9.99994C7.69035 9.99994 7.3936 10.1229 7.17481 10.3416C6.95602 10.5604 6.8331 10.8572 6.8331 11.1666C6.8331 11.476 6.95602 11.7728 7.17481 11.9916C7.3936 12.2104 7.69035 12.3333 7.99977 12.3333Z" fill="#8A5021"/>
      </svg> Quest type
      </button>
      <button class="btn-option">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
      <path d="M6 0.5L0 3.22727V7.31818C0 11.0682 2.53333 14.6136 6 15.5C9.46667 14.6136 12 11.0682 12 7.31818V3.22727L6 0.5ZM8 10.0455H6.66667V12.0909H5.33333V10.0455H4V8.68182H5.33333L4.66667 4.65909L6 3.56818L7.33333 4.65909L6.66667 8.68182H8V10.0455Z" fill="#FF8D28"/>
      </svg> Guild
      </button>
      <button class="btn-option">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect width="16" height="16" rx="8" fill="#FFDCC5"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4001 6.4C10.4001 7.72548 9.32558 8.8 8.0001 8.8C6.67461 8.8 5.6001 7.72548 5.6001 6.4C5.6001 5.07452 6.67461 4 8.0001 4C9.32558 4 10.4001 5.07452 10.4001 6.4ZM9.6001 6.4C9.6001 7.28366 8.88375 8 8.0001 8C7.11644 8 6.4001 7.28366 6.4001 6.4C6.4001 5.51634 7.11644 4.8 8.0001 4.8C8.88375 4.8 9.6001 5.51634 9.6001 6.4Z" fill="#6D390B"/>
      <path d="M8.0001 10C5.41034 10 3.20381 11.5314 2.36328 13.6768C2.56804 13.8801 2.78374 14.0725 3.00941 14.2528C3.63531 12.2831 5.59878 10.8 8.0001 10.8C10.4014 10.8 12.3649 12.2831 12.9908 14.2528C13.2165 14.0725 13.4322 13.8801 13.6369 13.6768C12.7964 11.5314 10.5899 10 8.0001 10Z" fill="#6D390B"/>
      </svg> First Name Last Name
      </button>
    </div>

    <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;" />

    <div class="quest-actions">
      <select class="form-select">
        <option>Inbox</option>
        <!-- Add more options if needed -->
      </select>

      <div style="display: flex; gap: 0.5rem;">
        <button class="btn-cancel" onclick="removeQuestForm(this)">Cancel</button>
        <button class="btn-begin-quest" onclick="createQuest(this)">
          Begin quest <span class="iconify" data-icon="mdi:sword-cross"></span>
        </button>
      </div>
    </div>
  `;

  questForms.appendChild(newForm);
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
  const category = form.querySelector(".form-select").value

  if (!title.trim()) {
    alert("Please enter a quest name")
    return
  }

  const newQuest = {
    id: Date.now(),
    title: title,
    description: description,
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),
    type: category.toLowerCase().replace(" ", "-"),
    xp: getXPByType(category),
    completed: false,
  }

  const categoryKey = getCategoryKey(category)
  quests[categoryKey].push(newQuest)

  showNotification("Quest created successfully!", "success")

  form.querySelector(".quest-title-input").value = ""
  form.querySelector(".quest-description").value = ""

  updateQuestCounts()
}



function getXPByType(type) {
  switch (type.toLowerCase()) {
    case "main quests":
      return 100
    case "side quests":
      return 50
    case "mini quests":
      return 15
    default:
      return 25
  }
}

function getCategoryKey(category) {
  switch (category.toLowerCase()) {
    case "main quests":
      return "mainQuests"
    case "side quests":
      return "sideQuests"
    case "mini quests":
      return "miniQuests"
    case "today":
      return "today"
    default:
      return "inbox"
  }
}

function updateQuestCounts() {
  const badges = {
    inbox: quests.inbox.length,
    today: quests.today.length,
    "main-quests": quests.mainQuests.length,
    "side-quests": quests.sideQuests.length,
    "mini-quests": quests.miniQuests.length,
  }

  Object.keys(badges).forEach((key) => {
    const navItem = document.querySelector(`[onclick="showSection('${key}')"] .badge`)
    if (navItem) {
      navItem.textContent = badges[key]
    }
  })
}

function completeQuest(questId, category) {
  const categoryKey = getCategoryKey(category)
  const quest = quests[categoryKey].find((q) => q.id === questId)

  if (quest) {
    quest.completed = true

    if (currentUser) {
      currentUser.xp = (currentUser.xp || 0) + quest.xp
      localStorage.setItem("questifyUser", JSON.stringify(currentUser))
    }

    showNotification(`+${quest.xp} XP gained!`, "success")

    updateLevelProgress()
  }
}

function updateLevelProgress() {
  const progressBars = document.querySelectorAll(".level-progress")
  const currentXP = (currentUser?.xp || 0) % 1000 
  const progressPercent = (currentXP / 1000) * 100

  progressBars.forEach((bar) => {
    bar.style.width = progressPercent + "%"
  })
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#d4edda" : "#d1ecf1"};
        color: ${type === "success" ? "#155724" : "#0c5460"};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease-in-out;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in-out"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

function initializeDashboard() {
  const userData = localStorage.getItem("questifyUser")
  if (!userData) {
    window.location.href = "index.html"
    return
  }

  currentUser = JSON.parse(userData)

  const usernameElement = document.querySelector(".username")
  if (usernameElement) {
    usernameElement.textContent = currentUser.username
  }

  const levelElement = document.querySelector(".level")
  if (levelElement) {
    levelElement.textContent = `LVL ${currentUser.level}`
  }

  // Set bottom-profile username
  const bottomProfileUsername = document.getElementById("bottomProfileUsername")
  if (bottomProfileUsername) {
    bottomProfileUsername.textContent = currentUser.username
  }

  updateQuestCounts()

  updateLevelProgress()

  document.addEventListener("change", (event) => {
    if (event.target.type === "checkbox" && event.target.closest(".quest-card")) {
      const questCard = event.target.closest(".quest-card")
      const questId = Number.parseInt(questCard.dataset.questId)
      const category = questCard.dataset.category

      if (event.target.checked) {
        completeQuest(questId, category)
        questCard.style.opacity = "0.6"
        questCard.style.textDecoration = "line-through"
      }
    }
  })
}

const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`
document.head.appendChild(style)

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard.html")) {
    initializeDashboard()
  }

  document.documentElement.style.scrollBehavior = "smooth"

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "n") {
      event.preventDefault()
      if (currentSection === "begin-quest") {
        addQuestForm()
      }
    }

    if (event.key === "Escape") {
      const modals = document.querySelectorAll(".modal.show")
      modals.forEach((modal) => {
        const modalId = modal.getAttribute("data-bs-target")
        const bsModal = bootstrap.Modal.getInstance(document.querySelector(modalId))

        if (bsModal) {
          bsModal.hide()
        }
      })
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const questCards = document.querySelectorAll(".quest-card")
  questCards.forEach((card, index) => {
    card.dataset.questId = index + 1
    card.dataset.category = getCurrentCategory()
  })
})

function getCurrentCategory() {
  const activeSection = document.querySelector(".content-section.active")
  if (activeSection) {
    return activeSection.id.replace("-section", "")
  }
  return "today"
}

window.showSignup = showSignup
window.login = login
window.handleSignup = handleSignup
window.logout = logout
window.showSection = showSection
window.addQuestForm = addQuestForm
window.removeQuestForm = removeQuestForm
window.createQuest = createQuest
