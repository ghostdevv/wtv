declare module '@bbc/tv-lrud-spatial' {
	/**
	 * @param currentFocus A HTMLElement that you want LRUD spatial to consider as the element you're navigating from.
	 * @param keyOrKeyCode The key/keyCode representing the direction key pressed
	 * @param scope optional HTMLElement that you only want to look for focusable candidates inside of. Defaults to the whole page if not provided.
	 * @returns An HTMLElement that LRUD spatial thinks you should navigate to.
	 */
	export function getNextFocus(
		currentFocus: HTMLElement,
		keyOrKeyCode: string | number,
		scope?: HTMLElement,
	): HTMLElement | undefined;
}
