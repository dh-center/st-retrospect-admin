import notifier from 'codex-notifier';

/**
 * Handle api errors when create, edit or delete entities
 *
 * @param error - caught api error
 */
// eslint-disable-next-line
function handleApiError(error: Record<string, any>): void {
  if (error.source?.errors[0]?.extensions?.code === 'UNAUTHENTICATED' || error.extensions?.code === 'UNAUTHENTICATED') {
    notifier.show({
      message: 'You don\'t have permissions to do this. Please contact administrator.',
      style: 'error',
      time: 5000,
    });

    return;
  }
  notifier.show({
    message: 'Something went wrong',
    style: 'error',
    time: 5000,
  });
}

export default handleApiError;
