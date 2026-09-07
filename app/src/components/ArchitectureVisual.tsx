import { Icon } from './Icon'

export function ArchitectureVisual() {
  return (
    <div className="architecture" aria-hidden="true">
      <div className="architecture-grid" />
      <div className="architecture-coordinate coordinate-top">
        <span className="crosshair">+</span>
        <span>SYSTEM ARCHITECTURE</span>
        <span>01 / 03</span>
      </div>
      <div className="architecture-orbit orbit-one" />
      <div className="architecture-orbit orbit-two" />
      <svg className="architecture-connectors" viewBox="0 0 540 490" fill="none">
        <path
          d="M113 148H269V335h159M113 335h156V148h159"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle cx="113" cy="148" r="4" fill="currentColor" />
        <circle cx="428" cy="335" r="4" fill="currentColor" />
      </svg>
      <div className="architecture-chip chip-api">
        <span className="chip-dot" /> REST API <Icon name="arrow" size={12} />
      </div>
      <div className="architecture-chip chip-data">
        <Icon name="database" size={13} /> DATA
      </div>
      <div className="architecture-stack">
        <div className="system-layer layer-data">
          <div className="layer-border" />
          <div className="layer-content">
            <Icon name="database" size={30} />
            <span>PERSISTENCE</span>
            <span className="layer-index">03</span>
          </div>
          <div className="layer-edge">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="system-layer layer-service">
          <div className="layer-border" />
          <div className="layer-content">
            <Icon name="layers" size={30} />
            <span>APPLICATION</span>
            <span className="layer-index">02</span>
          </div>
          <div className="layer-edge">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="system-layer layer-interface">
          <div className="layer-border" />
          <div className="layer-content">
            <Icon name="code" size={30} />
            <span>INTERFACE</span>
            <span className="layer-index">01</span>
          </div>
          <div className="layer-edge">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="architecture-caption">
        <span className="status-dot" /> IDEAS → LOGIC → EXPERIENCE
      </div>
      <div className="architecture-coordinate coordinate-bottom">
        <span>DESIGNED TO CONNECT.</span>
        <span className="crosshair">+</span>
      </div>
    </div>
  )
}
