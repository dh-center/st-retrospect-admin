/**
 * Check if user has specific permission
 *
 * @param name - permission name
 * @param permissions - user permission array
 */
export default function hasPermission(name: string, permissions: readonly string[]): boolean {
  return permissions.some(per => per === name);
}
