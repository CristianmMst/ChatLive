export class InvalidCredential extends Error {
  constructor(message: string = "Correo o contraseña incorrectos") {
    super(message);
    this.name = "InvalidCredential";
  }
}
