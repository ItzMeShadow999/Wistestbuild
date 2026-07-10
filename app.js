/**
 * W.I.S. Theme Switcher — Five Universes of Unhinged Design
 * 
 * Themes:
 * 1. The Original — Default dark, clean, boring corporate vibes
 * 2. PURE White Mode — Flashbang simulator (requires waiver)
 * 3. Kawaii Pink — UwU energy
 * 4. Discord Dark — Touch grass simulator
 * 5. Edgelord Gothic — It's not a phase, mom!
 */

const THEMES = {
  original: {
    name: 'The Original',
    emoji: '🌙',
    description: 'Default dark mode. Safe. Boring. Predictable.',
  },
  'white-mode': {
    name: 'White Mode',
    emoji: '☀️',
    description: 'PURE eye-burning light. Requires waiver.',
    requiresWaiver: true,
  },
  'kawaii-pink': {
    name: 'Kawaii Pink',
    emoji: '🌸',
    description: 'Soft pastel. Sparkles. UwU.',
  },
  'discord-dark': {
    name: 'Discord Dark',
    emoji: '⏰',
    description: 'Never touch grass again.',
  },
  'edgelord-gothic': {
    name: 'Edgelord Gothic',
    emoji: '🖤',
    description: 'It\'s not a phase, mom!',
  },
};

class ThemeSwitcher {
  constructor() {
    this.currentTheme = localStorage.getItem('wis-theme') || 'original';
    this.waiverAccepted = localStorage.getItem('wis-white-mode-waiver') === 'true';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createUI();
    this.attachListeners();
  }

  createUI() {
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'theme-switcher-wrapper';
    wrapper.id = 'themeSwitcherWrapper';

    // Label
    const label = document.createElement('div');
    label.className = 'theme-label';
    label.textContent = 'Theme';
    wrapper.appendChild(label);

    // Dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'theme-dots';

    Object.keys(THEMES).forEach((themeKey) => {
      const dot = document.createElement('div');
      dot.className = 'theme-dot';
      dot.setAttribute('data-for', themeKey);
      dot.setAttribute('data-theme-key', themeKey);
      dot.title = THEMES[themeKey].name;

      if (themeKey === this.currentTheme) {
        dot.classList.add('active');
      }

      dotsContainer.appendChild(dot);
    });

    wrapper.appendChild(dotsContainer);
    document.body.appendChild(wrapper);

    // Create waiver modal
    this.createWaiverModal();
  }

  createWaiverModal() {
    const overlay = document.createElement('div');
    overlay.className = 'waiver-overlay';
    overlay.id = 'waiverOverlay';

    overlay.innerHTML = `
      <div class="waiver-modal">
        <div class="waiver-title">⚠️ RETINAL LIABILITY WAIVER REQUIRED</div>
        <div class="waiver-content">
          <p style="margin-bottom: 16px;">Do you agree to the Terms and Conditions of entering <strong>PURE Eye-Burning White Mode</strong>?</p>
        </div>
        
        <div class="waiver-clause">
          <strong>Clause 1:</strong> You agree that the developer is not legally or financially liable for sudden blindness, screen-induced sunburns, melted retinas, or temporary loss of vision.
        </div>
        
        <div class="waiver-clause">
          <strong>Clause 2:</strong> You voluntarily forfeit your dark-mode street credibility and agree to be judged by everyone in a 5-mile radius.
        </div>
        
        <div class="waiver-clause">
          <strong>Clause 3:</strong> You acknowledge that looking at this theme is equivalent to staring directly into a solar flare. You have been warned.
        </div>

        <div style="margin-top: 20px; font-size: 12px; color: var(--text-muted);">
          Type this exactly to bypass safety protocol:
        </div>

        <input 
          type="text" 
          class="waiver-input" 
          id="waiverInput" 
          placeholder="I AGREE TO BLIND MYSELF"
          autocomplete="off"
        />

        <div class="waiver-actions">
          <button class="waiver-btn waiver-btn-cancel" id="waiverCancel">Cancel</button>
          <button class="waiver-btn waiver-btn-accept" id="waiverAccept" disabled>Accept Waiver</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Attach waiver logic
    const waiverInput = document.getElementById('waiverInput');
    const waiverAccept = document.getElementById('waiverAccept');
    const waiverCancel = document.getElementById('waiverCancel');

    waiverInput.addEventListener('input', (e) => {
      waiverAccept.disabled = e.target.value !== 'I AGREE TO BLIND MYSELF';
    });

    waiverAccept.addEventListener('click', () => {
      this.waiverAccepted = true;
      localStorage.setItem('wis-white-mode-waiver', 'true');
      this.closeWaiver();
      this.applyTheme('white-mode');
      this.updateUI();
    });

    waiverCancel.addEventListener('click', () => {
      this.closeWaiver();
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        this.closeWaiver();
      }
    });
  }

  openWaiver() {
    const overlay = document.getElementById('waiverOverlay');
    overlay.classList.add('active');
    document.getElementById('waiverInput').focus();
  }

  closeWaiver() {
    const overlay = document.getElementById('waiverOverlay');
    overlay.classList.remove('active');
    document.getElementById('waiverInput').value = '';
    document.getElementById('waiverAccept').disabled = true;
  }

  applyTheme(themeKey) {
    if (!THEMES[themeKey]) return;

    const theme = THEMES[themeKey];

    // Check if white mode requires waiver
    if (themeKey === 'white-mode' && !this.waiverAccepted) {
      this.openWaiver();
      return;
    }

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', themeKey);
    this.currentTheme = themeKey;
    localStorage.setItem('wis-theme', themeKey);

    // Log with sarcasm
    this.logThemeChange(themeKey, theme);
  }

  logThemeChange(themeKey, theme) {
    const messages = {
      original: '🌙 Switched to The Original. Boring? Yes. Safe? Also yes.',
      'white-mode': '☀️ WHITE MODE ACTIVATED. Prepare your retinas.',
      'kawaii-pink': '🌸 UwU vibes engaged. The cuteness is overwhelming.',
      'discord-dark': '⏰ Discord Dark engaged. Time to unread ping yourself to death.',
      'edgelord-gothic': '🖤 It\'s not a phase, mom. Embrace the edge.',
    };

    console.log(`%c${messages[themeKey]}`, 
      `font-size: 14px; font-weight: bold; color: ${this.getLogColor(themeKey)};`);
  }

  getLogColor(themeKey) {
    const colors = {
      original: '#5865f2',
      'white-mode': '#000000',
      'kawaii-pink': '#ec4899',
      'discord-dark': '#313338',
      'edgelord-gothic': '#8b0000',
    };
    return colors[themeKey] || '#fff';
  }

  attachListeners() {
    const dots = document.querySelectorAll('.theme-dot');
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const themeKey = dot.getAttribute('data-theme-key');
        this.applyTheme(themeKey);
        this.updateUI();
      });
    });
  }

  updateUI() {
    const dots = document.querySelectorAll('.theme-dot');
    dots.forEach((dot) => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-theme-key') === this.currentTheme) {
        dot.classList.add('active');
      }
    });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
  });
} else {
  new ThemeSwitcher();
}
