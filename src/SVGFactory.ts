
class SVGFactory {
  /**
   * Gets the SVG string for the Epic icon.
   * @returns SVG string for the Epic icon.
   * @public
   */
  public static GetEpicSVG(): string {
    return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#A259FF"/>
  <path d="M13 2L6 13H11L11 22L18 11H13L13 2Z" fill="white"/>
</svg>`;
  }

  /**
   * Gets the SVG string for the Story icon.
   * @returns SVG string for the Story icon.
   * @public
   */
  public static GetStorySVG(): string {
    return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#4CD964"/>
  <path d="M6 4C6 2.9 6.9 2 8 2H16C17.1 2 18 2.9 18 4V21L12 17L6 21V4Z" fill="white"/>
</svg>`;
  }

  /**
   * Gets the SVG string for the Task icon.
   * @returns SVG string for the Task icon.
   * @public
   */
  public static GetTaskSVG(): string {
    return `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#32ADE6"/>
  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
</svg>`;
  }

  /**
   * Gets the SVG string for the Warning icon.
   * @returns SVG string for the Warning icon.
   */
  public static GetWarningSVG(): string {
    return `
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
          <rect width="24" height="24" rx="4" fill="#FFA726"/> <!-- orange background -->
          <path d="M11 7h2v6h-2V7zm0 8h2v2h-2v-2z" fill="white"/> <!-- exclamation mark -->
        </svg>
        `;
  }


  public static GetHighPrioritySVG(): string {
    return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
                <rect width="24" height="24" rx="4" fill="#D32F2F"/>
                <path d="M6 20l6-6 6 6" stroke="white" stroke-width="2"/>
                <path d="M6 17l6-6 6 6" stroke="white" stroke-width="2"/>
                <path d="M6 14l6-6 6 6" stroke="white" stroke-width="2"/>
              </svg>
              `;

//     return `
//     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
//   <rect width="24" height="24" rx="4" fill="#EF5350"/>
//   <path d="M6 14l6-6 6 6" stroke="white" stroke-width="2"/>
// </svg>
// `;
  }

  public static GetMediumPrioritySVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#FBC02D"/>
  <rect x="6" y="9" width="12" height="2" fill="white"/>
  <rect x="6" y="13" width="12" height="2" fill="white"/>
</svg>
      `;
  }

  public static GetLowPrioritySVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
  <rect width="24" height="24" rx="4" fill="#2962FF"/>
  <path d="M6 8l6 6 6-6" stroke="white" stroke-width="2"/>
  <path d="M6 11l6 6 6-6" stroke="white" stroke-width="2"/>
  <path d="M6 14l6 6 6-6" stroke="white" stroke-width="2"/>
</svg>
      `;

// return `
// <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
//   <rect width="24" height="24" rx="4" fill="#82B1FF"/>
//   <path d="M6 12l6 6 6-6" stroke="white" stroke-width="2"/>
// </svg>
// `;
  }


}

export default SVGFactory;