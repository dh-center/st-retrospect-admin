/**
 * Creates person's full name
 *
 * @param person - person's lastname, firstname and patronymic
 */
export default function personsFullName(person: {lastName: string | null;firstName: string | null;patronymic: string | null}): string {
  return (`${person.lastName} ${person.firstName} ${person.patronymic}`).trim();
}
