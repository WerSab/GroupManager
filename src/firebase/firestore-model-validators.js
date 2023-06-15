import ValidationError from '../errors/ValidationError';
//Dorobić validatory do reszty inputu, (osobne regexy, i w kolejnych ifach)

const regex = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i',
); // fragment locator

const regex_numbers = /\d/; //token do znajdowania cyfr
regex.test('akjdfkj2');

export function validateTournament(tournament) {
  if (!regex.test(tournament.link)) {
    throw new ValidationError({
      field: 'link',
      message: 'Nieprawidlowy link',
    });
  }
}
