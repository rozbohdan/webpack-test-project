const MENU = '[data-menu]'
const MENU_ACTION = '[data-menu-action]'
const OPEN_MENU = 'menuOpen'
const body = document.querySelector('body')
const overlay = document.querySelector('[data-overlay]')

class Menu {
  static attach() {
    const menu = new Menu()
    menu.init()
  }

  init() {
    if (this.findMenu()) {
      this.applyListener()
    }
  }

  applyListener() {
    document.querySelector('*').addEventListener('click', e => {
      const element = e.target.closest(MENU_ACTION)
      const menuBox = e.target.closest(MENU)

      if (this.isCallMenuElement(element)) {
        if (this.isOpened()) {
          this.closeMenu()
        } else {
          this.openMenu()
        }
      }

      if (this.isCallMenuElement(element) !== true && this.menuOverlayIsClickedElement(menuBox) !== true) {
        if (this.isOpened()) {
          this.closeMenu()
        }
      }
    })
  }

  isCallMenuElement(element) {
    return element && OPEN_MENU in element.dataset
  }

  findMenu() {
    const menu = document.querySelector(MENU)

    if (menu) {
      this.menu = menu
      return true
    }
    return false
  }

  isOpened() {
    return this.menu.classList.contains('nav__links_opened')
  }

  openMenu() {
    this.menu.classList.add('nav__links_opened')
    overlay.classList.add('main__overlay_opened')
    if (window.matchMedia("(max-width: 992px)").matches) {
      body.style.overflow = 'hidden'
    }
  }

  closeMenu() {
    this.menu.classList.remove('nav__links_opened')
    overlay.classList.remove('main__overlay_opened')
    body.style.overflow = 'auto'
  }

  menuOverlayIsClickedElement(menuBox) {
    return menuBox && 'menu' in menuBox.dataset
  }
}

Menu.attach()
