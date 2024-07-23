interface AuthData {
  token: string;
  _idUser: string;
}

export function saveAuthData({ token, _idUser }: AuthData): void {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('_idUser', _idUser);
}
  
  
  export function getAuthData(): AuthData {
    try {
      const token = sessionStorage.getItem('token');
      const _idUser = sessionStorage.getItem('_idUser');
      if(!token || !_idUser) throw new Error("Objetos no encontrados");
      return { token, _idUser }
    }  catch (error) {
      const token = "";
      const _idUser = "";
      return {token, _idUser};
    };
  }
  
  export function clearAuthData(): void {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('_idUser');
    } catch (error) {
      throw new Error("Objetos no encontrados para remover");
    }
  }