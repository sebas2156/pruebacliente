export const ROUTES = {
  INDEX: "/",
  HOME: "/dashboard",

  get USERS() {
    return this.HOME + "/usuarios";
  },
  get FACTURAS() {
    return this.HOME + "/facturas";
  },
};

Object.freeze(ROUTES);

export const ROUTENAMES = {
  [ROUTES.INDEX]: "Inicio",
  [ROUTES.HOME]: "Home",
  [ROUTES.USERS]: "Usuarios",
  [ROUTES.FACTURAS]: "Facturas",
};

Object.freeze(ROUTENAMES);
