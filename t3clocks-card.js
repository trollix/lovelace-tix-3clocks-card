const LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

//export const hass = document.querySelector("home-assistant").hass;

const CARD_VERSION = '0.5.0';
const CARD_NAME = "HA-T3CLOCK-CARD";
console.info(
  `%c  ${CARD_NAME}  %c  Version ${CARD_VERSION}  `,
    'color: white; font-weight: bold; background: crimson',
    'color: #000; font-weight: bold; background: #ddd',
);
class T3ClocksCard extends LitElement {
  
  render() {
    return html`
        <style>
			:host { cursor: default; }
			.content { padding: 24px 16px; display:flex; flex-wrap: wrap; align-items: center; }
			.main-clock {
				padding: 0; margin: 0; display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; -webkit-flex-wrap: wrap; flex-wrap: wrap;
				flex-direction: row; justify-content: center; align-items: center; flex: 0 0 100%; /* Let it fill the entire space horizontally */
				align-content: center; align-items: baseline;
				color: var(--primary-text-color);
			}
			.clockicon { align-self: baseline; margin-right: 1.2em; }
			.clockicon .ha-icon ha-icon { width: 5em; height: 5em; }
			.main_date {
				font-family: var(--paper-font-headline_-_font-family);
				-webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
				font-size: 3em;
				font-weight: var(--paper-font-headline_-_font-weight);
				letter-spacing: var(--paper-font-headline_-_letter-spacing);
				line-height: 1em;
				text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
			}
			.main_date {
				font-family: var(--paper-font-headline_-_font-family);
				-webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
				font-size: 1.3em;
				font-weight: var(--paper-font-headline_-_font-weight);
				letter-spacing: var(--paper-font-headline_-_letter-spacing);
				line-height: var(--paper-font-headline_-_line-height);
				text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
			}
			.zones-clocks { 
				padding: 0; margin: 0; margin-top: 0.5em; display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; -webkit-flex-wrap: nowrap; flex-wrap: nowrap; flex-direction: row; flex: 0 0 100%; /* Let it fill the entire space horizontally */
				justify-content: space-evenly; text-align: center; align-items: center; margin-top: 1em;
				color: var(--primary-text-color);
			}
			.zone-time, .zone-name {
				color: var(--primary-text-color);
				font-family: var(--paper-font-headline_-_font-family);
				-webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
				font-weight: var(--paper-font-headline_-_font-weight);
				letter-spacing: var(--paper-font-headline_-_letter-spacing);
				text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
				font-size: 2em;
			}
			.zone-name {
				color: var(--secondary-text-color);
				font-size: 1em;
			}
		</style>
		<ha-card>
			<div class="content">
				<div class="main-clock">
					<div class="clockicon"> <span class="ha-icon"><ha-icon icon="mdi:clock-outline"></ha-icon></span> </div>
					<div class="date-time">
						<div class="main_time" id="main_time"></div>
						<div class="main_date" id="main_date"></div>
					</div>
				</div>
				<div class="zones-clocks">
					<div class="clock-zone1">
						<div class="zone-time" id="time_zone1"></div>
						<div class="zone-name">Paris</div>
					</div>
					<div class="clock-zone2">
						<div class="zone-time" id="time_zone2"></div>
						<div class="zone-name">Londres</div>
					</div>
					<div class="clock-zone3">
						<div class="zone-time" id="time_zone3"></div>
						<div class="zone-name">New York</div>
					</div>
				</div>
			</div>
		</ha-card>
     `
  }
  
  static get properties() {
    return {
      _hass: Object,
      main_time: { type: Object },
      main_date: { type: Object },
      time_zone1: { type: Object },
      time_zone2: { type: Object },
      time_zone3: { type: Object },
    }
  }
  
connectedCallback() {
  super.connectedCallback();
  setTimeout(() => {
    this.main_time = this.shadowRoot.querySelector("#main_time");
    this.main_date = this.shadowRoot.querySelector("#main_date");
    this.time_zone1 = this.shadowRoot.querySelector("#time_zone1");
    this.time_zone2 = this.shadowRoot.querySelector("#time_zone2");
    this.time_zone3 = this.shadowRoot.querySelector("#time_zone3");
    this._updateTime();
    setInterval(() => this._updateTime(), 500);
  }, 0);
}
  
  setConfig(config) {
    this.config = config;
  }
  
  set hass(hass) {
    this._hass = hass;
  }

  _updateTime(force = false) {
    let clockFormatMain = {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	};
  
    let clockFormatZone1 = {
		timeZone: "Europe/Paris",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit"
	};
  
    let clockFormatZone2 = {
		timeZone: "Europe/London",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit"
	};
  
    let clockFormatZone3 = {
		timeZone: "America/New_York",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit"
	};
  
    let DateOptions = {
		weekday: "long",
		month: "2-digit",
		day: "2-digit",
		year: "numeric"
	};
	
    let date = new Date();
    let locale = 'fr-FR';
    let time = date.toLocaleTimeString([], clockFormatMain);
    let time1 = date.toLocaleTimeString([], clockFormatZone1);
    let time2 = date.toLocaleTimeString([], clockFormatZone2);
    let time3 = date.toLocaleTimeString([], clockFormatZone3);
	
    this.shadowRoot.getElementById('main_date').innerHTML = date.toLocaleDateString(locale, DateOptions);
    this.shadowRoot.querySelector('#main_time').innerHTML = time;
    this.shadowRoot.querySelector('#time_zone1').innerHTML = time1;
    this.shadowRoot.querySelector('#time_zone2').innerHTML = time2;
    this.shadowRoot.querySelector('#time_zone3').innerHTML = time3;
    
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('t3clocks-card', T3ClocksCard);
