import { Router } from "express";
import routerRole from "../modules/role/role.routes";
import routerUser from "../modules/user/user.routes";
import routerActivity from "../modules/Activity/activity.routes";
import routerEvidence from "../modules/Evidence/evidence.routes";
import routerProduct from "../modules/Product/product.routes";
import transactionRouter from "../modules/Transaction/transaction.routes";
import routerPokemon from "../modules/Pokemon/pokemon.routes";
import routerEmailVerification from "../modules/emailVerification/emailVerification.routes";
import missionRoutes from '../modules/mission/mission.router';
import routerAchievement from '../modules/achievement/achievement.router';
import notificationsRouter from '../modules/notifications/notification.routes';
import studyCardRoutes from '../modules/studyCard/studyCard.routes';
import studySessionRoutes from '../modules/studySession/studySession.routes';

const router = Router();

// Importar las rutas de los módulos
router.use("/roles", routerRole);
router.use("/users", routerUser);
router.use("/activities", routerActivity);
router.use("/evidences", routerEvidence);
router.use("/products", routerProduct);
router.use("/transactions", transactionRouter);
router.use("/pokemons", routerPokemon);

// Email verification routes
router.use("/email-verification", routerEmailVerification);

router.use("/missions", missionRoutes);
router.use("/achievements", routerAchievement);
router.use('/notifications', notificationsRouter);

// Study system routes
router.use("/study-cards", studyCardRoutes);
router.use("/study-sessions", studySessionRoutes);

export default router;