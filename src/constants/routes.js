export const ROUTES = {
  INDEX: "/",
  HOME: "/dashboard",

  get USERS() {
    return this.HOME + "/usuarios";
  },
  get FACTURAS() {
    return this.HOME + "/facturas";
  },
  get BLOQUES() {
    return this.HOME + "/bloques";
  },
};

Object.freeze(ROUTES);

export const ROUTENAMES = {
  [ROUTES.INDEX]: "Inicio",
  [ROUTES.HOME]: "Home",
  [ROUTES.USERS]: "Usuarios",
  [ROUTES.BLOQUES]: "Bloques",
  [ROUTES.FACTURAS]: "Facturas",
};

Object.freeze(ROUTENAMES);
