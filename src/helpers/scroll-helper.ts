export class ScrollHelper {
  private constructor() {}

  public static scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  public static scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  public static disableScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  public static enableScroll(): void {
    document.body.style.overflow = 'auto';
  }
}
