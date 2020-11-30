/**
 * Object with information about full person name
 */
interface FullNameObject {
  /**
   * Person's last name
   */
  lastName: string | null;

  /**
   * Person's first name
   */
  firstName: string | null;

  /**
   * Person's patronymic
   */
  patronymic: string | null
}

/**
 * Creates person's full name
 *
 * @param nameObject - person's lastname, firstname and patronymic
 */
export default function personsFullName(nameObject: FullNameObject): string {
  return (`${nameObject.lastName} ${nameObject.firstName} ${nameObject.patronymic}`).trim();
}
