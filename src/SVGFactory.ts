
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
}

export default SVGFactory;