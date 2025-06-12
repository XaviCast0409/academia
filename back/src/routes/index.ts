import { Router } from "express";
import routerRole from "../modules/role/role.routes";
import routerUser from "../modules/user/user.routes";
import routerActivity from "../modules/Activity/activity.routes";
import routerEvidence from "../modules/Evidence/evidence.routes";
import routerProduct from "../modules/Product/product.routes";
import transactionRouter from "../modules/Transaction/transaction.routes";
import routerPokemon from "../modules/Pokemon/pokemon.routes";


const router = Router();

// Importar las rutas de los módulos
router.use("/roles", routerRole);
router.use("/users", routerUser);
router.use("/activities", routerActivity);
router.use("/evidences", routerEvidence);
router.use("/products", routerProduct);
router.use("/transactions", transactionRouter);
router.use("/pokemons", routerPokemon);

export default router;