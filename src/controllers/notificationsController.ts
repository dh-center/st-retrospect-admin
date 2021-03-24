import notifier from 'codex-notifier';

/**
 * Helper class for working with notifications
 */
class NotificationsController {
  /**
   * How fast notification will be hidden
   */
  private readonly defaultNotificationTimeout = 5000;

  /**
   * Displays notification is success styling
   *
   * @param message - message to display
   */
  public success(message: string): void {
    notifier.show({
      message: message,
      style: 'success',
      time: this.defaultNotificationTimeout,
    });
  }

  /**
   * Displays notification is error styling
   *
   * @param message - message to display
   */
  public error(message: string): void {
    notifier.show({
      message: message,
      style: 'error',
      time: this.defaultNotificationTimeout,
    });
  }
}

const notifications = new NotificationsController();

export default notifications;
