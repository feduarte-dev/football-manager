import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import Validations from '../middlewares/Validations';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getMatches(req, res),
);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.endMatch(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.createNewMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateGoals(req, res),
);

export default router;
