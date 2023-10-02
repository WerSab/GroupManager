export class FirebaseStorageFileUploadError extends Error {
  constructor(error) {
    console.error(`FirebaseStorageFileUploadError: ${error}`);
    super('Could not upload file to Firebase Storage');
  }
}
