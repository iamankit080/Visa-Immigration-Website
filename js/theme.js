// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Create theme toggle button
        this.createToggleButton();
        
        // Add event listeners
        this.addEventListeners();
    }

    createToggleButton() {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'theme-toggle';
        toggleButton.id = 'themeToggle';
        toggleButton.setAttribute('aria-label', 'Toggle theme');
        toggleButton.innerHTML = this.currentTheme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        document.body.appendChild(toggleButton);
    }

    addEventListeners() {
        const toggleButton = document.getElementById('themeToggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener((e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        
        // Set data attribute on html element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update toggle button icon
        const toggleButton = document.getElementById('themeToggle');
        if (toggleButton) {
            toggleButton.innerHTML = theme === 'dark' ? 
                '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }

        // Store preference
        localStorage.setItem('theme', theme);

        // Update body class for compatibility
        document.body.classList.toggle('dark-theme', theme === 'dark');
        
        // Update spinner background
        this.updateSpinner(theme);
        
        // Trigger custom event
        const event = new CustomEvent('themeChanged', { detail: { theme } });
        document.dispatchEvent(event);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateSpinner(theme) {
        const spinner = document.getElementById('spinner');
        if (spinner) {
            if (theme === 'dark') {
                spinner.classList.remove('bg-white');
                spinner.classList.add('bg-dark');
            } else {
                spinner.classList.remove('bg-dark');
                spinner.classList.add('bg-white');
            }
        }
    }

    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Check if dark mode is active
    isDarkMode() {
        return this.currentTheme === 'dark';
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.themeManager = new ThemeManager();
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Optional: Add smooth transitions
document.addEventListener('themeChanged', function(e) {
    // Add any additional theme change effects here
    console.log('Theme changed to:', e.detail.theme);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}