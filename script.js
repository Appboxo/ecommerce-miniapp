const PRODUCTS = {
  teapot: {
    name: 'Quisque Teapot',
    price: 110,
    currency: 'USD'
  },
  lamp: {
    name: 'Spot Table Lamp',
    price: 110,
    currency: 'USD'
  },
  clock: {
    name: 'Decorative Alarm Clock',
    price: 65,
    currency: 'USD'
  }
}

// Init miniapp
appboxoSDK.init()

appboxoSDK.getInitData()

const modal = document.getElementById('modal')
const loginBtn = document.getElementById('login')
const logoutBtn = document.getElementById('logout')
const mainPage = document.getElementById('main-page')
const closeModalBtn = document.getElementById('close-modal')
const userEmailParagraph = document.getElementById('user-email')

loginBtn.addEventListener('click', login)
logoutBtn.addEventListener('click', logout)
closeModalBtn.addEventListener('click', closeModal)

logoutBtn.style.display = 'none'

// Add click events
mainPage.addEventListener('click', (e) => {
  const productName = e.target.id
  const product = PRODUCTS[productName]
  buyProduct(product)
})

async function login() {
  try {
    const data = await appboxoSDK.login()
    userEmailParagraph.innerText = JSON.stringify(data.email)
    loginBtn.style.display = 'none'
    logoutBtn.style.display = 'block'
  } catch (error) {
    userEmailParagraph.innerText = '(empty)'
    loginBtn.style.display = 'block'
    logoutBtn.style.display = 'none'
  }
}

async function logout() {
  try {
    await appboxoSDK.logout()
  } catch (error) {
    console.error(error)
  }
}

function buyProduct(product) {

  if (!product) {
    return
  }

  const buyProductEventDTO = {
    type: 'buy_from_miniapp',
    payload: product,
  }

  appboxoSDK.sendPromise('AppBoxoWebAppCustomEvent', buyProductEventDTO)
    .then(showSuccessModal)
    .catch(showErrorModal)
}

function showSuccessModal() {
  modal.classList.add('modal--success')
  modal.classList.remove('modal--error')
  modal.style.display = 'flex'
}

function showErrorModal() {
  modal.classList.remove('modal--success')
  modal.classList.add('modal--error')
  modal.style.display = 'flex'
}

function closeModal() {
  modal.style.display = 'none'
}


